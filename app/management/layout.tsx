import { PropsWithChildren } from 'react';
import SideNav from './components/SideNav';

const ManagementLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex w-screen relative gap-1'>
      <SideNav />
      <main className='flex-1 overflow-hidden m-2 md:mr-10 mt-10'>
        {children}
      </main>
    </div>
  );
};
export default ManagementLayout;
