'use server';

import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function GET(req) {
  const client = await pool.connect();

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
    let values = [];

    if (search) {
      values.push(`%${search}%`);
      conditions.push(`(job_board.title ILIKE $${values.length} OR hospitals.name ILIKE $${values.length})`);
    }

    if (location && location !== 'all') {
      values.push(`%${location}%`);
      conditions.push(`job_board.location ILIKE $${values.length}`);
    }

    if (type && type !== 'all') {
      values.push(type);
      conditions.push(`job_board.type = $${values.length}`);
    }

    let whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Fetch data with pagination
    const query = `
      SELECT job_board.*, hospitals.name AS hospital_name
      FROM job_board
      JOIN hospitals ON job_board.hospital_id = hospitals.id
      ${whereClause}
      ORDER BY job_board.created_at ASC
      LIMIT ${limit} OFFSET ${offset};
    `;

    const countQuery = `
      SELECT COUNT(*) AS total
      FROM job_board
      JOIN hospitals ON job_board.hospital_id = hospitals.id
      ${whereClause};
    `;

    const [result, countResult] = await Promise.all([
      client.query(query, values),
      client.query(countQuery, values),
    ]);

    return NextResponse.json(
      {
        success: true,
        jobs: result.rows,
        total: parseInt(countResult.rows[0].total),
        page,
        limit,
      },
      { status: 200 }
    );

  } catch (err) {
    console.error('GET /api/jobs error:', err);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error', error: err.message },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
