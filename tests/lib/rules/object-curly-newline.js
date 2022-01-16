/**
 * @fileoverview make sure that properties are always on their own line when original rule is triggered
 * @author Smolations
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/object-curly-newline"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("object-curly-newline", rule, {
  valid: [
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: "no",
      errors: [{ message: "Fill me in.", type: "Me too" }],
    },
  ],
});
