var path=require('path'),
    webpack =require('webpack'),
    ROOT_PATH=path.resolve(__dirname),
    APP_PATH=path.resolve(ROOT_PATH, 'app'),
    BUILD_PATH=path.resolve(ROOT_PATH, 'exchange'),
    TEM_PATH = path.resolve(ROOT_PATH, 'templates'),
    HtmlWebpackPlugin=require('html-webpack-plugin');

module.exports={
  entry: {
    app: path.resolve(APP_PATH, 'js/index.js'),
    vendors: ['zepto']
  },
  output:{
    path: BUILD_PATH,
    filename:'[name].js',
    publicPath: ''
  },
  plugins:[
    //压缩打包的文件
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    //把入口文件里面的数组打包成verdors.js
    new webpack.optimize.CommonsChunkPlugin('vendors', 'common.js'),
    new HtmlWebpackPlugin({
      title: '积分兑换',
      template: path.resolve(TEM_PATH, 'index.html'),
      filename: 'index.html',
      //chunks这个参数告诉插件要引用entry里面的哪几个入口
      chunks:['app', 'vendors'],
      //要把script插入标签里
      inject: 'body'
    })
  ],
  module: {
    loaders: [
      {
        test: require.resolve('zepto'),
        loader: 'exports-loader?window.Zepto!script-loader'
      },
      {
        test: /\.css$/,
        loaders: ['style','css'],
        /*注意loaders的处理顺序是从右到左的，这里就是先运行css-loader然后是style-loade*/
        include: APP_PATH
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=5000'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: APP_PATH,
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}
