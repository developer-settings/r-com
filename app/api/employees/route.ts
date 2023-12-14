import { employeeSchema } from '@/app/types/schema';
import { sql } from '@/app/utils/query';
import { NextRequest, NextResponse } from 'next/server';
import { generateId } from '../utils';
import dayjs from 'dayjs';

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const validation = employeeSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 }
    );
  }

  try {
    await sql`
	INSERT INTO EmployeeTable (
		employee_id,
		profile_id,
		salary,
		hire_date,
		status,
		department,
		job_title,
		role,
		start_shift,
		end_shift
		)
		VAlUES(
			${generateId()},
			${parseInt(validation.data.profile_id)},
			${parseFloat(validation.data.salary)},
			${dayjs(new Date(validation.data.hire_date)).format('YYYY-MM-DD')},
			${validation.data.status},
			${validation.data.department},
			${validation.data.job_title},
			${validation.data.role},
			${validation.data.start_shift},
			${validation.data.end_shift}
		)
	`;

    return NextResponse.json({ message: 'Employee created' }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to create employee' },
      { status: 500 }
    );
  }
};

export const GET = async (request: NextRequest) => {
  try {
    const reponse = await sql`SELECT * FROM EmployeeTable`;
    return NextResponse.json(reponse, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to fetch employees' },
      { status: 500 }
    );
  }
};
