"use client";

import React from 'react';

interface HeaderBarProps {
  title?: string;
  rightSlot?: React.ReactNode;
}

/**
 * HeaderBar component - A sticky top header with translucent background.
 * Provides consistent navigation header across the application.
 */
const HeaderBar: React.FC<HeaderBarProps> = ({ 
  title = "World Quest", 
  rightSlot 
}) => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/60 dark:bg-white/10 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-medium">{title}</h1>
        <div className="flex items-center gap-2">{rightSlot}</div>
      </div>
    </header>
  );
};

export default HeaderBar;