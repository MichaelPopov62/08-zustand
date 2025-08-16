/*головна сторінка
Служить точкою входу для користувача.
 Відображає головну сторінку додатку NoteHub із привітанням, описом та ілюстрацією. */

import css from './notes/filter/[...slug]/page.module.css';
import Image from 'next/image';
import './globals.css';

export default function HomePage() {
  return (
    <main>
      <div className={css.container}>
        <h1 className={css.title}>Welcome to NoteHub</h1>
        <p className={css.description}>
          NoteHub is a simple and efficient application designed for managing
          personal notes. It helps keep your thoughts organized and accessible
          in one place, whether you are at home or on the go.
        </p>
        <p className={css.description}>
          The app provides a clean interface for writing, editing, and browsing
          notes. With support for keyword search and structured organization,
          NoteHub offers a streamlined experience for anyone who values clarity
          and productivity.
        </p>
      </div>

      <div className="center-images">
        <Image
          src="https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"
          alt="test"
          width={250}
          height={250}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
    </main>
  );
}
