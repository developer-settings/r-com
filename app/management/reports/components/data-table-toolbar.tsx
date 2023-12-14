'use client';

import { Table } from '@tanstack/react-table';

import { Input } from '@/components/ui/input';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Search for employee...'
          value={
            (table.getColumn('first_name')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('first_name')?.setFilterValue(event.target.value)
          }
          className='h-12 w-[200px] lg:w-[350px] rounded-lg'
        />
      </div>
    </div>
  );
}
