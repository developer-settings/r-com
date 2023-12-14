import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { sort } from 'fast-sort';
import CheckInStatusBadge from '../attendances/components/CheckInStatus';
import { useAttendances } from '../attendances/hook/useAttendances';
import RecentActivitiesLoading from './RecentActivitiesLoading';

const RecentActivities = () => {
  const { data: attendances, isLoading } = useAttendances();

  const sortedActivities = sort(attendances || []).desc(
    (u) => u.attendance_date
  );

  if (isLoading) return <RecentActivitiesLoading />;

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className='text-xs'>
            <TableHead>Employee</TableHead>

            <TableHead>Check In</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='text-xs '>
          {sortedActivities
            .reverse()
            .slice(0, 5)
            .map((attendance) => (
              <TableRow key={attendance.employee_id}>
                <TableCell>{attendance.first_name}</TableCell>
                <TableCell>{attendance.check_in_time}</TableCell>
                <TableCell>
                  <CheckInStatusBadge status={attendance.check_in_status} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default RecentActivities;
