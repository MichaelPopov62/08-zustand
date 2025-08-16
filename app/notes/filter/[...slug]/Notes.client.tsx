// /*клієнтський React-компонент, забезпечує інтерфейс для роботи з нотатками: перегляд, пошук, пагінація, створення нових нотаток.*/

'use client';

import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes, type FetchNotesResponse } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Loader from '@/components/Loader/Loader';
import Link from 'next/link';
import css from './page.module.css';
import { Tag } from '@/lib/api';

const PER_PAGE = 10;
const MIN_LOADING_TIME = 100;

interface NotesClientProps {
  initialNotes: FetchNotesResponse;
  tag: Tag | null;
}

export default function NotesClient({ initialNotes, tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const debouncedSetSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 300);

  const handleSearchChange = (value: string) => {
    setInputValue(value);
    debouncedSetSearchQuery(value);
  };

  const { data, isLoading, isError, isSuccess } = useQuery<
    FetchNotesResponse,
    Error
  >({
    queryKey: ['notes', currentPage, searchQuery, tag],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        perPage: PER_PAGE,
        search: searchQuery,
        tag: tag ?? undefined,
      }),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
    initialData:
      currentPage === 1 && searchQuery === '' ? initialNotes : undefined,
  });

  // Керування показом індикатора завантаження
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (isLoading) {
      setShowLoader(true);
    } else {
      timeoutId = setTimeout(() => setShowLoader(false), MIN_LOADING_TIME);
    }

    return () => clearTimeout(timeoutId);
  }, [isLoading]);

  const handlePageChange = (selected: number) => setCurrentPage(selected);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* пошукове поле */}
        <SearchBox value={inputValue} onSearch={handleSearchChange} />
        {/* пагінація, якщо більше 1 сторінки */}
        {!showLoader && isSuccess && data?.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
        {/* посилання для створення нотатки */}
        <Link href="/notes/action/create" className={css.button}>
          Create Note +
        </Link>
      </header>

      {/* індикатор завантаження */}
      {showLoader && <Loader message="Interesting notes..." />}

      {/* повідомлення про помилку */}
      {!showLoader && isError && (
        <Loader
          message="There was a problem loading the enchanted notes"
          color="#D62727"
        />
      )}

      {/* список нотаток */}
      {!showLoader && isSuccess && data?.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}

      {/* повідомлення про відсутність результатів пошуку */}
      {!showLoader &&
        isSuccess &&
        data?.notes.length === 0 &&
        searchQuery.trim() !== '' && (
          <p className={css.noResults}>Notation not found after the search</p>
        )}
    </div>
  );
}
