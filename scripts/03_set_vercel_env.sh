#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./scripts/03_set_vercel_env.sh
# This script reads environment variables from your shell session.
# Required vars:
#   NEXT_PUBLIC_SUPABASE_URL
#   NEXT_PUBLIC_SUPABASE_ANON_KEY
#   SUPABASE_SERVICE_ROLE_KEY

required=(
  NEXT_PUBLIC_SUPABASE_URL
  NEXT_PUBLIC_SUPABASE_ANON_KEY
  SUPABASE_SERVICE_ROLE_KEY
)

for var in "${required[@]}"; do
  if [[ -z "${!var:-}" ]]; then
    echo "Missing required variable in shell: $var"
    echo "Export it first, example: export $var=..."
    exit 1
  fi
done

if ! command -v vercel >/dev/null 2>&1; then
  echo "Vercel CLI is required. Install with: npm i -g vercel"
  exit 1
fi

echo "Setting production env vars in Vercel..."
printf '%s' "$NEXT_PUBLIC_SUPABASE_URL" | vercel env add NEXT_PUBLIC_SUPABASE_URL production
printf '%s' "$NEXT_PUBLIC_SUPABASE_ANON_KEY" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
printf '%s' "$SUPABASE_SERVICE_ROLE_KEY" | vercel env add SUPABASE_SERVICE_ROLE_KEY production

echo "Done. Environment variables configured in Vercel (production)."
