const buildConfiguration = require("./webpack.build.js");

module.exports = {
  ...buildConfiguration,
  watch: true,
  optimization: {
    minimize: false,
  },
}
