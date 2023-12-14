import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { EmployeeStatus } from '../types/definitions';

interface EmployeeStatusBadgeProps {
  status: EmployeeStatus;
}

const EmployeeStatusBadge = ({ status }: EmployeeStatusBadgeProps) => {
  const variants =
    status === 'ACTIVE'
      ? 'bg-green-500'
      : status === 'INACTIVE'
      ? 'bg-red-600'
      : 'bg-yellow-500';

  return (
    <Badge
      className={cn(variants, 'rounded-sm text-xs font-normal tracking-wide')}>
      {status === 'ACTIVE'
        ? 'Active'
        : status === 'INACTIVE'
        ? 'Inactive'
        : 'Suspended'}
    </Badge>
  );
};
export default EmployeeStatusBadge;
