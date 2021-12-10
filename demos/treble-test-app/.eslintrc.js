module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['react', 'eslint-plugin-react'],
  rules: {
    /**
     * ESlint overrides
     */
    'no-use-before-define': 'off',
    'no-warning-comments': 'off',
    /**
     * React
     */
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
};
