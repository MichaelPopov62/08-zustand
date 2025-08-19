/*Компонент NoteForm відповідає за створення нової нотатки. Він дозволяє користувачу вводити заголовок, текст та категорію (tag), зберігає ці дані у чернетку (draft) через Zustand, і відправляє їх на сервер при сабміті.*/

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import css from './NoteForm.module.css';
import { createNote, DataNewNotes, Tag } from '@/lib/api';
import { useNoteStore } from '@/lib/store/noteStore';

interface Props {
  categories: Tag[];
}

// Компонент форми створення нотатки
const NoteForm = ({ categories }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Отримую draft та функції для роботи з чернеткою через Zustand
  const { draft, setDraft, clearDraft } = useNoteStore();
  // draft - поточні значення полів форми
  // setDraft - оновлення конкретних полів draft
  // clearDraft - очищення draft після успішного створення нотатки

  // Локальний стан для повідомлень про помилки
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Мутація для створення нотатки через React Query
  const mutation = useMutation({
    mutationFn: createNote, // функція API для створення нотатки
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] }); // оновлюю список нотаток
      setErrorMessage(null); // очищую повідомлення про помилку
      clearDraft(); // очищую draft після успішного створення
      router.back(); // повертаюсь на попередню сторінку
    },
    onError: (error: Error) => {
      setErrorMessage(error.message || 'Failed to create the note.'); // показую помилку від сервера
    },
  });

  // Обробник сабміту форми
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // забороняю стандартну поведінку браузера
    const { title, content, tag } = draft;

    // Валідація даних перед відправкою на сервер
    if (title.length < 3) {
      setErrorMessage('Title must be at least 3 characters.'); // мінімальна довжина заголовка
      return;
    }
    if (title.length > 30) {
      setErrorMessage('Title must be at most 30 characters.'); // максимальна довжина заголовка
      return;
    }
    if (content.length > 300) {
      setErrorMessage('Content must be at most 300 characters.'); // максимальна довжина змісту нотатки
      return;
    }

    // Відправляю дані draft на сервер
    mutation.mutate({ title, content, tag } as DataNewNotes);
  };

  // Кнопка "Cancel" повертає на попередню сторінку, draft залишається
  const handleCancel = () => {
    router.back();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      {/* Заголовок нотатки */}
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          required
          minLength={3}
          maxLength={30}
          value={draft.title} // значення береться з draft
          onChange={(e) => {
            // при зміні input оновлюємо draft
            setDraft({ title: e.target.value });
          }}
        />
      </div>

      {/* Контент нотатки */}
      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={5}
          className={css.textarea}
          maxLength={300}
          value={draft.content} // значення береться з draft
          onChange={(e) => {
            setDraft({ content: e.target.value });
          }}
        />
      </div>

      {/* Категорія нотатки */}
      <div className={css.formGroup}>
        <label htmlFor="tag">Category</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          required
          value={draft.tag} // значення береться з draft
          onChange={(e) => {
            setDraft({ tag: e.target.value as Tag });
          }}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Повідомлення про помилку */}
      {errorMessage && <p className={css.error}>{errorMessage}</p>}

      {/* Кнопки дій */}
      <div className={css.actions}>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
