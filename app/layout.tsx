/* глобальний лейаут Next.js, який задає структуру HTML сторінки, підключає шрифти, стилі, обгортає контент у провайдера TanStackProvider, і містить заголовок (Header), основний контент (children), модальні вікна (modal) та підвал (Footer).*/

import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import TanStackProvider from '../components/TanStackProvider/TanStackProvider';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Project for storing, creating, deleting notes',
  openGraph: {
    title: 'NoteHub',
    description: 'Create, save, delete notes',
    url: 'https://notehub-public.goit.study/api',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'An image of the NoteHub view',
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
