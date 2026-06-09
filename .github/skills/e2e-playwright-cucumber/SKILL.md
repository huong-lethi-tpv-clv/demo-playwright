---
name: e2e-playwright-cucumber
description: Architecture and conventions for writing and updating E2E tests in a TypeScript + Playwright + Cucumber.js project using the Page Object Model. Use this skill WHENEVER the user asks to add, write, update, modify, extend, or fix an E2E test, Cucumber scenario, Gherkin feature, step definition, page object, test fixture, or Playwright mock — even if they don't explicitly say "E2E" or name the tools. Any mention of `.feature` files, `.steps.ts` files, BDD Given/When/Then, Playwright locators, POM, or test tags should trigger this skill. Also trigger when the user describes a user flow they want verified end-to-end (e.g. "I want to verify the logout flow", "make sure the password reset works").
---

# E2E Testing — Playwright + Cucumber + POM

This skill captures the architectural conventions for TypeScript E2E test suites built on **Playwright + Cucumber.js** with a **Page Object Model (POM)** and **domain-organized** folders. It exists so that every new or updated test lands in the right place, uses the right primitives, and doesn't reinvent helpers that already exist.

The underlying philosophy: **tests are organized by product domain (not by layer), actions go through safe retrying helpers (not raw Playwright calls), and authentication is shared across scenarios (not repeated per test).** Understand those three ideas and most conventions below follow naturally.

---

## When to use this skill

Trigger on any of these:
- The user wants to **add a new** E2E test, Cucumber scenario, feature file, step definition, or page object.
- The user wants to **update, fix, or extend** an existing E2E test or page object.
- The user describes a user flow ("verify the logout works", "test the password reset") and wants it covered end-to-end.
- The user mentions Playwright, Cucumber, Gherkin, BDD, POM, or any file ending in `.feature` / `.steps.ts`.

If the user's task is unrelated to E2E tests, ignore this skill.

---

## Step 0 — Verify the repo matches these assumptions

Before applying any pattern below, spend 30 seconds confirming this project is actually in the shape the skill assumes. Patterns applied to the wrong shape of repo create messes.

Check for:
- `package.json` depends on `@playwright/test` **and** `@cucumber/cucumber`
- `tsconfig.json` with `strict: true` and likely path aliases (`@pages/*`, `@support/*`, `@config/*`)
- A `src/` (or similar) tree with `pages/`, `tests/`, `support/`, `hooks/`, `config/` subfolders
- A `cucumber.js` (or `cucumber.cjs` / `.mjs`) profile config at the repo root
- A `BasePage` or equivalent abstract page class

If any of those are missing, **don't force the conventions** — ask the user whether they want this skill's conventions applied, or whether the repo uses a different layout. Adapt to what exists.

---

## Stack assumptions

| Layer | Default |
|---|---|
| Language | TypeScript, `strict: true` |
| Test framework | Playwright + Cucumber.js (BDD) |
| Runtime | Node.js, executed via `ts-node` (no build step) |
| Lint/format | ESLint + Prettier; enforced import ordering; no `console.log` |
| Path aliases | `@pages/*`, `@support/*`, `@config/*` via `tsconfig-paths` |

---

## Project structure (domain-organized)

```
src/
├── pages/
│   ├── shared/BasePage.ts              # abstract base with safe-action helpers
│   └── <domain>/<Thing>Page.ts         # e.g. authentication/LoginPage.ts
├── tests/
│   └── <domain>/<feature>/             # e.g. login/, user-management/user-list/
│       ├── <feature>.feature           # Gherkin scenarios
│       └── <feature>.steps.ts          # step definitions
├── support/
│   ├── shared/
│   │   ├── lib/                        # Logger, waitForCondition, AuthenticationManager, redaction
│   │   └── fixtures/                   # cross-domain fixtures
│   └── <domain>/
│       ├── fixtures/                   # JSON test data
│       ├── builders/                   # dynamic data builders (factory pattern)
│       └── mocks/                      # API mock classes
├── hooks/
│   └── hooks.ts                        # Before / After / BeforeAll / AfterAll
└── config/
    ├── testConfig.ts                   # env validation, timeout constants
    └── world.ts                        # CustomWorld (shared browser + auth cache)
```

**Naming conventions:**
- Features: `kebab-case.feature`
- Step defs: `<feature-name>.steps.ts`
- Pages: `PascalCasePage.ts`
- Tag domains, never create a top-level `tests/pages/` or `tests/helpers/` dump

**Why domain-organized and not layer-organized?** When you want to change how "user management" tests work, everything you touch sits in one place — the feature, the steps, the page object, the fixtures, the mocks. Layer-organized trees (all pages in one folder, all steps in another) force you to jump around and tend to create cross-domain coupling.

---

## Architecture patterns

### 1. Page Object Model via `BasePage`

- All page objects **extend `BasePage`** and use its safe-action helpers (`safeClick()`, `safeFill()`) instead of calling `page.click()` / `page.fill()` directly. These helpers add retry/backoff and deterministic waits — raw calls are flaky under network jitter.
- Page object anatomy: **private locator getters** + **public action methods**. Never expose locators to step definitions — steps should call `await loginPage.submitWithCredentials(user, pass)`, not reach into selectors.
- Keep pages thin. If you're writing business logic in a page object, it probably belongs in `support/<domain>/`.

### 2. Locator priority (non-negotiable)

Always prefer, in this order:
1. `page.getByRole('button', { name: 'Submit' })`
2. `page.getByText('Welcome')`
3. `page.getByLabel('Email')`
4. `page.getByTestId('submit-btn')`
5. CSS / XPath — **only** when the above genuinely can't identify the element

Role-based locators are resilient to markup refactors and double as accessibility checks. CSS selectors rot the moment someone restyles a component.

### 3. Fixtures and builders

- **Static data** → `src/support/<domain>/fixtures/*.json`, loaded via a `FixtureLoader`-style utility. Example: `FixtureLoader.loadUserCredentials('validUser')`.
- **Dynamic data** → factory pattern (`UserBuilder`, `OrderBuilder`) in `src/support/<domain>/builders/`. Builders produce fresh objects with sensible defaults and allow `.with*()` overrides.
- Don't inline test data in step definitions. It balloons, gets copy-pasted, and drifts.

### 4. Shared browser + cached authentication (`CustomWorld`)

- A `CustomWorld` (Cucumber's World) holds `page`, `context`, `browser`, and `isAuthenticated`.
- The browser instance is **shared across scenarios** — don't relaunch per scenario; that's slow and wastes CI minutes.
- Login happens **once** via an `AuthenticationManager` that persists storage state to a file (e.g. `playwright/.auth/user.json`). Subsequent scenarios restore state instead of re-logging in.
- Scenarios that need to bypass this (login tests themselves, multi-user flows) are tagged `@skip-auto-login` and handle auth manually.

**Consequence when adding a test:** if your scenario needs a fresh unauthenticated session (login flow, session expiry, SSO), tag it `@skip-auto-login`. If it needs the normal logged-in user, do nothing — the hook handles it.

### 5. API mocking via a base class

- API mocks extend a generic `MockBase` (or `GraphQLMockBase`, `RestMockBase`) that centralizes route interception, response shaping, and optional delay/status injection.
- Don't call `page.route()` directly inside steps — it fragments mock state and makes failures hard to debug.
- Domain mock classes live in `src/support/<domain>/mocks/` and expose high-level methods like `mockUserListSuccess()`, `mockUserListEmpty()`.

### 6. Logging and redaction

- Use the buffered `Logger` from `support/shared/lib/`, not `console.log`. The logger prefixes scenario names, flushes to file, and supports redaction of sensitive values (`maybeRedact(password)`).
- ESLint typically blocks `console.log` — allow only `console.warn` / `console.error`.

---

## Test conventions

### Gherkin style

- Given / When / Then, not Arrange / Act / Assert.
- One scenario = one behavior. If a scenario has five `When`s, it's probably two scenarios.
- Use `Scenario Outline` + `Examples` for data-driven cases.
- Tag scenarios with:
  - `@skip-auto-login` when manual auth is needed
  - Domain tags (`@user-management`, `@login`)
  - Issue references (`@JIRA-1234`) when traceability matters

### Hooks lifecycle

Typical hook order (already wired up in `src/hooks/hooks.ts` — don't re-implement):
1. `BeforeAll` — create reports/screenshots directories
2. `Before` — init page/context, run auto-login unless `@skip-auto-login`
3. `After` — screenshot on failure, close page/context (**keep browser alive**)
4. `AfterAll` — close shared browsers, flush logger

### Parallelization

- Cucumber profiles in `cucumber.js` define serial + parallel variants (`chromium`, `chromium:parallel`).
- `PARALLEL_WORKERS` env var controls worker count (1–4 is usually the sweet spot — more than that, auth state contention and CPU starvation start hurting).

### Environment / config

- `.env` (gitignored) with `BASE_URL`, `HEADLESS`, timeout constants.
- `src/config/testConfig.ts` validates env vars on startup and exposes typed constants. Don't read `process.env` directly from steps — go through `testConfig`.
- Typical timeout defaults: `ACTION_TIMEOUT=15s`, `NAVIGATION_TIMEOUT=30s`, `SCENARIO_TIMEOUT=60s`. Raising these is usually a sign of a flaky locator, not a slow app.

---

## Workflow: adding a new E2E test

When the user asks for a new test, work through these steps in order. Skip steps only when the reused asset already exists.

1. **Classify the domain.** Does it belong to an existing `tests/<domain>/` folder, or is it a new domain? New domains get a new folder — don't cram unrelated features together.
2. **Create the feature file** at `src/tests/<domain>/<feature>/<feature>.feature`. Write Gherkin scenarios first; think about the behavior before the implementation.
3. **Create or extend the page object** under `src/pages/<domain>/<Thing>Page.ts`. Extend `BasePage`. Use `getByRole` first. Keep locators private.
4. **Write step definitions** at `src/tests/<domain>/<feature>/<feature>.steps.ts`. Steps should be thin: parse args, call a page object or support method, assert. No business logic.
5. **Add fixtures or builders** if the test needs data. Static → fixtures JSON. Dynamic → builder. Never inline.
6. **Add API mocks** (if applicable) in `src/support/<domain>/mocks/`, extending the mock base class.
7. **Tag the scenario.** Domain tag + `@skip-auto-login` if it touches auth flow. Issue ref if tracked.
8. **Run it** — execute the matching Cucumber profile (e.g. `npm run test -- --tags @new-tag`) and verify it passes. If it flakes, the first suspect is a CSS selector that should've been `getByRole`.

---

## Workflow: updating an existing E2E test

1. **Read the existing page object and steps before touching anything.** Half of "update" tasks can reuse existing methods — don't duplicate.
2. **Preserve the locator style.** If the rest of the file uses `getByRole`, don't introduce a CSS selector for your one addition.
3. **Don't duplicate fixtures or auth state.** If a fixture or builder covers your case, reuse it.
4. **If you're touching a shared page object, check who else uses it.** Grep for imports before renaming a public method.
5. **Re-run the full domain profile**, not just your one scenario — shared page objects can break neighbors.

---

## Anti-patterns (flag these, correct them)

- Raw `await page.click('.foo-bar')` in steps — use a page object + `safeClick` + `getByRole`.
- `console.log('user =', user)` — use the `Logger` with redaction.
- Inline test data duplicated across scenarios — pull into a fixture or builder.
- `page.route()` sprinkled in steps — use a mock class.
- Re-logging in at the start of every scenario — rely on the auth hook, or tag `@skip-auto-login` for exceptions.
- Scenarios with five `When`s — split them.
- New test files under `tests/helpers/` or `tests/utils/` — move them to the right `support/<domain>/` folder.
- Raising a timeout to paper over a flaky locator — fix the locator instead.

---

## Quick reference — what goes where

| If you're adding… | It goes in… |
|---|---|
| A Gherkin scenario | `src/tests/<domain>/<feature>/<feature>.feature` |
| Step definitions | `src/tests/<domain>/<feature>/<feature>.steps.ts` |
| A page object | `src/pages/<domain>/<Thing>Page.ts` (extends `BasePage`) |
| Static test data (JSON) | `src/support/<domain>/fixtures/` |
| A dynamic data factory | `src/support/<domain>/builders/` |
| An API mock | `src/support/<domain>/mocks/` (extends mock base) |
| A reusable helper | `src/support/shared/lib/` (only if cross-domain) |
| A Cucumber hook change | `src/hooks/hooks.ts` |
| A new env var | `.env.example` + `src/config/testConfig.ts` |
