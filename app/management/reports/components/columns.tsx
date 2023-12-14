'use client';

import { AttendanceReport } from '@/app/types/definitions';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';

export const columns: ColumnDef<AttendanceReport>[] = [
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
    accessorKey: 'first_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='First Name' />
    ),
    cell: ({ row }) => {
      const time: Date = row.getValue('first_name');
      return (
        <div className='flex space-x-2'>
          <span>{time.toString()}</span>
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
      const time: Date = row.getValue('last_name');
      return (
        <div className='flex space-x-2'>
          <span>{time.toString()}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'on_time_check_in_count',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='On Time Count' />
    ),
    cell: ({ row }) => {
      const count: string = row.getValue('on_time_check_in_count');
      return (
        <div className='flex space-x-2'>
          <span>{count}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'late_check_in_count',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Late Count' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          {row.getValue('late_check_in_count')}
        </div>
      );
    },
  },
  {
    accessorKey: 'early_check_out_count',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Early Ckeck out Count' />
    ),
    cell: ({ row }) => {
      const time: Date = row.getValue('early_check_out_count');
      return (
        <div className='flex space-x-2'>
          <span>{time.toString()}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'absent_count',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Absent Count' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>{row.getValue('absent_count')}</div>
      );
    },
  },
];
