'use client';

interface Analitics {
  total_attendance: string | JSX.Element;
  absences: string | JSX.Element;
  late_arrivals: string | JSX.Element;
  early_departures: string | JSX.Element;
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveBar } from '@nivo/bar';
import { ClockIcon, MinusCircleIcon, UsersIcon } from 'lucide-react';
import RecentActivities from './components/RecentActivities';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Suspense } from 'react';
import LoadingIcon from './components/LoadingIcon';

export function Analitics() {
  const { data, isLoading } = useQuery<Analitics[]>({
    queryKey: ['analitics'],
    queryFn: () =>
      axios.get<Analitics[]>('/api/analitics').then((res) => res.data),
  });

  let analitics: Analitics = {
    total_attendance: isLoading ? <LoadingIcon /> : '',
    absences: isLoading ? <LoadingIcon /> : '',
    late_arrivals: isLoading ? <LoadingIcon /> : '',
    early_departures: isLoading ? <LoadingIcon /> : '',
  };

  if (data !== undefined) {
    analitics = data[0];
  }

  return (
    <div className='flex flex-col w-full '>
      <main className='flex min-h-[calc(80vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 pb-0'>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
              <CardTitle className='text-sm font-medium'>
                Total Attendance
              </CardTitle>
              <UsersIcon className='w-4 h-4 text-gray-500 dark:text-gray-400' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {analitics.total_attendance}
              </div>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                +10.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
              <CardTitle className='text-sm font-medium'>Absences</CardTitle>
              <MinusCircleIcon className='w-4 h-4 text-gray-500 dark:text-gray-400' />
            </CardHeader>
            <CardContent>
              <Suspense fallback={0}>
                <div className='text-2xl font-bold'>{analitics.absences}</div>
              </Suspense>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                +2.2% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
              <CardTitle className='text-sm font-medium'>
                Late Arrivals
              </CardTitle>
              <ClockIcon className='w-4 h-4 text-gray-500 dark:text-gray-400' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {analitics.late_arrivals}
              </div>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                -5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
              <CardTitle className='text-sm font-medium'>
                Early Departures
              </CardTitle>
              <ClockIcon className='w-4 h-4 text-gray-500 dark:text-gray-400' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {analitics.early_departures}
              </div>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                +1.5% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <Card>
            <CardHeader className='pb-2 space-y-0'>
              <CardTitle className='text-sm font-medium'>
                Attendance Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart className='w-full h-[300px]' />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='pb-2 space-y-0'>
              <CardTitle className='text-sm font-medium'>
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RecentActivities />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function BarChart(props: any) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          {
            name: 'Mon',
            data: 111,
          },
          {
            name: 'Tues',
            data: 157,
          },
          {
            name: 'Wed',
            data: 129,
          },
          {
            name: 'Thurs',
            data: 187,
          },
          {
            name: 'Fri',
            data: 119,
          },
          {
            name: 'Sat',
            data: 22,
          },
          {
            name: 'Sun',
            data: 101,
          },
        ]}
        keys={['data']}
        indexBy='name'
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'paired' }}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Day',
          legendPosition: 'middle',
          legendOffset: 45,
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Attendance',
          legendPosition: 'middle',
          legendOffset: -45,
          truncateTickAt: 0,
        }}
        theme={{
          tooltip: {
            container: {
              fontSize: '12px',
            },
          },
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        role='application'
        ariaLabel='A bar chart showing data'
      />
    </div>
  );
}

export const dynamic = 'force-dynamic';

export default Analitics;
