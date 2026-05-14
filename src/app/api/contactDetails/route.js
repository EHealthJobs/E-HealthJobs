import { NextResponse } from "next/server";
import crypto from "crypto";
import { commonApiCallingMethod, salesforceApiRequest } from "../../../lib/salesforceApi";

const getSessionSecret = () => process.env.NEXT_PUBLIC_AUTH_SESSION_SECRET;

const verifySessionToken = (token) => {
  if (!token || !token.includes(".")) return null;

  const [body, signature] = token.split(".");
  const expectedSignature = crypto
    .createHmac("sha256", getSessionSecret())
    .update(body)
    .digest("base64url");

  if (signature !== expectedSignature) return null;

  try {
    const session = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (!session.expiresAt || Date.now() > Number(session.expiresAt)) return null;
    return session;
  } catch (err) {
    console.error("Failed to parse session token:", err);
    return null;
  }
};

const toBoolean = (value) => {
  if (typeof value === "boolean") return value;
  return String(value || "").toLowerCase() === "true";
};

const hasDocumentMetadata = (data) => (
  data.DocumentCategory !== undefined ||
  data.DocumentType !== undefined ||
  data.DocumentStatus !== undefined ||
  data.DocumentExpirationDate !== undefined ||
  data.DocumentNotes !== undefined ||
  data.DocumentIsRequired !== undefined
);

const buildDocumentMetadata = (data) => ({
  documentCategory: data.DocumentCategory || "",
  documentType: data.DocumentType || "",
  documentStatus: data.DocumentStatus || "",
  expirationDate: data.DocumentExpirationDate || "",
  notes: data.DocumentNotes || "",
  isRequired: toBoolean(data.DocumentIsRequired),
});

const fileToBase64 = async (file) => {
  if (typeof file.arrayBuffer === "function") {
    const buffer = await file.arrayBuffer();
    return Buffer.from(buffer).toString("base64");
  }

  if (file.stream && typeof file.stream === "function") {
    const stream = file.stream();
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

    chunks.forEach(chunk => {
      uint8Array.set(chunk, offset);
      offset += chunk.length;
    });

    return Buffer.from(uint8Array).toString("base64");
  }

  throw new Error("Unable to read file - unsupported file object");
};

export async function GET(req) {
  const session = verifySessionToken(req.cookies.get("session")?.value);

  if (!session?.contactId) {
    return NextResponse.json(
      { success: false, message: "Login session or contact id was not found." },
      { status: 401 }
    );
  }

  try {
    const contact = await commonApiCallingMethod(
      `services/apexrest/eHealthContactApi/${encodeURIComponent(session.contactId)}`
    );

    if (contact?.error) {
      return NextResponse.json(
        { success: false, message: contact.message || "Unable to fetch contact details." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      contactId: session.contactId,
      contact,
    });
  } catch (err) {
    console.error("Error fetching contact details:", err);
    return NextResponse.json(
      { success: false, message: "Server error occurred", error: err?.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  const session = verifySessionToken(req.cookies.get("session")?.value);

  if (!session?.contactId) {
    return NextResponse.json(
      { success: false, message: "Login session or contact id was not found." },
      { status: 401 }
    );
  }

  try {
    const contentType = req.headers.get("content-type") || "";
    const updateData = {};
    let attachmentFile = null;

    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();

      for (const [key, value] of form.entries()) {
        if (key === "Attachment" && value && typeof value === "object" && value.size && value.name) {
          attachmentFile = value;
        } else {
          updateData[key] = value;
        }
      }
    } else {
      Object.assign(updateData, await req.json());
    }

    delete updateData.Password;
    delete updateData.ConfirmPassword;

    if (hasDocumentMetadata(updateData)) {
      updateData.Attachment = buildDocumentMetadata(updateData);
    } else {
      delete updateData.Attachment;
    }

    if (attachmentFile) {
      const maxSize = 2 * 1024 * 1024;
      if (attachmentFile.size > maxSize) {
        return NextResponse.json(
          { success: false, message: "File size too large. Please use a file smaller than 2MB." },
          { status: 400 }
        );
      }

      const base64Data = await fileToBase64(attachmentFile);
      if (!base64Data) {
        return NextResponse.json(
          { success: false, message: "Failed to convert file to base64." },
          { status: 400 }
        );
      }

      updateData.Attachment = {
        ...(updateData.Attachment || {}),
        fileName: attachmentFile.name,
        base64Data,
      };
    }

    const result = await salesforceApiRequest(
      `services/apexrest/eHealthContactApi/${encodeURIComponent(session.contactId)}`,
      {
        method: "PATCH",
        body: updateData,
      }
    );

    if (result?.error) {
      return NextResponse.json(
        { success: false, message: result.message || "Unable to save contact details.", result },
        { status: result.status || 502 }
      );
    }

    return NextResponse.json({
      success: result?.success ?? true,
      contactId: session.contactId,
      result,
    });
  } catch (err) {
    console.error("Error saving contact details:", err);
    return NextResponse.json(
      { success: false, message: "Server error occurred", error: err?.message },
      { status: 500 }
    );
  }
}
