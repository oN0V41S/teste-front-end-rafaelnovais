# 0003. Server state with TanStack React Query on top of a service layer

- Status: accepted
- Date: 2026-10-07

## Context
The page renders three showcases from the same products JSON. Loading, error and caching states would otherwise be repeated per component.

## Decision
- Layers: `components → hooks → services → API`. Only `src/services` calls `fetch`; it validates the payload and throws `ProductsServiceError`.
- `useProducts` wraps the service with **TanStack React Query**; query keys live in `productKeys`.
- Services are plain functions, not classes: there is no instance state to encapsulate.

## Alternatives considered
- `useEffect` + `useState` — loading/error/dedupe handled by hand in every consumer.
- SWR — comparable; React Query was chosen for its cache control and adoption.

## Consequences
- The three showcases share one request and one cache entry.
- Loading/error/retry come standardized from the hook.
- One more dependency; tests need a `QueryClientProvider` (`src/test/renderWithQueryClient.tsx`).
