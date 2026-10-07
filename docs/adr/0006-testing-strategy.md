# 0006. Testing strategy: Vitest + React Testing Library

- Status: accepted
- Date: 2026-10-07

## Context

We want fast feedback on small, reviewable commits. Tests should check behavior the user sees (a card opens a modal) rather than implementation details.

## Decision

- Vitest with jsdom, configured in `vite.config.ts` (same pipeline as the app).
- React Testing Library + `user-event` + `jest-dom` matchers; queries by role/label first.
- Unit tests for pure utils and the service layer (fetch mocked); component tests for behavior and accessibility.
- No snapshot tests and no E2E suite: visual fidelity is verified manually against Figma.
- Prettier for formatting, oxlint (Vite template default) for linting.

## Alternatives considered

- Jest — needs extra transform config to work with Vite/ESM/TS.
- Playwright E2E — high setup cost for a single-page test; may be added later if time allows.

## Consequences

- `npm test` runs once (CI-friendly); `npm run test:watch` for development.
- Visual regressions are not covered automatically.
