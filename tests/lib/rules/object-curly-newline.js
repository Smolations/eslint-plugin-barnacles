/**
 * @fileoverview make sure that properties are always on their own line when original rule is triggered
 * @author Smolations
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
const rule = require('../../../lib/rules/object-curly-newline');
const RuleTester = require('../rule-tester');
const addDefaultOptions = require('../add-default-options');


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

// cover nested object test case?

// most test cases using default minProperties of 3
ruleTester.run('object-curly-newline', rule, {
  valid: [
    {
      code: 'const foo = { one: 1, two: 2 };',
    },
    {
      code: `
        const foo = {
          one: 1,
          two: 2,
          three: 3
        };
      `,
    },
    {
      code: `
        const {
          one,
          two,
          three
        } = foo;
      `,
    },
    {
      code: 'function foo({ one, two }) {};',
    },
    {
      code: 'function foo(standalone, { one, two }) {};',
    },
    {
      code: `
        function foo({
          one,
          two,
          three: threeRename
        }) {};
      `,
    },
    {
      code: `
        function foo(standalone, {
          one,
          two,
          three: threeRename
        }) {};
      `,
    },
    {
      code: `
        const foo = (standalone, {
          one,
          two,
          three: threeRename
        }) => {};
      `,
    },
  ].map(addDefaultOptions),

  invalid: [
    {
      code: 'const foo = { one: 1, two: 2, three: 3 };',
      errors: [{ messageId: 'requireMultilineInit' }],
      // type: '...', // references node type
    },
    {
      code: 'const { one, two, three } = foo;',
      errors: [{ messageId: 'requireMultiline' }],
    },
    {
      code: `
        const foo = {
          one: 1, two: 2, three: 3
        };
      `,
      errors: [{ messageId: 'requireMultilineInit' }],
    },
    {
      code: `
        const {
          one, two, three
        } = foo;
      `,
      errors: [{ messageId: 'requireMultiline' }],
    },
    {
      code: 'function foo({ one, two, three: threeRename }) {}',
      errors: [{ messageId: 'requireMultiline' }],
    },
    {
      code: 'const foo = ({ one, two, three: threeRename }) => {}',
      errors: [{ messageId: 'requireMultiline' }],
    },
  ].map(addDefaultOptions),
});
