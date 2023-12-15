import webpack from "webpack";
import paths from "./config/paths.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { merge } from "webpack-merge";
import loadPreset from "./config/presets/loadPreset.js";
import nodeExternals from "webpack-node-externals";

import config from "./config/webpack.production.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function (env) {
  const { mode = "production" } = env || {};
  return merge(
    {
      mode,
      entry: `${paths.srcPath}/index.js`,
      output: {
        path: paths.distPath,
        filename: "index.js",
        libraryTarget: "umd",
      },
      externals: [
        nodeExternals(),
        {
          react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "react",
            root: "React",
          },
          "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "react-dom",
            root: "ReactDOM",
          },
        },
      ],
      module: {
        rules: [
          {
            test: /\.m?js/,
            resolve: {
              fullySpecified: false,
            },
          },
          {
            test: /\.js$/,
            use: ["babel-loader"],
            exclude: path.resolve(__dirname, "node_modules"),
          },
          // Images: Copy image files to build folder
          { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "asset/resource" },

          // Fonts and SVGs: Inline files
          { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: "asset/inline" },
        ],
      },
      resolve: {
        modules: [paths.srcPath, "node_modules"],
        extensions: [".js", ".jsx", ".json"],
        fallback: {
          // crypto: import.meta.resolve("crypto-browserify"),
          // stream: require.resolve("stream-browserify"),
        },
      },
      target: "node",
      plugins: [
        // new webpack.EnvironmentPlugin({
        //   // Configure environment variables here.
        //   ENVIRONMENT: "browser",
        // }),
        new CleanWebpackPlugin(),
        new webpack.ProgressPlugin(),
        // new webpack.ProvidePlugin({
        //   process: "process/browser",
        //   Buffer: [require.resolve("buffer/"), "Buffer"],
        // }),
      ],
    },
    config,
    loadPreset(env)
  );
};
