import { z } from 'zod';
import {
  datePickerSchema,
  employeeIdSchema,
  employeeSchema,
  profileSchema,
} from './schema';

export type Role = 'EMPLOYEE' | 'MANAGER' | 'SUPERVISOR' | 'EXECUTIVE';

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type CheckOutStatus = 'ON_TIME' | 'EARLY';

export type CheckInStatus = 'ON_TIME' | 'LATE';

export type EmployeeStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export type WorkDayStatus = 'ABSENT' | 'PRESENT';

export type Address = {
  address_id: number;
  street: string;
  city: string;
};

export type ProfileTable = {
  profile_id: number;
  first_name: string;
  last_name: string;
  birth_date: string;
  gender: Gender;
  phone_number: string;
  email: string;
};

export type EmployeeTable = {
  employee_id: number;
  profile_id: number;
  hire_date: Date;
  salary: number;
  department: string;
  job_title: string;
  status: EmployeeStatus;
  start_shift: Date;
  end_shift: Date;
  reports_to?: number;
  role: Role;
};

export type AttendanceTable = {
  attendance_id: number;
  employee_id: number;
  attendance_date: string;
  check_in_time: Date;
  check_out_time: Date;
  check_in_status: CheckInStatus;
  check_out_status: CheckOutStatus;
  work_day_status: WorkDayStatus;
};

export type EmployeeAttendance = {
  employee_id: number;
  first_name: string;
  last_name: string;
  attendance_date: Date;
  check_in_time: string;
  check_out_time: string;
  check_in_status: CheckInStatus;
  check_out_status: CheckOutStatus;
  work_day_status: WorkDayStatus;
};

export type EmployeeProfile = {
  employee_id: number;
  profile_id: number;
  first_name: string;
  last_name: string;
  birth_date: Date;
  gender: Gender;
  phone_number: string;
  email: string;
  hire_date: Date;
  salary: number;
  department: string;
  job_title: string;
  status: EmployeeStatus;
  start_shift: Date;
  end_shift: Date;
  reports_to: number | null;
  role: Role;
};

export type AttendanceReport = {
  employee_id: number;
  first_name: string;
  last_name: string;
  on_time_check_in_count: number;
  late_check_in_count: number;
  on_time_check_out_count: number;
  early_check_out_count: number;
  absent_count: number;
  present_count: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type DatePickerData = z.infer<typeof datePickerSchema>;
export type ProfileData = z.infer<typeof profileSchema>;
export type EmployeeIdData = z.infer<typeof employeeIdSchema>;
export type EmployeeData = z.infer<typeof employeeSchema>;
