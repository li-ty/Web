/**webpack.dev.conf.js */
// const { merge } = require('webpack-merge')
const path = require('path')
// const BaseConfig = require('./webpack.base.conf.js')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const pkg = require('../package.json');
const name = pkg.name.split('/')[1];

module.exports = {
  mode: 'production',
  //=> 开启文件监听
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 200
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new VueLoaderPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new MiniCssExtractPlugin({
      filename: 'coreindex.min.css'
    })
  ],
  // devtool: 'source-map',
  module: {
    rules: [
      {
        // 这里limit设置的数值单位为字节，不是KB，数值20480换算后为20KB，
        // 当图片大小> 20KB，则打包到dist文件夹中；当图片 < 20KB，则直接打包到js文件中
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[hash:7].[ext]',
            // importLoaders: 1,
            url: false
            // outputPath: 'static/img/',
            // limit: 20480
          }
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)\w*/,
        loader: 'url-loader?limit=1000000'
      },
      {
        test: /\.txt$/,
        use: 'raw-loader'
      },
      {
        test: /\.ts$/,
        use: "ts-loader"
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // exclude: /node_modules/,
        // include: resolve('src')
      },
      {
        test: /\.less$/i,
        use: [
          //loader是有顺序的[从右到左执行]
          // Creates `style` nodes from JS strings
          "style-loader",//=>把编译好的css插入到head当中
          MiniCssExtractPlugin.loader,//=>把css全部编译到独立的文件里面去
          // Translates CSS into CommonJS
          "css-loader",//=>可编译@import url(./common.css);
          // Compiles Sass to CSS
          "postcss-loader",
          "less-loader"
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          //loader是有顺序的[从右到左执行]
          // Creates `style` nodes from JS strings
          "style-loader",//=>把编译好的css插入到head当中
          // Translates CSS into CommonJS
          "css-loader",//=>可编译@import url(./common.css);
          // Compiles Sass to CSS
          "postcss-loader",
          "sass-loader",
          {
            loader: "sass-resources-loader",
            options: {
              resources: [path.join(__dirname, "../src/lib/assets/common/variables.scss")]
            }
          }
        ]
      },
      {
        //基于正则表达式规则匹配处理哪些文件
        test: /\.css$/i,
        //loader是有顺序的[从右到左执行]
        use: [
          // "style-loader",//=>把编译好的css插入到head当中
          MiniCssExtractPlugin.loader,//=>把css全部编译到独立的文件里面去
          "css-loader",//=>可编译@import url(./common.css);
          "postcss-loader"
        ]
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      // 配置别名'vue$'，不然import 'vue'时，webpack找不到
      // 'vue$': 'vue/dist/vue.esm.js',
      // 这个为src配置别名，非必需，为方便而已
      '@': path.resolve(__dirname, './src'),
      'vue$': "vue/dist/vue.esm.js"
    },
    extensions: ['.js', '.ts', '.vue']
  },
  output: {
    library: name,
    libraryTarget: "umd",
    filename: `${name}.umd.js`,
    //输出目录
    path: path.join(__dirname, "../lib")
  }
}