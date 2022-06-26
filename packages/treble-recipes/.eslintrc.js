module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
  ],
  // parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 13,
    allowImportExportEverywhere: true,
  },
  plugins: ['jest'],
};
