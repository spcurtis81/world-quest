# Sprint 11 – Stabilisation & Basic UI

**Duration**: December 27, 2024 - January 3, 2025  
**Status**: In Progress  
**Version**: 0.11.0-dev

## Theme

"Stabilisation & Basic UI (Tailwind + Layout Foundations)"

## Goals

1. **Test Stabilisation**: Ensure all tests pass consistently across environments
2. **Tailwind Integration**: Complete setup and configuration of Tailwind CSS
3. **Layout Foundation**: Create reusable layout components for consistent UI structure
4. **Visual Consistency**: Establish design patterns and component hierarchy
5. **Developer Experience**: Improve development workflow with proper tooling

## Deliverables

### Core Infrastructure
- [ ] Tailwind CSS fully integrated and configured
- [ ] PostCSS pipeline optimized
- [ ] CSS purging configured for production builds
- [ ] Design tokens established (colors, spacing, typography)

### UI Components
- [ ] **ActivityPane**: Side panel for game activity, scores, and status
- [ ] **HeaderBar**: Global navigation and branding component
- [ ] **Global Background**: Consistent background styling across all pages
- [ ] **Layout Wrapper**: Consistent page structure component

### Styling
- [ ] Global styles and CSS reset
- [ ] Typography system
- [ ] Responsive breakpoints
- [ ] Consistent spacing system
- [ ] Color palette and theme variables

### Testing
- [ ] All E2E tests passing
- [ ] New component tests for ActivityPane and HeaderBar
- [ ] Visual regression test setup (if time permits)

## Technical Approach

### Tailwind Setup
- Install and configure Tailwind CSS in the web app
- Set up PostCSS with necessary plugins
- Configure content paths for proper purging
- Establish utility classes conventions

### Component Architecture
```
Layout
├── HeaderBar (global navigation)
├── Main Content Area
│   ├── Page Content
│   └── ActivityPane (contextual info)
└── Global Background
```

### Design System Foundation
- Color palette: primary, secondary, accent, neutral
- Typography: heading scales, body text, UI text
- Spacing: consistent scale (4px base)
- Breakpoints: mobile, tablet, desktop
- Z-index scale for layering

## Acceptance Criteria

1. **Tailwind Integration**
   - Tailwind classes work in all packages
   - Build size optimized with purging
   - Hot reload works with style changes

2. **Layout Components**
   - ActivityPane renders and accepts children
   - HeaderBar provides consistent navigation
   - Components are responsive
   - Components follow accessibility best practices

3. **Visual Polish**
   - Consistent visual language across app
   - No unstyled elements
   - Proper contrast ratios
   - Mobile-first responsive design

4. **Testing**
   - All existing tests continue to pass
   - New components have test coverage
   - E2E tests stable with new layout

## Backlog Links

Related items from backlog:
- UI/UX improvements and polish
- Design system establishment
- Component library foundation
- Accessibility enhancements

## Implementation Notes

*This section will be updated during the sprint with implementation details, decisions, and learnings.*

### Day 1 - Sprint Setup
- Sprint documentation created
- Component stubs established
- Test files prepared
- Version updated to 0.11.0-dev

### Tailwind Configuration
*To be documented during implementation*

### Component Development
*To be documented during implementation*

### Testing Updates
*To be documented during implementation*

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Tailwind build time impact | Slower dev experience | Use JIT mode, optimize config |
| CSS conflicts with existing styles | Visual regressions | Gradual migration, scoped changes |
| Component complexity | Maintenance burden | Keep components simple and focused |
| Test brittleness with new UI | False failures | Use stable selectors, data attributes |

## Dependencies

- Tailwind CSS v3.x
- PostCSS v8.x
- Testing library updates (if needed)

## Success Metrics

- [ ] 100% E2E test pass rate
- [ ] Zero console errors/warnings
- [ ] Build size < 200KB CSS (purged)
- [ ] Lighthouse score > 90
- [ ] Components documented
- [ ] Clean git history

## Closeout Summary

*This section will be completed at the end of the sprint with outcomes, lessons learned, and next steps.*

### Outcomes
*To be completed*

### Lessons Learned
*To be completed*

### Follow-up Items
*To be completed*

---

**Next Sprint Preview**: Sprint 12 will likely focus on enhanced theming (light/dark mode), advanced UI components, and game-specific layouts.