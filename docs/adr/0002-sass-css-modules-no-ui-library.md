# 0002. Styling with Sass + CSS Modules, no UI library

- Status: accepted
- Date: 2026-10-07

## Context

The test requires a CSS preprocessor (Sass, Less or Stylus), forbids UI libraries (Bootstrap, Foundation, etc.) and asks for pixel-perfect fidelity with the Figma layout.

## Decision

- Sass (dart-sass, `.scss`) with **CSS Modules** (`Component.module.scss`) for locally scoped styles.
- Design tokens live in `src/styles/_variables.scss`, taken from the Figma variables; components never hardcode colors or fonts.
- `loadPaths: ['src/styles']` lets modules `@use 'variables' as *;` without relative paths.
- A small hand-written reset (`_reset.scss`) instead of a reset library.
- Font: Poppins (Light 300, Medium 500, Bold 700), self-hosted through `@fontsource/poppins` (latin subset) — no runtime request to Google Fonts, better privacy and performance.

## Alternatives considered

- Less / Stylus — smaller ecosystem and Vite support is no better than Sass.
- Global BEM stylesheets — name collisions and weaker component encapsulation.
- CSS-in-JS / Tailwind — not a preprocessor from the allowed list (Tailwind is also a utility framework).
- Google Fonts `<link>` — external dependency at runtime.

## Consequences

- Class names are hashed and scoped; tests should query by role/text, not by class.
- Mixins and breakpoints are added only when first needed.
