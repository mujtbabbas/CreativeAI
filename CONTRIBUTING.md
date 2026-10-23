# Contributing

Contributions to CreativeAI are welcome: open an issue or a pull request with a clear description, as the [README](README.md) says. This guide covers the local workflow.

## Setup

Prerequisites: Node.js 16+.

```bash
git clone https://github.com/mujtbabbas/CreativeAI.git
cd CreativeAI
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Workflow

1. Fork the repository and create a branch for your change.
2. Keep each pull request focused on one change (one feature or one fix).
3. The codebase is TypeScript + React 18 with Vite. Match the existing style:
   - Components live in `src/components`
   - Shared helpers live in `src/utils`
   - Shared types live in `src/types`
4. Lint before submitting:

   ```bash
   npm run lint
   ```

5. Verify a production build still passes:

   ```bash
   npm run build
   ```

6. Never commit real API keys. Provider keys are stored in the browser's local storage via the Settings page by design; keep test keys out of the repository.

## Reporting issues

Open an issue with the steps to reproduce, what you expected, and what happened. For deployment white screens, include the browser console output; the README's Troubleshooting section covers the common cases.
