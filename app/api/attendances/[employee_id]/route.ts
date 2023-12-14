import { employeeIdSchema } from '@/app/types/schema';
import { sql } from '@/app/utils/query';
import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: { employee_id: string };
}

export const PATCH = async (
  request: NextRequest,
  { params: { employee_id } }: Props
) => {
  const body = await request.json();
  try {
    const validation = employeeIdSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    const employee =
      await sql`SELECT EXISTS(SELECT 1 FROM EmployeeTable WHERE employee_id = ${validation.data.employee_id})`;
    if (!employee[0].exists) {
      return NextResponse.json(
        { message: 'Employee does not exist' },
        { status: 400 }
      );
    }

    try {
      const response = await fetch(
        'http://worldtimeapi.org/api/timezone/America/Port-au-Prince'
      );
      const data = await response.json();
      const currentDateTime = data.datetime;
      const currentDate = dayjs(currentDateTime).format('YYYY-MM-DD');
      const attendance =
        await sql`SELECT EXISTS(SELECT 1 FROM AttendanceTable WHERE employee_id = ${validation.data.employee_id} AND attendance_date = ${currentDate})`;
      if (attendance[0].exists) {
        // check if employee has already checked out
        const checkOut =
          await sql`SELECT EXISTS(SELECT 1 FROM AttendanceTable WHERE employee_id = ${validation.data.employee_id} AND attendance_date = ${currentDate} AND check_out_time IS NOT NULL)`;
        if (checkOut[0].exists) {
          return NextResponse.json(
            {
              message: `You've already Ckecked in & Checked Out!`,
              isCheckOut: true,
            },
            { status: 400 }
          );
        } else {
          const currentTime = dayjs(currentDateTime).format('HH:mm:ss');
          const employeeData =
            await sql`SELECT end_shift FROM EmployeeTable WHERE employee_id = ${validation.data.employee_id}`;
          const employeeShift = employeeData[0].end_shift;

          let checkOutStatus;
          if (employeeShift > currentTime) {
            checkOutStatus = 'EARLY';
          } else {
            checkOutStatus = 'ON_TIME';
          }

          await sql`UPDATE AttendanceTable 
			SET 
			  check_out_time = ${currentTime},
			  check_out_status = ${checkOutStatus},
        work_day_status = 'PRESENT'
			WHERE employee_id = ${validation.data.employee_id} AND attendance_date = ${currentDate}`;

          const newAttendance = await sql`
			SELECT 
			  att.attendance_id,
			  pf.first_name,
			  pf.last_name,
			  att.check_out_time,
			  att.check_out_status,
			  att.attendance_date
			FROM 
			  AttendanceTable att
			JOIN 
			  EmployeeTable em USING (employee_id)
			JOIN 
			  ProfileTable pf USING (profile_id)
			WHERE 
			  em.employee_id = ${validation.data.employee_id} 
			ORDER BY 
			  att.attendance_date DESC 
			LIMIT 1`;

          return NextResponse.json(
            {
              message: 'Attendance record Updated',
              attendance: newAttendance[0],
            },
            { status: 200 }
          );
        }
      }
      return NextResponse.json(
        { message: 'No attendance record for today' },
        { status: 404 }
      );
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to update attendance' },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to find attendance' },
      { status: 500 }
    );
  }
};
