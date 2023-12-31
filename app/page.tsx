'use client';
import TextGradient from '@/app/components/TextGradient';
import { EmployeeIdData } from '@/app/types/definitions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import ButtonSpinner from './new/ButtonSpinner';
import { CheckInSuccessToast, CheckOutSuccessToast } from './new/SuccessCard';
import { useSubmitAttendance } from './new/hook/useSubmitAttendace';

const TimeCard = dynamic(() => import('./new/TimeCard'), { ssr: false });

export default function Component() {
  const [loading, setLoading] = useState(false);

  const { handleSubmit, register, reset, errors } = useSubmitAttendance();

  const handleFormSubmit = async (data: EmployeeIdData) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/attendances/', data);

      if (response.status === 201) {
        if (response.data.attendance.first_name) {
          setLoading(false);
          reset();
          toast.success(
            <CheckInSuccessToast attendance={response.data.attendance} />
          );
        }
      }
    } catch (error: unknown) {
      setLoading(false);

      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          try {
            setLoading(true);
            const patchResponse = await axios.patch(
              `/api/attendances/${data.employee_id}`,
              data
            );
            setLoading(false);
            reset();
            toast.success(
              <CheckOutSuccessToast
                attendance={patchResponse.data.attendance}
              />
            );
          } catch (error: unknown) {
            if (error instanceof AxiosError) {
              if (error.response?.status === 400) {
                toast.error(error.response.data.message);
              }
            }
          }
        }
        if (error.response?.status === 400) {
          toast.error(error.response.data.message);
          console.log(error.response.data.message);
        }
      }
    }
  };
  return (
    <section className='w-full relative'>
      <div className='container px-4 md:px-6 flex justify-center items-center h-[90vh]'>
        <div className='absolute top-5 right-30 md:right-20'>
          <TimeCard />
        </div>
        <div className='flex flex-col items-center space-y-4 '>
          <div className='space-y-2 mb-10'>
            <TextGradient classname='text-3xl lg:text-7xl xl:text-8xl font-black text-center'>
              Employee Attendance
            </TextGradient>
          </div>

          <form
            className='flex space-x-2 justify-between max-w-[20rem] mx-auto'
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <div>
              <Input
                className='w-[10rem] md:w-[20rem] flex-2 mb-3'
                placeholder='Scan your ID or Add it manually'
                type='number'
                {...register('employee_id', { valueAsNumber: true })}
              />
              {errors.employee_id && (
                <p className='text-xs font-medium text-red-600 ml-1'>
                  Employee ID is required
                </p>
              )}
            </div>
            <Button type='submit'>
              {loading && <ButtonSpinner />} Check In
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export const revalidate = 1;
