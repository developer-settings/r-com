import { profileSchema } from '@/app/types/schema';
import { sql } from '@/app/utils/query';
import { NextRequest, NextResponse } from 'next/server';
import { generateId } from '../utils';

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  // if (body.birthDate) {
  //   body.birthDate = new Date(body.birthDate);
  // }

  const validation = profileSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 }
    );
  }

  try {
    await sql`INSERT INTO ProfileTable
	(profile_id, first_name, last_name, birth_date, gender, phone_number, email)
	VALUES(
	  ${generateId()},
	  ${validation.data.firstName},
	  ${validation.data.lastName},
	  ${validation.data.birthDate},
	  ${validation.data.gender},
	  ${validation.data.phone},
	  ${validation.data.email}
	)`;
    return NextResponse.json({ message: 'Profile created' }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to create profile' },
      { status: 500 }
    );
  }
};

export const GET = async (request: NextRequest) => {
  try {
    const profiles =
      await sql`SELECT ProfileTable.profile_id,  CONCAT(First_name,' ', last_name) AS full_name FROM ProfileTable  LEFT JOIN EmployeeTable  ON ProfileTable.profile_id = EmployeeTable.profile_id WHERE employee_id IS NULL`;
    return NextResponse.json(profiles);
  } catch (error) {}
};
