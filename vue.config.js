const registerRouter = require('./backend/router')

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // 全局引入变量和 mixin
        additionalData: `
          @import "@/assets/scss/variable.scss";
          @import "@/assets/scss/mixin.scss";
        `
      }
    }
  },
  devServer: {
    before(app) {
      registerRouter(app)
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
