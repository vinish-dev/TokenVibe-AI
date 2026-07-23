# TokenVibe AI

TokenVibe AI is an AI-powered semantic design system generator. It allows users to prompt an AI with a natural language description (e.g., "A modern fintech app with a cyberpunk edge") and instantly receive a complete, production-ready design system. 

The application provides a live preview of the generated design tokens across multiple platforms (Web, Mobile, Components) and allows users to export the generated system to CSS Variables, Tailwind Config, Jetpack Compose, Flutter, or Figma JSON.

## Features

- **AI Theme Generation**: Integrates with the Google Gemini API to dynamically generate complete design systems based on a flat, highly impactful semantic `ThemeSchema`. Includes 6 design sliders (Warmth, Energy, Luxury, Minimalism, Roundedness, Animation) to strongly influence the generated styles.
- **Live Preview UI**: Instantly renders the generated design tokens in realistic UI environments:
  - **Web Dashboard**: A full SaaS dashboard mockup.
  - **Mobile App**: A native mobile app layout mockup.
  - **Component Library**: A gallery of UI components (buttons, inputs, cards, switches, data tables, and dynamic recharts area charts).
- **Global Theming**: Powered by Tailwind CSS v4 and a Zustand store, themes are dynamically injected via CSS variables into a scoped preview container. Component preferences (e.g., flat vs elevated cards, solid vs outlined buttons) are mapped via data attributes.
- **Advanced Export Engine**: Instantly generates code snippets and downloadable `.zip` bundles (via `jszip` and `file-saver`) to export the active theme to CSS, Tailwind, Jetpack Compose, Flutter, and Figma Tokens.
- **Database Integration**: Prisma ORM + SQLite database in the Express backend for saving themes and viewing historical themes.

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
- **Database**: Prisma ORM with SQLite
- **AI Integration**: Google GenAI SDK (`@google/genai`)

## Project Structure

TokenVibe AI is built as a monorepo using npm workspaces:

```
.
├── apps/
│   ├── client/              # Next.js Frontend
│   │   ├── src/app/         # Next.js App Router
│   │   ├── src/components/  # UI components (controls, preview, layout, charts)
│   │   └── src/store/       # Zustand store (useTokenStore.ts)
│   └── server/              # Express Backend
│       ├── prisma/          # Prisma schema and SQLite database
│       └── src/             # Gemini API integration and Express route handlers
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

Why no database?
TokenVibe AI stores user-specific theme history and preferences in browser localStorage because they are personal, client-side data. The backend is intentionally stateless and focuses solely on AI-powered theme generation. This reduces infrastructure complexity, lowers hosting costs, improves scalability, and aligns well with managed cloud services like AWS App Runner.
## Running Locally

1. Install dependencies from the root directory:
   ```bash
   npm install
   ```

2. Generate Prisma Client (if needed) and push schema:
   ```bash
   cd apps/server
   npx prisma generate
   npx prisma db push
   cd ../..
   ```

3. Setup environment variables (add your Gemini API key):
   Create a `.env` file in `apps/server/` based on `apps/server/.env.example`.

4. Run the development server (runs both client and server concurrently):
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser.
