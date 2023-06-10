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
  plugins: [
    '@typescript-eslint',
    'prettier',
    'react',
    'testing-library',
    'jest',
    'lodash',
    'deprecation'
  ],
  settings: {
    react: {
      version: '18.2'
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'standard',
    'standard-with-typescript',
    'plugin:lodash/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'standard-jsx',
    'standard-react',
    'prettier'
  ],
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:jest/all', 'plugin:testing-library/react'],
      env: {
        jest: true,
        node: true
      }
    }
  ]
}
