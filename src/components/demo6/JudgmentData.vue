<template>
  <div>
    <h1>判断响应式数据的API</h1>
    <ul>
      <li>1. isRef() 检查一个值是否为一个 ref 对象</li>
      <li>2. isReactive() 检查一个对象是否为一个 reactive 创建的响应式代理</li>
      <li>3. isReadonly() 检查一个对象是否是由 readonly 创建的只读代理</li>
      <li>4. isProxy() 检查一个对象是否是由 reactive 或者 readonly 方法创建的代理</li>
    </ul>
    <div>
      a: {{ a }} <br>
      b: {{ b }} <br>
      c: {{ c }}
    </div>
  </div>
</template>

<script>
import {reactive, ref, isRef, isReactive, isReadonly, isProxy, readonly} from "vue";

export default {
  name: "JudgmentData",
  setup() {
    let a = ref(0)
    let b = reactive({
      a: 123,
      b: 456
    })
    let c = readonly(b)

    // 使用判断响应式数据的 API
    // 1. isRef() 检查一个值是否为一个 ref 对象
    // 2. isReactive() 检查一个对象是否为一个 reactive 创建的响应式代理
    // 3. isReadonly() 检查一个对象是否是由 readonly 创建的只读代理
    // 4. isProxy() 检查一个对象是否是由 reactive 或者 readonly 方法创建的代理
    console.log(isRef(a), 'isRef(a)')   // true
    console.log(isReactive(b), 'isReactive(b)')   // true
    console.log(isReadonly(c), 'isReadonly(c)')   // true
    console.log(isProxy(a), '(isProxy(a)')   // false
    console.log(isProxy(b), 'isProxy(b)')   // true


    return {a, b, c}
  }
}
</script>

<style scoped>

</style>