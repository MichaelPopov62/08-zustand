/*Компонент CreateNote відповідає за сторінку створення нової нотатки в додатку.
  Відображає заголовок сторінки та форму для введення даних нотатки.*/

import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';
import type { Metadata } from 'next';
import type { Tag } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Create Note',
  description: 'Create a note',
  openGraph: {
    title: 'Create Note',
    description: 'Create a note',
    url: '/notes/action/create',
    images: [
      {
        url: '/og-image-create-note.png',
        width: 1200,
        height: 630,
        alt: 'Create Note',
      },
    ],
  },
};
const categories: Tag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm categories={categories} />
      </div>
    </main>
  );
}
