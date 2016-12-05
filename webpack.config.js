var path = require('path');
var webpack = require('webpack');
var AotPlugin = require('@ngtools/webpack').AotPlugin;

console.log(path.join(__dirname, 'src', 'index.ts'));

module.exports = {
  entry: {
    'ng2-auto-complete': path.join(__dirname, 'src', 'index.ts')
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.css', '.html']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "[name].umd.js",
    library: ["[name]"],
    libraryTarget: "umd"
  },
  externals: [
    /^rxjs\//,    //.... any other way? rx.umd.min.js does work?
    /^@angular\//
  ],
  devtool: 'source-map',
  module: {
    loaders: [
      { // Support for .ts files.
        test: /\.ts$/,
        loaders: ['@ngtools/webpack', 'angular2-template-loader']
      }
    ]
  },
  plugins: [
    new AotPlugin({
      tsConfigPath: path.resolve(__dirname, 'tsconfig.json'),
      entryModule: path.resolve(__dirname, 'src', 'ng2-auto-complete.module') + '#Ng2AutoCompleteModule'
    })
  ]
};
