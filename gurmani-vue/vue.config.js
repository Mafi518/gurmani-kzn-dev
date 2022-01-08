module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
                    @import "@/assets/styles/style.scss";
                `,
      },
    },
  },
  devServer: {
    port: 8080,
  },
};
