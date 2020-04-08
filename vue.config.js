const path = require("path");

module.exports = {
    chainWebpack: (config) => {
        const oneOfsMap = config.module.rule("less").oneOfs.store;
        oneOfsMap.forEach((item) => {
            item
                .use("sass-resources-loader")
                .loader("sass-resources-loader")
                .options({
                    // Provide path to the file with resources//此处为less全局变量放置的位置
                    resources: "./src/common/style/variable.less",
                })
                .end();
        });
    },

    configureWebpack: {
        resolve: {
            // 路径别名
            alias: {
                "@": resolve("src"),
                src: resolve("src"),
                components: resolve("src/components"),
                common: resolve("src/common"),
                store: resolve("src/store"),
                router: resolve("src/router"),
                views: resolve("src/views"),
                api: resolve("src/api"),
            },
        },
    },

    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:8081/gatun",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "",
                },
            },
        },
    },
};

function resolve(dir) {
    return path.join(__dirname, dir);
}