import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
type ProfileProps = {
  profile_id: number;
  full_name: string;
};
export const useProfiles = () => {
  return useQuery({
    queryKey: ['profiles'],
    queryFn: () =>
      axios.get<ProfileProps[]>('/api/profiles').then((res) => res.data),
  });
};
