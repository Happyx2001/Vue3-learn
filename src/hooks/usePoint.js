// 实现一个 Hooks 函数: 鼠标"打点"相关数据
// 1. 引入所需的 vue 模块
import {reactive, onMounted, onBeforeUnmount} from 'vue'

// 2. 编写函数
export default function () {
    // 相关数据
    let point = reactive({
        x: 0,
        y: 0
    })

    // 实现的方法
    function savePoint(event) {
        point.x = event.pageX
        point.y = event.pageY
        console.log(event.pageX, event.pageY)
    }

    // 相关生命周期函数
    onMounted(() => {
        window.addEventListener('click', savePoint)
    })
    onBeforeUnmount(() => {
        window.removeEventListener('click', savePoint)
    })

    // 3. 返回值(相关数据)
    return point
}