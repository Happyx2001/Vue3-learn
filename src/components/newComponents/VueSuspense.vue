<template>
  <div class="Sus">
    <h1>Suspense</h1>
    <div>等待异步组件时渲染一下额外内容，让应用有更好的用户体验。 <br>
      <b>使用步骤：</b> <br>
      1. 父组件异步引入组件 <br>
      import { defineAsyncComponent } from "vue" <br>
      const Child = defineAsyncComponent(()=>import("./components/Child.vue")) <br>
      2. 使用Suspense包裹组件，并配置好default、fallback
    </div>
    {{ title }}
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "VueSuspense",
  setup() {
    let title = ref('模拟异步加载、延时3S展示')

    // 特殊用法，只能结合 Suspense 一起使用
    // setup 返回一个 promise 对象，利用setTimeout延时3S resolve
    // 利用 setTimeout 模拟异步
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({title})
      }, 3000)
    })
  }
}
</script>

<style scoped>

.Sus {
  margin: 20px;
  background-color: aquamarine;
}
</style>