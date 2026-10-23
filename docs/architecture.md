# Architecture

How the CreativeAI front-end is organized. CreativeAI is a single-page React application; there is no backend in this repository. AI providers are called from the browser using the keys a user saves in the Settings page (see the security notes in the [README](../README.md)).

## Stack

From `package.json`:

- **React 18** + **TypeScript 5**, bundled with **Vite 5**
- **React Router 6** for page routing
- **Tailwind CSS 3** + PostCSS for styling, **Framer Motion** for animation
- **axios** for provider HTTP calls
- **lucide-react** icons, **react-hot-toast** notifications, **date-fns** date helpers
- **ESLint 9** (`npm run lint`)

## Source layout (`src`)

| Path | Purpose |
| --- | --- |
| `main.tsx` | Application entry point; mounts the React app |
| `App.tsx` | Root component and route composition |
| `components/` | UI components (chat, image and video generation, history, settings) |
| `utils/` | Shared utilities, including the API service (`src/utils/api.ts`) that talks to the configured AI providers |
| `types/` | Shared TypeScript types |
| `index.css` | Global styles and Tailwind directives |
| `vite-env.d.ts` | Vite client type declarations |

## How a generation request flows

1. The user configures a provider and API key in **Settings**; the key is stored in local storage.
2. A page component (Chat, Image Generation, or Video Generation) collects the prompt and options such as model, temperature, and token limits.
3. The API service in `src/utils` sends the request to the selected provider (OpenRouter, Mistral AI, Google Gemini, OpenAI, or a custom endpoint).
4. Results are rendered in the page and saved to local storage, so they appear in **History** and can be downloaded.

## Build and deployment

- `npm run dev` — Vite development server on `http://localhost:5173`
- `npm run build` — production build into `dist`
- `npm run preview` — serve the production build locally

The README documents deployment to Vercel, including the two common white-screen fixes.
