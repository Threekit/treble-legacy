const { getPackages } = require('@commitlint/config-lerna-scopes').utils;

module.exports = {
  extends: [
    '@commitlint/config-conventional',
    '@commitlint/config-lerna-scopes',
  ],
  rules: {
    'scope-enum': ctx =>
      getPackages(ctx).then(packages => [
        2,
        'always',
        [...packages, 'treble-react', 'package', 'release'],
      ]),
  },
};
