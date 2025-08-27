import React from 'react';
import { render, screen } from '@testing-library/react';
import { HeaderBar } from '../components/HeaderBar';

describe('HeaderBar', () => {
  it('renders without crashing', () => {
    render(<HeaderBar />);
    const element = screen.getByRole('banner');
    expect(element).toBeInTheDocument();
  });

  it('renders default title when no title prop provided', () => {
    render(<HeaderBar />);
    expect(screen.getByText('World Quest')).toBeInTheDocument();
  });

  it('renders custom title when provided', () => {
    const customTitle = 'Custom Game Title';
    render(<HeaderBar title={customTitle} />);
    expect(screen.getByText(customTitle)).toBeInTheDocument();
  });

  it('renders children when provided', () => {
    const testContent = 'Custom Navigation Content';
    render(
      <HeaderBar>
        <nav>{testContent}</nav>
      </HeaderBar>
    );
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('renders placeholder navigation when no children provided', () => {
    render(<HeaderBar />);
    expect(screen.getByText('Navigation placeholder')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-header';
    render(<HeaderBar className={customClass} />);
    const element = screen.getByRole('banner');
    expect(element).toHaveClass('header-bar', customClass);
  });

  it('has proper accessibility attributes', () => {
    render(<HeaderBar />);
    const banner = screen.getByRole('banner');
    expect(banner).toBeInTheDocument();
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
  });

  it('renders title as h1 element', () => {
    render(<HeaderBar title="Test Title" />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Test Title');
  });
});