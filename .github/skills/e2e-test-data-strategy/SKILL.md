---
name: e2e-test-data-strategy
description: Decision framework for creating, sourcing, and cleaning up test data in the TypeScript + Playwright + Cucumber.js E2E suite. Use this skill WHENEVER the user asks to add test data, seed a user/entity, mock an API response, load a fixture, generate random data, parameterize a scenario, or is about to hardcode data inside a step definition or feature file. Trigger on mentions of fixtures, builders, faker, seeding, mocks, `FixtureLoader`, `UserBuilder`, `GraphQLMockBase`, or phrases like "I need a test user", "I want to test with N records", "mock the response for …", "seed a project", "generate random emails", "set up preconditions for this scenario". Also trigger when reviewing a `.steps.ts` or `.feature` file and any data appears inline (literals, hardcoded IDs, handcrafted JSON).
---

# E2E Test Data Strategy

This skill is the **decision framework** for test data in `boilerplate-chorus-e2e`. It is consulted **before** writing any new scenario so that the four data strategies — static fixtures, builders + faker, API seeding, mocked responses — are applied consistently. Developers approve this framework as the gate; implementation plans that touch `src/` must justify themselves against it.

The underlying philosophy: **pick the weakest strategy that will honestly verify the behavior.** Mocks are lighter than builders, builders are lighter than seeds, and fixtures are the lightest of all — but each one proves less than the next. Climb the ladder only when the test actually requires it.

---

## When to use this skill

Trigger on any of these:
- The user wants to add, change, or review test data for an E2E scenario.
- The user mentions `FixtureLoader`, `UserBuilder`, `GraphQLMockBase`, faker, seeding, mocking, or any fixture path.
- A `.steps.ts` or `.feature` file contains inline data (literals, handcrafted JSON, hardcoded IDs, credentials) — treat it as a bug and route through this skill.
- The user describes a precondition ("the user must already exist", "the list must have 10 entries", "the API must return an error").

If the task is unrelated to test data, ignore this skill. If the task is E2E architecture (page objects, hooks, POM), route to the parent skill `e2e-playwright-cucumber` first.

---

## The four strategies — overview

| | Static Fixture | Builder + Faker | API Seeding | Mocked Response |
|---|---|---|---|---|
| **Primary use** | Reference data, credentials, canned mock payloads | Varied/unique in-memory entities | Real backend state the UI asserts on | Frontend isolation, error paths, flaky upstreams |
| **Backend dep** | None | None | Required (endpoint + service creds) | None |
| **Mutability** | Immutable, committed to git | Per-scenario, in-memory | Mutates real backend state | Per-scenario, in-memory |
| **Isolation** | Shared across scenarios | Full | Needs `runId` + cleanup | Full |
| **Speed** | Fastest | Fast | Slowest | Fast |
| **Determinism** | Perfect | Perfect with `FAKER_SEED` | Depends on backend | Perfect |
| **Proves** | Nothing about backend | Nothing about backend | Real integration | Only frontend rendering |

**Read the matrix as a ladder, not a menu.** Start at the cheapest strategy that still honestly covers the scenario, then climb only if you must.

---

## Master decision tree

```
Does the UI read or write real backend state that THIS test asserts on?
│
├── YES ─┬─ Is a backend endpoint + SEED_USER/SEED_PASS service creds available?
│        │
│        ├── YES → §4.3  API SEEDING
│        │
│        └── NO  → §4.4  MOCK  (and file a follow-up to enable real seeding)
│
└── NO  ─┬─ Is the data the same every run and small enough to commit to git?
         │
         ├── YES → §4.1  STATIC FIXTURE
         │
         └── NO  ─┬─ Do you need variation, uniqueness, or realistic fuzz?
                  │
                  ├── YES → §4.2  BUILDER + FAKER
                  │
                  └── NO  → §4.1  STATIC FIXTURE
```

**Every routing must be reachable in ≤3 tree steps.** If you find yourself branching further, stop and re-read the question — you're almost certainly solving two scenarios as one.

---

## §4.1 — Static Fixture

Use when the data is reference-like, stable, and committed to the repo.

### Decision tree

```
Is the data committed to git, unchanged across runs?
├── YES ─┬─ Is it reference data (enums, lookup tables, config)?       → FIXTURE
│        ├─ Is it credentials for a real test account?                 → FIXTURE
│        ├─ Is it a canned API payload consumed by a mock?             → FIXTURE
│        └─ Does it vary per scenario?                                 → NOT fixture → §4.2
└── NO                                                                 → NOT fixture → §4.2 or §4.3
```

### Recommendation

- Commit JSON under `src/support/<domain>/fixtures/<feature>/<case>.json`.
- Load via `FixtureLoader` in `src/support/shared/lib/fixture-loader.ts` (already generic; supports caching and password redaction).
- Pull the fixture in a page object or support class — **never** in a `.feature` or `.steps.ts` file directly.
- Password fields must go through the loader's redaction option.

### Anti-patterns

- Inline JSON literals inside step definitions or Gherkin doc strings.
- Duplicating the same fixture across domains — hoist to `src/support/shared/fixtures/` instead.
- Mutating a loaded fixture at runtime (they are cached; mutations leak to other scenarios).

### Reference example

- `src/support/authentication/fixtures/login/users.json` — canonical credential fixture, loaded via `FixtureLoader.loadUserCredentials(key)`.

---

## §4.2 — Builder + Faker

Use when each scenario needs an in-memory entity that varies, is unique, or requires realistic fuzz, but never touches the backend.

### Decision tree

```
Do you need the SAME entity every run?                 → §4.1 fixture
│
Does the test need the entity to exist in the backend? → §4.3 seeding
│
Otherwise:
├── Need >1 entity with unique fields?           → BUILDER (uniqueSuffix)
├── Need realistic variation to catch edges?     → BUILDER (faker defaults)
└── Need a simple, explicit override?            → BUILDER (.withX() fluent API)
```

### Recommendation

- Extend the existing factory pattern in `src/support/user-management/builders/user.builder.ts`. New domains get `src/support/<domain>/builders/<thing>.builder.ts` with the same shape.
- Defaults come from faker; explicit `.withX()` overrides always win.
- **Determinism:** global `FAKER_SEED` env var seeds the entire run. Per-scenario override via a `@faker-seed:<n>` tag, parsed in the `Before` hook.
- **Parallel safety:** builders use a shared `uniqueSuffix()` helper (pid + nanoid) for unique names/emails. Add `buildUniqueEmail()` when a domain needs one.
- Builders are **pure in-memory** — no network calls, no I/O. If a builder needs to persist, it becomes a seeder (§4.3).

### Anti-patterns

- Calling `faker.*` directly inside a step definition — route through the builder.
- Unseeded randomness — every faker usage must flow through the globally-seeded instance.
- Builders that call the backend — move that logic to a seeder.
- Re-inventing a builder per scenario instead of extending the domain builder.

### Reference example

- `src/support/user-management/builders/user.builder.ts` — fluent builder with `.asAdmin()`, `.withEmail()`, `build()`, and convenience functions (`createUser`, `createUsers`, `createAdminUser`, `createBotAccount`).

---

## §4.3 — API Seeding

Use **only** when UI behavior under test depends on real backend state: persisted records across pages, permission checks, session/auth flows, or anything that survives a page reload.

### Decision tree

```
Does the assertion depend on real backend persistence or permissions?
├── NO  → §4.2 builder or §4.4 mock
└── YES ─┬─ Is a REST/GraphQL endpoint + SEED_USER/SEED_PASS available?
         ├── YES → SEED (name entities `e2e-<runId>-*`, track for cleanup)
         └── NO  → §4.4 mock AND file a follow-up to enable seeding
```

### Recommendation

- New convention: `src/support/<domain>/seeders/<domain>.seeder.ts`. One seeder class per domain.
- The seeder accepts a Playwright `APIRequestContext` from a shared `createRequestContext()` helper (planned at `src/support/shared/lib/api-client.ts`). Auth uses `SEED_USER` / `SEED_PASS` from `.env`.
- **Naming:** every seeded entity is prefixed `e2e-<runId>-`, where `runId` is set in the `Before` hook on `CustomWorld` (`src/config/world.ts`). This gives a future orphan-sweeper a reliable pattern to match.
- **Tracking:** seeder pushes created IDs onto `CustomWorld.seededEntities: Map<string, string[]>`.
- **Cleanup:** `After` hook iterates `seededEntities` and calls each seeder's `cleanup(ids)`. **Best-effort:** failures are logged, never thrown — a flaky cleanup must not fail the scenario.
- `@seed-once` tag is reserved for feature-level seeds that span scenarios; default scope is per-scenario.

### Anti-patterns

- Seeding inline in a `.feature` or `.steps.ts` file.
- Sharing seeded state across scenarios without an explicit `@seed-once` tag.
- Throwing from a cleanup path.
- Using production or shared human accounts for seeding — always service-account creds.
- Assuming the backend is reachable without checking; failing loudly is better than silent mocks.

### Files this strategy implies (deferred implementation)

Not part of this skill's approval — they will live in a follow-up plan governed by this skill:

- `src/support/shared/lib/api-client.ts` — `createRequestContext()` helper.
- `src/support/<domain>/seeders/<domain>.seeder.ts` — per-domain seeder, starting with `user-management`.
- `src/config/testConfig.ts` — add `seedUser`, `seedPass`, `fakerSeed`.
- `src/config/world.ts` — add `runId: string`, `seededEntities`, `apiRequest?`.
- `src/hooks/hooks.ts` — `BeforeAll` faker seed, `Before` runId + tag parse, `After` cleanup loop.

---

## §4.4 — Mocked Response

Use when the test is about frontend behavior — error states, rendering, navigation — not about whether the backend actually persisted anything.

### Decision tree

```
Is the assertion about real persistence or real permissions?        → §4.3 seeding
│
Otherwise:
├── Testing an error / empty / loading branch?                 → MOCK
├── Upstream is slow or flaky?                                 → MOCK
├── Verifying pure frontend rendering / navigation?            → MOCK
└── Asserting the UI round-trips data unchanged?               → MOCK (use a fixture as the payload)
```

### Recommendation

- Extend `GraphQLMockBase` (`src/support/shared/mocks/graphql-base.mock.ts`) with a per-domain subclass. One mock class per domain.
- Mock payloads live as fixtures under `src/support/<domain>/fixtures/`, loaded via `FixtureLoader`. The mock class **never** contains hardcoded JSON.
- Register the mock in a `Before` hook or a dedicated `Given` step — not scattered `page.route()` calls in step files.
- Mocks must unregister (or be scope-limited) so they cannot leak across scenarios.

### Anti-patterns

- `page.route()` called directly from a `.steps.ts` file.
- Mock class with inline JSON literals instead of loading a fixture.
- Mocks that persist between scenarios — always scope to the current `CustomWorld.page`.
- Mocking something you could cheaply seed; a mock proves nothing about the backend.

### Reference example

- `src/support/user-management/mocks/user-management.mock.ts` — domain mock extending `GraphQLMockBase`, with fixtures at `src/support/user-management/fixtures/users/` (`list-success.json`, `list-empty.json`, `list-error.json`).

---

## Cross-cutting rules

- **Parallel isolation.** Every strategy must survive `npm run test:chromium:parallel` without collisions. Builders and seeders rely on `runId` + `uniqueSuffix()`; fixtures and mocks are inherently per-scenario in scope.
- **Determinism.** Every strategy must produce identical observable behavior under the same `FAKER_SEED`. If a run is non-reproducible, the randomness has leaked outside a seeded faker instance.
- **No inline data — ever.** `.feature` files may contain illustrative values inside `Examples:` tables (Gherkin). `.steps.ts` files may not contain data literals beyond what the Gherkin row provided. Anything else belongs in one of the four strategies.
- **Cleanup obligation.** Only §4.3 API seeding owns cleanup. The other three strategies are in-memory or static and need none.
- **Escalate one step at a time.** Start at §4.1, escalate to §4.2 for variation, then §4.4 for error-path isolation, then §4.3 only if real persistence is actually under test. Skipping rungs usually means the wrong strategy was chosen.

---

## Quick reference card

| Scenario | Strategy |
|---|---|
| Login with a valid user | §4.1 fixture (`users.json`) |
| Login with a locked/invalid user | §4.1 fixture |
| "User sees 10 varied users in the list" (rendering only) | §4.4 mock + §4.2 builder for the payload |
| "Admin creates a user and it persists after reload" | §4.3 seeding |
| "Empty state when the API returns 0 records" | §4.4 mock (`list-empty.json`) |
| "GraphQL returns 500 → error toast" | §4.4 mock (`list-error.json`) |
| "Permissions prevent non-admin from deleting" | §4.3 seeding (real auth session) |
| "Form validation when a required field is blank" | Gherkin `Examples:` table, no data layer |
| "Bulk import of N unique rows" | §4.2 builder with `uniqueSuffix()` |
| "Bot account with specific credentials across 3 scenarios" | §4.1 fixture |

If your scenario isn't on this card, run the master decision tree.

---

## Related skills & files

**Parent skill:**
- `.claude/skills/e2e-playwright-cucumber/SKILL.md` — architecture, POM, hooks, naming. Consult this first for anything that isn't a data question.

**Critical files referenced by this skill (read-only pointers):**
- `src/support/shared/lib/fixture-loader.ts`
- `src/support/shared/mocks/graphql-base.mock.ts`
- `src/support/user-management/builders/user.builder.ts`
- `src/support/user-management/mocks/user-management.mock.ts`
- `src/support/authentication/fixtures/login/users.json`
- `src/config/world.ts`
- `src/config/testConfig.ts`
- `src/hooks/hooks.ts`

**Governed but not yet implemented** (will land in a follow-up plan this skill approves):
- `src/support/shared/lib/api-client.ts`
- `src/support/shared/lib/faker.ts`
- `src/support/user-management/seeders/user.seeder.ts`
- `.env.example` additions: `FAKER_SEED`, `SEED_USER`, `SEED_PASS`
