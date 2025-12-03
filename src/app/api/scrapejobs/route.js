'use server';
import { NextResponse } from 'next/server';
import { buildFetchURL, commonApiCallingMethod, totalCountQuery } from '../../../lib/salesforceApi';
import { off } from 'process';

export async function GET(req) {

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const offset = (page - 1) * limit;

    const search = searchParams.get('search') || '';
    const location = searchParams.get('location') || '';
    const type = searchParams.get('type') || '';

    // Build dynamic filters
    let conditions = [];

    if (search) {
      conditions.push(`Name LIKE '%${search}%'`);
    }

    // if (location && location !== 'all') {
    //   values.push(`%${location}%`);
    //   conditions.push(`job_board.location ILIKE $${values.length}`);
    // }

    // if (type && type !== 'all') {
    //   values.push(type);
    //   conditions.push(`job_board.type = $${values.length}`);
    // }

    const jobQuery = buildFetchURL(conditions, limit, offset);
    console.log("Salesforce Job Query:", jobQuery);
    const salesforceJobsResponse = await commonApiCallingMethod(jobQuery);
    // console.log("Salesforce Jobs Response:", salesforceJobsResponse);
    const totalCountQueryStr = totalCountQuery();
    const totalCountResponse = await commonApiCallingMethod(totalCountQueryStr);
    const totalRecords = totalCountResponse.totalSize;
    console.log("Total Salesforce Jobs from count query:", totalRecords);  

    return NextResponse.json(
      {
        success: true,
        jobs: salesforceJobsResponse.records || [],
        total: totalRecords,
        page,
        limit
      },
      { status: 200 }
    );

  } catch (err) {
    console.error('GET /api/jobs error:', err);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error', error: err.message },
      { status: 500 }
    );
  }
}
