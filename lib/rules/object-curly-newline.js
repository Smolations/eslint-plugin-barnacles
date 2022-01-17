/**
 * @fileoverview make sure that properties are always on their own line when original rule is triggered
 * @author Smolations
 */
"use strict";

const util = require('util');
const astLog = require('../ast-log');
const type = require('../type');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  meta: {
    type: 'layout', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "make sure that properties are always on their own line when original rule is triggered",
      category: "some category",
      recommended:  true,
      url: null, // URL to the documentation page for this rule
    },
    fixable: 'whitespace', // Or `code` or `whitespace`
    schema: [
      // "yoda": [2, "never", { "exceptRange": true }]
      {
        "enum": ["always", "never"]
      },
      {
        "type": "object",
        "properties": {
          "minProperties": {
            "type": "number",
            "min": 1
          },

        },
        "additionalProperties": false
      }
    ], // Add a schema if the rule has options (do this for alphabetizing)
    messages: {
      requireMultiline: 'Properties must be initialized on separate lines',
    } // reuse messages via context.report({ messageId }) using data to interpolate
  },

  create(context) {
    // variables should be defined here
    const sourceCode = context.getSourceCode();
    // console.log('source', sourceCode.getText());

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      // visitor functions for different types of nodes
      VariableDeclaration(node) {
        // console.log(node)
        // astLog('VariableDeclaration', node)
        // util.inspect(node, { depth: 5 })

        const declarator = node.declarations[0];
        const assignedExpression = declarator.init;

        // if (assignedExpression.type === 'ObjectExpression') {
        if (type.isObjectExpression(assignedExpression)) {
          const propCount = assignedExpression.properties.length;
          const { line: startLine } = assignedExpression.loc.start;
          const { line: endLine } = assignedExpression.loc.end;

          // eventually check for minProperties
          if (startLine === endLine) {
            context.report({
              node, // OR loc; will be indicated in error output
              messageId: 'requireMultiline',
              // data: {
              //   name: "foo",
              // }
            });
          }
        }

        // throw the error
      }
    };
  },
};
