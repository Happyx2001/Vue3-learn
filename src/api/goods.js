import myAxios from "./axios";

// 获取列表接口
export function getListApi(paramsList) {
    return myAxios({
        url: '/api/list',
        method: 'get',
        param: paramsList
    }, {
        loading: true
    }, {
        text: '获取列表数据...'
    })
}