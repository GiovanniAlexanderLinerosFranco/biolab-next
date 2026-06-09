#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./scripts/01_setup_github.sh <github_owner> <repo_name> [visibility]
# Example:
#   ./scripts/01_setup_github.sh giovanni biolab-next private

if [[ $# -lt 2 ]]; then
  echo "Usage: $0 <github_owner> <repo_name> [visibility]"
  exit 1
fi

OWNER="$1"
REPO="$2"
VISIBILITY="${3:-private}"

if [[ "$VISIBILITY" != "private" && "$VISIBILITY" != "public" ]]; then
  echo "Visibility must be private or public"
  exit 1
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI (gh) is required. Install it first."
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "You are not authenticated in gh. Running gh auth login..."
  gh auth login
fi

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Run this script inside the git repository root."
  exit 1
fi

REPO_FULL="$OWNER/$REPO"

echo "Creating repository $REPO_FULL ($VISIBILITY)..."
gh repo create "$REPO_FULL" --"$VISIBILITY" --source=. --remote=origin --push

echo "Creating baseline recovery branch..."
git checkout -b recovery/baseline-040626

echo "Staging and committing current recovery state..."
git add -A
if git diff --cached --quiet; then
  echo "No staged changes to commit."
else
  git commit -m "chore: baseline recovery snapshot"
fi

git push -u origin recovery/baseline-040626

echo "Done. Repository connected and baseline branch pushed."
