# Echo Sign Ease (Vite + React + TypeScript)

This repository is a Vite React TypeScript project scaffolded with shadcn/ui and Tailwind.

## Build & Run (locally)

1. Install dependencies

```bash
npm ci
```

2. Start development server

```bash
npm run dev
# open http://localhost:8080
```

3. Build for production

```bash
npm run build
# build output will be in `dist/` by default
```

4. Preview production build locally

```bash
npm run preview
# preview runs a static server (defaults to port 4173)
```

## Deploy to GitHub Pages

A GitHub Actions workflow is included at `.github/workflows/deploy.yml` that builds the site and deploys the `dist/` folder to GitHub Pages on push to `main` or `master`.

To enable Pages for this repository:

- Ensure the site is pushed to `main` (or `master`) and the workflow will run.
- In the repository Settings > Pages, you should see the deployment once the workflow completes. The workflow deploys using the Pages Actions so no branch configuration is required.

## Alternative Hosting

You can also host this app on Vercel or Netlify by connecting the repository. Configure the build command as `npm run build` and the publish directory as `dist`.

## Notes

- Vite is configured to run dev server on port 8080 (see `vite.config.ts`).
- If you use a different base path for GitHub Pages (e.g., a project page under `https://username.github.io/repo/`), update `vite.config.ts` with `base: '/repo/'` in the exported config.
