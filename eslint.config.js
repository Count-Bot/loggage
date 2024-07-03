import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import jsdoc from 'eslint-plugin-jsdoc';

/**
 * @type {import("eslint").Linter.FlatConfig}
 */
export default [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  jsdoc.configs['flat/recommended'],
  {
    files: ['src'],
    plugins: {
      jsdoc,
    },
    rules: {
      'jsdoc/require-jsdoc': ["error", {
        "require": {
          "FunctionDeclaration": true,
          "MethodDefinition": true,
          "ClassDeclaration": true,
          "ArrowFunctionExpression": true,
          "FunctionExpression": true
        }
      }],
      'jsdoc/require-description': 'warn',
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
