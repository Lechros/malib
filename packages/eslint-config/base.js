import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import onlyWarn from 'eslint-plugin-only-warn';
import turboPlugin from 'eslint-plugin-turbo';
import path from 'node:path';
import tseslint, { parser } from 'typescript-eslint';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = tseslint.config(
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommendedTypeCheckedOnly,
      ...tseslint.configs.strictTypeCheckedOnly,
      ...tseslint.configs.stylisticTypeCheckedOnly,
    ],
    languageOptions: {
      parser: parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, '../..'),
      },
    },
  },
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ['dist/**', '.*/**', '.*'],
  },
);
