// 导入axios
// 封装 axios
import axios from "axios";

function request(config) {
    const instance = new axios.create({
        baseURL: "http://abson.club",
        timeout: 5000
    });

    // 请求拦截器
    instance.interceptors.request.use(
        config => {
            //拦截后需要将拦截下来的请求数据返回发送
            return config;
        },
        err => {
            console.log(err);
        }
    );

    // 响应拦截器
    instance.interceptors.response.use(
        res => {
            // 拦截后需要将拦截下来处理成的结果返回
            return res.data;
        },
        err => {
            console.log(err);
        }
    );

    return instance(config);
}

export default request