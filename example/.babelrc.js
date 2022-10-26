module.exports = {
  presets: [['next/babel']],
  plugins: [
    // tsyringe
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { "legacy": true }]
    // tsyringe
  ]
};