// // 配置跨域：proxy 代理
// module.exports = {
//     devServer: {
//         proxy: {
//             "/api": {
//                 target: "http://abson.club/",
//                 changeOrigin: true,   // 设置允许跨域
//                 ws: true,
//                 pathRewrite: {   // 重写路径
//                     "^/api": ""
//                 }
//             }
//         }
//     }
// }