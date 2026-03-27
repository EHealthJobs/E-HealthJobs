import { NextResponse } from "next/server";
import { buildFetchURL, commonApiCallingMethod } from '../../../lib/salesforceApi';

export async function GET(req) {

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing job id in query params" },
        { status: 400 }
      );
    }

    const jobQuery = buildFetchURL([`Id='${id}'`], 1, 0);
    const result = await commonApiCallingMethod(jobQuery);

    console.log("Salesforce Job fetched by ID:", result);

    return NextResponse.json(
      {
        success: true,
        jobs: result.records || [],
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("GET /api/getJobById error:", err);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
}
