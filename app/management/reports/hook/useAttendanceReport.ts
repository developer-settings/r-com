'use client';

import { AttendanceReport } from '@/app/types/definitions';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
interface AttendanceQueryParams {
  from?: Date;
  to?: Date;
}
export const useAttendanceReport = (query?: AttendanceQueryParams) => {
  return useQuery({
    queryKey: query?.from ? ['reports', query] : ['reports'],
    queryFn: () =>
      axios
        .get<AttendanceReport[]>('/api/reports', {
          params: {
            to: query?.to,
            from: query?.from,
          },
        })
        .then((res) => res.data),
    staleTime: 1000 * 60 * 60,
  });
};
