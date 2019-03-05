import babel from 'rollup-plugin-babel';

const share = {
  input: 'src/index.js',
  plugins: [babel({ exclude: 'node_modules/**' })],
};

export default [
  {
    ...share,
    output: {
      file: 'lib/fetch-extended.js',
      format: 'cjs',
      exports: 'named',
    },
  },
  {
    ...share,
    output: {
      file: 'lib/fetch-extended.es.js',
      format: 'es',
    },
  },
];
