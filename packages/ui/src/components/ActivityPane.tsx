import React from 'react';

interface ActivityPaneProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * ActivityPane component for displaying game activity, scores, and status information.
 * This component will serve as a side panel in the application layout.
 */
export function ActivityPane({ children, className = '' }: ActivityPaneProps) {
  return (
    <div 
      className={`activity-pane ${className}`}
      role="complementary"
      aria-label="Activity Panel"
    >
      {children || (
        <div className="activity-pane-placeholder">
          {/* Placeholder content - to be replaced with actual implementation */}
          <p>Activity Pane</p>
        </div>
      )}
    </div>
  );
}

export default ActivityPane;