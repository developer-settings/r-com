'use client';

import { CardHeader, CardContent, Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRightIcon, BugIcon } from 'lucide-react';

export default function Error() {
  return (
    <div className='h-screen bg-gray-100 flex items-center justify-center p-4'>
      <Card className='max-w-md mx-auto'>
        <CardHeader>
          <div className='flex items-center space-x-2'>
            <BugIcon className='w-6 h-6 text-red-500' />
            <h2 className='text-xl font-semibold text-gray-700'>
              Error Occurred
            </h2>
          </div>
        </CardHeader>
        <CardContent>
          <p className='text-gray-600 text-center'>
            There was a problem with the employee attendance system. Please try
            again later.
          </p>
        </CardContent>
        <div className='flex items-center justify-center pt-4'>
          <Link className='w-full' href='#'>
            <Button className='w-full bg-blue-500 text-white'>
              <ArrowRightIcon className='mr-2 h-4 w-4' />
              Go Back
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
