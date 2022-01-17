/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  notify: true,
  testMatch: [
    '**/tests/lib/rules/*.js',
  ],
};

module.exports = config;
