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


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run('object-curly-newline', rule, {
  valid: [
    // give me some code that won't trigger a warning
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
    // {
    //   code: `
    //     function foo({
    //       one,
    //       two,
    //       three
    //     }) = foo;
    //   `,
    // },
  ],

  invalid: [
    {
      code: `const foo = { one: 1, two: 2, three: 3 };`,
      errors: [{ messageId: 'requireMultilineInit' }],
      // type: '...', // references node type
    },
    {
      code: `const { one, two, three } = foo;`,
      errors: [{ messageId: 'requireMultilineDestructure' }],
    },
    // {
    //   code: `function ({ one, two, three }) {}`,
    //   errors: [{ messageId: 'requireMultiline' }],
    // },
    // {
    //   code: `
    //     const foo = {
    //       one: 1, two: 2, three: 3
    //     };
    //   `,
    //   errors: [{
    //     messageId: 'Properties must be on new line',
    //   }],
    // },
    // {
    //   code: `
    //     const {
    //       one, two, three
    //     } = foo;
    //   `,
    //   errors: [{
    //     messageId: 'Properties must be on new line',
    //   }],
    // },
  ],
});
