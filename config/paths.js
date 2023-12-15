import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcPath = path.resolve(__dirname, "../src");
const distPath = path.resolve(__dirname, "../dist");
const publicPath = path.resolve(__dirname, "../public");
const nodeModulesPath = path.resolve(__dirname, "../node_modules");

export default {
  srcPath,
  distPath,
  publicPath,
  nodeModulesPath,
};
