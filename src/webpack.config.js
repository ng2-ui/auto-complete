var path = require("path");
var webpack = require('webpack');

module.exports = {
  entry: {
    'ng2-auto-complete': path.join(__dirname) +"/index.ts"
  },
  resolve: {
    extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html']
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: "[name].umd.js",
    library: ["[name]"],
    libraryTarget: "umd"
  },
  externals: [
    /^rxjs\//,    //.... any other way? rx.umd.min.js does work?
    /^@angular\//
  ],
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({mangle: { keep_fnames: true }})
  ],
  module: {
    loaders: [
      { // Support for .ts files.
        test: /\.ts$/,
        // loaders: ['ts', 'angular2-template-loader', '@angularclass/hmr-loader'],
        loaders: ['ts', 'angular2-template-loader'],
        exclude: [/test/, /\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
      },
      { // copy those assets to output
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file?name=fonts/[name].[hash].[ext]?'
      },
      { // Support for *.json files.
        test: /\.json$/,
        loader: 'json'
      },
      { // support for .html as raw text
        test: /\.html$/,
        loader: 'raw'
      }
    ]
  }
};
