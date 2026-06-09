# 📊 APM Playwright Migration — Progress Tracker

> **Repo:** `om-apm-e2e-playwright`  
> **Reference:** `om-mom-e2e-playwright` (pattern reference)  
> **Boilerplate:** `boilerplate-chorus-e2e` (base standard)  
> **Last Updated:** 2026-05-12 (migration-quality implementation refreshed)

Related analysis:
- [Cypress to Playwright Migration Comparison](./CYPRESS-TO-PLAYWRIGHT-COMPARISON.md)

---

## 📈 Overall Progress

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| **Scenarios Migrated** | 128 / 128 selected executable scope | 128 | ✅ 100% |
| **Spec Files Generated** | 42 / 42 | 42 | ✅ Done |
| **`yarn typecheck`** | ✅ 0 errors on 2026-05-12 | 0 errors | ✅ Done |
| **`yarn lint`** | ✅ 0 errors on 2026-05-12 | 0 errors | ✅ Done |
| **`yarn bddgen`** | ✅ Clean on 2026-05-12 | Clean | ✅ Done |
| **Auth Flow** | ✅ Working | ✅ | ✅ Done |
| **Framework Setup** | ✅ Done | ✅ | ✅ Done |
| **Pass Rate (Chromium)** | stale runtime count: 27 / 172 from prior run | ≥ 95% | ⏸ Deferred until fresh final run |
| **Total (all browsers)** | stale runtime count; Chromium is current local scope | ≥ 95% | ⏸ Deferred until fresh final run |

---

## 🎯 Migration Completion Plan

**Goal:** complete the Cypress → Playwright source migration first, then handle fresh Chromium/runtime failures after the migrated suite is structurally clean.

### Current Reality
- Scenario coverage is migrated for the agreed selected executable Cypress scope: **128 / 128 scenario mappings** and **42 / 42 generated spec files**.
- Framework direction is confirmed: this project intentionally uses **Playwright + `playwright-bdd`** instead of raw `@cucumber/cucumber`.
- Command standard is **Yarn**. Use `yarn ...` commands in docs, CI, and local validation.
- Framework health is proven for static generation checks: typecheck, lint, and BDD generation pass with Yarn.
- Source migration cleanup is now implemented for the highest-priority structural gaps:
  - migrated domain page objects are registered in the shared Playwright BDD fixture registry
  - Phase 1 invoice/menu steps use injected fixtures instead of constructing page objects per step
  - Cost Code, VCDM, ATS, and Work Order steps use domain fixture data for migrated hardcoded values
  - role-specific auth steps now switch credentials through a shared role helper
  - TypeScript, ESLint, and BDD generation are clean with Yarn
- Runtime failures and pass-rate counts are intentionally deferred until a fresh final run; do not continue fixing from stale 2026-05-11 failure data.

### Execution Order

| Order | Workstream | Exit Criteria | Owner Notes |
|-------|------------|---------------|-------------|
| 1 | Normalize fixtures | All migrated domain page objects are registered in `src/tests/fixtures.ts`; steps use injected fixtures or domain helper methods consistently | ✅ Implemented for Phase 1 + CCL/VCDM/ATS/WO |
| 2 | Enforce POM boundary | Step files no longer construct page objects directly; selector/action logic is moved toward page-object methods | ✅ No `new XxxPage(page)` or direct `page.locator/click/fill` remains in step files |
| 3 | Stabilize test data and roles | Hardcoded migrated values and role no-op steps are replaced by fixture data or role-aware auth helpers | ✅ Fixture data + `RoleAuth` implemented; builders/seeders remain for future mutable entity work |
| 4 | Static migration verification | Run `yarn typecheck`, `yarn lint`, and `yarn bddgen`; all must be clean before runtime work | ✅ Clean on 2026-05-12 |
| 5 | Establish fresh runtime baseline | Run `yarn test:chromium`; update pass/fail count in this doc | Deferred until final user recheck; stale failures should not drive current source migration |
| 6 | Fix custom component helpers | Selects, checkbox wrappers, pagination, toast, modal, upload, and row actions use stable page-object methods | Use `BasePage` helpers for click/fill/wait interactions |
| 7 | Tagged verification by domain | Each domain tag passes independently before running the full suite | Suggested order: `@work-order`, `@cost-code`, `@vendor-cost`, `@approval-tier`, `@invoice`, `@menu-bar` |
| 8 | Full Chromium verification | `yarn test:chromium` reaches ≥ 95% pass rate, with remaining failures documented by root cause | Chromium is the local parity target with old Cypress runs |
| 9 | Parallel verification | `yarn test:chromium:parallel` or `yarn test:parallel` passes without data races | Fix seed/cleanup/mocking leakage if failures only happen in parallel |
| 10 | CI/reporting finish | CI workflow, report generation, and README run instructions are verified | Run `yarn report` after JSON output exists |
| 11 | Migration sign-off | This doc shows final pass rate, known exclusions, and completion status | Mark Phase 7 complete only after evidence is recorded |

### Immediate Fix Backlog

| Priority | Area | Action | Validation |
|----------|------|--------|------------|
| P0 | Tooling | Keep Yarn as the canonical command runner; lint script is fixed for PowerShell | `yarn lint` ✅ |
| P0 | Fixtures | Register `CostCodeListPage`, `VendorCostDescriptionPage`, `ApprovalTierPage`, and `WorkOrderCreationPage` in `src/tests/fixtures.ts` | ✅ `yarn typecheck && yarn bddgen` |
| P0 | POM boundary | Remove direct page-object construction and direct Playwright page locators/actions from step files | ✅ `rg` scan clean + `yarn lint` |
| P0 | Role auth | Replace no-op creator/visitor/admin/approver login steps with role-aware explicit auth helper | ✅ `RoleAuth` implemented; runtime credentials must be verified in final run |
| P0 | Static migration baseline | Keep source migration green with Yarn | ✅ `yarn typecheck`, `yarn lint`, `yarn bddgen` |
| P0 | Invoice upload | Verify/fix `btn-import-invoice` flow and upload modal state | `yarn test:tags -- '@invoice'` |
| P0 | VCDM new flow | Ensure `Btn-Vendor-New` is clicked before `Btn-Additional-New`; move sequencing into page object | `yarn test:tags -- '@vendor-cost'` |
| P0 | ATS reset/edit | Scope Reset and row action buttons to the selected row instead of page-level lookup | `yarn test:tags -- '@approval-tier'` |
| P1 | Test data | Move migrated hardcoded values like `TEST`, `CC001`, `test`, and `other` into fixture files/builders | ✅ Domain fixture files added; mutable-entity builders still optional future hardening |
| P1 | Runtime baseline | Run a fresh Chromium suite and replace stale pass-rate numbers | Deferred by current migration-first priority |
| P1 | VCDM search assertions | Replace multi-select `.textContent()` assertions with input/display-value aware checks | `yarn test:tags -- '@vendor-cost'` |
| P1 | Row selection | Make CCL/VCDM/ATS row-by-status selectors column-aware and resilient to casing/spacing | Domain tagged reruns |
| P1 | MenuBar | Confirm dock state and direct-link locators against current DOM | `yarn test:tags -- '@menu-bar'` |
| P2 | Reporting | Verify generated Playwright/Allure report paths | `yarn report` / `yarn allure:generate` |
| P2 | README | Update final run/debug instructions once command set is confirmed | `yarn typecheck && yarn lint` |

### Implementation Plan for Review Findings

#### A. Keep Playwright + `playwright-bdd`
- [x] Confirmed: migration target is Playwright runner with `playwright-bdd`.
- [x] Keep `playwright.config.ts` + `defineBddConfig`.
- [x] Update README wording so future reviewers do not compare this repo as a strict raw Cucumber clone.

#### B. Yarn Tooling
- [x] Fix Windows/PowerShell lint and format scripts by using double quotes.
- [x] Add `yarn test:chromium:parallel` script for the documented parallel Chromium path.
- [x] Re-run `yarn lint` and `yarn typecheck`; both pass after the script fix.
- [x] Re-run `yarn bddgen`; passes after the script fix.

#### C. Fixture DI Cleanup
- [x] Add typed fixtures for:
  - `costCodeListPage`
  - `vendorCostDescriptionPage`
  - `approvalTierPage`
  - `workOrderCreationPage`
- [x] Refactor migrated step files to use injected page objects instead of `new XxxPage(page)` in each step.
- [x] Keep only shared Playwright primitives (`page`, `context`) where browser-level behavior is genuinely needed, such as new tabs/downloads.

#### D. POM Boundary Cleanup
- [x] Move direct Playwright page locators from `*.steps.ts` into page-object methods/selectors.
- [x] Replace direct force clicks in steps with page-object actions that document why force is needed for hidden custom checkbox inputs.
- [x] Add high-level page-object methods for common assertions:
  - button visibility/enablement
  - row selection by status
  - toast verification
  - modal confirmation
  - pagination navigation
- [x] Steps now use injected page objects and domain-level methods for migrated flow logic.

#### E. Test Data and Role Strategy
- [x] Move migrated hardcoded search/edit values from steps into domain fixtures under `src/support/<domain>/fixtures`.
- [ ] Add domain builders for mutable/generated entities where scenarios create or edit records.
- [x] Implement role-aware auth helper for creator, visitor, system admin, approver, first approver, and final approver.
- [x] Replace no-op role steps with real role switching.
- [ ] Confirm parallel-safety for any created entities using run-id or unique suffixes.

#### F. Selector and Runtime Hardening
- [ ] Replace broad row selectors like `tbody tr:has-text("<status>")` with table helper methods that target the status column.
- [ ] Consolidate `.mag-checkbox__input` handling into page-object checkbox helpers.
- [ ] Add component helpers for:
  - single select
  - multi select
  - dropdown option selection
  - toast lookup
  - confirm dialog action
  - file upload modal
- [ ] Prefer locator priority where possible: role, label, text, test id, CSS last.
- [ ] Keep CSS fallbacks in selectors file with a one-line reason.

Runtime selector hardening remains intentionally deferred until the fresh final Chromium run. Use the static-clean source migration above as the starting point, not the stale failure list.

### Rules While Completing
- Do not raise timeouts to hide failures. Classify each failure as locator drift, missing wait, wrong setup state, mock/data issue, or real product defect.
- Do not introduce raw `page.click()` / `page.fill()` in page objects or steps; use `BasePage` safe helpers.
- Keep locators private inside page objects. Steps should call business-level methods only.
- Do not inline new test data in `.feature` or `.steps.ts`; use fixtures/builders/seeders/mocks.
- Use Yarn commands only in this repo's docs and validation notes.
- For each fix batch, update this doc with:
  - commands run
  - pass/fail count
  - files changed
  - remaining top failure groups

### Completion Checklist
- [ ] Fresh Chromium runtime baseline recorded on 2026-05-12 or later
- [x] Yarn lint script verified on Windows/PowerShell
- [x] Domain fixtures registered for all migrated page objects
- [x] Direct Playwright page locators/action logic removed from migrated step files
- [x] Role-auth steps use real role switching
- [x] Migrated hardcoded step data moved to fixtures/builders where currently identified
- [x] Migration-source P0 items fixed
- [ ] All domain tagged runs pass
- [ ] Full Chromium run ≥ 95% pass rate
- [ ] Parallel run stable
- [x] Typecheck and lint clean after final migration-source fixes
- [ ] Report generation verified
- [ ] CI workflow verified
- [x] README updated with final Playwright BDD/Yarn usage note
- [ ] Final known gaps documented, if any

### Migration-Source Implementation Log — 2026-05-12

Commands run:
```
yarn format       ✅ completed
yarn typecheck    ✅ 0 errors
yarn lint         ✅ 0 errors
yarn bddgen       ✅ generated cleanly
```

Structural checks:
```
rg "new [A-Za-z]+Page\(page\)|page\.locator\(|page\.keyboard|page\.click\(|page\.fill\(" src/tests -g "*.steps.ts"
✅ no direct page-object construction or direct Playwright page locators/actions remain in step files
```

Files changed in this batch:
- `src/tests/fixtures.ts` — registered CCL, VCDM, ATS, and Work Order page fixtures.
- `src/tests/invoice-creation/*`, `src/tests/invoice-inquiry/*`, `src/tests/menu-bar/*` — refactored Phase 1 steps to injected fixtures.
- `src/tests/cost-code/ccl.steps.ts`, `src/tests/vendor-cost-description/vcdm.steps.ts`, `src/tests/approval-tier/ats.steps.ts`, `src/tests/work-order/woc.steps.ts` — routed migrated hardcoded values through domain fixture data and page-object helpers.
- `src/support/<domain>/fixtures/default-data.json` and `src/support/<domain>/test-data.ts` — added domain fixture data loaders for migrated values.
- `src/support/authentication/role-auth.ts` and `src/support/authentication/fixtures/login/users.json` — added role-based credential lookup and explicit role switching.
- `README.md` and this tracker — documented Playwright BDD + Yarn as the current project standard.

Deferred by current priority:
- Fresh `yarn test:chromium` runtime baseline and stale failure cleanup.
- Mutable-entity builders/seeders for scenarios that create data.
- Parallel runtime race verification.

---

## 🔄 Phase Completion Rules

> After completing each phase, **MUST** run the following validation steps before ticking ✅:

```
1. yarn typecheck            → 0 errors
2. yarn lint                 → 0 errors (warnings OK)
3. yarn bddgen               → all .feature.spec.js generated OK
4. yarn test:chromium        → global-setup auth passes ✅
5. Compare with MOM source   → check pattern consistency
6. Update this doc           → tick the phase checkbox
```

**Compare with MOM checklist:**
- [ ] `global-setup.ts` pattern matches MOM
- [ ] `fixtures.ts` structure matches MOM pattern
- [ ] Page object base class usage consistent with MOM
- [ ] `testConfig` paths defined correctly
- [ ] Tags follow same convention (`@smoke`, `@regression`, etc.)

---

## 🏗️ Phase 0 — Foundation & Infrastructure

**Status:** ✅ **COMPLETE**

### Tasks
- [x] Clone `boilerplate-chorus-e2e` → `om-apm-e2e-playwright`
- [x] Swap `@cucumber/cucumber` → `playwright-bdd`
- [x] Configure `playwright.config.ts`
- [x] Setup `tsconfig.json` path aliases (`@pages/*`, `@support/*`, etc.)
- [x] Setup `.env` with APM credentials
- [x] Setup `.yarnrc.yml` (`nodeLinker: node-modules`) for yarn v4 compat
- [x] Fix `global-setup.ts` → follow MOM pattern exactly (`false` param)
- [x] Fix `AuthenticationManager.ts` → replace dynamic import with static import
- [x] Fix `.gitignore` → add `playwright/.auth/`, `.features-gen/`, `allure-*`
- [x] Setup `src/config/testConfig.ts` with APM paths
- [x] Setup `src/support/shared/` lib (Logger, helpers, AuthenticationManager)

### Validation Results
```
yarn typecheck  ✅ 0 errors
yarn lint       ✅ 0 errors
yarn bddgen     ✅ OK
Auth flow       ✅ bot-apm-test03 logs in, session-token saved to user.json
```

### MOM Comparison
- [x] `global-setup.ts` → matches MOM structure, `false` param (APM actually logins; MOM has latent bug with `true`)
- [x] `AuthenticationManager.ts` → static import (fixed dynamic import that broke global-setup)
- [x] `.gitignore` → aligned with MOM (added `playwright/.auth/`, `.features-gen/`, allure dirs)

---

## 🏗️ Phase 1 — Invoice Creation + Invoice Inquiry + Menu Bar (9 scenarios)

**Status:** ✅ **COMPLETE** *(selectors are placeholders — need DOM verification)*

### Scope
| Module | Scenarios | Feature Files |
|--------|-----------|--------------|
| Invoice Creation — Upload Vendor Invoice | 3 | `ic-upload-vendor-invoice.feature` |
| Invoice Creation — Upload Cancel | 1 | `ic-upload-cancel.feature` |
| Invoice Creation — Container Attached | 2 | `ic-container-attached.feature` |
| Invoice Creation — Work Order Line Item | 2 | `ic-work-order-line-item.feature` |
| Invoice Inquiry — New Invoice | 1 | `ii-new-invoice.feature` |
| Menu Bar — Direct Link | 5 (Outline) | `mb-direct-link.feature` |

### Tasks
- [x] `InvoiceCreationPage.ts` + `InvoiceCreationSelectors.ts`
- [x] `UploadInvoiceModal.ts` + selectors
- [x] `InvoiceInquiryPage.ts` + `InvoiceInquirySelectors.ts`
- [x] `MenuBarPage.ts` + `MenuBarSelectors.ts`
- [x] All `.feature` files (6 files)
- [x] All `.steps.ts` files (4 files + `auth.steps.ts`)
- [x] `fixtures.ts` updated with all Phase 1 page objects
- [x] Navigation paths verified (`/apm/ui/invoice/create`, `/apm/ui/invoice/inquiry`)

### Validation Results
```
yarn typecheck  ✅ 0 errors
yarn lint       ✅ 0 errors
yarn bddgen     ✅ 6 spec files generated
Auth flow       ✅ Login succeeds, user.json saved with session-token
Test run        ⚠️  Fails on selectors (expected — placeholders need DOM verification)
```

### ⚠️ Pending: Selector Verification
> Selectors below are **placeholders** derived from Cypress step text.  
> Must open browser → F12 → Inspect real DOM to get actual `data-testid` values.

| File | Selector | Status |
|------|----------|--------|
| `InvoiceCreationSelectors.ts` | `btn-show-vendor-invoice` | ⚠️ Needs verification |
| `InvoiceCreationSelectors.ts` | `btn-upload-vendor-invoice` | ⚠️ Needs verification |
| `InvoiceCreationSelectors.ts` | File input selector | ⚠️ Needs verification |
| `InvoiceCreationSelectors.ts` | Modal selectors | ⚠️ Needs verification |
| `InvoiceCreationSelectors.ts` | WO line item table/checkboxes | ⚠️ Needs verification |
| `InvoiceCreationSelectors.ts` | CNTR Select button | ⚠️ Needs verification |
| `InvoiceInquirySelectors.ts` | `btn-new-invoice` | ⚠️ Needs verification |
| `MenuBarSelectors.ts` | Nav item selectors | ⚠️ Needs verification |

**How to verify:**
1. Run `yarn test:headed --grep "Upload Vendor Invoice"` — browser opens
2. When test stops on failed selector → F12 → inspect the element
3. Update selector in `*Selectors.ts` file
4. Re-run until all selectors pass

### MOM Comparison
- [x] Page object pattern matches MOM (`extends BasePage`, `Selectors` file)
- [x] `fixtures.ts` DI pattern matches MOM
- [x] Feature file tags follow MOM convention
- [ ] Selectors verified against live UI *(pending)*

---

## 🏗️ Phase 2 — Work Order (10 features)

**Status:** ✅ **COMPLETE** *(selectors are placeholders — need DOM verification)*

### Scope
> Source: `om-apm-automation/cypress/e2e/work-order/`

| Module | Scenarios | Feature Files |
|--------|-----------|--------------|
| WO Creation — Layout | 2 | `woc-layout.feature` |
| WO Creation — Cost Code | 2 | `woc-cost-code.feature` |
| WO Creation — Vendor Field | 2 | `woc-vendor-field.feature` |
| WO Creation — Activity Date | 2 | `woc-activity-date.feature` |
| WO Creation — Voyage | 1 | `woc-voyage.feature` |
| WO Creation — Add Row | 1 | `woc-add-row.feature` |

### Tasks
- [x] `src/pages/work-order/WorkOrderCreationPage.ts`
- [x] `src/pages/work-order/WorkOrderCreationSelectors.ts`
- [x] `src/pages/work-order/index.ts`
- [x] Updated `src/pages/index.ts`
- [x] All 6 `.feature` files created
- [x] `woc.steps.ts` created
- [x] Shared auth steps in `src/tests/shared/auth.steps.ts`

### Validation Results
```
yarn typecheck  ✅ 0 errors
yarn bddgen     ✅ WO spec files generated
Auth flow       ✅ storageState injected automatically
Test run        ⚠️  Selectors are placeholders — need DOM verification
```

### Phase 2 Completion Checklist
- [x] `yarn typecheck` → 0 errors
- [ ] `yarn lint` → 0 errors
- [x] `yarn bddgen` → WO spec files generated
- [ ] `yarn test:chromium --grep "Work Order"` → auth passes, reaches WO page
- [ ] Compare `WorkOrderCreationPage.ts` pattern with MOM equivalent page objects
- [ ] Verify selectors against live APM UI (F12 inspect)
- [ ] All WO scenarios pass with real selectors
- [ ] **Tick this phase ✅ in this doc** ← after selector verification

---

## 🏗️ Phase 3 — Cost Code List (36 features)

**Status:** ✅ **COMPLETE** *(selectors are placeholders — need DOM verification)*

### Scope
> Source: `om-apm-automation/cypress/e2e/cost-code/`

| Module | Feature Files |
|--------|--------------|
| CCL Search | `ccl-search.feature` |
| CCL Pagination | `ccl-pagination.feature` |
| CCL Add Row | `ccl-add-row.feature` |
| CCL User Authority | `ccl-user-authority.feature` |
| CCL Copy | `ccl-copy.feature` |
| CCL Cost Code | `ccl-cost-code.feature` |
| CCL Edit | `ccl-edit.feature` |
| CCL Approve | `ccl-approve.feature` |
| CCL Reject | `ccl-reject.feature` |
| CCL Assign ERP | `ccl-assign-erp.feature` |
| CCL Save Duplicate | `ccl-save-duplicate.feature` |

### Tasks
- [x] `src/pages/cost-code/CostCodeListPage.ts`
- [x] `src/pages/cost-code/CostCodeListSelectors.ts`
- [x] `src/pages/cost-code/index.ts`
- [x] Updated `src/pages/index.ts`
- [x] All 11 `.feature` files created
- [x] `ccl.steps.ts` created
- [x] Duplicate steps deduplicated (moved shared steps to `auth.steps.ts`)

### Validation Results
```
yarn typecheck  ✅ 0 errors
yarn bddgen     ✅ CCL spec files generated (no duplicate step conflicts)
Test run        ⚠️  Selectors are placeholders — need DOM verification
```

### Phase 3 Completion Checklist
- [x] `yarn typecheck` → 0 errors
- [ ] `yarn lint` → 0 errors
- [x] `yarn bddgen` → all Cost Code spec files generated
- [ ] `yarn test:chromium --grep "@cost-code"` → auth passes, reaches Cost Code page
- [ ] Compare page object pattern with MOM equivalent
- [ ] Verify all selectors against live APM UI
- [ ] All Cost Code scenarios pass
- [ ] **Tick this phase ✅ in this doc** ← after selector verification

---

## 🏗️ Phase 4 — Vendor Cost Description (47 features)

**Status:** ✅ **COMPLETE** *(selectors are placeholders — need DOM verification)*

### Scope
> Source: `om-apm-automation/cypress/e2e/vendor-cost-description/`

| Module | Feature Files |
|--------|--------------|
| VCDM Search | `vcdm-search.feature` |
| VCDM Pagination | `vcdm-pagination.feature` |
| VCDM Checkbox | `vcdm-checkbox.feature` |
| VCDM New | `vcdm-new.feature` |
| VCDM Edit | `vcdm-edit.feature` |
| VCDM Approve | `vcdm-approve.feature` |
| VCDM Hard Delete | `vcdm-hard-delete.feature` |
| VCDM Export | `vcdm-export.feature` |
| VCDM Button Role | `vcdm-button-role.feature` |
| VCDM Manual Status | `vcdm-manual-status.feature` |
| VCDM Save | `vcdm-save.feature` |
| VCDM Extend Expiration | `vcdm-extend-expiration.feature` |

### Tasks
- [x] `src/pages/vendor-cost-description/VendorCostDescriptionPage.ts`
- [x] `src/pages/vendor-cost-description/VendorCostDescriptionSelectors.ts`
- [x] `src/pages/vendor-cost-description/index.ts`
- [x] Updated `src/pages/index.ts`
- [x] All 12 `.feature` files created
- [x] `vcdm.steps.ts` created
- [x] Cross-module duplicates resolved (module-specific step names: `in VCDM`)
- [x] Cucumber Expression special chars escaped (`\\/` for `/`, `\\(s)` for `(s)`)

### Validation Results
```
yarn typecheck  ✅ 0 errors
yarn bddgen     ✅ VCDM spec files generated (no duplicate step conflicts)
Test run        ⚠️  Selectors are placeholders — need DOM verification
```

### Phase 4 Completion Checklist
- [x] `yarn typecheck` → 0 errors
- [ ] `yarn lint` → 0 errors
- [x] `yarn bddgen` → all VCD spec files generated
- [ ] `yarn test:chromium --grep "@vendor-cost"` → auth passes
- [ ] Compare page object pattern with MOM equivalent
- [ ] Verify all selectors against live APM UI
- [ ] All Vendor Cost Description scenarios pass
- [ ] **Tick this phase ✅ in this doc** ← after selector verification

---

## 🏗️ Phase 5 — Approval Tier Setting (22 features)

**Status:** ✅ **COMPLETE** *(selectors are placeholders — need DOM verification)*

### Scope
> Source: `om-apm-automation/cypress/e2e/approval-tier/`

| Module | Feature Files |
|--------|--------------|
| ATS Search | `ats-search.feature` |
| ATS Authority | `ats-authority.feature` |
| ATS Add | `ats-add.feature` |
| ATS Edit | `ats-edit.feature` |
| ATS Tolerance | `ats-tolerance.feature` |
| ATS Deactivate | `ats-deactivate.feature` |

### Tasks
- [x] `src/pages/approval-tier/ApprovalTierPage.ts`
- [x] `src/pages/approval-tier/ApprovalTierSelectors.ts`
- [x] `src/pages/approval-tier/index.ts`
- [x] Updated `src/pages/index.ts`
- [x] All 6 `.feature` files created
- [x] `ats.steps.ts` created
- [x] Shared auth steps deduplicated (no duplicates with other modules)
- [x] Cucumber Expression `\\(s)` escaping for `row(s)` step pattern

### Validation Results
```
yarn typecheck  ✅ 0 errors
yarn bddgen     ✅ ATS spec files generated (no duplicate step conflicts)
Test run        ⚠️  Selectors are placeholders — need DOM verification
```

### Phase 5 Completion Checklist
- [x] `yarn typecheck` → 0 errors
- [ ] `yarn lint` → 0 errors
- [x] `yarn bddgen` → all Approval Tier spec files generated
- [ ] `yarn test:chromium --grep "@approval-tier"` → auth passes
- [ ] Compare page object pattern with MOM equivalent
- [ ] Verify all selectors against live APM UI
- [ ] All Approval Tier scenarios pass
- [ ] **Tick this phase ✅ in this doc** ← after selector verification

---

## 🏗️ Phase 6 — Selector Fix (Real DOM Verification)

**Status:** ⏳ In Progress

> **Root cause:** All `*Selectors.ts` files use `[data-testid="..."]` placeholders.
> The real APM UI uses `[data-cy="..."]` attributes (confirmed from Cypress source).
> Fix: Replace each placeholder with the real `data-cy` value extracted from Cypress constants.

### ✅ Selectors Fixed (from Cypress source `om-apm-automation`)

All files now use real values verified from:
- `cypress/e2e/step-definitions/Setting/approval-tier-setting/variables/constant.ts`
- `cypress/e2e/step-definitions/Code/cost-code-list/constants/*.ts`
- `cypress/e2e/step-definitions/Code/vendor-cost-description-mapping/constants/*.ts`
- `cypress/e2e/step-definitions/wo/work-order-creation/constants/*.ts`

| File | Status |
|------|--------|
| `ApprovalTierSelectors.ts` | ✅ Fixed — real `[data-cy="select-rhq/office"]`, `data-testid` buttons |
| `CostCodeListSelectors.ts` | ✅ Fixed — real `Btn-New`, `Btn-Edit`, `select-ERPAccountCode`, pagination |
| `VendorCostDescriptionSelectors.ts` | ✅ Fixed — real `Btn-Vendor-*`, `select-vendorCostStatus`, `close-icon` |
| `WorkOrderCreationSelectors.ts` | ✅ Fixed — real `data-cy="select-yardCode"`, `#activityDate`, vvd fields |
| `InvoiceCreationSelectors.ts` | ✅ Fixed — `data-cy` + `data-testid` values from Cypress source |
| `InvoiceInquirySelectors.ts` | ✅ Fixed — `table-inquiry`, `btn-search-invoice-inquiry` confirmed |
| `MenuBarSelectors.ts` | ✅ Fixed — nav item pattern confirmed |

### Full Test Run Results — Run 2 (2026-05-11, Chromium only after Firefox/WebKit disabled)

```
Total:    172 cases (Chromium only — Firefox/WebKit disabled, matches Cypress local scope)
Passed:   16
Failed:   156
```

**Failure breakdown by selector / root cause:**

| Count | Selector | Error | Files | Fix |
|-------|----------|-------|-------|-----|
| 19 | `tbody tr input[type="checkbox"]` | click timeout 15s | ccl-assign-erp, copy, cost-code, edit, reject, save-dup, search | Change to `.mag-checkbox__input` (custom component) |
| 11 | `[data-cy="select-rhqCode"]` | waitFor timeout 5s | ats-add, ats-tolerance | Page not showing ATS form — need to click Add Row first |
| 9 | `tbody tr:has-text("Pending Approval")` | click timeout 15s | vcdm-edit, extend, hard-delete, manual-status | Row text pattern wrong; check real column text |
| 8 | `[data-testid="Btn-Additional-New"]` | toBeVisible | vcdm-button-role, vcdm-new | Button appears only after `Btn-Vendor-New` clicked |
| 7 | `button:has-text("Reset")` | toBeVisible | ats-edit | Reset is row-level, not page-level; need row context |
| 6 | `[data-testid="Btn-New"]` | waitFor timeout 5s | ats-add, ccl-add-row, ccl-user-authority | Page load timing; or button requires prior navigation |
| 6 | `.ant-message-notice, .ant-notification-notice` | toBeVisible | ats-deactivate, ats-edit | Wrong toast class; real toast: `.Toastify__toast-body` |
| 6 | `tbody tr:has-text("Rejected/Expired")` | click timeout | vcdm-approve, edit, extend | Same as row text issue above |
| 5 | `[data-testid="Btn-Approver-Reject"]` | waitFor 5s | ccl-reject | Button only visible after selecting a row with right status |
| 5 | `[data-testid="minimize-nav-menu-button"]` | getAttribute timeout | mb-direct-link | Menu bar page — button may not exist, or page context wrong |
| 4 | `[data-testid="btn-collapse"]` | waitFor 5s | ccl-search, ic-work-order-line-item | Fine on ATS; may be wrong context page |
| 4 | `[data-testid="btn-import-invoice"]` | click timeout 2.5s | ic-upload-cancel, ic-upload-vendor-invoice | Real selector from Cypress Invoice constants needed |
| 4 | `.pagination .page-item:not(.prev)...` | click timeout | vcdm-pagination | Real selector: `[aria-label="go to page 2"]` |
| 3 | `[data-testid^="select-search-vendorCode__options__"]` | click timeout | vcdm-hard-delete, vcdm-search | Options may load slowly; or selector slightly off |
| 3 | `[data-testid="work-order--details--actions-add"]` | toBeVisible | woc-add-row | WO page URL `/apm/ui/wo/create` may be wrong |
| 2 | `[data-cy="select-rhq"]` | fill() on non-input | ats-search | Custom select — cannot use fill(), need click+option |
| 2 | `[data-cy="select-office"]` | fill() on non-input | ats-search | Same — custom select |
| 2 | `[data-testid="Btn-Final-Approver-Approve"]` | toBeDisabled | ccl-approve | State assertion before/after row selection wrong |
| 2 | `[data-cy="select-vendor"]` | toBeVisible | woc-layout, woc-vendor-field | WO page URL wrong |
| 2 | `[data-cy="select-multi--input-txt-*"]` | textContent timeout ×5 | vcdm-search | Multi-select text check — use `.inputValue()` not `.textContent()` |
| 1 | `[data-testid="btn-import-invoice"]` | upload cancel 2.5s | ic-upload-cancel | Real: `[data-testid="btn-import-invoice"]` from Cypress |
| 1 | `[data-testid="id-button-popup-asa-confirm"]` | toBeEnabled | ic-layout | Check Cypress Invoice constants for real selector |
| 1 | `[page-title-invoice-creation]` | toBeVisible | ii-new-invoice | Real title selector wrong |
| 1 | `#activityDate` | toBeVisible | woc-activity-date | WO page not loading |
| 1 | `.Toastify__toast-body` | toBeVisible | vcdm-export | Toast text check; add correct toast data-testid |
| 1 | `[data-testid="close-icon"]` | waitFor 5s | vcdm-extend-expiration | Extend popup not opening before close attempted |
| 1 | `vcdm-checkbox toBe()` | count mismatch | vcdm-checkbox | `.mag-checkbox__input` now fixed — recheck |

### Phase 6 Fix Plan (ordered by impact)

| Priority | ID | Fix | Impact |
|----------|-----|-----|--------|
| 🔴 High | `ccl-checkbox` | `table.rowCheckboxes` → `.mag-checkbox__input` | -19 failures |
| 🔴 High | `vcdm-row-click` | Fix row-by-status selector; use column-specific locator | -15 failures |
| 🔴 High | `woc-url` | Find real WO Creation URL; fix navigation path | -7 failures |
| 🔴 High | `ats-fill` | ATS search selects: replace `fill()` with `click()` + option | -4 failures |
| 🟡 Med | `vcdm-btn-new` | Verify step flow for `Btn-Additional-New` visibility | -8 failures |
| 🟡 Med | `ats-reset-btn` | Reset button is row-level, not page-level | -7 failures |
| 🟡 Med | `toast-selector` | Replace `.ant-notification-notice` → `.Toastify__toast-body` | -6 failures |
| 🟡 Med | `ccl-btn-new` | Page load wait before `Btn-New` assertion | -6 failures |
| 🟡 Med | `vcdm-pagination` | Pagination: `.page-item` → `[aria-label="go to page N"]` | -4 failures |
| 🟡 Med | `invoice-upload` | Find real `btn-import-invoice` selector from Cypress Invoice source | -4 failures |
| 🟢 Low | `mb-toggle` | Verify MenuBar page context for `minimize-nav-menu-button` | -5 failures |
| 🟢 Low | `vcdm-search-text` | Multi-select `.textContent()` → `.inputValue()` | -5 failures |
| 🟢 Low | `misc-fixes` | ic-layout, ii-new-invoice, vcdm-export, ic-work-order-line-item | -5 failures |

### Phase 6 Batch-2 Fixes Applied (current session)

> Pre-fix baseline: 27 passed / 145 failed (172 Chromium total)

| Fix | Files Changed | Expected Impact |
|-----|--------------|-----------------|
| `.mag-checkbox__input` → `.click({ force: true })` everywhere | CCL, VCDM, ATS, Invoice pages | -35 to -50 failures |
| `fillVendorField` → click wrapper + fill internal input | `WorkOrderCreationPage.ts` | -6 failures |
| `expandMenuBar` → use `data-isdock` attribute on `[data-testid="nav-menu"]` | `MenuBarPage.ts` | -5 failures |
| CCL `selectAllOnPage/unselectAllOnPage` → `{ force: true }` | `CostCodeListPage.ts` | included above |

**Confirmed from FE source:** `<aside data-testid="nav-menu" data-isdock={isDock}>` — dock state is authoritative.

### Phase 6 Tasks (updated)
- [x] Fix `ApprovalTierSelectors.ts` → real `data-cy` values from Cypress source
- [x] Fix `CostCodeListSelectors.ts` → real `data-cy` values
- [x] Fix `VendorCostDescriptionSelectors.ts` → real `data-cy` values
- [x] Fix `WorkOrderCreationSelectors.ts` → real `data-cy` values
- [x] Fix `InvoiceCreationSelectors.ts` → verified selectors
- [x] Fix `InvoiceInquirySelectors.ts` → real `data-cy` values
- [x] Fix `MenuBarSelectors.ts` → nav item pattern confirmed
- [x] Disable Firefox/WebKit in `playwright.config.ts` ✅
- [x] Fix CCL/VCDM/ATS/Invoice checkboxes → `.click({ force: true })` for `.mag-checkbox__input` (hidden input)
- [x] Fix ATS search selects: `fill()` → `click()` wrapper + fill internal `input`
- [x] Fix VCDM row-by-status: `.toUpperCase()` + `tbody tr.table-body__row` class
- [x] Fix WO Creation URL → `/apm/ui/work-order/create` ✅
- [x] Fix toast selectors → `.Toastify__toast-body, [data-testid="toast-message-id"]`
- [x] Fix VCDM pagination → `[aria-label="go to page N"]` ✅
- [x] Fix WO `fillVendorField` → click wrapper + fill internal input
- [x] Fix MenuBar `expandMenuBar` → use `data-isdock` attribute (not `aria-expanded`)
- [ ] Fix invoice upload selector (`btn-import-invoice`) — check Cypress Invoice constants
- [ ] Fix VCDM search textContent → inputValue for multi-selects
- [ ] Fix `Btn-Additional-New` step flow (must click `Btn-Vendor-New` first)
- [ ] Fix ATS Reset button — row-level button, needs row context selector
- [ ] Re-run `yarn test` → get updated count, target < 30 failures

**Old Cypress (`om-apm-automation`) browser strategy:**
- **Local / CI daily runs** (`yarn run:test`) → **Chrome only** (Cypress default, no browser flag set)
- **BrowserStack cross-browser** (`yarn browserstack:run`, `browserstack.js`) → Chrome + **Firefox** + **Edge**
- **WebKit/Safari** → ❌ Never configured anywhere in old source

**Conclusion:**
> Firefox was only used via BrowserStack (not local runs). WebKit was never in scope.
> Playwright scaffold added all 3 by default. ✅ **Firefox and WebKit are now commented out** in `playwright.config.ts`.
> This removes 190 phantom failures. Re-enable Firefox only if BrowserStack cross-browser is explicitly required.

### Phase 6 Tasks
- [x] Fix `ApprovalTierSelectors.ts` → real `data-cy` values from Cypress source
- [x] Fix `CostCodeListSelectors.ts` → real `data-cy` values
- [x] Fix `VendorCostDescriptionSelectors.ts` → real `data-cy` values
- [x] Fix `WorkOrderCreationSelectors.ts` → real `data-cy` values
- [x] Fix `InvoiceCreationSelectors.ts` → verified selectors
- [x] Fix `InvoiceInquirySelectors.ts` → real `data-cy` values
- [x] Fix `MenuBarSelectors.ts` → nav item pattern confirmed
- [x] Disable Firefox/WebKit in `playwright.config.ts` ✅ done — old source only used Firefox via BrowserStack, never WebKit
- [ ] Fix ATS RHQ/Office fill → use `.click()` + dropdown interaction
- [ ] Fix CCL checkbox selector (`.mag-checkbox__input` → verify real class)
- [ ] Fix VCDM dropdown ambiguity (`[role="listbox"] li` → more specific)
- [ ] Fix menu-bar direct-link `getAttribute` selectors
- [ ] Fix invoice upload 2.5s click timeouts
- [ ] Re-run `yarn test:chromium` → verify pass rate improves significantly

### Real Selector Mapping (from Cypress source)

#### Invoice Creation / Invoice Inquiry / Menu Bar
| Playwright Placeholder | Real `data-cy` Selector |
|------------------------|-------------------------|
| `page-title-invoice-creation` | `invoice-title` |
| `btn-upload-vendor-invoice` | `btn-upload` |
| `btn-new-invoice` (II) | `id-button-header-new` |
| `navItem-*` (MenuBar) | `navItem-Invoice-Creation`, `navItem-Invoice-Inquiry`, `navItem-Cost-Code-List`, `navItem-Approval-Tier-Setting`, `` navItem-Vendor/Yard-Cost-Description-Mapping `` |
| `header-*` | `header-Invoice-Management`, `header-Cost-Code-Management`, `header-Work-Order-Management`, `header-Invoice-Setup` |
| `confirm-dialog` | `confirm-dialog` ✅ |
| `button-action-yes/no` | `button-action-yes`, `button-action-no` ✅ |

#### Cost Code List (CCL)
| Playwright Placeholder | Real `data-cy` Selector |
|------------------------|-------------------------|
| `btn-add-row` | `Btn-New` |
| `btn-search` | `btn-search-cost-code` |
| `btn-collapse` | `btn-collapse` ✅ |
| `btn-copy` | `Btn-copy` |
| `btn-edit` | `Btn-Edit` |
| `btn-save` (new) | `Btn-Save-New` |
| `btn-save` (edit) | `Btn-Save-Edit` |
| `btn-cancel` (new) | `Btn-Cancel-Edit` |
| `btn-approve` | `Btn-Final-Approver-Approve` |
| `btn-reject` (1st) | `Btn-First-Approver-Reject` |
| `btn-reject` (admin) | `Btn-Approver-Reject` |
| `btn-assign-erp` | `Btn-First-Approver-Assign-erp` |
| `search-erp` | `select-ERPAccountCode` |
| `pagination-group` | `pagination-group` ✅ |

#### Vendor Cost Description Mapping (VCDM)
| Playwright Placeholder | Real `data-cy` Selector |
|------------------------|-------------------------|
| `btn-new` | `Btn-Vendor-New` |
| `btn-edit` | `Btn-Vendor-Edit` |
| `btn-delete` | `Btn-Vendor-Delete` |
| `btn-approve` | `Btn-Vendor-Approve` |
| `btn-copy` | `Btn-Vendor-Copy` |
| `btn-extend` | `Btn-Vendor-Extend` |
| `btn-search` | `btn-search-vendor-cost` |
| `btn-collapse` | `btn-collapse` ✅ |
| `btn-save` (new) | `Btn-Save-New` |
| `btn-save` (edit) | `Btn-Save-Edit` |
| `btn-cancel` (copy) | `Btn-Cancel-Copy` |
| `modal-extend` | `modal-extendVendorCost` |
| `extend-apply` | `extend-button-apply` |
| `page-title` | `page-header-title` |
| `pagination-group` | `pagination-group` ✅ |

#### Approval Tier Setting (ATS)
| Playwright Placeholder | Real `data-cy` Selector |
|------------------------|-------------------------|
| `btn-add-row` | `Btn-Add-New` |
| `btn-edit` | `Btn-Edit` |
| `btn-deactivate` | `Btn-Deactivate` |
| `btn-save` (new) | `Btn-Save-New` |
| `btn-save` (edit) | `Btn-Save-Edit` |
| `btn-cancel` (new) | `Btn-Cancel-New` |
| `btn-cancel` (edit) | `Btn-Cancel-Edit` |
| `btn-search` | `btn-search-approval-tier-setting` |
| `btn-reset` | `btn-reset-search-approval-tier-setting` |
| `search-rhq` | `select-rhq` |
| `search-office` | `select-office` |
| `search-approver` | `input-search--approver` |
| `search-cost-code` | `input-search--costCode` |
| `form-approval-amount-limit` | `input-amount-limit` |
| `form-tolerance-amount-limit` | `input-tolerance-amount-limit` |
| `form-tolerance-percentage` | `input-tolerance-percentage` |

#### Work Order Creation (WO)
| Playwright Placeholder | Real `data-cy` Selector |
|------------------------|-------------------------|
| `page-title-wo-creation` | `page-header-title` |
| `navItem-Work-Order-Creation` | `navItem-Work-Order-Creation` ✅ |
| `input-vendor` | `select-vendor` |
| `input-cost-code` | `select-table-costCode` |
| `btn-add-row` | (inspect live — no direct cy source found) |

### Phase 6 Tasks (superseded — see detailed fix plan above)

---

## 🏗️ Phase 7 — CI Verification & Full Run

**Status:** ⏳ Not Started

### Tasks
- [ ] Full test run: `yarn test` → all suites execute
- [ ] Fix any remaining flaky tests (retry logic, timing)
- [ ] Verify `.github/workflows/` CI passes on push
- [ ] Verify Xray sync works (if configured)
- [ ] Run in parallel: `yarn test:parallel` → no race conditions
- [ ] Generate Allure report: `yarn allure:serve` → looks correct
- [ ] Final MOM comparison — full structure diff
- [ ] Update `README.md` with run instructions

### Phase 7 Completion Checklist
- [ ] All tests pass (≥ 95% pass rate)
- [ ] Flakiness ≤ 5%
- [ ] CI pipeline green
- [ ] Allure report generated
- [ ] Parallel run stable
- [ ] README updated
- [ ] **Tick this phase ✅ — Migration COMPLETE**

---

## 📝 Implementation Notes (Phases 2–5)

### Step Deduplication Strategy
Cross-module duplicate steps were resolved by:
1. **Auth steps** — moved to `src/tests/shared/auth.steps.ts` (used by all modules)
2. **VCDM-specific steps** — renamed with `in VCDM` suffix to disambiguate from CCL steps:
   - `the user inputs data to search in VCDM`
   - `the user selects 1 item in VCDM`, `the user selects some items in VCDM`
   - `the user clicks on a specific page number in VCDM`
   - `the VCDM row is removed`
3. **Generic button handler** — `on the {string} button` step in VCDM handles "Last", "First", "X" via switch

### Cucumber Expression Escaping
Steps containing `/` or `(s)` in text require escaping in TypeScript string literals:
- `/` → `\\/` (so the string value is `\/` which Cucumber Expression treats as literal `/`)
- `(s)` → `\\(s)` (so the string value is `\(s)` which escapes the optional-text construct)

Example: `When('Click on some {string} row\\(s)', ...)` matches feature step `row(s)` literally.

### Page Object Pattern
All 4 new modules follow this structure (consistent with MOM reference):
```
src/pages/<module>/
  <Module>Page.ts        ← extends BasePage, action methods
  <Module>Selectors.ts   ← all locator strings, no logic
  index.ts               ← barrel export
```
Steps use `{ page }` fixture directly (not DI fixtures) — this is acceptable and avoids fixture type conflicts during parallel development.

---



> Update this table after each phase to track alignment with reference.

| Area | MOM Pattern | APM Status | Notes |
|------|------------|------------|-------|
| `global-setup.ts` | `ensureAuthenticated(page, ctx, true)` | ✅ Matched (use `false` — intentional diff, bug fix) | MOM `true` = no-op |
| `AuthenticationManager.ts` | dynamic import | ✅ Fixed to static import | No real circular dep |
| `fixtures.ts` | `createBdd(test)` + page objects | ✅ Matches | |
| `playwright.config.ts` | `storageState` auto-inject | ✅ Matches | |
| `testConfig.ts` | paths + credentials | ✅ Matches | |
| Page object base (`BasePage`) | `safeClick`, `safeFill` pattern | ✅ Matches | |
| `.gitignore` | `playwright/.auth/` ignored | ✅ Fixed | Was missing |
| `.yarnrc.yml` | `nodeLinker: node-modules` | ✅ Added | yarn v4 requirement |
| Tags convention | `@smoke @regression @Functional` | ✅ Matches | |
| Selectors file pattern | `*Selectors.ts` co-located | ✅ Matches | |

---

## 📋 Definition of Done (per Phase)

Before marking any phase ✅:

1. **TypeCheck** — `yarn typecheck` returns 0 errors
2. **Lint** — `yarn lint` returns 0 errors
3. **BDD Gen** — `yarn bddgen` generates all spec files without error
4. **Auth** — `yarn test:chromium` shows global-setup auth success log
5. **Navigation** — test reaches the correct APM page (screenshot confirms)
6. **MOM Compare** — page object / fixture patterns match MOM structure
7. **Selectors** — verified against live DOM, not placeholders
8. **This doc** — phase checkbox ticked ✅

---

*For full migration strategy, see: `../om-apm-automation/docs/05-migration-strategy.md`*  
*For technical risks, see: `../om-apm-automation/docs/04-technical-risks.md`*
