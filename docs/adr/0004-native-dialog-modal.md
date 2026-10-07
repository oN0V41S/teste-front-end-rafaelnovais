# 0004. Build the modal on the native `<dialog>` element

- Status: accepted
- Date: 2026-10-07

## Context

The test forbids UI libraries and requires a product modal. A modal is easy to get wrong for keyboard and screen-reader users (focus trap, Escape, inert background, focus restoration). The page also requires semantic HTML.

## Decision

A generic `Modal` component that wraps `<dialog>` opened with `showModal()`. The browser provides the focus trap, Escape, inert background, top layer and focus restoration; the component adds the close button, backdrop click and body scroll lock. `ProductModal` only supplies the content.

## Alternatives considered

- A modal/headless library (MUI, Radix, react-modal) — forbidden or against the spirit of the test.
- A hand-written overlay (portal, `aria-modal`, manual focus trap and Escape) — about 80 more lines reproducing what the platform already does, with more room for accessibility bugs.

## Consequences

- Less code and better accessibility by default.
- jsdom does not implement `showModal()`/`close()`, so `src/test/setup.ts` has a minimal stand-in. Focus trap, Escape and focus restoration are therefore not covered by automated tests; they were checked manually in a real browser.
- Backdrop click relies on the dialog having no padding, so the content must fill it.
