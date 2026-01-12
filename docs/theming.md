# Theming Strategy

The application uses **TailwindCSS** combined with CSS Variables for a dynamic and easily themeable design system.

## Design Tokens

All design tokens are defined in `apps/web/src/styles/globals.css`. We use HSL color values to allow for easy opacity manipulation in Tailwind.

### Structure
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;

  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;

  --radius: 0.5rem;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... */
}
```

## Customizing the Theme

1.  Open `apps/web/src/styles/globals.css`.
2.  Update the HSL values in the `:root` and `.dark` blocks.
3.  The changes will instantly propagate across the entire application due to Tailwind's utility mapping.

## Tailwind Configuration

The tokens are mapped in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      background: "hsl(var(--background))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      // ...
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
  },
}
```
