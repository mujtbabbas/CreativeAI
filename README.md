# CreativeAI

An elegant AI-powered creative platform featuring real-time chat, intelligent image generation, and video synthesis capabilities. Built with modern web technologies for a seamless user experience.

## Features

- **AI Chat Interface** - Engage with an intelligent conversational AI for creative assistance
- **Image Generation** - Create stunning images with AI-powered generation
- **Video Generation** - Synthesize videos from text prompts
- **User Authentication** - Secure login and registration system
- **Chat History** - Access and manage your previous conversations
- **User Settings** - Personalized preferences and account management
- **Responsive Design** - Beautiful, modern UI that works on all devices
- **Real-time Updates** - Instant feedback and smooth animations

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Date Utilities**: date-fns

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/CreativeAI.git
cd CreativeAI
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
src/
├── components/          # React components
│   ├── Auth/           # Login and registration components
│   ├── Chat/           # Chat interface components
│   ├── Generation/     # Image and video generation components
│   ├── History/        # Chat history view
│   ├── Layout/         # Header and sidebar layout
│   └── Settings/       # User settings components
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
│   ├── api.ts         # API communication
│   ├── auth.ts        # Authentication logic
│   └── storage.ts     # Local storage utilities
├── App.tsx            # Main application component
├── main.tsx           # React entry point
└── index.css          # Global styles
```

## Configuration Files

- `vite.config.ts` - Vite build configuration
- `tailwind.config.js` - Tailwind CSS customization
- `tsconfig.json` - TypeScript compiler options
- `eslint.config.js` - ESLint rules and configuration
- `postcss.config.js` - PostCSS plugin configuration

## Development

### Code Quality

The project uses ESLint for code quality and TypeScript for type safety. Run linting with:
```bash
npm run lint
```

### Component Structure

Components are organized by feature:
- **Auth**: Handles user authentication flows
- **Chat**: Main chat interface and interactions
- **Generation**: AI-powered image and video creation
- **History**: User chat history management
- **Layout**: Shared layout components (Header, Sidebar)
- **Settings**: User preferences and account settings

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on the repository.

---

Built with ❤️ using React, TypeScript, and Vite
