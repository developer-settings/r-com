'use client';

import { Input } from '@/components/ui/input';

import { EmployeeData } from '@/app/types/definitions';
import { employeeSchema } from '@/app/types/schema';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, useFieldArray, useForm } from 'react-hook-form';

const EmployeeForm = () => {
  const form = useForm<EmployeeData>({
    resolver: zodResolver(employeeSchema),
    // defaultValues: { tr },
    mode: 'onChange',
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log(data);
        })}>
        <FormField
          control={form.control}
          name='job_title'
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </form>
    </Form>
  );
};
export default EmployeeForm;
