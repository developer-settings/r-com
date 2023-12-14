import { notFound } from 'next/navigation';
import { EmployeeProfile } from '../../types/definitions';
import { sql } from '../../utils/query';
import Error from '../error';

export const getEmployees = async () => {
  try {
    const employees: EmployeeProfile[] = await sql`
		SELECT * 
		FROM profiletable
		JOIN employeetable USING (profile_id) `;
    return employees;
  } catch (error) {
    if (error instanceof Error) notFound();
  }
};

export const getEmployee = async (employee_id: number) => {
  try {
    const employees: EmployeeProfile[] = await sql`
        SELECT * 
        FROM profiletable
        JOIN employeetable USING (profile_id)
    WHERE employee_id = ${employee_id} `;
    return employees[0] || null;
  } catch (error: unknown) {
    if (error instanceof Error) notFound();
  }
};
