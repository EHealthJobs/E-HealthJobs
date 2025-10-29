'use server';

import { NextResponse } from 'next/server';
import pool from '../../../lib/db';
import bcrypt from 'bcrypt';


export async function GET(req) {
  try {
   
    const client = await pool.connect();

      
      const check = await client.query('SELECT *,hospitals.name FROM job_board join hospitals on job_board.hospital_id=hospitals.id');

      console.log(
        "check-0>",check
      );
      
      if (check.rows.length > 0) {
        return NextResponse.json(
          { success: true, result: check.rows },
          { status: 200 }
        );
      }


  } catch (err) {
    console.error('Signup error:', err);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error',error:err },
      { status: 500 }
    );
  }
}
