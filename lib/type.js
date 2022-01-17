const type = {};

// dynamic node type tester
// if the function called starts with 'is', compare the node's
// type to the string resulting from stripping 'is' from the
// called function name.
//
// @example
// type.isObjectExpression(node)   // check if node.type === 'ObjectExpression'
module.exports = new Proxy(type, {
  get(target, prop) {
    if (prop.startsWith('is')) {
      return (node) => (node.type === prop.slice(2));
    }
  },
});



// var docCookies = new Proxy(docCookies, {
//   get: function (oTarget, sKey) {
//     return oTarget[sKey] || oTarget.getItem(sKey) || undefined;
//   },
//   set: function (oTarget, sKey, vValue) {
//     if (sKey in oTarget) { return false; }
//     return oTarget.setItem(sKey, vValue);
//   },
//   deleteProperty: function (oTarget, sKey) {
//     if (!sKey in oTarget) { return false; }
//     return oTarget.removeItem(sKey);
//   },
//   enumerate: function (oTarget, sKey) {
//     return oTarget.keys();
//   },
//   ownKeys: function (oTarget, sKey) {
//     return oTarget.keys();
//   },
//   has: function (oTarget, sKey) {
//     return sKey in oTarget || oTarget.hasItem(sKey);
//   },
//   defineProperty: function (oTarget, sKey, oDesc) {
//     if (oDesc && 'value' in oDesc) { oTarget.setItem(sKey, oDesc.value); }
//     return oTarget;
//   },
//   getOwnPropertyDescriptor: function (oTarget, sKey) {
//     var vValue = oTarget.getItem(sKey);
//     return vValue ? {
//       value: vValue,
//       writable: true,
//       enumerable: true,
//       configurable: false
//     } : undefined;
//   },
// });
