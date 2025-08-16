/* Серверний асинхронний компонент NoteDetailsPage за ID нотатки виконує попереднє завантаження даних (fetchNoteById) через React Query і передає їх у клієнтський компонент NoteDetailsClient через гідратацію (HydrationBoundary), що дозволяє швидко та ефективно відрендерити контент без зайвих запитів.*/

import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

// Функція для генерації метаданих сторінки
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  //Отримую заголовок нотатки а при відсутністі заголовка використовую  резервну назву
  const title = note?.title ?? 'NoteHub — Note';

  /*Отримую перші 100 символів контенту нотатки для description(цифра вибрана для зручночті читання системою)
  Якщо контент відсутній, використовується резервний */
  const description = note?.content?.slice(0, 100) ?? 'View note у NoteHub';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.com/notes/${id}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `NoteHub — ${title}`,
        },
      ],
      type: 'article',
    },
  };
}

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
