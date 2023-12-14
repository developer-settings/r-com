'use client';

import { Table } from '@tanstack/react-table';

import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './data-table-view-options';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { PlusIcon } from 'lucide-react';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className='flex'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Search for employee...'
          value={
            (table.getColumn('first_name')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('first_name')?.setFilterValue(event.target.value)
          }
          className='w-[220px] lg:w-[440px] rounded-lg'
        />
      </div>
      <div className='flex gap-5'>
        <div className='flex flex-col gap-4'>
          <Link
            className={cn('mt-auto', buttonVariants({ variant: 'outline' }))}
            href='/management/create-employee'>
            <PlusIcon className='h-4 w-4 mr-2' />
            <span>Add New Employee</span>
          </Link>
        </div>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
