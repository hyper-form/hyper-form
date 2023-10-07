module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  plugins: ['react', 'testing-library', 'jest', 'lodash'],
  settings: {
    react: {
      version: '18.2'
    }
  },
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:lodash/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'standard-jsx',
    'standard-react'
  ],
  rules: {
    // 允許只引入部分包
    'lodash/import-scope': [2, 'member'],
    'lodash/chaining': [2, 'always']
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:jest/all', 'plugin:testing-library/react'],
      env: {
        jest: true,
        node: true
      }
    },
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
        ecmaVersion: 'latest',
        createDefaultProgram: true
      },
      plugins: [
        '@typescript-eslint',
        'react',
        'testing-library',
        'jest',
        'lodash',
        'deprecation'
      ],
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
        'standard-react'
      ]
    },
    {
      files: ['*.yaml', '*.yml'],
      parser: 'yaml-eslint-parser',
      extends: ['plugin:yml/standard']
    },
    {
      files: ['*.json', '*.json5', '*.jsonc'],
      parser: 'jsonc-eslint-parser',
      extends: ['plugin:jsonc/recommended-with-jsonc']
    }
  ]
}
