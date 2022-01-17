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
      requireMultilineInit: 'Properties must be initialized on separate lines',
      requireMultilineDestructure: 'Properties must be destructured on separate lines',
    },
  },

  create(context) {
    // variables should be defined here
    // const sourceCode = context.getSourceCode();
    // console.log('source', sourceCode.getText());
    // const { options } = context;
    // console.log(options) // empty to start; add in test cases?

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section
    function areCurliesSameLine(node) {
      const { line: startLine } = node.loc.start;
      const { line: endLine } = node.loc.end;
      return startLine === endLine;
    }

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
        const isObjectInit = type.isObjectExpression(assignedExpression);
        const isObjectDestructure = type.isIdentifier(assignedExpression);

        if (isObjectInit) {
          // const propCount = assignedExpression.properties.length;

          // eventually check for minProperties
          if (areCurliesSameLine(assignedExpression)) {
            context.report({
              node, // OR loc; will be indicated in error output
              messageId: 'requireMultilineInit',
            });
          }
        } else if (isObjectDestructure && type.isObjectPattern(declarator.id)) {
          if (areCurliesSameLine(declarator.id)) {
            context.report({
              node,
              messageId: 'requireMultilineDestructure',
            });
          }
        }
      }
    };
  },
};
