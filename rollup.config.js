import babel from '@rollup/plugin-babel';
import external from 'rollup-plugin-peer-deps-external';
import del from 'rollup-plugin-delete';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default {
  input: pkg.source,
  output: [
    { file: pkg.main, format: 'cjs' },
    {
      name: "Clipuff",
      file: pkg.browser,
      format: 'umd',
    },
    {
      file: pkg.unpkg,
      format: 'cjs',
      plugins: [
        terser({
          // To preserve licensing via comments
          format: {
            comments: (node, comment) => {
              const text = comment.value;
              const { type } = comment;
              if (type === 'comment2') {
                // multiline comment
                return /@preserve|@license|@cc_on/i.test(text);
              }
              return null;
            },
          },
        }),
      ],
    },
    { file: pkg.module, format: 'esm' },
  ],
  plugins: [
    external(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
    }),
    nodeResolve(),
    del({ targets: ['dist/*'] }),
    commonjs(),
  ],
  external: Object.keys(pkg.peerDependencies || {}),
};
