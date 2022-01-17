const path = require('path');
const RuleTester = require('eslint').RuleTester;

// strangely, specifying a parser _requires_ an absolute path
RuleTester.setDefaultConfig({
  parser: path.resolve(__dirname, "../../node_modules/@babel/eslint-parser"),
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});


module.exports = RuleTester;
