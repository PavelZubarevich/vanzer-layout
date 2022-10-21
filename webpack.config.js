const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV;
const devMode = mode !== "production";
const dirPath = {
  main: path.resolve(__dirname, 'dist'),
  styles: path.join('styles', '[name].[contenthash].css'),
  img: path.join('assets', 'img', '[name].[hash][ext]'),
  fonts: path.join('assets', 'fonts', '[name][ext]'),
  src: path.join(__dirname, 'src')
}

module.exports = {
  mode,
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    publicPath: 'auto',
    path: dirPath.main,
    clean: true,
    assetModuleFilename: '[hash][ext][query]'
  },
  target: devMode ? 'web' : 'browserslist',
  devtool: devMode ? 'eval-source-map' : 'source-map',
  devServer: {
    static: dirPath.main,
    port: 3000,
    open: true,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: dirPath.styles,
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: 'html-loader'
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          !devMode ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, "postcss.config.js"),
              },
            }
          },
          'sass-loader'
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
        use: 'image-webpack-loader',
        generator: {
          filename: dirPath.img
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: dirPath.fonts
        }
      },
    ],
  },
}