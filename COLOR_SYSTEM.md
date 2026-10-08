# Color System Documentation

## Overview
All CSS color definitions have been consolidated into a centralized color system using CSS custom properties (variables).

## Location
The color variables are defined in: `src/styles/_variables.scss`

## Available Colors

### Primary Brand Colors
- `--primary-color`: #cc4415 (main brand color)
- `--primary-color-light`: #e88a16 (light brand color)
- `--gradient-primary`: linear-gradient(135deg, var(--primary-color), var(--primary-color-light))

### Text Colors
- `--text-primary`: #333 (main text)
- `--text-secondary`: #555 (secondary text)
- `--text-muted`: #666 (muted text)
- `--text-white`: white
- `--text-black`: black

### Background Colors
- `--bg-white`: white
- `--bg-black`: black
- `--bg-light`: #f8f9fa (light gray background)

### Accent Colors
- `--accent-gray`: #e0e0e0
- `--accent-red`: #ff5f56
- `--accent-yellow`: #ffbd2e
- `--accent-green`: #27c93f

### Shadow Colors
- `--shadow-light`: rgba(0, 0, 0, 0.1)
- `--shadow-medium`: rgba(0, 0, 0, 0.2)
- `--shadow-primary`: rgba(102, 126, 234, 0.3)

### Gradient Backgrounds
- `--gradient-hero`: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)
- `--gradient-about`: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)

## Usage
To use these colors in your SCSS files:

```scss
.my-component {
  background-color: var(--bg-white);
  color: var(--text-primary);
  border: 1px solid var(--accent-gray);
}
```

## Files Updated
1. `src/styles/_variables.scss` - Created (contains all color definitions)
2. `src/styles.scss` - Added import and updated colors
3. `src/app/header/header.scss` - Updated to use variables
4. `src/app/about/about.scss` - Updated to use variables
5. `src/app/landing/landing.scss` - Updated to use variables

## Benefits
- **Centralized Management**: All colors in one place for easy updates
- **Consistency**: Ensures color consistency across the application
- **Maintainability**: Easy to change colors globally
- **Theme Support**: Foundation for implementing dark/light themes
- **Developer Experience**: Clear naming convention for better understanding

## Adding New Colors
To add new colors, simply add them to the `:root` selector in `src/styles/_variables.scss` following the existing naming convention.
