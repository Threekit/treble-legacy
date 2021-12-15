// https://jestjs.io/docs/configuration
module.exports = {
  coverageReporters: ['html', 'json-summary', 'json'],
  collectCoverageFrom: ['scripts/**'],
  testMatch: ['<rootDir>/tests/**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['node_modules'],
  testEnvironment: 'node',
};
