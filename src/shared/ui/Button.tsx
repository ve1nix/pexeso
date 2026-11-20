import type { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button = ({ children, className = '', type = 'button', ...props }: ButtonProps) => (
  <button type={type} className={`${styles.button} ${className}`} {...props}>
    {children}
  </button>
);
