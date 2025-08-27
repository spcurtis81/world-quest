import React from 'react';
import { render, screen } from '@testing-library/react';
import { ActivityPane } from '../components/ActivityPane';

describe('ActivityPane', () => {
  it('renders without crashing', () => {
    render(<ActivityPane />);
    const element = screen.getByRole('complementary', { name: /activity panel/i });
    expect(element).toBeInTheDocument();
  });

  it('renders children when provided', () => {
    const testContent = 'Test Activity Content';
    render(
      <ActivityPane>
        <div>{testContent}</div>
      </ActivityPane>
    );
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('renders placeholder when no children provided', () => {
    render(<ActivityPane />);
    expect(screen.getByText('Activity Pane')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-activity-pane';
    render(<ActivityPane className={customClass} />);
    const element = screen.getByRole('complementary');
    expect(element).toHaveClass('activity-pane', customClass);
  });

  it('has proper accessibility attributes', () => {
    render(<ActivityPane />);
    const element = screen.getByRole('complementary');
    expect(element).toHaveAttribute('aria-label', 'Activity Panel');
  });
});