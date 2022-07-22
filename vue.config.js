const registerRouter = require('./backend/router')

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // 全局引入变量和 mixin
        prependData: `
          @import "@/assets/scss/variable.scss";
          @import "@/assets/scss/mixin.scss";
        `
      }
    }
  },
  devServer: {
    before(app) {
      registerRouter(app)//利用 devServer.before 返回模拟数据，并且可以在 NetWork 中看到请求,返回express实例
    },
    open:true
  },
  configureWebpack: (config) => {
    if (process.env.npm_config_report) {
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin //打包分析工具
      config.plugins.push(new BundleAnalyzerPlugin())
    }
  },
  productionSourceMap: false,//生产环境，无法看源码
  publicPath: process.env.NODE_ENV === 'production' ? '/music-next/' : '/',
  lintOnSave: false
}
