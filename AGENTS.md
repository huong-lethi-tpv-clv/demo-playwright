TypeScript + Playwright + Cucumber.js E2E suite — BDD, Page Object Model, domain-organized.

## Project map

- `src/tests/<domain>/<feature>/` — `.feature` + `.steps.ts` pairs
- `src/pages/<domain>/` — page objects (extend `src/pages/shared/BasePage.ts`)
- `src/support/<domain>/` — fixtures, builders, seeders, mocks (per domain)
- `src/support/shared/` — `FixtureLoader`, `GraphQLMockBase`, `AuthenticationManager`, logger
- `src/hooks/hooks.ts` — `Before` / `After` / auto-login lifecycle
- `src/config/` — `CustomWorld`, `testConfig`, env validation

<important if="you need to run tests, typecheck, lint, format, generate reports, or discover available scripts">

| Command | What it does |
|---|---|
| `npm test` | Run all scenarios with the default Cucumber profile |
| `npm run test:chromium` | Run in Chromium (serial) |
| `npm run test:chromium:parallel` | Run in Chromium with parallel workers |
| `npm run test:firefox` | Run in Firefox (serial) |
| `npm run test:firefox:parallel` | Run in Firefox with parallel workers |
| `npm run test:parallel` | Run with 2 parallel workers (default profile) |
| `npm run test:tags -- '@login'` | Filter by tag expression (pass tag after `--`) |
| `npm run report` | Generate the multiple-cucumber HTML report from JSON output |
| `npm run clean` | Remove `reports/*` and `.tmp/*` |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint check on `src/**/*.ts` |
| `npm run lint:fix` | ESLint auto-fix |
| `npm run format` | Prettier write on `src/**/*.ts` |

A `PostToolUse` hook in `.github/hooks/typecheck-lint.json` auto-runs `typecheck && lint` after edits to `src/**/*.ts`; it only wakes the session on failure.
</important>

<important if="you are adding, modifying, or fixing any E2E test, page object, feature file, or step definition">
Consult the `e2e-playwright-cucumber` and `e2e-test-data-strategy` skills before making conventional decisions — they are the source of truth for layout, naming, and data primitives. Don't hand-roll patterns they already cover.
</important>

<important if="you are about to start authoring, implementing, or exploring a new E2E test, page object, or scenario">
**HARD PREREQUISITE — before any exploration, planning, or code edit:**

1. The developer MUST provide the **starting-point URL** — the exact page where the flow begins.
2. You MUST echo the URL back and get explicit confirmation ("Confirmed: I will start the exploration at `<url>`. Proceed? yes/no") before invoking `playwright-cli` or the `e2e-author` sub-agent.
3. If the URL is missing, STOP and ask. Do not guess from `BASE_URL` + a route name — guessing leads to exploring the wrong page and building a test against the wrong reality.
4. If the developer later says "start somewhere else," re-confirm the new URL the same way.
</important>

<important if="you are authoring a new E2E scenario end-to-end (explore → data strategy → implement → test → fix)">
Invoke the `e2e-author` sub-agent. It enforces the full pipeline and blocks source edits until a real `playwright-cli` evidence pack exists and a data strategy is approved.
</important>

<important if="you are interacting with a browser page in a step definition or page object (click, fill, navigate, wait)">
Use `BasePage` safe-action helpers (`safeClick`, `safeFill`, `waitForCondition`). Raw `page.click()` / `page.fill()` is forbidden because it flakes under network jitter.
</important>

<important if="you are writing or updating a Playwright locator">
Priority order: `getByRole` > `getByLabel` > `getByText` > `getByTestId` > CSS. CSS is last resort and must carry a one-line comment explaining why. Role-based locators survive markup refactors; CSS rots on restyle.
</important>

<important if="you are writing or editing a page object or a step definition">
Locators live **private** inside the page object. Steps call high-level action methods like `loginPage.submitWithCredentials(user, pass)` — they never reach into selectors directly.
</important>

<important if="you are adding, moving, or reviewing test data (values in .feature files, .steps.ts files, fixtures, builders, seeders, mocks)">
Never inline test data in `.feature` or `.steps.ts`. Route every value through `FixtureLoader`, a domain builder, a seeder, or a domain mock. The `e2e-test-data-strategy` skill contains the decision tree for picking which.
</important>

<important if="you are adding or editing an API mock (GraphQL or REST)">
Extend a domain mock class built on `GraphQLMockBase` (`src/support/shared/mocks/graphql-base.mock.ts`). Never call `page.route()` directly from a step file — scattered routes leak across scenarios.
</important>

<important if="you are authoring a login, logout, session-expiry, or multi-user scenario">
Tag it `@skip-auto-login` so the auto-login `Before` hook doesn't pre-authenticate and shadow the form. For every other scenario, trust the hook — don't re-authenticate manually.
</important>

<important if="you are creating entities (users, records) via a builder or seeder in a test">
Dynamic entities must survive parallel runs: builders use a unique suffix (pid + nanoid), seeders prefix every entity `e2e-<runId>-*`. Cleanup is best-effort in an `After` hook, never blocking.
</important>

<important if="you are investigating a flaky or failing test, or tempted to bump a timeout">
Do not raise timeouts to mask flakiness. Find the root cause: locator drift, missing wait condition, mock leakage, or data setup race. Re-run `playwright-cli` against the real app to see what changed — don't guess.
</important>

<important if="you have finished editing a test and need to verify it">
Run `npm run test:tags -- '@<your-tag>'` first. Only run the full `npm test` suite after the tagged run is green — full runs are slow and shouldn't gate a single-scenario change.
</important>
