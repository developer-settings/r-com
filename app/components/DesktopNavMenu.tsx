'use client';
import classnames from 'classnames';
import { Ephesis } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FcEngineering } from 'react-icons/fc';
import { ColorMode } from './ColorMode';
import { navLinks } from './links';

import { SearchTask } from './Search';
import { cn } from './utils';

const e = Ephesis({ subsets: ['latin'], weight: '400' });

const DesktopNavMenu = () => {
  const currentPath = usePathname();

  return (
    <div className='flex items-center justify-between px-10'>
      <div className='flex gap-6 items-center h-[4rem] text-center'>
        <p
          className={cn(`text-3xl font-extrabold`, 'antialiased', e.className)}>
          <Link href='/' className='flex gap-1 items-center'>
            <FcEngineering />
            R-com
          </Link>
        </p>
        <ul className='flex items-center'>
          {navLinks.map((link) => (
            <li
              className={classnames({
                'font-medium text-sm tracking-wide text-gray-600 mx-3 transition-colors hover:text-blue-300':
                  true,
                'text-blue-400': currentPath === link.path,
              })}
              key={link.id}>
              <Link href={link.path}> {link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex gap-5 items-center'>
        <SearchTask />
        <ColorMode />
      </div>
    </div>
  );
};

export default DesktopNavMenu;
