import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'sonner';
import Nav from './nav';
import Toast from './components/shared/toast';
import { Suspense } from 'react';
import SessionProvider from 'providers/SessionProvider';
import { ModalProvider } from 'providers/ModalProvider';
import Modal from '@/components/shared/Modal';
import { SharedDataProvider } from 'providers/SharedDataProvider';

export const metadata = {
  title: 'Next.js App Router + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <SessionProvider>
          <ModalProvider>
            <SharedDataProvider>
              <Modal />
              <Toaster
                position="top-right"
                expand={true}
                richColors
                closeButton
              />
              <Suspense>
                <Nav />
              </Suspense>
              {children}
              <Analytics />
              <Toast />
            </SharedDataProvider>
          </ModalProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
