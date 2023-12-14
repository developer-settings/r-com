import { EmployeeIdData } from '@/app/types/definitions';
import { employeeIdSchema } from '@/app/types/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const useSubmitAttendance = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeIdData>({
    resolver: zodResolver(employeeIdSchema),
  });

  return { register, handleSubmit, errors, reset };
};
