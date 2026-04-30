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
    const formData = await req.json();
    const updateData = { ...formData };

    delete updateData.Password;
    delete updateData.ConfirmPassword;
    delete updateData.Attachment;

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
