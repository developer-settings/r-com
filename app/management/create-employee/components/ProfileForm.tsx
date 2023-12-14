'use client';

import { ProfileData } from '@/app/types/definitions';
import { profileSchema } from '@/app/types/schema';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { submitProfile } from './SubmitEmployee';
import { useState } from 'react';
import LoadingIcon from '../../components/LoadingIcon';

type ProfileFormProps = {
  onProfileSubmit: () => void;
};
const defaultValues: Partial<ProfileData> = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  birthDate: '',
  gender: 'MALE',
};

const ProfileForm = ({ onProfileSubmit }: ProfileFormProps) => {
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);

  const genders = [
    { label: 'Male', value: 'MALE' },
    { label: 'Female', value: 'FEMALE' },
    { label: 'Other', value: 'OTHER' },
  ];

  const form = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });
  return (
    <Form {...form}>
      <form
        className='space-y-8'
        onSubmit={form.handleSubmit((data) => {
          setSubmitting(true);
          submitProfile(data, () => {
            onProfileSubmit();
            form.reset(defaultValues);
            router.refresh();
            setSubmitting(false);
          });
        })}>
        <div className='grid grid-cols-2 gap-5'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Firt name' {...field} />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Last name' {...field} />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-2 gap-5'>
          <FormField
            name='gender'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder='Gender' />
                    </SelectTrigger>
                    <SelectContent>
                      {genders.map((gender) => (
                        <SelectItem key={gender.value} value={gender.value}>
                          {gender.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='birthDate'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Birth Date' {...field} type='date' />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-2 gap-5'>
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>Phone</FormLabel>
                <FormControl>
                  <Input placeholder='44183344' {...field} type='text' />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>Email</FormLabel>
                <FormControl>
                  <Input placeholder='rcom@gmail.com' {...field} type='email' />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
        </div>

        <Button type='submit' variant='outline'>
          {submitting ? (
            <span className='flex justify-between items-center gap-2'>
              <LoadingIcon /> Submitting
            </span>
          ) : (
            'Submit Profile'
          )}
        </Button>
      </form>
    </Form>
  );
};
export default ProfileForm;
