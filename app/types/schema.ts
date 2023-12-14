import { z } from 'zod';

export const datePickerSchema = z.object({
  range: z.object({
    to: z.date({ required_error: 'start date is required' }),
    from: z.date({ required_error: 'end date is required' }),
  }),
});

export const profileSchema = z.object({
  firstName: z
    .string({ required_error: 'First name is required' })
    .min(3, { message: 'first name should be atleast 3 characters' })
    .max(50, { message: 'first name should be less than 50 characters' }),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .min(3, { message: 'last name should be atleast 3 characters' })
    .max(50, { message: 'last name should be less than 50 characters' }),
  birthDate: z.string({ required_error: 'Birth date is required' }),
  gender: z.enum(['FEMALE', 'MALE', 'OTHER'], {
    errorMap: () => {
      return { message: 'Please select a gender' };
    },
  }),
  phone: z
    .string({ required_error: 'Phone Number is required' })
    .min(8, { message: 'phone number is not valid' }),
  email: z
    .string({ required_error: 'Email is Required' })
    .min(10, { message: 'This is not a valid email' }),
});

export const employeeIdSchema = z.object({
  employee_id: z.number({ required_error: 'employee id is required' }),
});

export const employeeSchema = z.object({
  profile_id: z.string({ required_error: 'Profile Is required' }),
  hire_date: z.string({ required_error: 'hire date is required' }),
  salary: z.string({ required_error: 'salary is required' }),
  department: z.string({ required_error: 'department is required' }),
  job_title: z.string({ required_error: 'job title is required' }),
  status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED'], {
    errorMap: () => {
      return { message: 'Please select a status' };
    },
  }),
  start_shift: z.string({ required_error: 'start shift is required' }),
  end_shift: z.string({ required_error: 'end shift is required' }),
  role: z.enum(['EMPLOYEE', 'MANAGER', 'SUPERVISOR', 'EXECUTIVE'], {
    errorMap: () => {
      return { message: 'Please select a role' };
    },
  }),
});
