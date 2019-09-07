module.exports = {
  devServer: {
    proxy: {
      //如果跨域的话，那么就要进行网络代理，让网络请求的时候进行指向，并重指向相关的路径，如果有必要的话。
      "/api": {
        target: "http://localhost:8888",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api"
        }
      },
      "/per": {
        target: "http://localhost:8888",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/per": "/per"
        }
      }
    }
  }
};
