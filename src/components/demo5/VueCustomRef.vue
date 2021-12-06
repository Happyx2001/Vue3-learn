<template>
  <div>
    <h1>customRef()</h1>
    <div class="content">作用：创建一个自定义的Ref(),并对其依赖项跟踪和更新触发进行显示控制。
      <br> 依赖项追踪 = get()、更新触发 = set()
    </div>
    <div>
      实现防抖：（防抖：给事件设置一个缓冲时间，缓冲时间后才会执行事件，如果缓冲时间内再次触发事件的话，缓冲时间回重置）
      <br>
      <input type="text" v-model="keyWord" />
      <h3>{{ keyWord }}</h3>
    </div>
  </div>
</template>

<script>
import {ref, customRef} from "vue";

export default {
  name: "VueCustomRef",
  setup() {
    // 1. customRef的使用
    // 作用：创建一个自定义的Ref(),并对其依赖项跟踪和更新触发进行显示控制。
    // 相当于：ref + 自定义逻辑

    // 自定义一个ref: myRef (实现防抖)
    function myRef(value, delay) {
      let timer
      // customRef((track, trigger)=>{})
      return customRef((track, trigger = 500) => {
        return {
          get() {
            console.log(`有人从myRef这个容器中读取数据了，我将${value}给他了`)
            // track() 通知 Vue 追踪数据的变化（告诉get() value 是有用的）
            track()
            return value
          },
          set(newValue) {
            console.log(`有人从myRef这个容器中将数据改为了：${newValue}`)
            // 实现防抖
            // （防抖：给事件设置一个缓冲时间，缓冲时间后才会执行事件，如果缓冲时间内再次触发事件的话，缓冲时间回重置）
            clearTimeout(timer)
            timer = setTimeout(() => {
              value = newValue
              // trigger() 通知 Vue 重新解析模板
              trigger()
            }, delay)
          }
        }
      })
    }

    // 使用自定义的 myRef
    let keyWord = myRef("Hello", 500)


    return {keyWord}
  }
}
</script>

<style scoped>

</style>