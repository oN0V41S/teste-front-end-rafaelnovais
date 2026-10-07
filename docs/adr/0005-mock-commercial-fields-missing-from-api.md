# 0005. Mock the commercial fields missing from the products API

- Status: accepted
- Date: 2026-10-07

## Context

The Figma showcases show a struck-through price, installments and a "Frete grátis" badge, but the JSON only provides `productName`, `descriptionShort`, `photo` and `price`. The JSON also has no `id`.

## Decision

- `src/mocks/productExtras.ts` holds the extra fields (`originalPrice`, `installments`, `freeShipping`) keyed by `productName`; only some products have them, the rest render without.
- The service layer merges them into the API data and derives `id` from the list position, returning `ShowcaseProduct`. Components never know the data is partly mocked.

## Alternatives considered

- Hardcode the extras in `ProductCard` — mixes data with presentation and breaks once the API supplies real values.
- Generate random values — non-deterministic, breaks tests and visual review.
- Omit the fields — the layout elements could not be demonstrated.

## Consequences

- When the API starts returning these fields, only the merge in the service changes.
- The mock is keyed by name, so renaming a product in the API silently drops its extras.
