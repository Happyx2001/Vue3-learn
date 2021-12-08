import myAxios from "./axios";

// 登录接口
export function login(paramsList) {
    return myAxios({
        url: '/api/login',
        method: 'post',
        data: paramsList
    })
}