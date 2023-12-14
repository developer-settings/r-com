import { sql } from '@/app/utils/query';
import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);

  let currentDate;
  try {
    const response = await fetch(
      'http://worldtimeapi.org/api/timezone/America/Port-au-Prince'
    );
    const data = await response.json();
    currentDate = dayjs(data.datetime);
  } catch (error) {
    currentDate = dayjs();
  }

  let from = currentDate.subtract(7, 'day').format('YYYY-MM-DD'); // a week ago
  let to = currentDate.format('YYYY-MM-DD');

  if (url.searchParams.get('from')) {
    const fromDate = dayjs(url.searchParams.get('from'));
    if (!fromDate.isValid()) {
      return NextResponse.json({ error: 'Invalid from date' }, { status: 400 });
    }
    from = fromDate.format('YYYY-MM-DD');
  }

  if (url.searchParams.get('to')) {
    const toDate = dayjs(url.searchParams.get('to'));
    if (!toDate.isValid()) {
      return NextResponse.json({ error: 'Invalid to date' }, { status: 400 });
    }
    to = toDate.format('YYYY-MM-DD');
  }

  try {
    const data = await sql`
    SELECT 
    employee_id,
    first_name,
    last_name,
    COUNT(CASE WHEN work_day_status = 'ABSENT' THEN 1 END) AS absent_count,
    COUNT(CASE WHEN check_in_status = 'ON_TIME' THEN 1 END) AS on_time_check_in_count,
    COUNT(CASE WHEN check_in_status = 'LATE' THEN 1 END) AS late_check_in_count,
    COUNT(CASE WHEN check_out_status = 'ON_TIME' THEN 1 END) AS on_time_check_out_count,
    COUNT(CASE WHEN check_out_status = 'EARLY' THEN 1 END) AS early_check_out_count,
    COUNT(CASE WHEN work_day_status = 'PRESENT' THEN 1 END) AS present_count
    FROM ProfileTable
    JOIN EmployeeTable USING (profile_id)
    JOIN AttendanceTable USING (employee_id)
    WHERE attendance_date BETWEEN ${from} AND ${to}
    GROUP BY employee_id, first_name, last_name
    `;
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
};
