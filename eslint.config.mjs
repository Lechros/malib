// @ts-check

import eslint from '@eslint/js';
import tseslint, { parser } from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

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
        project: ['tsconfig.base.json', 'packages/*/tsconfig.*.json'],
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
