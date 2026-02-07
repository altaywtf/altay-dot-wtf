---
paths:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.mts"
  - "**/*.cts"
---

# TypeScript

## Functional First

- Pure functions by default. Minimize side effects.
- Isolate side effects at the edges (IO, network, DOM). Keep the core pure.
- Prefer immutable data. Use `readonly`, `as const`, spread over mutation.
- Composition over inheritance. Pipe small functions into larger ones.
- Prefer `map`/`filter`/`reduce` over imperative loops.

## Type Safety

- `strict: true` always. No exceptions.
- No `any`. Use `unknown` and narrow with type guards.
- No `as` casts without a comment explaining why. Prefer `satisfies`.
- `interface` for objects, `type` for unions/intersections.
- Colocate types with usage. No god `types.ts` files.
- Types are contracts. They communicate intent and enforce correctness.

## Errors as Values

- Errors are first-class citizens, not afterthoughts.
- Use Result pattern (`{ ok, data } | { ok, error }`) or Zod `.safeParse()`.
- Throw only for truly exceptional/unrecoverable cases.
- No empty catch blocks. Always handle the error case.
- Prefer early returns over deeply nested conditionals.

## Parse, Don't Validate

Use Zod at every external boundary:

- API responses, form data, env vars, URL params
- Anything from outside your trust boundary

```typescript
const user = UserSchema.parse(await response.json()); // good
const user = (await response.json()) as User; // bad
```

## Runtime: Bun

- Bun as default runtime, not Node.js.
- `Bun.serve()` for HTTP/WS, `bun:sqlite` for SQLite.
- `Bun.file()` over `node:fs`. Bun auto-loads `.env`.
- `bun test` for testing, `bun build` for bundling.

## Tooling

- **oxlint** for linting (not ESLint). Fast, zero-config, catches real bugs.
- **oxfmt** for formatting (or Biome). Deterministic, no debates.
- Run both in CI. No lint warnings in main branch.

## Naming

- Functions: `camelCase`. Types: `PascalCase`. Constants: `UPPER_SNAKE_CASE`.
- Booleans: prefix with `is`/`has`/`should` (`isLoading`, `hasError`).
