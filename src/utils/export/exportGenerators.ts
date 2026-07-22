import { DesignTokens } from "@/store/useTokenStore";

export function generateCSS(tokens: DesignTokens): string {
  return `:root {
  /* Colors */
  --color-primary: ${tokens.colors.primary};
  --color-background: ${tokens.colors.background};
  --color-foreground: ${tokens.colors.foreground};
  --color-surface: ${tokens.colors.surface};
  --color-border: ${tokens.colors.border};
  --color-success: ${tokens.colors.success};
  --color-warning: ${tokens.colors.warning};
  --color-error: ${tokens.colors.error};
  --color-info: ${tokens.colors.info};

  /* Radius */
  --radius-sm: ${tokens.radius.sm};
  --radius-md: ${tokens.radius.md};
  --radius-lg: ${tokens.radius.lg};
  --radius-xl: ${tokens.radius.xl};
  --radius-full: ${tokens.radius.full};

  /* Spacing */
  --spacing-sm: ${tokens.spacing.sm};
  --spacing-md: ${tokens.spacing.md};
  --spacing-lg: ${tokens.spacing.lg};
  --spacing-xl: ${tokens.spacing.xl};
}`;
}

export function generateTailwind(tokens: DesignTokens): string {
  return `/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '${tokens.colors.primary}',
        background: '${tokens.colors.background}',
        foreground: '${tokens.colors.foreground}',
        surface: '${tokens.colors.surface}',
        border: '${tokens.colors.border}',
        success: '${tokens.colors.success}',
        warning: '${tokens.colors.warning}',
        error: '${tokens.colors.error}',
        info: '${tokens.colors.info}',
      },
      borderRadius: {
        sm: '${tokens.radius.sm}',
        md: '${tokens.radius.md}',
        lg: '${tokens.radius.lg}',
        xl: '${tokens.radius.xl}',
        full: '${tokens.radius.full}',
      },
      spacing: {
        sm: '${tokens.spacing.sm}',
        md: '${tokens.spacing.md}',
        lg: '${tokens.spacing.lg}',
        xl: '${tokens.spacing.xl}',
      }
    }
  }
};`;
}

function hexToCompose(hex: string): string {
  const cleanHex = hex.replace('#', '');
  return `Color(0xFF${cleanHex.toUpperCase()})`;
}

export function generateCompose(tokens: DesignTokens): string {
  return `import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.foundation.shape.RoundedCornerShape

val md_theme_light_primary = ${hexToCompose(tokens.colors.primary)}
val md_theme_light_background = ${hexToCompose(tokens.colors.background)}
val md_theme_light_surface = ${hexToCompose(tokens.colors.surface)}
val md_theme_light_error = ${hexToCompose(tokens.colors.error)}

// Shapes
val shapes = Shapes(
    small = RoundedCornerShape(${tokens.radius.sm}),
    medium = RoundedCornerShape(${tokens.radius.md}),
    large = RoundedCornerShape(${tokens.radius.lg})
)`;
}

export function generateFlutter(tokens: DesignTokens): string {
  function hexToFlutter(hex: string): string {
    return `Color(0xFF${hex.replace('#', '').toUpperCase()})`;
  }

  return `import 'package:flutter/material.dart';

class AppTheme {
  static final ThemeData lightTheme = ThemeData(
    primaryColor: ${hexToFlutter(tokens.colors.primary)},
    scaffoldBackgroundColor: ${hexToFlutter(tokens.colors.background)},
    cardColor: ${hexToFlutter(tokens.colors.surface)},
    colorScheme: ColorScheme.light(
      primary: ${hexToFlutter(tokens.colors.primary)},
      surface: ${hexToFlutter(tokens.colors.surface)},
      error: ${hexToFlutter(tokens.colors.error)},
    ),
  );
}`;
}

export function generateFigmaTokens(tokens: DesignTokens): string {
  return JSON.stringify({
    global: {
      colors: {
        primary: { value: tokens.colors.primary, type: "color" },
        background: { value: tokens.colors.background, type: "color" },
        surface: { value: tokens.colors.surface, type: "color" },
        text: { value: tokens.colors.foreground, type: "color" }
      },
      radii: {
        sm: { value: tokens.radius.sm, type: "borderRadius" },
        md: { value: tokens.radius.md, type: "borderRadius" },
        lg: { value: tokens.radius.lg, type: "borderRadius" }
      }
    }
  }, null, 2);
}
