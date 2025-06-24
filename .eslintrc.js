module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
      'react',
      'react-hooks',
      '@typescript-eslint'
    ],
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:@typescript-eslint/recommended'
    ],
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    rules: {

    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    env: {
      browser: true,
      es6: true,
      node: true,
    },
    ignorePatterns: ['node_modules/', 'dist/'],
  };