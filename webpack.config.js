/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    index: './src/index.ts',
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'lib', 'umd'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'MyLib',
    umdNamedDefine: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
    ],
  },
  // plugins: [new BundleAnalyzerPlugin()],
  externals: {
    react: 'umd react',
    'react-dom': 'umd react-dom',
    'netlify-cms-app': 'umd netlify-cms-app',
    'netlify-identity-widget': 'umd netlify-identity-widget',
  },
};
