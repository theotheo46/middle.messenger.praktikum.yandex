const webpack = require("webpack");
//const webpackDevServer = require('webpack-dev-server');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
    clean: true
  },

  module: {
    rules: [
      {
        test: /\.pcss$/,
        use: [
            "style-loader",
            {
                loader: "css-loader",
                options: {
                  modules: true,
                  importLoaders: 1,
                },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      "postcss-nested",
                      "postcss-simple-vars",
                      "postcss-conditionals-renewed"
                    ],
                  ],
                },
              },
            },
          ],
      },
      {
        test: /\.hbs$/,
        use: [
            {
                loader: 'handlebars-template-loader'
            }
        ]
      },
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        use: "ts-loader" // or we can use awesome-typescript-loader
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
        template: 'src/index.html'
      })

  ],

  resolve: {
    extensions: ['.ts', '.js', '*.json', '*.hbs', '*.pcss', '*.html']
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 9000,
    historyApiFallback: true
  },
};
