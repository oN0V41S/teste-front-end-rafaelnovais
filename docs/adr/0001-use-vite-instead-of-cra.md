# 0001. Use Vite as the build tool instead of Create React App

- Status: accepted
- Date: 2026-10-07

## Context

The test requires React and TypeScript with a Sass preprocessor. We need a fast dev server, a production build, and a test runner that shares the same config.

## Decision

Use Vite with the official `react-ts` template, TypeScript in `strict` mode.

## Alternatives considered

- Create React App — deprecated and no longer maintained.
- Next.js — SSR/routing are not needed for a single static page; adds surface area.
- Webpack from scratch — more configuration with no benefit here.

## Consequences

- Native Sass support (just install `sass`) and Vitest sharing the same config.
- Environment variables use the `VITE_` prefix.
