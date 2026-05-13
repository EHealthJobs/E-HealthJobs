import { NextResponse } from "next/server";
import { commonApiCallingMethod } from "../../../lib/salesforceApi";

export async function GET() {
  try {
    const result = await commonApiCallingMethod("services/apexrest/eHealthJobsContactUsApi");

    if (result?.error) {
      return NextResponse.json(
        { success: false, message: result.message || "Unable to fetch picklist values.", result },
        { status: 502 }
      );
    }

    if (Array.isArray(result)) {
      return NextResponse.json({ success: true, data: result });
    }

    return NextResponse.json({
      success: result?.success ?? true,
      data: result,
      ...result,
    });
  } catch (err) {
    console.error("Error fetching picklist values:", err);
    return NextResponse.json(
      { success: false, message: "Server error occurred", error: err?.message },
      { status: 500 }
    );
  }
}
