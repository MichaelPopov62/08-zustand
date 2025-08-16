/*Цей файл реалізує стан для чернетки нотатки (draft) у React-додатку за допомогою Zustand. Забезпечує збереження поточної чернетки у localStorage, щоб при перезавантаженні сторінки дані не загубилися.*/

import { create } from 'zustand';
import { Tag } from '@/lib/api'; // імпорт типу Tag з
import { persist } from 'zustand/middleware';

// Початковий стан чернетки
const initialDraft = {
  title: '',
  content: '',
  tag: 'Todo' as Tag,
};

export type Draft = typeof initialDraft;

// Тип стану стора
interface NoteStore {
  draft: Draft; // тип об'єкта чернетки
  setDraft: (note: Partial<Draft>) => void; //метод-оновлює частину полів чернетки зберігая інші
  clearDraft: () => void; //метод-скидує чернетку до початкового значення
}

// Zustand хук
export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((state) => ({
          draft: { ...state.draft, ...note },
        })),
      clearDraft: () =>
        set(() => ({
          draft: initialDraft,
        })),
    }),
    {
      name: 'note-draft-storage', // ключ для localStorage де я бачу свою чернетку
      partialize: (state) => ({ draft: state.draft }), // зберігаємо тільки draft
    },
  ),
);
