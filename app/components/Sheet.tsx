'use client';

import { Ephesis } from 'next/font/google';
const font = Ephesis({ subsets: ['latin'], weight: '400' });

import classnames from 'classnames';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { FcEngineering } from 'react-icons/fc';
import { navLinks } from './links';
import { cn } from './utils';

const MobileSheet = () => {
  const currentPath = usePathname();

  return (
    <Sheet>
      <SheetTrigger>
        <div className=' text-center'>
          <Menu />
        </div>
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
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
          <SheetDescription className='text-left'>
            <ul className='flex flex-col justify-start'>
              {navLinks.map((link) => (
                <li
                  className={classnames({
                    'font-medium text-sm tracking-wide text-gray-600 mx-3 my-2 transition-colors hover:text-blue-300':
                      true,
                    'text-blue-400': currentPath === link.path,
                  })}
                  key={link.id}>
                  <Link href={link.path}> {link.label}</Link>
                </li>
              ))}
            </ul>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSheet;
