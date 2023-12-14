'use client';

import { flexRender } from '@tanstack/react-table';

import DateRangerPicker from '@/app/components/DateRangePicker';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import { DataTablePagination } from './data-table-pagination';
import { useAttendances } from '../hook/useAttendances';
import useTableFilter from '../hook/useTableFilter';
import { columns } from './columns';
import { DataTableToolbar } from './data-table-toolbar';
import AttendanceLoadingPage from '../loading';
export function DataTable() {
  const [to, setTo] = useState<Date>();
  const [from, setFrom] = useState<Date>();

  const { data, isLoading } = useAttendances({ to, from });

  const { table } = useTableFilter({
    columns: columns,
    data: data !== undefined ? data : [],
  });

  if (isLoading) {
    return <AttendanceLoadingPage />;
  }

  return (
    <section>
      <div className='flex my-5 justify-between'>
        <DataTableToolbar table={table} />
        <DateRangerPicker
          onSubmitForm={({ range }) => {
            setFrom(range.from);
            setTo(range.to);
          }}
        />
      </div>

      <Table className='border rounded-md mb-5'>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className=' whitespace-nowrap text-xs'>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className='text-xs'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />
    </section>
  );
}
