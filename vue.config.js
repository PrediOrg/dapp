module.exports = {
  outputDir: 'dist',
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
                  @import "~@/assets/css/mixin.scss";
                `,
      },
    },
  },
  devServer: {
    host: '0.0.0.0',
    port: '8080',
    proxy: {
      '^/api': {
        historyApiFallback: true,
        // target: 'https://testnet.predi.social',
        target: 'https://www.predi.social',
        // target: 'http://localhost',
        ws: true,
        changeOrigin: true,
      },
    },
    open: true,
  },
};
