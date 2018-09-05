import babel from 'rollup-plugin-babel';
import { cjsConfig, esConfig } from './base';

export default [
  {
  ...cjsConfig,
    plugins: [
      babel({
        babelrc: false,
        presets: [['@babel/env', { modules: false }]],
        exclude: 'node_modules/**'
      }),
    ],
  },
  {
    ...esConfig,
    plugins: [
      babel({
        babelrc: false,
        presets: [['@babel/env', { modules: false }]],
        exclude: 'node_modules/**'
      }),
    ],
  }
];

