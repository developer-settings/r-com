import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';

import './globals.css';

import ReactQueryProvider from './providers/ReactQueryProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './providers/ThemeProvider';
import NavBar from './components/NavBar';
import { Toaster } from '@/components/ui/toaster';
import { cn } from './components/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Renel Communication | Home',
  description: 'Renel Commucation Internal webApp',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={cn(GeistSans.className, 'antialiased')}>
        <ThemeProvider attribute='class' defaultTheme='light'>
          <ReactQueryProvider>
            <NavBar />
            {children}
            <Toaster />
            <ToastContainer position='top-left' />
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
