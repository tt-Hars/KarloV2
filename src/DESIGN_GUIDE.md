# Frontend Design Guide

This guide outlines the standards for React components, styling, and usage of the design system.

## 1. Component Props Standardization

All components should accept a `sx` prop for style overrides (following Material UI pattern) and specific props for content.
Props related to spacing and sizing should follow the theme's spacing scale (8px baseline).

### Common Props Pattern

```typescript
interface CommonProps {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  className?: string; // For Styled Components or global CSS integration
}
```

### Typography

Use `variant` prop to control font size/weight based on theme typography.
Avoid hardcoded font-sizes.

### Spacing

Use `m`, `p`, `mx`, `my`, `px`, `py` props available in MUI system components or the `sx` prop with theme spacing values (e.g., `sx={{ m: 2 }}`).
Standard spacing unit is `8px`. `m: 1` = `8px`.

## 2. Directory Structure

- `src/components`: Generic, reusable UI components (wrappers around MUI).
- `src/app/components`: App-specific components (layout, feature-specific).
- `modules/shared/ui`: Shared UI library for reusability across apps.

## 3. Theming

The theme is defined in `modules/shared/constants`.
- **Colors**: Defined in `palette.ts`.
- **Typography**: Defined in `typography.ts`.
- **Component Overrides**: Defined in `componentOverrides.ts`.

## 4. Reusable Wrappers

We wrap core Material UI components to enforce design consistency. Import these from `@/components` (mapped to `src/components`).

- `Button` -> `KarloButton`
- `TextField` -> `KarloTextField`
- `Container` -> `KarloContainer`
- `Typography` -> `KarloTypography`
- `Grid` -> `KarloGrid`
