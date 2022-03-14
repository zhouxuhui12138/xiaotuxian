const path = require("path")

module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        path.join(__dirname, "./src/assets/style/variables.less"),
        path.join(__dirname, "./src/assets/style/mixins.less")
      ]
    }
  },
  // 把10kb下的图标打包成base64
  chainWebpack: config => {
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap(options => Object.assign(options, { limit: 10000 }))
  }
}
