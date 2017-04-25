var path=require('path'),
    webpack =require('webpack'),
    ROOT_PATH=path.resolve(__dirname),
    APP_PATH=path.resolve(ROOT_PATH,'app'),
    BUILD_PATH=path.resolve(ROOT_PATH,'build'),
    TEM_PATH = path.resolve(ROOT_PATH, 'templates'),
    HtmlWebpackPlugin=require('html-webpack-plugin');

module.exports={
  entry: {
    app: path.resolve(APP_PATH, 'js/index.js'),
    //添加要打包在vendors里面的库
    vendors: ['zepto', 'sweetalert', 'Clipboard']
  },
 	output:{
 		path: BUILD_PATH,
 		 //注意 我们修改了bundle.js 用一个数组[name]来代替，他会根据entry的入口文件名称生成多个js文件，这里就是(app.js,mobile.js和vendors.js)
 		filename: '[name].js'
 	},
 	plugins:[
    //压缩打包的文件
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        //supresses warnings, usually from module minification
        warnings: false
      }
    }),
    //把入口文件里面的数组打包成verdors.js
    new webpack.optimize.CommonsChunkPlugin('vendors', 'common.js'),
    /*所以新建一个专门放模版的文件夹templates,在里面加两个模版文件index.html 和 mobile.html*/
    new HtmlWebpackPlugin({
      title: '积分兑换',
      template: path.resolve(TEM_PATH, 'index.html'),
      filename: 'index.html',
      //chunks这个参数告诉插件要引用entry里面的哪几个入口
      chunks: ['app','vendors'],
      //要把script插入标签里
      inject: 'body'
    })
 	],
  devServer: {
    proxy: {
      "/api": {
        "target": "http://gamepre.adbaitai.com/",
        "changeOrigin": true
      }
    },
    // host: '192.168.10.235',
    // historyApiFallback: true,
    // hot: true,
    // inline: true,
    // progress: true
  },
 	module: {
    loaders:[
      {
        test: require.resolve('zepto'),
        loader: 'exports-loader?window.Zepto!script-loader'
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        /*注意loaders的处理顺序是从右到左的，这里就是先运行css-loader然后是style-loade*/
        include: path.resolve(APP_PATH, 'css')
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=5000'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.resolve(APP_PATH, 'js'),
        query: {
          presets: ['es2015']
        }
      }
    ]
 	}
}
