/**
 * @fileoverview make sure that properties are always on their own line when original rule is triggered
 * @author Smolations
 */
'use strict';

const type = require('../type');
const conforms = require('../conforms');

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
      description: 'make sure that properties are always on their own line when original rule is triggered',
      category: 'some category',
      recommended:  true,
      url: null, // URL to the documentation page for this rule
    },
    fixable: 'whitespace', // Or `code` or `whitespace`
    schema: [
      // "yoda": [2, "never", { "exceptRange": true }]
      // {
      //   "enum": ["always", "never"]
      // },
      // Type can be: number, integer, string, boolean, array, object or null
      {
        type: 'object',
        properties: {
          minProperties: {
            type: 'integer',
            minimum: 1,
            default: 3,
          },

        },
        additionalProperties: false,
      },
    ],
    messages: {
      requireMultilineInit: 'Properties must be initialized on separate lines',
      requireMultilineDestructure: 'Properties must be destructured on separate lines',
    },
  },

  create(context) {
    // variables should be defined here
    // const sourceCode = context.getSourceCode();
    // console.log('source', sourceCode.getText());
    const { options } = context;

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    function areCurliesSameLine(node) {
      const { line: startLine } = node.loc.start;
      const { line: endLine } = node.loc.end;
      return startLine === endLine;
    }

    function hasMinProperties(node) {
      const [{ minProperties }] = options;
      return node.properties.length >= minProperties;
    }

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      // visitor functions for different types of nodes
      VariableDeclaration(node) {
        // maybe account for multiple, comma-separated declarations?
        const declarator = node.declarations[0];
        const assignedExpression = declarator.init;
        const isObjectInit = type.isObjectExpression(assignedExpression);
        const isObjectDestructure = type.isIdentifier(assignedExpression);
        let shouldThrow;

        if (isObjectInit) {
          shouldThrow = conforms(
            areCurliesSameLine(assignedExpression),
            hasMinProperties(assignedExpression),
          );

          if (shouldThrow) {
            context.report({
              node, // OR loc; will be indicated in error output
              messageId: 'requireMultilineInit',
            });
          }
        } else if (isObjectDestructure && type.isObjectPattern(declarator.id)) {
          shouldThrow = conforms(
            areCurliesSameLine(declarator.id),
            hasMinProperties(declarator.id),
          );

          if (shouldThrow) {
            context.report({
              node,
              messageId: 'requireMultilineDestructure',
            });
          }
        }
      },
    };
  },
};
