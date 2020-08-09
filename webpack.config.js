const path = require('path'),
  webpack = require('webpack'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const extractPlugin = new ExtractTextPlugin({ filename: './assets/css/app.[hash:6].min.css' });

const config = {
  context: path.resolve(__dirname, 'src'),

  entry: {
    app: './index.js',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './assets/js/[name].[hash:6].min.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.s?css$/,
        use: extractPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: !IS_PRODUCTION,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !IS_PRODUCTION,
              },
            },
          ],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './assets/media/',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({ template: 'index.html' }),
    extractPlugin,
  ],

  devServer: {
    contentBase: path.resolve(__dirname, './dist/assets/media'),
    compress: true,
    port: 2000,
    stats: 'errors-only',
    open: false,
  },

  devtool: IS_PRODUCTION ? false : 'inline-source-map',
};

module.exports = config;
