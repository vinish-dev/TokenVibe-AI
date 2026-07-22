import { ThemeSchema } from "@/store/useTokenStore";

export function generateCSS(theme: ThemeSchema): string {
  return `:root {
  /* Colors */
  --color-primary: ${theme.colors.primary};
  --color-primary-foreground: ${theme.colors.primaryForeground};
  --color-secondary: ${theme.colors.secondary};
  --color-secondary-foreground: ${theme.colors.secondaryForeground};
  --color-background: ${theme.colors.background};
  --color-surface: ${theme.colors.surface};
  --color-foreground: ${theme.colors.foreground};
  --color-muted: ${theme.colors.muted};
  --color-muted-foreground: ${theme.colors.mutedForeground};
  --color-border: ${theme.colors.border};
  --color-ring: ${theme.colors.ring};
  --color-success: ${theme.colors.success};
  --color-warning: ${theme.colors.warning};
  --color-error: ${theme.colors.error};

  /* Radius */
  --radius-sm: ${theme.radius.sm};
  --radius-md: ${theme.radius.md};
  --radius-lg: ${theme.radius.lg};
  --radius-full: ${theme.radius.full};

  /* Spacing */
  --spacing-sm: ${theme.spacing.sm};
  --spacing-md: ${theme.spacing.md};
  --spacing-lg: ${theme.spacing.lg};
  --spacing-xl: ${theme.spacing.xl};

  /* Shadows */
  --shadow-sm: ${theme.shadows.sm};
  --shadow-md: ${theme.shadows.md};
  --shadow-lg: ${theme.shadows.lg};

  /* Typography */
  --font-heading: "${theme.typography.headingFont}";
  --font-body: "${theme.typography.bodyFont}";
}`;
}

export function generateTailwind(theme: ThemeSchema): string {
  return `/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '${theme.colors.primary}',
          foreground: '${theme.colors.primaryForeground}',
        },
        secondary: {
          DEFAULT: '${theme.colors.secondary}',
          foreground: '${theme.colors.secondaryForeground}',
        },
        background: '${theme.colors.background}',
        surface: '${theme.colors.surface}',
        foreground: '${theme.colors.foreground}',
        muted: {
          DEFAULT: '${theme.colors.muted}',
          foreground: '${theme.colors.mutedForeground}',
        },
        border: '${theme.colors.border}',
        ring: '${theme.colors.ring}',
        success: '${theme.colors.success}',
        warning: '${theme.colors.warning}',
        error: '${theme.colors.error}',
      },
      borderRadius: {
        sm: '${theme.radius.sm}',
        md: '${theme.radius.md}',
        lg: '${theme.radius.lg}',
        full: '${theme.radius.full}',
      },
      spacing: {
        sm: '${theme.spacing.sm}',
        md: '${theme.spacing.md}',
        lg: '${theme.spacing.lg}',
        xl: '${theme.spacing.xl}',
      },
      boxShadow: {
        sm: '${theme.shadows.sm}',
        md: '${theme.shadows.md}',
        lg: '${theme.shadows.lg}',
      },
      fontFamily: {
        heading: ['${theme.typography.headingFont}'],
        body: ['${theme.typography.bodyFont}'],
      }
    }
  }
};`;
}

function hexToCompose(hex: string): string {
  if (hex.startsWith('rgba')) return `Color(0x80000000)`; // Rough fallback for compose mock
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length === 6) return `Color(0xFF${cleanHex.toUpperCase()})`;
  return `Color(0x${cleanHex.toUpperCase()})`;
}

export function generateCompose(theme: ThemeSchema): string {
  return `import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.foundation.shape.RoundedCornerShape

val md_theme_light_primary = ${hexToCompose(theme.colors.primary)}
val md_theme_light_onPrimary = ${hexToCompose(theme.colors.primaryForeground)}
val md_theme_light_background = ${hexToCompose(theme.colors.background)}
val md_theme_light_surface = ${hexToCompose(theme.colors.surface)}
val md_theme_light_error = ${hexToCompose(theme.colors.error)}

// Shapes
val shapes = Shapes(
    small = RoundedCornerShape(${theme.radius.sm}),
    medium = RoundedCornerShape(${theme.radius.md}),
    large = RoundedCornerShape(${theme.radius.lg})
)`;
}

export function generateFlutter(theme: ThemeSchema): string {
  function hexToFlutter(hex: string): string {
    if (hex.startsWith('rgba')) return `Color(0x80000000)`;
    return `Color(0xFF${hex.replace('#', '').toUpperCase()})`;
  }

  return `import 'package:flutter/material.dart';

class AppTheme {
  static final ThemeData lightTheme = ThemeData(
    primaryColor: ${hexToFlutter(theme.colors.primary)},
    scaffoldBackgroundColor: ${hexToFlutter(theme.colors.background)},
    cardColor: ${hexToFlutter(theme.colors.surface)},
    fontFamily: '${theme.typography.bodyFont.split(',')[0].replace(/['"]/g, '')}',
    colorScheme: ColorScheme.light(
      primary: ${hexToFlutter(theme.colors.primary)},
      onPrimary: ${hexToFlutter(theme.colors.primaryForeground)},
      surface: ${hexToFlutter(theme.colors.surface)},
      error: ${hexToFlutter(theme.colors.error)},
    ),
  );
}`;
}

export function generateFigmaTokens(theme: ThemeSchema): string {
  return JSON.stringify({
    global: {
      colors: {
        primary: { value: theme.colors.primary, type: "color" },
        background: { value: theme.colors.background, type: "color" },
        surface: { value: theme.colors.surface, type: "color" },
        text: { value: theme.colors.foreground, type: "color" }
      },
      radii: {
        sm: { value: theme.radius.sm, type: "borderRadius" },
        md: { value: theme.radius.md, type: "borderRadius" },
        lg: { value: theme.radius.lg, type: "borderRadius" }
      },
      spacing: {
        sm: { value: theme.spacing.sm, type: "spacing" },
        md: { value: theme.spacing.md, type: "spacing" },
        lg: { value: theme.spacing.lg, type: "spacing" }
      }
    }
  }, null, 2);
}
