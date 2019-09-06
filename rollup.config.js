import json from 'rollup-plugin-json';
import pkg from './package.json';

export default [
  {
    input: 'src/main.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      json(),
    ],
    external: [
      'path',
      'grpc',
      '@grpc/proto-loader',
      'google-protobuf',
      'google-protobuf/google/protobuf/wrappers_pb.js',
      './pb/transaction_pb'
    ],
  },
];
