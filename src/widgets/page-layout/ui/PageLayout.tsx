import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from 'shared/config/routes';

import styles from './PageLayout.module.css';

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => (
  <main className={styles.page}>
    <div className={styles.table}>
      <header className={styles.header}>
        <Link className={styles.logo} to={ROUTES.home}>
          <span className={styles.logoEmblem} aria-hidden="true">
            <span>✦</span>
          </span>
          <h1 className={styles.title}>Pexeso</h1>
        </Link>
        <p className={styles.subtitle}>Руны памяти · Колода мастеров</p>
      </header>
      {children}
    </div>
  </main>
);
