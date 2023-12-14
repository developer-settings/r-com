'use client';

import axios from 'axios';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { EmployeeAttendance } from '@/app/types/definitions';

interface AttendanceQueryParams {
  from?: Date;
  to?: Date;
}

export const useAttendances = (query?: AttendanceQueryParams) => {
  return useQuery({
    queryKey: query?.from ? ['attendances', query] : ['attendances'],
    queryFn: () =>
      axios
        .get<EmployeeAttendance[]>('/api/attendances', {
          params: {
            to: query?.to,
            from: query?.from,
          },
        })
        .then((res) => res.data),
    placeholderData: keepPreviousData,
  });
};
