import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es)']
}

export default config
