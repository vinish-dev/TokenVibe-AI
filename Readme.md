# TokenVibe AI

TokenVibe AI is an AI-powered semantic design system generator. It allows users to prompt an AI with a natural language description (e.g., "A modern fintech app with a cyberpunk edge") and instantly receive a complete, production-ready design system. 

The application provides a live preview of the generated design tokens across multiple platforms (Web, Mobile, Components) and allows users to export the generated system to CSS Variables, Tailwind Config, Jetpack Compose, Flutter, or Figma JSON.

## Features

- **AI Theme Generation**: Integrates with the Google Gemini API to dynamically generate complete design systems based on a flat, highly impactful semantic `ThemeSchema`.
- **Live Preview UI**: Instantly renders the generated design tokens in realistic UI environments:
  - **Web Dashboard**: A full SaaS dashboard mockup.
  - **Mobile App**: A native mobile app layout mockup.
  - **Component Library**: A gallery of UI components (buttons, inputs, cards, switches, etc.).
- **Global Theming**: Powered by Tailwind CSS v4 and a Zustand store, themes are dynamically injected via CSS variables into a scoped preview container. Component preferences (e.g., flat vs elevated cards, solid vs outlined buttons) are mapped via data attributes.
- **Export Engine**: Instantly generates code snippets to export the active theme to CSS, Tailwind, Jetpack Compose, Flutter, and Figma Tokens.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Vanilla CSS Variables
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Project Structure

```
apps/
├── client/              # Next.js Frontend
│   ├── src/app/         # Next.js App Router (globals.css, layout.tsx, page.tsx)
│   ├── src/components/  # UI components (controls, preview, layout)
│   └── src/store/       # Zustand store (useTokenStore.ts)
└── server/              # Express Backend
    └── src/             # Gemini API integration and Express route handlers
packages/
└── shared/              # Shared Types and Schemas
    └── index.ts         # ThemeSchema definition used by both client and server
```

## Architecture & Theming Approach

TokenVibe AI intentionally uses a **simplified semantic schema** (`ThemeSchema`) rather than a highly nested W3C design token spec. This ensures the AI can generate themes quickly and reliably while maintaining high visual impact.

1. **State**: The `useTokenStore` holds the current `ThemeSchema`.
2. **Injection**: `LivePreview.tsx` maps `theme` state to inline CSS variables (`--showcase-primary`, `--showcase-radius-md`, etc.) and attaches them to a top-level container.
3. **Consumption**: 
   - Components inside the preview container consume these variables via Tailwind utility classes (e.g., \`bg-showcase-primary\`). 
   - Tailwind v4 maps these variables in `globals.css` using the \`@theme inline\` directive.
4. **Component Styles**: Lightweight stylistic preferences (like button style or card elevation) are stored in `theme.components` and applied via CSS data attributes (e.g., \`data-btn="pill"\`).

## Running Locally

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Next Steps for Development

If you are picking up this project, here are the recommended next steps:

1. **Expand the Component Gallery**: Add more complex UI components to `ComponentsPreview.tsx` (like data tables, charts, or date pickers).
2. **Advanced Export Options**: Expand the `exportGenerators.ts` to support deeper configuration or download as actual `.zip` files containing the generated boilerplate.
3. **User Accounts & Database**: Implement real functionality for the mocked "My Systems", "History", and "Save System" buttons in the sidebar and header. We recommend adding a PostgreSQL database using Prisma or Drizzle to the `server`.
4. **Enhanced Prompts**: Provide slider values to the Gemini backend so the sliders influence the generated theme.
