import babel from '@rollup/plugin-babel';
import external from 'rollup-plugin-peer-deps-external';
import del from 'rollup-plugin-delete';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import scss from 'rollup-plugin-scss';
import pkg from './package.json';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const { NODE_ENV = 'development' } = process.env;
const isProduction = NODE_ENV === 'production';

export default {
  input: 'src/index.js',
  plugins: [
    external(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
    }),
    nodeResolve(),
    del({ targets: ['dist/*'] }),
    commonjs(),
    scss({
      output: 'dist/index.min.css',
      outputStyle: 'compressed',
    }),
  ],
  output: [
    {
      name: 'Clipuff',
      file: pkg.browser,
      format: 'umd',
      sourcemap: isProduction ? false : true,
    },
    {
      file: pkg.module,
      format: 'es',
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
      sourcemap: isProduction ? false : true,
    },
  ],
};
