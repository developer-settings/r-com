import { CheckOutStatus } from '@/app/types/definitions';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CheckOutStatusBadgeProps {
  status: CheckOutStatus | undefined;
}

const CheckOutStatusBadge = ({ status }: CheckOutStatusBadgeProps) => {
  const variant =
    status === 'ON_TIME'
      ? 'bg-green-500'
      : status === 'EARLY'
      ? 'bg-red-500'
      : 'bg-yellow-400';
  return (
    <Badge className={cn(variant, 'rounded-sm text-xs text-white font-normal')}>
      {status === 'ON_TIME' ? 'On time' : status === 'EARLY' ? 'Early' : 'TBD'}
    </Badge>
  );
};
export default CheckOutStatusBadge;
