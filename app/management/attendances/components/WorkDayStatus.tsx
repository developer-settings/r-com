import { WorkDayStatus } from '@/app/types/definitions';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface WorkDayStatusProps {
  status: WorkDayStatus | undefined;
}

const WorkDayStatus = ({ status }: WorkDayStatusProps) => {
  const variant =
    status === 'PRESENT'
      ? 'bg-green-500'
      : status === 'ABSENT'
      ? 'bg-red-500'
      : 'bg-yellow-400';
  return (
    <Badge className={cn(variant, 'text-xs text-white rounded-sm font-normal')}>
      {status === 'PRESENT'
        ? 'Present'
        : status === 'ABSENT'
        ? 'Absent'
        : 'TBD'}
    </Badge>
  );
};
export default WorkDayStatus;
