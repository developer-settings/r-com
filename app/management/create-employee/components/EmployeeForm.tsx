'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { EmployeeData } from '@/app/types/definitions';
import { employeeSchema } from '@/app/types/schema';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { roles, statues } from '../../employees/create/components/utils';

import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { useProfiles } from './hook/useProfiles';
import { SubmitEmployee } from './SubmitEmployee';

const defaultValues: Partial<EmployeeData> = {};

export function EmployeeForm() {
  const router = useRouter();

  const { data: profiles, isLoading } = useProfiles();

  const form = useForm<EmployeeData>({
    resolver: zodResolver(employeeSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          SubmitEmployee(data, () => {
            form.reset();
            router.push('/management/employees');
          });
        })}
        className='space-y-8'>
        <div>
          <FormField
            control={form.control}
            name='profile_id'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        role='combobox'
                        className={cn(
                          'w-[300px] justify-between',
                          !field.value && 'text-muted-foreground'
                        )}>
                        {field.value
                          ? profiles?.find(
                              (profile) =>
                                String(profile.profile_id) === field.value
                            )?.full_name
                          : 'Select Profile'}
                        <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-[300px] p-0'>
                    <Command>
                      <CommandInput placeholder='Search Profiles...' />
                      {isLoading && (
                        <>
                          <Skeleton className='w-[280px] h-[25px] m-2' />
                          <Skeleton className='w-[280px] h-[25px] m-2' />
                          <Skeleton className='w-[280px] h-[25px] m-2' />
                        </>
                      )}
                      <CommandEmpty>No Profiles found.</CommandEmpty>
                      <CommandGroup>
                        {profiles?.map((profile) => (
                          <CommandItem
                            value={profile.full_name}
                            key={profile.profile_id}
                            onSelect={() => {
                              form.setValue(
                                'profile_id',
                                String(profile.profile_id)
                              );
                            }}>
                            <CheckIcon
                              className={cn(
                                'mr-2 h-4 w-4',
                                String(profile.profile_id) === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {profile.full_name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>

                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
        </div>
        <div className='grid grid-cols-2 gap-5'>
          <FormField
            control={form.control}
            name='job_title'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Job Title' {...field} />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='department'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Department' {...field} />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-2 gap-5'>
          <FormField
            name='role'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder='Role' />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
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
            name='status'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder='Status' />
                    </SelectTrigger>
                    <SelectContent>
                      {statues.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-2 gap-5'>
          <FormField
            control={form.control}
            name='salary'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>Salary</FormLabel>
                <FormControl>
                  <Input placeholder='Salary' {...field} type='number' />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='hire_date'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>Hire Date</FormLabel>
                <FormControl>
                  <Input placeholder='Hire Date' {...field} type='date' />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-2 gap-5'>
          <FormField
            control={form.control}
            name='start_shift'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>Start Shift</FormLabel>
                <FormControl>
                  <Input placeholder='Salary' {...field} type='time' />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='end_shift'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>End Shift</FormLabel>
                <FormControl>
                  <Input {...field} type='time' />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
        </div>

        <Button type='submit' variant='outline'>
          Create Employee
        </Button>
      </form>
    </Form>
  );
}
