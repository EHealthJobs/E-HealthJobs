import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import crypto from "crypto";
import pool from "../../../lib/db";

const getSessionSecret = () =>
  process.env.AUTH_SESSION_SECRET;

const createSessionToken = (payload) => {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", getSessionSecret())
    .update(body)
    .digest("base64url");

  return `${body}.${signature}`;
};

export async function POST(req) {
  let client;

  try {
    const { email, password } = await req.json();
    const normalizedEmail = String(email || "").trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    client = await pool.connect();
    const result = await client.query(
      `
        SELECT id, first_name, last_name, email, password, contact_sfid
        FROM users
        WHERE LOWER(email) = $1
        LIMIT 1
      `,
      [normalizedEmail]
    );

    const user = result.rows[0];
    const isPasswordValid =
      user?.password && (await bcrypt.compare(String(password), user.password));

    if (!user || !isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const expiresAt = Date.now() + 2 * 60 * 60 * 1000;
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        contactId: user.contact_sfid,
      },
    });

    response.cookies.set(
      "session",
      createSessionToken({
        userId: user.id,
        email: user.email,
        contactId: user.contact_sfid,
        expiresAt,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: new Date(expiresAt),
      }
    );

    return response;
  } catch (err) {
    console.error("Error in login API route:", err);
    return NextResponse.json(
      { success: false, message: "Server error occurred", error: err?.message },
      { status: 500 }
    );
  } finally {
    client?.release();
  }
}
