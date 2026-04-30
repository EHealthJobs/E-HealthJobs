import { NextResponse } from "next/server";
import crypto from "crypto";

const getSessionSecret = () =>
  process.env.AUTH_SESSION_SECRET;

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

  return NextResponse.json({
    authenticated: Boolean(session),
    user: session
      ? {
          id: session.userId,
          email: session.email,
          contactId: session.contactId,
        }
      : null,
  });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });

  response.cookies.set("session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });

  return response;
}
