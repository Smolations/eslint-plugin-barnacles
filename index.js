module.exports = {
  // parser: "@babel/eslint-parser",
  environments: {
    parserOptions: {
      ecmaVersion: 6,
    },
  },
  rules: {
    'object-curly-newline': require('./lib/rules/object-curly-newline'),
  },
};
