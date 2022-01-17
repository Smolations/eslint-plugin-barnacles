/**
 * @fileoverview make sure that properties are always on their own line when original rule is triggered
 * @author Smolations
 */
'use strict';

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
      requireMultiline: 'Object properties must be on separate lines',
    },
  },

  create(context) {
    const { options } = context;

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // pass ObjectExpression or Object
    function arePropsOnePerLine(node) {
      const { line: startLine } = node.loc.start;
      const { line: endLine } = node.loc.end;
      const numProperties = node.properties.length;
      // strict equality likely won't work for nested object case
      return (endLine - startLine + 1) === numProperties + 2;
    }

    function hasMinProperties(node) {
      const [{ minProperties }] = options;
      return node.properties.length >= minProperties;
    }

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      // ditch in favor of ObjectExpression?
      VariableDeclaration(node) {
        // maybe account for multiple, comma-separated declarations?
        const declarator = node.declarations[0];
        const assignedExpression = declarator.init;
        const isObjectInit = type.isObjectExpression(assignedExpression);
        let shouldThrow;

        if (isObjectInit && hasMinProperties(assignedExpression)) {
          shouldThrow = !arePropsOnePerLine(assignedExpression);

          if (shouldThrow) {
            context.report({
              node, // OR loc; will be indicated in error output
              messageId: 'requireMultilineInit',
            });
          }
        }
      },
      ObjectPattern(node) {
        // is it important to know scope other than to
        // customize error messages?
        // const scope = context.getScope();
        // console.log(scope.type);

        if (hasMinProperties(node)) {
          const shouldThrow = !arePropsOnePerLine(node);

          if (shouldThrow) {
            context.report({
              node,
              messageId: 'requireMultiline',
            });
          }
        }
      },
    };
  },
};
