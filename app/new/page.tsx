'use client';
import TextGradient from '@/app/components/TextGradient';
import { EmployeeIdData } from '@/app/types/definitions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import ButtonSpinner from './ButtonSpinner';

import { CheckInSuccessToast, CheckOutSuccessToast } from './SuccessCard';
import { useSubmitAttendance } from './hook/useSubmitAttendace';
const TimeCard = dynamic(() => import('./TimeCard'), { ssr: false });

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
            const patchResponse = await axios.patch(
              `/api/attendances/${data.employee_id}`,
              data
            );
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
      <div className='container px-4 md:px-6 flex justify-center items-center h-screen'>
        <div className='absolute top-5 right-20'>
          <TimeCard />
        </div>
        <div className='flex flex-col items-center space-y-4 '>
          <div className='space-y-2 mb-10'>
            <TextGradient classname='text-4xl lg:text-8xl font-black text-center'>
              Employee Attendance
            </TextGradient>
          </div>

          <div className='w-full max-w-sm space-y-2'>
            <form
              className='flex space-x-2 justify-between'
              onSubmit={handleSubmit(handleFormSubmit)}>
              <div>
                <Input
                  className='w-[20rem] flex-2 mb-3'
                  placeholder='Scan your ID or Add it manually'
                  type='number'
                  {...register('employee_id', { valueAsNumber: true })}
                />
                {errors.employee_id && (
                  <p className='text-xs font-medium text-red-600 ml-1'>
                    {/* {errors.employee_id.message} */}
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
      </div>
    </section>
  );
}
