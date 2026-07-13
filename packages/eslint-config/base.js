import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.strict,
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: { ...globals.node, ...globals.es2022 },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**', '.next/**', '.turbo/**', 'coverage/**'],
  },
);
