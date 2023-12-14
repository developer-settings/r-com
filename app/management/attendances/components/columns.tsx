'use client';

import { EmployeeAttendance } from '@/app/types/definitions';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';

import CheckInStatusBadge from './CheckInStatus';
import CheckOutStatusBadge from './CheckOutStatus';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import WorkDayStatus from './WorkDayStatus';

export const columns: ColumnDef<EmployeeAttendance>[] = [
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

  // {
  //   accessorKey: 'employee_id',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Employee ID' />
  //   ),
  //   cell: ({ row }) => <div>{row.getValue('employee_id')}</div>,
  //   enableSorting: false,
  //   enableHiding: false,
  // },

  {
    accessorKey: 'first_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='First Name' />
    ),
  },
  {
    accessorKey: 'last_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Last Name' />
    ),
  },
  {
    accessorKey: 'check_in_time',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Check In' />
    ),
  },
  {
    accessorKey: 'check_in_status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Check In Status' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <CheckInStatusBadge status={row.getValue('check_in_status')} />
        </div>
      );
    },
  },
  {
    accessorKey: 'check_out_time',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Check Out' />
    ),
    cell: ({ row }) => {
      const time: string = row.getValue('check_out_time');
      return (
        <div className='flex space-x-2'>
          <span>{time ? time : '00:00:00'}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'check_out_status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Check Out Status' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <CheckOutStatusBadge status={row.getValue('check_out_status')} />
        </div>
      );
    },
  },
  {
    accessorKey: 'work_day_status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Day Status' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <WorkDayStatus status={row.getValue('work_day_status')} />
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
