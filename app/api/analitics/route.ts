import { sql } from '@/app/utils/query';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (resquest: NextRequest) => {
  try {
    const response = await sql`
	SELECT 
	  Count(*) AS total_attendance,
    COUNT(CASE WHEN check_in_status = 'LATE' THEN 1 END) AS late_arrivals,
    COUNT(CASE WHEN check_out_status = 'EARLY' THEN 1 END) AS early_departures,
    COUNT(CASE WHEN work_day_status = 'ABSENT' THEN 1 END) AS absences
    FROM AttendanceTable 
	`;
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
};
