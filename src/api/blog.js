import request from "./request";

// 博客接口
// 获取全部博客
export function getBlogData() {
    return request({
        url: "/blogs",
        method: 'get'
    })
}