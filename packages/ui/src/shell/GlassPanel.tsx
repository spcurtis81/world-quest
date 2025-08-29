'use client';
import * as React from 'react';

function mergeClasses(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export interface GlassPanelProps {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

function GlassPanel({ as: Component = 'section', className, ...props }: GlassPanelProps) {
  return (
    <Component
      className={mergeClasses(
        'w-full sm:max-w-lg md:max-w-2xl rounded-xl shadow-lg backdrop-blur-md bg-white/60 dark:bg-neutral-900/50 border border-white/20 dark:border-white/10 p-4 sm:p-6 md:p-8',
        className
      )}
      {...props}
    />
  );
}

export { GlassPanel };
