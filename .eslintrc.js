module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 'latest',
    createDefaultProgram: true
  },
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'standard',
    'standard-with-typescript',
    'plugin:lodash/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'standard-jsx',
    'standard-react'
  ],
  plugins: ['@typescript-eslint', 'react', 'lodash', 'deprecation'],
  settings: {
    react: {
      version: '18.2'
    }
  },
  rules: {
    'space-before-function-paren': 0,
    '@typescript-eslint/space-before-function-paren': 0
  }
}
