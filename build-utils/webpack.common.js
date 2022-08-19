const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.jsx'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      /* {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }, */
      /* {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      }, */
      /* {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      }, */
      /* {
        test: /\.(png|jpg|gif)$/i,
        use: {
          loader: 'file-loader',
        },
      }, */
      /* {
        test: /\.(png|jpg|gif)$/i,
        dependency: { not: ['url'] },
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      }, */
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf|ico)$/i,
        type: 'asset/resource',
      },
      /* {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      }, */
      /* {
        test: /\.svg/,
        type: 'asset/inline',
      }, */
      /* {
        test: /\.(png|jpg|gif)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'images/[name].[hash:8].[ext]',
          },
        },
      }, */
      /* {
        test: /\.(png|jpe?g|webp)$/,
        use: ['url-loader'],
        options: {
          limit: 8192,
          name: '[name].[ext]',
          publicPath: 'images/',
        },
      }, */
    ],
  },
  resolve: {
    extensions: [
      '*',
      '.js',
      '.jsx',
      '.css',
      '.jpg',
      '.jpeg',
      '.png',
      '.webp',
      '.ico',
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'rCart',
      template: path.resolve(__dirname, '..', './public/index.html'),
    }),
  ],
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    static: path.resolve(__dirname, './dist'),
    hot: true,
    historyApiFallback: true,
  },
};
