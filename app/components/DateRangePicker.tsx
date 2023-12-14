'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { DatePickerData } from '../types/definitions';
import { datePickerSchema } from '../types/schema';
import { cn } from '@/lib/utils';

interface DatePickerProps {
  onSubmitForm: (data: DatePickerData) => void;
}

const DateRangerPicker = ({ onSubmitForm }: DatePickerProps) => {
  const form = useForm<DatePickerData>({
    resolver: zodResolver(datePickerSchema),
  });

  return (
    <div>
      <Form {...form}>
        <form
          className='flex gap-3'
          onSubmit={form.handleSubmit((data) => {
            onSubmitForm(data);
          })}>
          <FormField
            control={form.control}
            name='range'
            render={({ field }) => (
              <FormItem>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        id='date'
                        variant={'outline'}
                        className={cn(
                          'w-[300px] justify-start text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}>
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {field.value?.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, 'LLL dd, y')} -{' '}
                              {format(field.value.to, 'LLL dd, y')}
                            </>
                          ) : (
                            format(field.value.from, 'LLL dd, y')
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0  mx-5' align='start'>
                    <Calendar
                      initialFocus
                      mode='range'
                      defaultMonth={field.value?.from}
                      selected={field.value}
                      onSelect={field.onChange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <Button disabled={!form.formState.isValid} type='submit'>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default DateRangerPicker;
