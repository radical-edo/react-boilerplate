'use strict';
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const { env: { NODE_ENV = 'development' } = {} } = process;

module.exports = {
  entry: {
    app: './app/app.jsx',
    vendor: [
      'moment', 'browser-resource',
      'redux', 'immutable', 'react-redux', 'styled-components', 'react-router', 'react', 'react-dom'
    ]
  },
  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  devServer: {
    historyApiFallback: true,
    quiet: false,
    noInfo: false,
    stats: {
      assets: true,
      assetsSort: 'size',
      cached: false,
      children: false,
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      errors: true,
      errorDetails: true,
      hash: false,
      modules: false,
      publicPath: false,
      reasons: false,
      source: false,
      timings: true,
      version: false,
      warnings: true,
    }
  },
  performance: {
    hints: false
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor']
    })
  ],
  module: {
    exprContextCritical: false,
    loaders: [{
      test: /\.html$/,
      loader: `html-loader?root=${path.resolve(__dirname, 'app')}`
    }, {
      test: /\.jsx$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      include: path.resolve('./app'),
      query: {
        presets: ['react', 'es2015', 'stage-2'] // order of these matter!...
      }
    }]
  }
};
