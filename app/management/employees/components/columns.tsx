'use client';

import RoleStatusBadge from '@/app/components/RoleStatusBadge';
import { EmployeeProfile, Role } from '@/app/types/definitions';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<EmployeeProfile>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'employee_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Employee ID' />
    ),
    cell: ({ row }) => <div>{row.getValue('employee_id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'first_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='First Name' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span>{row.getValue('first_name')}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'last_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Last Name' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span>{row.getValue('last_name')}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'gender',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Gender' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span>{row.getValue('gender') === 'MALE' ? 'Male' : 'Female'}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'phone_number',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Phone Number' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span>{row.getValue('phone_number')}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Role' />
    ),
    cell: ({ row }) => {
      const role: Role = row.getValue('role');
      return (
        <div className='flex space-x-2'>
          <RoleStatusBadge role={role} />
        </div>
      );
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => (
      <DataTableRowActions employee_id={row.getValue('employee_id')} />
    ),
  },
];
