/**
 * 完整 Axios 封装
 * 1. axios 基本功能
 * 2. 取消重复请求
 * 3. Loading 场景
 * 4. 判断不同的状态码
 */
import axios from "axios";
import {ElMessage, ElLoading} from "element-plus";

/**
 * myAxios接收的参数
 * @param axiosConfig 请求配置
 * @param customOptions 是否开启重复请求
 * @param loadingOptions El-Loading 参数实则hi
 * @return { AxiosPromise } axios返回的是promise哦
 */
function myAxios(axiosConfig, customOptions, loadingOptions) {
    const service = axios.create({
        baseURL: "http://localhost:8888", // 设置统一的请求前缀
        timeout: 5000, // 设置统一超时时间
    })

    // 自定义配置（重复请求、Loading）
    let custom_options = object.assign({
        repeat_request_cancel: true,  // 是否开启取消重复请求，默认为 true
        loading: false, // 是否开启 loading 层效果，默认为 false
        error_message_show: true, // 是否开启接口信息错误展示，默认为 true
    }, customOptions)

    // 请求拦截器，config：请求体
    service.interceptors.request.use(
        config => {
            // 判断是否是重复请求
            removePending(config);
            custom_options.repeat_request_cancel && addPending(config);

            // 创建 Loading 实例（element-plus 的 loading)
            if (custom_options.loading) {
                LoadingInstance._count++;
                if (LoadingInstance._count === 1) {
                    LoadingInstance._target = ElLoading.service(loadingOptions);
                }
            }
            return config
        },
        error => {
            return Promise.reject(error);
        }
    );

    // 响应拦截器，response：响应体
    service.interceptors.response.use(
        response => {
            removePending(response.config);
            // 关闭 loading
            custom_options.loading && closeLoading(custom_options);
            return response;
        },
        error => {
            error.config && removePending(error.config);
            // 关闭 loading
            custom_options.loading && closeLoading(custom_options);
            // 处理错误状态码
            custom_options.error_message_show && httpErrorStatusHandel(error);
            return Promise.reject(error)
        }
    )


    return service(axiosConfig)
}

// 2. 取消重复请求，相关变量、函数
// 判断重复请求并储存进队列
// pendingMap：存储队列
const pendingMap = new Map()

/**
 * 生成每个请求唯一的键
 * @param {*} config
 * @return string
 */
function getPendingKey(config) {
    let {url, method, params, data} = config
    // response里面返回的config.data是个字符串对象，因此要做 JSON.parse 处理
    if (typeof data === 'string') data = JSON.parse(data)
    return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
}

/**
 * 储存每个请求的唯一cancel回调，即：cancel() 方法，用于取消请求
 * @param {*} config
 */
function addPending(config) {
    const pendingKey = getPendingKey(config);
    config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
        if (!pendingMap.has(pendingKey)) {
            // 储存 请求唯一键 和 对应的取消方法，map中：键：请求唯一键、值：取消方法
            pendingMap.set(pendingKey, cancel);
        }
    })

}

// 取消重复请求并删除队列
/**
 * 删除重复请求
 * @param {*} config
 */
function removePending(config) {
    const pendingKey = getPendingKey(config);
    if (pendingMap.has(pendingKey)) {
        const cancelToken = pendingMap.get(pendingKey)
        // cancelToken(pendingKey)  中的 pendingKey可以不传
        cancelToken(pendingKey)       // 取出唯一键对应的 cancel 方法后，进行执行，删除请求
        pendingMap.delete(pendingKey) // 删除对应的唯一键
    }
}

// 3. Loading 相关变量、函数
const LoadingInstance = {
    _target: null,  // 保存 Loading 实例
    _count: 0
}

/**
 * 关闭 Loading 层实例
 * @param _options
 */
function closeLoading(_options) {
    // 如果有多个请求同时发生，会产生多个 Loading 层，只需要保留一层
    if (_options.loading && LoadingInstance._count > 0) {
        LoadingInstance._count--;
    }
    if (LoadingInstance._count === 0) {
        LoadingInstance._target.close();
        LoadingInstance._target = null
    }
}

// 4. 处理状态码
/**
 * 处理异常
 * @param {*} error
 */
function httpErrorStatusHandel(error) {
    // 处理被取消的请求
    if (axios.isCancel(error)) {
        return console.error('请求的重复请求：' + error.message)
    }
    let message = "";
    if (error && error.response) {
        switch (error.response.status) {
            case 302:
                message = '接口重定向了！';
                break;
            case 400:
                message = '参数不正确！';
                break;
            case 401:
                message = '您未登录，或者登录已经超时，请先登录！';
                break;
            case 403:
                message = '您没有权限操作！';
                break;
            case 404:
                message = `请求地址出错: ${error.response.config.url}`; // 在正确域名下
                break;
            case 408:
                message = '请求超时！';
                break;
            case 409:
                message = '系统已存在相同数据！';
                break;
            case 500:
                message = '服务器内部错误！';
                break;
            case 501:
                message = '服务未实现！';
                break;
            case 502:
                message = '网关错误！';
                break;
            case 503:
                message = '服务不可用！';
                break;
            case 504:
                message = '服务暂时无法访问，请稍后再试！';
                break;
            case 505:
                message = 'HTTP版本不受支持！';
                break;
            default:
                message = '异常问题，请联系管理员！';
                break
        }
    }
    if (error.message.include('timeout')) {
        message = '网络请求超时！';
    }
    if (error.message.include('Network')) {
        message = window.navigator.onLine ? '服务端异常！' : '断网了！'
    }
    ElMessage({
        type: 'error',
        message
    })
    // console.log('error: ', error);
    // console.log('error.message: ', error.message);
    // console.log('error.response: ', error.response)
}

// 暴露模块
export default myAxios
