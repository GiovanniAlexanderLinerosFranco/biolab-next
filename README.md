This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Recovery And Deployment Bootstrap

Run these steps from the project root:

1. GitHub setup (create remote, push baseline branch):

```bash
./scripts/01_setup_github.sh <github_owner> <repo_name> private
```

2. Vercel setup (link and first production deploy):

```bash
./scripts/02_setup_vercel.sh
```

3. Export Supabase variables in your shell and sync them to Vercel:

```bash
export NEXT_PUBLIC_SUPABASE_URL="https://<project-ref>.supabase.co"
export NEXT_PUBLIC_SUPABASE_ANON_KEY="<anon-key>"
export SUPABASE_SERVICE_ROLE_KEY="<service-role-key>"
./scripts/03_set_vercel_env.sh
```

4. Create base database schema in Supabase SQL Editor:

```sql
-- File: supabase/01_schema_bitacoras.sql
```

You can copy variable names from [.env.example](.env.example).
