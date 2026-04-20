import { NextResponse } from "next/server";
import { createContact } from '../../../lib/salesforceApi';
import pool from "../../../lib/db";
import bcrypt from 'bcrypt';

const getSalesforceContactId = (result) => {
  return (
    result?.contactId || null
  );
};

export async function POST(req) {
  let client;

  try {
    const rawData = {};
    let attachmentFile = null;
    const form = await req.formData();
    const contentType = req.headers.get("content-type") || "";

    const firstName = form.get("FirstName");
    const lastName = form.get("LastName");
    const email = form.get("Email");
    const phone_number = form.get("Phone") || form.get("PhoneNumber") || form.get("phone");
    const whatsApp_number = `${form.get("countryCode") || ""}${form.get("WhatsAppNumber") || ""}`;
    const password = form.get("Password");
    const submissionType = form.get("submissionType");
    const isSignupSubmission =
      submissionType === "signup" ||
      form.has("ConfirmPassword") ||
      form.has("Attachment");

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email address is required.' },
        { status: 400 }
      );
    }

    if (isSignupSubmission && !password) {
      return NextResponse.json(
        { success: false, message: 'Password is required.' },
        { status: 400 }
      );
    }

    if (contentType.includes("application/json")) {
      Object.assign(rawData, await req.json());
    } else {

      for (const [key, value] of form.entries()) {
        if (key === "Attachment") {
          // Check if it's a file-like object (more flexible than instanceof File)
          if (value && typeof value === "object" && value.size && value.name) {
            if (value.size > 0) {
              attachmentFile = value;
            }
          }
        } else {
          rawData[key] = value;
        }
      }
    }

    delete rawData.Password;
    delete rawData.ConfirmPassword;
    delete rawData.submissionType;

    if (isSignupSubmission) {
      client = await pool.connect();

      const checkUserExists = await client.query('SELECT id FROM users WHERE email = $1', [email]);

      if (checkUserExists.rows.length > 0) {
        return NextResponse.json(
          { success: false, message: 'Email already exists. Please log in with your existing account.' },
          { status: 400 }
        );
      }
    }

    if (attachmentFile) {
      try {
        // Check file size before processing (2MB limit for production)
        const maxSize = 2 * 1024 * 1024; // 2MB
        if (attachmentFile.size > maxSize) {
          return NextResponse.json({ 
            success: false,
            message: 'File size too large. Please use a file smaller than 2MB.' 
          }, { status: 400 });
        }

        console.log(`Processing file: ${attachmentFile.name}, size: ${attachmentFile.size} bytes`);

        // Different approaches for different environments
        let buffer;
        let base64;
        
        try {
          // Try arrayBuffer method first
          if (typeof attachmentFile.arrayBuffer === 'function') {
            buffer = await attachmentFile.arrayBuffer();
            base64 = Buffer.from(buffer).toString('base64');
          } 
          // Fallback for environments where arrayBuffer isn't available
          else if (attachmentFile.stream && typeof attachmentFile.stream === 'function') {
            const stream = attachmentFile.stream();
            const reader = stream.getReader();
            const chunks = [];
            
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              chunks.push(value);
            }
            
            const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
            const uint8Array = new Uint8Array(totalLength);
            let offset = 0;
            
            for (const chunk of chunks) {
              uint8Array.set(chunk, offset);
              offset += chunk.length;
            }
            
            base64 = Buffer.from(uint8Array).toString('base64');
          }
          else {
            throw new Error('Unable to read file - unsupported file object');
          }
        } catch (readError) {
          console.error('File read error:', readError);
          throw new Error(`Failed to read file: ${readError.message}`);
        }

        
        // Verify base64 conversion
        if (!base64 || base64.length === 0) {
          throw new Error('Failed to convert file to base64');
        }

        rawData.Attachment = {
          fileName: attachmentFile.name,
          base64Data: base64,
        };

        console.log(`File processed successfully: ${attachmentFile.name}`);
        
        // Clear references to help with garbage collection
        buffer = null;
        
      } catch (fileError) {
        console.error('File processing error:', fileError);
        return NextResponse.json({ 
          success: false,
          message: 'Error processing file attachment. Please try with a smaller file.', 
          error: fileError.message 
        }, { status: 400 });
      }
    }

    const result = await createContact(`services/apexrest/eHealthJobsContactUsApi`, rawData);
    console.log('Salesforce API result:', result);
    const contactId = getSalesforceContactId(result);

    if (result?.success === false || (isSignupSubmission && !contactId)) {
      return NextResponse.json({
        success: false,
        message: result?.message || 'Salesforce contact creation failed.',
        result,
      }, { status: 400 });
    }

    if (!isSignupSubmission) {
      return NextResponse.json({
        success: result?.success ?? true,
        contactId,
        result,
      });
    }

    const hashedPassword = await bcrypt.hash(String(password), 10);

    const query = `
      INSERT INTO users (
        first_name, last_name, email, phone_number, whatsapp_number, password, contact_sfid
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING id
    `;

    const values = [
      firstName,
      lastName,
      email,
      phone_number,
      whatsApp_number,
      hashedPassword,
      contactId
    ];

    const results = await client.query(query, values);

    return NextResponse.json({
      success: result?.success ?? true,
      userId: results.rows[0].id,
      contactId,
      result,
    });
  } catch (err) {
    if (err?.code === '23505') {
      return NextResponse.json(
        { success: false, message: 'Email already exists. Please log in with your existing account.' },
        { status: 400 }
      );
    }

    console.error('Error in API route:', err);
    console.log('Error in API route:', err);
    return NextResponse.json({ 
      success: false,
      message: 'Server error occurred', 
      error: err?.message 
    }, { status: 500 });
  } finally {
    client?.release();
  }
}
