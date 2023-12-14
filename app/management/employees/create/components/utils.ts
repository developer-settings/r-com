import { EmployeeStatus, Role } from '@/app/types/definitions';

export const statues: { label: string; value: EmployeeStatus }[] = [
  {
    label: 'Active',
    value: 'ACTIVE',
  },
  {
    label: 'Inactive',
    value: 'INACTIVE',
  },

  {
    label: 'Suspended',
    value: 'SUSPENDED',
  },
];

export const roles: { label: string; value: Role }[] = [
  {
    label: 'Employee',
    value: 'EMPLOYEE',
  },
  {
    label: 'Supervisor',
    value: 'SUPERVISOR',
  },
  {
    label: 'Manager',
    value: 'MANAGER',
  },
  {
    label: 'Executive',
    value: 'EXECUTIVE',
  },
];
