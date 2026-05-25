 # CreativeAI — AI Creative Studio

 ![CreativeAI](vite.svg)

 A polished, production-ready front-end for generating creative content using multiple AI providers. Designed for artists, creators, and developers who want an elegant interface to chat with models, generate images, and synthesize short videos.

 ----

 ## Highlights

 - Multi-provider support: OpenRouter, Mistral AI, Google Gemini, OpenAI, and custom providers
 - Beautiful, responsive UI with Tailwind CSS and Framer Motion
 - Demo mode (one-click autofill login) for quick testing
 - Settings panel for API keys, model selection, temperature and token control
 - Local storage for chat history and generated content
 - Accessible, mobile-first design with polished animations

 ## Badges

 ![Vite](https://img.shields.io/badge/bundler-vite-brightgreen)
 ![React](https://img.shields.io/badge/framework-react-blue)
 ![TypeScript](https://img.shields.io/badge/lang-typescript-blue)
 ![License](https://img.shields.io/badge/license-MIT-green)

 ----

 ## Demo

 - Try the demo login on the landing page: click **Try Demo Login** to auto-fill credentials (demo@creativeai.com / demo123).

 ## Local Development

 Prerequisites:
 - Node.js 16+

 Install and run locally:
 ```bash
 git clone https://github.com/mujtbabbas/CreativeAI.git
 cd CreativeAI
 npm install
 npm run dev
 ```

 The app will be available at `http://localhost:5173` by default.

 ## Production Build

 Build the app:
 ```bash
 npm run build
 npm run preview
 ```

 ## Deploying to Vercel (recommended)

 1. Create a new Vercel project and connect your GitHub repository.
 2. Set the build command to `npm run build` and the output directory to `dist` (Vite default).
 3. Environment variables: store any API keys you intend to use on serverless functions or in the app settings. Note: this front-end stores provider keys in local storage (Settings page) — for production use you should proxy requests through a secure server or serverless function and keep secrets server-side.
 4. Important: If you see a white screen with `Uncaught TypeError: K2.getInstance is not a function` in the browser console, it usually means a singleton export was misconfigured in `src/utils/api.ts`. This repository includes a fix — rebuild and redeploy. Also ensure `vite.svg` exists at the repository root (this repo includes a small SVG to avoid a 404 on Vercel).

 ## Usage

 - Go to **Settings** to configure an AI provider and add your API key.
 - Use **Chat** for text-based creative conversations.
 - Use **Image Generation** to craft prompts and create images.
 - Use **Video Generation** to synthesize demo videos (or integrate a real provider).
 - View past generations in **History** and download your outputs.

 ## Troubleshooting

 White screen on deployment? Check the browser console:

 - `K2.getInstance is not a function` — fix: ensure `src/utils/api.ts` defines `static getInstance()` and exports `apiService = ApiService.getInstance()` (this repo includes the fix).
 - `vite.svg 404` — fix: include a `vite.svg` at the project root or update `index.html` to reference your favicon.
 - If providers return errors, verify API keys in the **Settings** page. For secure usage, proxy provider requests through a server.

 ## Security Notes

 This front-end currently stores provider API keys in localStorage for convenience. For production usage, create a server-side proxy or serverless functions to keep keys secret and avoid exposing them to clients.

 ## Contributing

 Contributions are welcome — open an issue or a pull request with a clear description and tests when applicable.

 ## License

 MIT

 ----

 Built with ❤️ — create something extraordinary.
