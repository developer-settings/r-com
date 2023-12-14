import { Ephesis } from 'next/font/google';
import DesktopNavMenu from './DesktopNavMenu';
import MobileNavMenu from './mobileNavMenu';

const e = Ephesis({ subsets: ['latin'], weight: '400' });

const NavBar = () => {
  return (
    <div className='shadow-sm'>
      <div className='hidden md:block'>
        <DesktopNavMenu />
      </div>
      <div className='md:hidden'>
        <MobileNavMenu />
      </div>
    </div>
  );
};

export default NavBar;
