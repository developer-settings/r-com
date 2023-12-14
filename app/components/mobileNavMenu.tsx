import png from '@/public/next.png';
import { Sun } from 'lucide-react';
import { Ephesis } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import MobileSheet from './Sheet';
import { ColorMode } from './ColorMode';
import { FcEngineering } from 'react-icons/fc';
import { cn } from './utils';

const font = Ephesis({ subsets: ['latin'], weight: '400' });
const mobileNavMenu = () => {
  return (
    <div className='flex items-center mx-5 py-3 gap-5 justify-between'>
      <p
        className={cn(
          `text-3xl font-extrabold`,
          'antialiased',
          font.className
        )}>
        <Link href='/' className='flex gap-2 items-center'>
          <FcEngineering />
          R-com
        </Link>
      </p>
      <div className='flex items-center gap-3'>
        <MobileSheet />
        <ColorMode />
      </div>
    </div>
  );
};

export default mobileNavMenu;
