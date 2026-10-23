# Changelog

All notable changes to CreativeAI are documented here.

## 1.0.0 — Initial release

The first production-ready release of the CreativeAI front-end (`version` in `package.json`), built with React 18, TypeScript, and Vite.

### Features

- **Multi-provider support** — OpenRouter, Mistral AI, Google Gemini, OpenAI, and custom providers
- **Chat** — text-based creative conversations with AI models
- **Image generation** — craft prompts and create images
- **Video generation** — synthesize short demo videos (or integrate a real provider)
- **History** — past generations stored locally, with downloads
- **Settings panel** — API keys, model selection, temperature and token control
- **Demo mode** — one-click demo login autofill for quick testing
- **Interface** — responsive Tailwind CSS design with Framer Motion animations, mobile-first and accessible
- **Local persistence** — chat history and generated content kept in local storage

### Documentation

- Setup, production build, Vercel deployment, usage, troubleshooting, and security notes in the [README](README.md)
- Contributor guide ([CONTRIBUTING.md](CONTRIBUTING.md))
- Architecture overview ([docs/architecture.md](docs/architecture.md))
