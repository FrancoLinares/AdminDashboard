import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import Nav from './nav';
import Toast from './components/shared/toast';
import { Suspense } from 'react';
import SessionProvider from 'providers/SessionProvider';
import { ModalProvider } from 'providers/ModalProvider';
import Modal from '@/components/shared/Modal';

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
            <Modal />
            <Suspense>
              <Nav />
            </Suspense>
            {children}
            <Analytics />
            <Toast />
          </ModalProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
