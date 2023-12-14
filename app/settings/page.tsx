import { Separator } from '@/components/ui/separator';
import { AppearanceForm } from './AppearanceForm';

export default function SettingsAppearancePage() {
  return (
    <div className='max-w-screen-lg mx-auto mt-10 space-y-6 p-10 shadow-md'>
      <div>
        <h3 className='text-lg font-medium'>Appearance</h3>
        <p className='text-sm text-muted-foreground'>
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>
      <Separator />
      <AppearanceForm />
    </div>
  );
}
