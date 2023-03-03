/**
 * 编写自定义规则
 */
const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {

  //=>配置环境
  mode: 'production',
  // watch: true,
  // watchOptions: {
  //   ignored: /node_modules/,
  //   aggregateTimeout: 200
  // },
  //入口
  entry: {
    bundle: path.resolve(__dirname, '../example/main.js')
  },
  //出口
  output: {
    //输出文件名称
    filename: "main.js",
    //输出目录
    path: path.join(__dirname, "../dist/")
  },
  devtool: false,//'source-map',
  //=>关于webpack-dev-server的配置
  devServer: {
    //创建服务指定端口
    port: 3000,
    //=>显示打包进度
    progress: true,
    contentBase: [path.resolve(__dirname, '../public'), path.resolve(__dirname, '../dist')],
    //=>编译完会自动打开
    open: true
  },
  //=>https://www.bilibili.com/video/BV1JJ411Q7Fy?p=5&spm_id_from=pageDriver
  //=>使用插件[https://www.bilibili.com/video/BV1JJ411Q7Fy?p=4]
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
      //=>指定自己模板
      template: './example/index.html',
      //=>输出的文件名
      filename: 'index.html',
      //=>编译后的代码增加hash时间戳
      // hash: true,
      minify: {
        //去空格
        collapseWhitespace: true,
        //移除注释
        removeComments: true,
        // removeAttributeQuotes: true,
        // removeEmptyAttributes: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'main.min.css'
    })
  ],
  //=>开启文件监听
  // watch: true,
  // watchOptions: {
  //   ignored: /node_modules/,
  //   aggregateTimeout: 200
  // },
  //=>使用加载器loader
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
            // outputPath: 'static/img/',
            // limit: 20480
          }
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)\w*/,
        loader: 'url-loader?limit=1000000',
        options: {
          name: '[name].[hash:7].[ext]',
          // outputPath: 'static/img/',
          // limit: 20480
        }
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
          MiniCssExtractPlugin.loader,
          //【MiniCssExtractPlugin学习】https://maomao.ink/index.php/IT/1525.html
          //loader是有顺序的[从右到左执行]
          // Creates `style` nodes from JS strings
          // "style-loader",//=>把编译好的css插入到head当中
          // MiniCssExtractPlugin.loader,//=>把css全部编译到独立的文件里面去
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
          // 'style-loader',
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
  }

};
