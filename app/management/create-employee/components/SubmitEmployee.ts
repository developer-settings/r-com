'use client';

import { EmployeeData, ProfileData } from '@/app/types/definitions';
import { toast } from '@/components/ui/use-toast';
import axios, { AxiosError } from 'axios';

export const SubmitEmployee = async (
  data: EmployeeData,
  onSuccess: () => void
) => {
  try {
    const response = await axios.post('/api/employees', data);
    toast({
      title: 'Employee Information',
      description: 'Employee information has been saved successfully.',
    });
    onSuccess();
  } catch (error) {
    if (error instanceof AxiosError) toast({ title: error.message });
  }
};

export const submitProfile = async (
  data: ProfileData,
  onSuccess: () => void
) => {
  try {
    const response = await axios.post('/api/profiles', data);
    toast({
      title: 'Profile Information',
      description: 'Profile information has been saved successfully.',
    });
    onSuccess();
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) toast({ title: error.message });
  }
};
