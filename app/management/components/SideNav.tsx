'use client';

import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import classnames from 'classnames';
import { LayoutDashboardIcon, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import { linkItems } from './links';

const style = `
flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 hover:bg-gray-200 dark:hover:bg-gray-700
`;

export default function SideNav() {
  const { data: employees, isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: () => axios.get('/api/employees').then((res) => res.data),
  });
  const currentPath = usePathname();
  return (
    <div className='min-h-[90vh] flex max-w-[15rem] shadow-sm m-1 rounded-sm'>
      <div className='w-[280px] h-[90vh] dark:text-white p-4 overflow-auto flex flex-col justify-between  rounded '>
        <div className='flex flex-col gap-4'>
          <Link href='/management' className={cn(style)}>
            <LayoutDashboardIcon className='h-6 w-6' />
            <span>Dashboard</span>
          </Link>

          {linkItems.map((item) => (
            <Link
              key={item.value}
              href={item.value}
              className={classnames(style, {
                'dark:bg-white text-white bg-black': currentPath === item.value,
              })}>
              {item.label === 'Employees' ? (
                <Fragment>
                  <item.icon className='h-6 w-4' />
                  <span>{item.label}</span>
                  <Badge className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'>
                    {isLoading ? '...' : null}
                    {employees?.length}
                  </Badge>
                </Fragment>
              ) : (
                <Fragment>
                  <item.icon className='h-6 w-4' />
                  <span>{item.label}</span>
                </Fragment>
              )}
            </Link>
          ))}
        </div>
      </div>

      <div className='flex-grow' />
    </div>
  );
}

export const dynamic = 'force-dynamic';
