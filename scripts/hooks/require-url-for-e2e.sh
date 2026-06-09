#!/usr/bin/env bash
# Hook: block E2E-authoring prompts that don't include a starting-point URL.
#
# Reads the hook event JSON on stdin, extracts the user's prompt, and — if the
# prompt looks like an E2E test authoring request — requires an explicit URL.
# Used by both Claude Code (.claude/settings.json → UserPromptSubmit) and
# GitHub Copilot CLI (.github/hooks/require-url-for-e2e.json → userPromptSubmitted).
#
# Exit codes: 0 = allow, 2 = block (stderr is surfaced to the agent).

set -euo pipefail

# Extract the prompt field. Claude uses `.prompt`, Copilot may use `.userPrompt`.
prompt="$(jq -r '.prompt // .userPrompt // empty' 2>/dev/null || true)"
[ -z "$prompt" ] && exit 0

lc="$(printf '%s' "$prompt" | tr '[:upper:]' '[:lower:]')"

# Step 1 — does this prompt touch E2E territory at all?
is_e2e=0
case "$lc" in
  *e2e*|*end-to-end*|*cucumber*|*gherkin*|*.feature*|*.steps.ts*|*"page object"*|*"step definition"*|*"scenario outline"*)
    is_e2e=1 ;;
esac
[ "$is_e2e" -eq 0 ] && exit 0

# Step 2 — is it an authoring/implementation request (not just reading/asking)?
is_authoring=0
case "$lc" in
  *"add "*|*"write "*|*"create "*|*"implement "*|*"author "*|\
  *"new test"*|*"new scenario"*|*"new feature"*|\
  *"build a test"*|*"build an e2e"*)
    is_authoring=1 ;;
esac
[ "$is_authoring" -eq 0 ] && exit 0

# Step 3 — is there a starting-point URL anywhere in the prompt?
if printf '%s' "$prompt" | grep -qE 'https?://[^[:space:]]+'; then
  exit 0
fi

cat >&2 <<'MSG'
⛔ E2E test authoring request detected, but no starting-point URL was provided.

Per CLAUDE.md hard rule: before authoring any E2E test, page object, or
scenario, you MUST provide the starting-point URL — the exact page where the
flow begins. Do not guess from BASE_URL + a route name; guessing leads to
exploring the wrong page.

Resubmit your prompt with the URL included. Example:

  Add a Cucumber scenario for password reset.
  Starting point: https://app.example.com/auth/forgot-password

MSG
exit 2
