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
  ],

  invalid: [
    {
      code: `const foo = { one: 1, two: 2, three: 3 };`,
      errors: [{
        messageId: 'requireMultiline',
        // type: 'object-curly-newline-type-err1',
      }],
    },
    {
      code: `
        const foo = {
          one: 1, two: 2, three: 3
        };
      `,
      errors: [{
        message: 'Properties must be on new line',
        type: 'object-curly-newline-type-err2',
      }],
    },
    {
      code: `
        const {
          one, two, three
        } = foo;
      `,
      errors: [{
        message: 'Properties must be on new line',
        type: 'object-curly-newline-type-err3',
      }],
    },
  ],
});
