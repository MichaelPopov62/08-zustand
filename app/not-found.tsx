// резервний компонент сторінки помилки 404, який Next.js автоматично рендерить, коли користувач переходить на неіснуючий шлях.

import NotFoundMessage from '../components/NotFoundMessage/NotFoundMessage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NoteHub — Page not found (404)',
  description:
    'The page you are looking for does not exist. NoteHub is a web application for creating and saving notes.',
  openGraph: {
    title: 'NoteHub — Page not found(404)',
    description:
      'The page you are looking for does not exist. NoteHub is a web application for creating and saving notes.',
    url: 'https://notehub-public.goit.study/api',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub — Page 404',
      },
    ],
  },
};

export default function NotFound() {
  return <NotFoundMessage />;
}
