#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./scripts/02_setup_vercel.sh
# Prerequisites:
#   - vercel CLI installed (npm i -g vercel)
#   - authenticated account

if ! command -v vercel >/dev/null 2>&1; then
  echo "Vercel CLI is required. Install with: npm i -g vercel"
  exit 1
fi

echo "Checking Vercel authentication..."
if ! vercel whoami >/dev/null 2>&1; then
  echo "You are not authenticated in Vercel. Running vercel login..."
  vercel login
fi

echo "Linking local project with Vercel..."
vercel link

echo "Creating production deployment..."
vercel --prod

echo "Done. Project linked and first production deployment created."
