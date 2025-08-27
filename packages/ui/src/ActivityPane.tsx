"use client";

import React from 'react';

interface ActivityPaneProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * ActivityPane component - A centered, responsive card with a subtle glass look.
 * Provides a clean container for content with optional title.
 */
const ActivityPane: React.FC<ActivityPaneProps> = ({ 
  title, 
  children, 
  className = '' 
}) => {
  return (
    <div className={`min-h-[60vh] flex items-start justify-center ${className}`}>
      <div className="max-w-xl w-full rounded-xl border border-white/20 bg-white/60 dark:bg-white/10 backdrop-blur-md shadow-lg p-6">
        {title && (
          <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        )}
        {children}
      </div>
    </div>
  );
};

export default ActivityPane;