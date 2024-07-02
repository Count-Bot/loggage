import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/**
 * @type {import("eslint").Linter.FlatConfig}
 */
export default [
  { files: ['src'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'quotes': ['warn', 'single'],
      'comma-dangle': ['error', {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'functions': 'always-multiline',
      }],
      'no-var': 'error',
      'no-useless-return': 'error',
      'no-multi-str': 'warn',
      'no-inline-comments': 'warn',
      'curly': ['warn', 'all'],
      'camelcase': 'warn'
    },
  },
];
