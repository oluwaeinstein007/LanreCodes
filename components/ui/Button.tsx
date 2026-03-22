'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import type { ComponentPropsWithRef } from 'react';

type Variant = 'primary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

type Props = ComponentPropsWithRef<'button'> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  as?: 'button' | 'a';
  href?: string;
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = 'primary', size = 'md', loading, children, className = '', style, ...props }, ref) => {
    const base = `inline-flex items-center justify-center gap-2 rounded-xl font-mono font-medium transition-all duration-200 cursor-pointer select-none ${sizeClasses[size]}`;

    const variantStyle: Record<Variant, React.CSSProperties> = {
      primary: {
        background: 'var(--accent)',
        color: '#fff',
        boxShadow: '0 0 0 0 var(--accent-glow)',
      },
      ghost: {
        background: 'var(--accent-muted)',
        color: 'var(--accent)',
        border: '1px solid var(--accent)',
      },
      outline: {
        background: 'transparent',
        color: 'var(--text-primary)',
        border: '1px solid var(--border)',
      },
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.03, boxShadow: variant === 'primary' ? '0 0 24px var(--accent-glow)' : undefined }}
        whileTap={{ scale: 0.97 }}
        className={`${base} ${className}`}
        style={{ ...variantStyle[variant], ...style }}
        disabled={loading}
        {...(props as object)}
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
