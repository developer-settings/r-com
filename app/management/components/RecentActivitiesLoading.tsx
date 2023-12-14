import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const RecentActivitiesLoading = () => {
  const items = [1, 2, 3, 4, 5];
  return (
    <Table>
      <TableHeader>
        <TableRow className='text-xs'>
          <TableHead>Employee</TableHead>
          <TableHead>Check In</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item}>
            <TableCell>
              <Skeleton className='h-[25px] w-full' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-[25px] w-full' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-[25px] w-full' />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default RecentActivitiesLoading;
