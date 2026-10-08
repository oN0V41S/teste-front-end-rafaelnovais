# 0007. Proxy the products API in development because of missing CORS headers

- Status: accepted
- Date: 2026-10-07

## Context

The products JSON served by `app.econverse.com.br` sends no `Access-Control-Allow-Origin` header, so the browser blocks `fetch` calls made from `localhost`. The test requires reading this remote JSON.

## Decision

In development, Vite proxies `/api/produtos.json` to the real endpoint (`vite.config.ts`), and `.env.development` points `VITE_PRODUCTS_API_URL` at `/api/produtos.json`. The default in `.env.example` stays the absolute URL.

## Alternatives considered

- Public CORS proxy service — third-party dependency and availability risk.
- Mocking the JSON locally — would not prove the integration with the real endpoint.

## Consequences

- Dev works against the real API with no extra tooling.
- The Vite proxy does not exist in the built app: a production host must rewrite `/api/*` to the API (or the API must enable CORS). The README documents this.
