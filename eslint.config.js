// @ts-check
// Flat ESLint config (ESLint 9+). Replaces the previous .eslintrc.json files.
// Mirrors the original setup: angular-eslint recommended only (the eslintrc did
// not enable eslint:recommended or typescript-eslint recommended), with the
// per-project selector prefixes and the deferred prefer-standalone rule.
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const cypress = require('eslint-plugin-cypress');

module.exports = tseslint.config(
  {
    ignores: ['dist/**', 'docs/**', 'coverage/**', 'out-tsc/**'],
  },

  // Library — projects/auto-complete (selector prefix: ngui)
  {
    files: ['projects/auto-complete/**/*.ts'],
    extends: [tseslint.configs.base, ...angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'ngui', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'ngui', style: 'kebab-case' },
      ],
      '@angular-eslint/no-input-rename': 'off',
      // Re-enable in Phase 3 alongside the standalone migration.
      '@angular-eslint/prefer-standalone': 'off',
    },
  },

  // Demo app — projects/demo (selector prefix: app)
  {
    files: ['projects/demo/**/*.ts'],
    extends: [tseslint.configs.base, ...angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
      // Re-enable in Phase 3 alongside the standalone migration.
      '@angular-eslint/prefer-standalone': 'off',
    },
  },

  // Templates (external + inline via the processor above)
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended],
    rules: {},
  },

  // Cypress e2e specs and config
  {
    files: ['projects/demo/cypress/**/*.ts', 'projects/demo/cypress.config.ts'],
    extends: [cypress.configs.recommended],
  },
);
