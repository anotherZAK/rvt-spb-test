const path = require('path');

module.exports = {
  entry: './source/js/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'source/js'),
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'source/js'),
    watchContentBase: true,
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
            ],
          },
        },
      },
    ],
  },
};
