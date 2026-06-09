#!/usr/bin/env bash

set -euo pipefail

INPUT="$(cat)"
TOOL_NAME="$(printf '%s' "$INPUT" | jq -r '.toolName // empty')"

case "$TOOL_NAME" in
  edit|create|write|str_replace|multi_edit|apply_patch) ;;
  *)
    exit 0
    ;;
esac

TOOL_ARGS_RAW="$(printf '%s' "$INPUT" | jq -r '.toolArgs // empty')"
[ -n "$TOOL_ARGS_RAW" ] || exit 0

if ! TOOL_ARGS_JSON="$(printf '%s' "$TOOL_ARGS_RAW" | jq -c . 2>/dev/null)"; then
  exit 0
fi

matches_src_ts_path() {
  case "$1" in
    src/*.ts|*/src/*.ts)
      return 0
      ;;
    *)
      return 1
      ;;
  esac
}

should_run_checks=0

while IFS= read -r candidate_path; do
  [ -n "$candidate_path" ] || continue

  if matches_src_ts_path "$candidate_path"; then
    should_run_checks=1
    break
  fi
done < <(
  printf '%s' "$TOOL_ARGS_JSON" | jq -r '
    .. | objects |
    (.path?, .file_path?, .filePath?, .target_file?, .targetFile?, .new_file_path?, .newFilePath?, .old_file_path?, .oldFilePath?) |
    select(type == "string" and length > 0)
  '
)

if [ "$should_run_checks" -eq 0 ]; then
  PATCH_TEXT="$(printf '%s' "$TOOL_ARGS_JSON" | jq -r '.patch? // .input? // empty')"

  if [ -n "$PATCH_TEXT" ] && printf '%s\n' "$PATCH_TEXT" | grep -Eq '^\*\*\* (Add|Update|Delete) File: (.+/)?src/.*\.ts$'; then
    should_run_checks=1
  fi
fi

[ "$should_run_checks" -eq 1 ] || exit 0

run_or_print_failure() {
  local command_output

  if command_output="$("$@" 2>&1)"; then
    return 0
  fi

  printf '%s\n' "$command_output" >&2
  return 1
}

run_or_print_failure npm run typecheck
run_or_print_failure npm run lint
