import { merge } from "webpack-merge";

export default (env = { presets: [] }) => {
  const presets = env.presets || [];
  /** @type {string[]} */
  const mergedPresets = [].concat(...[presets]);
  const mergedConfigs = mergedPresets.map((presetName) =>
    require(`./webpack.${presetName}.js`)(env)
  );

  return merge({}, ...mergedConfigs);
};
// module.exports = loadPresets;
