module.exports = function addDefaultOptions(testCase) {
  testCase.options = testCase.options || [{}];
  return testCase;
}
