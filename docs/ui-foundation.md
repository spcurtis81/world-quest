# UI Foundation Sprint

## Purpose

This sprint introduces a comprehensive UI foundation for the World Quest application, focusing on:

1. **TailwindCSS Integration** - Modern utility-first CSS framework for consistent styling
2. **Global Styling System** - Unified color schemes, typography, and spacing
3. **Reusable UI Primitives** - Core components that can be shared across all games and features

## Planned Components

### ActivityPane
A reusable glass-effect pane component that serves as the primary content container throughout the application.

**Usage:**
- Launcher game selection interface
- Login and authentication forms  
- Game area containers
- Settings and configuration panels

**Features:**
- Semi-transparent glass effect with backdrop blur
- Responsive padding and margins
- Consistent border radius and shadow
- Separates foreground content from background imagery

### HeaderBar
Top navigation component providing consistent header across all pages.

**Features:**
- Application title/logo area
- Profile information display
- Action buttons (settings, logout, etc.)
- Responsive design for mobile and desktop
- Integration with theme system

### ThemeToggle
Theme switching component for user preference management.

**Features:**
- Light/dark mode toggle
- Smooth transitions between themes
- Persistent user preference storage
- Visual feedback for current theme state

## Background & Content Separation

The UI design philosophy centers around a persistent background design with content displayed in floating ActivityPane components. This approach:

- **Maintains Visual Continuity** - Background remains consistent across page transitions
- **Improves Focus** - Glass-effect panes draw attention to interactive content
- **Enables Flexibility** - Background can be themed, animated, or customized per game
- **Enhances Accessibility** - Clear content boundaries and consistent interaction patterns

## Technical Architecture

### Styling System
- **Primary**: TailwindCSS for utility-first styling
- **Global Styles**: Base typography, color variables, and component defaults
- **Theme Variables**: CSS custom properties for light/dark theme switching

### Component Structure
```
packages/ui/src/components/
├── ActivityPane.tsx     # Glass-effect content container
├── HeaderBar.tsx        # Top navigation bar
└── ThemeToggle.tsx      # Theme switching control
```

### Integration Points
- Components exported from `@ui/shared` package
- Integrated with Next.js App Router layout system
- Compatible with existing game components (GameCard, etc.)

## Implementation Phases

1. **Phase 1**: Scaffold components and configuration (current sprint)
2. **Phase 2**: Implement TailwindCSS integration and global styles
3. **Phase 3**: Build ActivityPane with glass effects and responsiveness
4. **Phase 4**: Create HeaderBar with navigation and profile features
5. **Phase 5**: Develop ThemeToggle with persistence and transitions
6. **Phase 6**: Integration testing and refinement across all pages

## Success Criteria

- [ ] TailwindCSS fully integrated with Next.js build system
- [ ] Global styles provide consistent foundation across all pages
- [ ] ActivityPane component works seamlessly in launcher, games, and auth flows
- [ ] HeaderBar provides consistent navigation experience
- [ ] ThemeToggle enables smooth light/dark mode switching
- [ ] All components are fully responsive and accessible
- [ ] No regressions in existing game functionality