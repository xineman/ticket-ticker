/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { optimize: { CommonsChunkPlugin }, DefinePlugin } = require('webpack');

module.exports = {
  entry: {
    background: './src/js/background',
    popup: './src/js/popup',
  },
  resolve: {
    alias: {
      Services: path.resolve(__dirname, 'src/js/services'),
      Api: path.resolve(__dirname, 'src/js/api'),
      Helpers: path.resolve(__dirname, 'src/js/helpers'),
    },
    modules: [path.join(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              fix: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      // {
      //   test: /\.css$/,
      //   exclude: [
      //     /node_modules/,
      //   ],
      //   loader: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: ['css-loader?modules&localIdentName="[local]__[hash:base64:6]"', 'postcss-loader'],
      //   }),
      // },
    ],
  },
  plugins: [
    // new ExtractTextPlugin({
    //   filename: 'master.css',
    //   allChunks: true,
    // }),
    new DefinePlugin({
      baseURL: JSON.stringify('https://booking.uz.gov.ua/train_search'),
    }),
    new CopyWebpackPlugin([
      { from: './src' },
    ], {
      ignore: ['js/**/*'],
    }),
    new CommonsChunkPlugin({
      name: 'commons',
      filename: 'commons.js',
    }),
  ],
};
