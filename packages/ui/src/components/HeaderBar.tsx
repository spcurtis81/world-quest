import React from 'react';

interface HeaderBarProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
}

/**
 * HeaderBar component for global navigation and branding.
 * This component provides consistent header structure across the application.
 */
export function HeaderBar({ children, className = '', title = 'World Quest' }: HeaderBarProps) {
  return (
    <header 
      className={`header-bar ${className}`}
      role="banner"
    >
      <div className="header-bar-content">
        {title && (
          <h1 className="header-bar-title">
            {title}
          </h1>
        )}
        {children || (
          <nav className="header-bar-nav" role="navigation" aria-label="Main navigation">
            {/* Placeholder navigation - to be replaced with actual implementation */}
            <span>Navigation placeholder</span>
          </nav>
        )}
      </div>
    </header>
  );
}

export default HeaderBar;