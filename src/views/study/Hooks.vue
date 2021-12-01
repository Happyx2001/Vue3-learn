<template>
  <div class="hooks">
    <el-divider content-position="center">Vue3的Hooks函数</el-divider>
    <h1 class="title">Vue3的Hooks</h1>
    <div class="content">hooks的本质就是一个函数，是对setup函数中使用的Composition Api进行了封装
      <br>hooks类似于 Vue2.x 的mixin（混入）
      <br>自定义hooks的优势：复用代码，让 setup 中的逻辑更加清晰易懂
    </div>
    <el-divider content-position="center">Hooks的使用</el-divider>
    <h3>一个hooks组件: 打印鼠标点击时的坐标</h3>
    <div>当前鼠标点击时的坐标为: <span class="point">x: {{ point.x }}, y: {{ point.y }}</span></div>
  </div>
</template>

<script>
import {ref} from "vue"
// 1. 导入 hooks 函数
import usePoint from "../../hooks/usePoint";

export default {
  name: "demo4",
  setup() {
    // 组件本身的属性
    let num = ref(0)

    // 2. 运用 hooks 函数
    let point = usePoint()

    return {
      num,
      // 3. 导出 Hooks 函数
      point
    }
  }
}
</script>

<style scoped>
.hooks {
  height: 100%;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 5px 3px #66a8cc;
}

.point {
  font-size: 64px;
}

</style>