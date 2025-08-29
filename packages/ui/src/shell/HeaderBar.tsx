'use client';
import * as React from 'react';

function mergeClasses(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export interface HeaderBarProps {
  title?: string;
  rightSlot?: React.ReactNode;
  className?: string;
}

function HeaderBar({ title, rightSlot, className }: HeaderBarProps) {
  return (
    <div role="banner" className={mergeClasses('sticky top-0 z-40 backdrop-blur-md bg-white/50 dark:bg-neutral-900/50 border-b border-white/20 dark:border-white/10', className)}>
      <div className="container mx-auto px-4 h-12 flex items-center justify-between">
        <h1 className="text-base font-semibold">{title}</h1>
        <div>{rightSlot}</div>
      </div>
    </div>
  );
}

export { HeaderBar };
