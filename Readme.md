# TokenVibe AI

TokenVibe AI is an AI-powered semantic design system generator. It allows users to prompt an AI with a natural language description (e.g., "A modern fintech app with a cyberpunk edge") and instantly receive a complete, production-ready design system. 

The application provides a live preview of the generated design tokens across multiple platforms (Web, Mobile, Components) and allows users to export the generated system to CSS Variables, Tailwind Config, Jetpack Compose, Flutter, or Figma JSON.

### Live Application: https://main.d3akg76erj026z.amplifyapp.com

## Features

- **AI Theme Generation**: Integrates with the Google Gemini 2.5 Flash API to dynamically generate complete design systems based on a flat, highly impactful semantic `ThemeSchema`. Includes 6 design sliders (Warmth, Energy, Luxury, Minimalism, Roundedness, Animation) to strongly influence the generated styles.
- **Brand Color Anchoring**: Allows users to specify an exact primary hex color, forcing the AI to generate the rest of the palette harmoniously around it.
- **Explore Gallery & Surprise Me Mode**: A full-screen gallery of handcrafted presets (e.g., Cyberpunk Edge, Apple Inspired) for rapid exploration, and a 1-click fallback generator.
- **Live Preview UI**: Instantly renders the generated design tokens in realistic UI environments:
  - **Web Dashboard**: A full SaaS dashboard mockup.
  - **Mobile App**: A native mobile app layout mockup.
  - **Component Library**: A gallery of UI components (buttons, inputs, cards, switches, data tables, and dynamic recharts).
- **Global Theming & Isolation**: Powered by Tailwind CSS v4 and a Zustand store, themes are dynamically injected via CSS variables into a strictly scoped preview container, keeping the main app's premium dark UI pristine.
- **Advanced Export Engine**: Instantly generates code snippets and downloadable `.zip` bundles to export the active theme to CSS, Tailwind, Jetpack Compose, Flutter, and Figma Tokens.
- **Browser-Based Local Storage**: Themes are saved securely and persistently in the browser's `localStorage` via Zustand, completely eliminating the need for user accounts or databases.

## Tech Stack

- **Monorepo**: npm workspaces
- **Frontend Framework**: Next.js 16+ (App Router), React 19
- **Backend Framework**: Express.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Vanilla CSS Variables
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **AI Integration**: Google GenAI SDK (`@google/genai`)
- **Cloud Infrastructure**: Docker, AWS Amplify (Frontend), Amazon ECS Fargate (Backend)

## Project Structure

TokenVibe AI is built as a monorepo using npm workspaces:

```
.
├── apps/
│   ├── client/              # Next.js Frontend (Deployed on AWS Amplify)
│   │   ├── src/app/         # Next.js App Router (Includes API Proxy for Mixed Content)
│   │   ├── src/components/  # UI components (controls, preview, layout, explore, export)
│   │   └── src/store/       # Zustand store (useTokenStore.ts)
│   └── server/              # Express Backend (Dockerized on Amazon ECS Fargate)
│       └── src/             # Gemini API integration and stateless route handlers
└── packages/
    └── shared/              # Shared Types and Schemas (ThemeSchema)
```

## Architecture & Theming Approach

TokenVibe AI intentionally uses a **simplified semantic schema** (`ThemeSchema`) rather than a highly nested W3C design token spec. This ensures the AI can generate themes quickly and reliably while maintaining high visual impact.

1. **State**: The `useTokenStore` holds the current `ThemeSchema`.
2. **Injection**: `LivePreview.tsx` maps `theme` state to inline CSS variables (`--showcase-primary`, `--showcase-radius-md`, etc.) and attaches them to a top-level container.
3. **Consumption**: 
   - Components inside the preview container consume these variables via Tailwind utility classes (e.g., `bg-showcase-primary`). 
   - Tailwind v4 maps these variables in `globals.css` using the `@theme inline` directive.
4. **Component Styles**: Lightweight stylistic preferences (like button style or card elevation) are stored in `theme.components` and applied via CSS data attributes (e.g., `data-btn="pill"`).

### Why no database?
The backend is intentionally stateless and focuses solely on secure AI-powered theme generation. TokenVibe AI stores user-specific theme history and preferences in browser `localStorage`. This drastically reduces infrastructure complexity, lowers hosting costs, improves scalability, and allows the backend to be deployed frictionlessly to serverless container environments like Amazon ECS Fargate.

## API Key Configuration

This project requires a Google Gemini API key to generate AI-powered themes.

To protect sensitive credentials, API keys are not included in the submission. Configure the following environment variable before running the backend:

GEMINI_API_KEY=your_api_key_here

If no API key is configured, the application automatically falls back to built-in preset themes. This allows the user interface and application flow to remain fully functional while preventing exposure of private credentials.

## Running Locally

1. Install dependencies from the root directory:
   ```bash
   npm install
   ```

2. Setup environment variables:
   Create a `.env` file in `apps/server/` based on `apps/server/.env.example` and add your `GEMINI_API_KEY`.

3. Run the development server (starts both client and server concurrently):
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.
