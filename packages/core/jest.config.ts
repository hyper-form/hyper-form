import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es)'],
  testMatch: ['<rootDir>/src/__test__/**/*.(spec|test).ts?(x)'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  verbose: true
}

export default config
