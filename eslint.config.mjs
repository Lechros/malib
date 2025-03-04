// @ts-check

import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { dirname } from 'path';
import tseslint, { parser } from 'typescript-eslint';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parser: parser,
      parserOptions: {
        project: ['tsconfig.json', 'packages/*/tsconfig.*.json'],
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
    },
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    extends: [eslint.configs.recommended],
  },
  eslintPluginPrettierRecommended,
  {
    ignores: ['**/dist/*', '**/coverage/*', '**/.*'],
  },
);
