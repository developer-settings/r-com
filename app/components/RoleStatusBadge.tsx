import { Badge } from '@/components/ui/badge';
import { Role } from '../types/definitions';
import { cn } from '@/lib/utils';

interface RoleStatusBadgeProps {
  role: Role;
}

const RoleStatusBadge = ({ role }: RoleStatusBadgeProps) => {
  const variants =
    role === 'EMPLOYEE'
      ? 'bg-blue-500'
      : role === 'MANAGER'
      ? 'bg-green-500'
      : role === 'SUPERVISOR'
      ? 'bg-purple-500'
      : 'bg-gray-500';
  return (
    <Badge
      className={cn(
        variants,
        'text-xs font-normal rounded-sm tracking-wide cursor-pointer'
      )}>
      {role === 'EMPLOYEE'
        ? 'Employee'
        : role === 'MANAGER'
        ? 'Manager'
        : role === 'SUPERVISOR'
        ? 'Supervisor'
        : 'Executive'}
    </Badge>
  );
};
export default RoleStatusBadge;
