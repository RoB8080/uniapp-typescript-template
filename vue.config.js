module.exports = {
    // devServer: {
    //     proxy: {
    //         '/dev': {
    //             target: 'https://pet.sonystyle.com.cn',
    //             secure: false,
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 '^/dev':'/content_pipeline/backoffice'
    //             },
    //             logLevel: 'debug',
    //             onProxyReq(proxyReq, req, res) {
    //                 proxyReq.setHeader('referer', 'https://pet.sonystyle.com.cn');
    //             }
    //         }
    //     }
    // },
    css: {
        loaderOptions: {
            sass: {
                data: `@import "~@/style/variables.scss";`
            }
        }
    }
}
