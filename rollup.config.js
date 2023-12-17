import resolve from "@rollup/plugin-node-resolve";
import babel from 'rollup-plugin-babel';
import commonjs from "@rollup/plugin-commonjs";
import json from '@rollup/plugin-json';
// import typescript from "@rollup/plugin-typescript";
// import dts from "rollup-plugin-dts";

export default [
  {
    input: "src/index.js",
    output: [
      {
        file: "dist/index.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      json(),
      resolve({
        extensions: ['.js', '.jsx'],
      }),
      babel({ 
        exclude: 'node_modules/**',
        presets: ['@babel/env', '@babel/preset-react']
      }),
      commonjs(),
      // typescript({ tsconfig: "./tsconfig.json" }),
    ],
  },
  // {
  //   input: "dist/esm/types/index.d.ts",
  //   output: [{ file: "dist/index.d.ts", format: "esm" }],
  //   plugins: [dts()],
  // },
];