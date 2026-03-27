import { NextResponse } from "next/server";
import { createContact } from '../../../lib/salesforceApi';


export async function POST(req) {
  try {
    const rawData = {};
    let attachmentFile = null;
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      Object.assign(rawData, await req.json());
    } else {
      const form = await req.formData();

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
    return NextResponse.json({
      success: result?.success ?? true,
      result,
    });
  } catch (err) {
    console.error('Error in API route:', err);
    console.log('Error in API route:', err);
    return NextResponse.json({ 
      success: false,
      message: 'Server error occurred', 
      error: err?.message 
    }, { status: 500 });
  }
}
