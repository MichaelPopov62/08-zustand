/* клієнтський React-компонент Header, який відображає шапку сайту з посиланням на головну сторінку і меню тегів (TagsMenu). Він визначає активний тег з URL та змінює маршрут при виборі іншого тегу через next/navigation.*/

'use client';
import Link from 'next/link';

import css from './Header.module.css';
import { TagsMenu } from '@/components/TagsMenu/TagsMenu';

export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/">Home</Link>
      <TagsMenu />
    </header>
  );
}
