<template>
  <div class="vue-effect">
    <h1>Vue3的新增函数，watchEffect()</h1>
    <div>
      <h3>watch()和watchEffect()的区别: </h3><br>
      watch: 需要表明监听的属性，和监听的回调 <br>
      watchEffect: 不需要表明监听的属性，监听的回调中用到哪个属性，就监视哪个属性。
    </div>
    <div class="test">
      watchEffect: {{ effect }}
      <el-button type="success" plain @click="effect++">Change</el-button>
    </div>
    <div>
      <h3>watchEffect和computed有些相似: </h3><br>
      computed: 注重的是计算出来的值（即：回调函数的返回值），必须写返回值 <br>
      watchEffect: 注重的是过程（即：回调函数本身），不用写返回值
    </div>
  </div>
</template>

<script>
import {ref, watchEffect} from "vue";

export default {
  name: "VueWatchEffect",
  setup() {
    let effect = ref(1)

    watchEffect(() => {
      // 调用 effect 就监听 effect
      // 当 effect 改变时，执行回调
      const X = effect.value
      console.log("watchEffect的回调执行了！")
    })

    return {
      effect
    }
  }
}
</script>

<style scoped>

</style>