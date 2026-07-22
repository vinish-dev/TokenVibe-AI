import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { ThemeSchema } from '@tokenvibe/shared';
import { generateCSS, generateTailwind, generateCompose, generateFlutter, generateFigmaTokens } from './exportGenerators';

export async function downloadThemeZip(theme: ThemeSchema) {
  const zip = new JSZip();

  // Add generated files
  zip.file('theme.css', generateCSS(theme));
  zip.file('tailwind.config.js', generateTailwind(theme));
  zip.file('Theme.kt', generateCompose(theme));
  zip.file('theme.dart', generateFlutter(theme));
  zip.file('tokens.json', generateFigmaTokens(theme));
  
  // Add a raw dump of the ThemeSchema
  zip.file('schema.json', JSON.stringify(theme, null, 2));

  // Generate and trigger download
  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, `tokenvibe-${theme.metadata.name.toLowerCase().replace(/\s+/g, '-')}.zip`);
}
