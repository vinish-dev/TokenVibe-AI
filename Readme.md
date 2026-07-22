# TokenVibe AI

TokenVibe AI is an AI-powered semantic design system generator. It allows users to prompt an AI with a natural language description (e.g., "A modern fintech app with a cyberpunk edge") and instantly receive a complete, production-ready design system. 

The application provides a live preview of the generated design tokens across multiple platforms (Web, Mobile, Components) and allows users to export the generated system to CSS Variables, Tailwind Config, Jetpack Compose, Flutter, or Figma JSON.

## Features

- **AI Theme Generation (Mock)**: Simulates an AI backend generating complete design systems based on a flat, highly impactful semantic `ThemeSchema`.
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

\`\`\`
src/
├── app/
│   ├── globals.css        # Tailwind v4 directives and CSS variable mappings
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main application view
├── components/
│   ├── controls/          # Sidebar controls (Prompt, Personality, Sliders)
│   ├── export/            # Export Modal and Generators
│   ├── layout/            # Application Sidebar and Navbar
│   └── preview/           # Live Preview Container (Web, Mobile, Components)
├── store/
│   └── useTokenStore.ts   # Zustand store defining ThemeSchema and global state
└── utils/
    ├── ai/                # Mock AI Generation Service (aiMockService.ts)
    └── export/            # Exporter functions for different targets
\`\`\`

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

1. **Real AI Integration**: Connect the `ControlsPanel.tsx` generation function to a real AI backend (e.g., Google Gemini or OpenAI) using the `ThemeSchema` as the structured JSON output format.
2. **Expand the Component Gallery**: Add more complex UI components to `ComponentsPreview.tsx` (like data tables, charts, or date pickers).
3. **Advanced Export Options**: Expand the `exportGenerators.ts` to support deeper configuration or download as actual `.zip` files containing the generated boilerplate.
4. **User Accounts & Database**: Implement real functionality for the mocked "My Systems", "History", and "Save System" buttons in the sidebar and header.
