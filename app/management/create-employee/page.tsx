'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CreateProfilePage from './components/ProfileForm';

import { EmployeeForm } from './components/EmployeeForm';
import { useState } from 'react';
const EmloyeeProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const handleProfileSubmit = () => {
    setActiveTab('employee');
  };

  return (
    <div>
      <Tabs defaultValue={activeTab} className='mx-10'>
        <TabsList className='mb-5'>
          <TabsTrigger
            value='profile'
            className='text-xs font-medium tracking-wide'>
            Profile Info
          </TabsTrigger>
          <TabsTrigger
            value='employee'
            className='text-xs font-medium tracking-wide'>
            Work Info
          </TabsTrigger>
        </TabsList>
        <TabsContent value='profile'>
          <CreateProfilePage onProfileSubmit={handleProfileSubmit} />
        </TabsContent>
        <TabsContent value='employee'>
          <EmployeeForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default EmloyeeProfilePage;
