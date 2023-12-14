'use client';
import { CheckInStatus, CheckOutStatus } from '@/app/types/definitions';
import { cn } from '@/lib/utils';
import { Source_Code_Pro } from 'next/font/google';
import CheckInStatusBadge from '../management/attendances/components/CheckInStatus';
import CheckOutStatusBadge from '../management/attendances/components/CheckOutStatus';
const code = Source_Code_Pro({ subsets: ['latin'] });

interface CheckInCardProps {
  attendance_date: Date;
  attendance_id: number;
  check_in_status: CheckInStatus;
  first_name: string;
  last_name: string;
}

interface AttendanceProps {
  attendance: CheckInCardProps;
}

export const CheckInSuccessToast = ({ attendance }: AttendanceProps) => {
  return (
    <div>
      <p className={cn(code.className, 'font-bold antialiased mb-1')}>
        {attendance.first_name} {attendance.last_name}
      </p>

      <p className='text-sm font-medium text-gray-500'>
        Check In Successfully !
      </p>
      <CheckInStatusBadge status={attendance.check_in_status} />
    </div>
  );
};

interface CheckOutProps {
  attendance_date: Date;
  attendance_id: number;
  check_out_status: CheckOutStatus;
  first_name: string;
  last_name: string;
}

interface CheckOutCardProps {
  attendance: CheckOutProps;
}

export const CheckOutSuccessToast = ({ attendance }: CheckOutCardProps) => {
  return (
    <div>
      <p className={cn(code.className, 'font-bold antialiased mb-1')}>
        {attendance.first_name} {attendance.last_name}
      </p>

      <p className='text-sm font-medium text-gray-500'>
        Check Out Successfully !
      </p>
      <CheckOutStatusBadge status={attendance.check_out_status} />
    </div>
  );
};
