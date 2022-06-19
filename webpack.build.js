const CopyPlugin = require("copy-webpack-plugin");
const { merge } = require('webpack-merge')
const getWebpackConfig = require('./config/webpack/webpack.common.js')
const path = require('path')
const pkg = require('./package.json')

const distPrefixRe = new RegExp('^' + process.env.DIST + '/', 'g')

module.exports = merge(
  getWebpackConfig({
    sourceDirectory: path.resolve(__dirname, 'src'),
    targetDirectory: path.resolve(__dirname, process.env.DIST),
    copyPublicFolder: false,
    injectHTML: false,
  }),
  {
    devtool: false,
    externals: {
      react: 'umd react',
      'react-dom' : 'umd react-dom'
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: path.resolve(__dirname, 'icons/flags_1x1/*'), to: path.resolve(__dirname, process.env.DIST)},
          { from: path.resolve(__dirname, 'icons/flags_4x3/*'), to: path.resolve(__dirname, process.env.DIST)},

        ],
      }),
    ],
    output: {
      publicPath: '',
      filename: pkg.main.replace(distPrefixRe, ''),
      path: path.resolve(__dirname, process.env.DIST),
      library: {
        name: pkg.name,
        type: 'umd',
      },
    },
  }
)
