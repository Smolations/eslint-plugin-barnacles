'use strict';

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:eslint-plugin/recommended',
    'plugin:node/recommended',
  ],
  env: {
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 8,
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'function-paren-newline': ['error', 'multiline'],
    'quotes': ['error', 'single'],
  },
  overrides: [
    {
      files: ['tests/**/*.js'],
      env: { jest: true },
    },
  ],
};
