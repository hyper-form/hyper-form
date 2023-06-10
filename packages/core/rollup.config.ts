import type { RollupOptions } from 'rollup'
import license from 'rollup-plugin-license'
import eslint from '@rbnlffl/rollup-plugin-eslint'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import typescript from '@rollup/plugin-typescript'
import jsx from 'acorn-jsx'
import dts from 'rollup-plugin-dts'
import terser from '@rollup/plugin-terser'

const jsConfig: RollupOptions = {
  input: 'src/index.ts',
  acornInjectPlugins: [jsx()],
  plugins: [
    eslint({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      filterInclude: 'src/**/*.(js|jsx|ts|tsx)'
    }),
    peerDepsExternal(),
    typescript({
      tsconfig: 'tsconfig.build.json'
    }),
    terser()
  ],
  treeshake: true,
  output: [
    {
      file: 'dist/index.js',
      format: 'es',
      sourcemap: false
    }
  ]
}

const typeConfig: RollupOptions = {
  input: 'types/index.d.ts',
  plugins: [
    dts(),
    license({
      banner: {
        commentStyle: 'regular',
        content:
          'Copyright © <%= moment().format("YYYY")%> CH-Chang. All rights reserved.'
      }
    })
  ],
  output: [
    {
      file: 'dist/index.d.ts',
      format: 'es'
    }
  ]
}

export default [jsConfig, typeConfig]
