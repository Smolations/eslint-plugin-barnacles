module.exports = function conforms(...conditions) {
  return conditions.reduce((acc, condition) => (acc && condition), true);
}
