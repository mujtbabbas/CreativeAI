# Features

CreativeAI is a front-end studio for generating creative content with multiple AI
providers. This page summarizes the feature set described in the [README](../README.md).

## AI providers

- **Multi-provider support** — OpenRouter, Mistral AI, Google Gemini, OpenAI, and custom
  providers, switchable from the Settings panel.
- **Per-provider API keys** — add your own key for each provider in Settings.
- **Model controls** — choose the model, and tune temperature and token limits per provider.

> Note: in this front-end build, provider keys are kept in the browser's local storage
> (see the README's security notes). For production, proxy provider requests through a
> server or serverless function so keys stay secret.

## Chat

- Text-based creative conversations with the selected model.
- Chat history is kept in local storage, so past conversations survive page reloads.

## Image generation

- Craft a prompt and generate images with the configured provider.
- Generated images are saved to History for later viewing and download.

## Video generation

- Synthesize short videos from prompts — demo videos out of the box, or a real video
  provider when one is integrated.

## History

- Past generations (chats, images, videos) are listed in one place.
- Download your outputs from History.

## Demo mode

- One-click **Try Demo Login** on the landing page auto-fills demo credentials, so the
  whole studio can be explored without configuring a provider first.

## Interface

- Responsive, mobile-first layout with Tailwind CSS styling.
- Framer Motion animations throughout, and Lucide icons.
- Accessibility-conscious design (labels, focus states, readable contrast).

## Built with

From `package.json`: React 18 + TypeScript, Vite 5, React Router 6, Axios,
react-hot-toast, date-fns, Tailwind CSS 3, and Framer Motion. Scripts: `npm run dev`,
`npm run build`, `npm run lint`, `npm run preview`.

For how the codebase is organized, see [architecture.md](architecture.md).
