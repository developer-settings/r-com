import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import TextGradient from '@/app/components/TextGradient';
import dayjs from 'dayjs';

const TimeCard = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const fetchDateTime = async () => {
    try {
      const response = await axios.get(
        'http://worldtimeapi.org/api/timezone/America/Port-au-Prince'
      );
      setCurrentDateTime(new Date(response.data.datetime));
    } catch (error) {
      console.error('Failed to fetch date and time:', error);
    }
  };

  useEffect(() => {
    fetchDateTime();
    const timer = setInterval(fetchDateTime, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <Card className='w-[20rem]'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-md font-bold text-gray-500'>
            {dayjs(currentDateTime).format('dddd, DD MMMM YYYY')}
          </CardTitle>
        </CardHeader>
        <CardContent className='text-2xl font-medium text-blue-300'>
          <TextGradient classname='text-4xl lg:text-4xl font-black text-center'>
            {dayjs(currentDateTime).format('hh:mm:ss a')}
          </TextGradient>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeCard;
