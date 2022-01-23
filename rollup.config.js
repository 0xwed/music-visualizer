import typescript from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

const INPUT_ENTRY = 'src/index.ts'

export default [
  {
    input: INPUT_ENTRY,
    output: {
      file: 'dist/index.es.js',
      format: 'es'
    },
    plugins: [
      typescript({
        strict: true,
        esModuleInterop: true,
      }),
      babel({
        extensions: ['.ts'],
      }),
    ]
  },
  {
    input: INPUT_ENTRY,
    output: {
      file: 'dist/index.umd.min.js',
      format: 'umd',
      name: 'musicVisualizer',
      indent: false,
    },
    plugins: [
      typescript({
        strict: true,
        esModuleInterop: true,
      }),
      babel({
        extensions: ['.ts'],
        exclude: 'node_modules/**',
      }),
      terser(),
    ],
  }
];