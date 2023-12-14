import { CheckInStatus } from '@/app/types/definitions';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CheckInStatusProps {
  status: CheckInStatus;
}

const CheckInStatusBadge = ({ status }: CheckInStatusProps) => {
  const variant = status === 'ON_TIME' ? 'bg-green-500' : 'bg-red-500';
  return (
    <Badge
      className={cn(
        variant,
        'rounded-sm text-xs text-white font-normal whitespace-nowrap '
      )}>
      {status === 'ON_TIME' ? 'On Time' : 'Late'}
    </Badge>
  );
};
export default CheckInStatusBadge;
