<template>
  <div>
    <h1>project()、inject()</h1>
    <div class="context">
      作用：实现 祖孙组件 间通信 <br>
      使用方式：父组件有一个 provide 选项来提供数据，子组件有一个 inject 选项来开始使用这些数据
    </div>
    <div class="ye">
      <h3>我是父组件（爷）</h3>
      provide传递的值：{{ person }}
      <vue-inject></vue-inject>
    </div>
  </div>
</template>

<script>
import VueInject from "./VueInject.vue";
import {provide, reactive} from "vue";

export default {
  name: "VueProvide",
  components: {VueInject},
  setup() {
    let person = reactive({
      name: '张三',
      age: 20,
      a: {
        b: {
          c: "Vue3"
        }
      }
    })
    // 父组件（上层组件）使用 provide 传递数据
    // provide("别名", 要传递的数据)
    provide("ZhangSan", person)

    return {
      person
    }
  }
}
</script>

<style scoped>
.ye {
  padding: 10px;
  border: 3px solid blue;
  background-color: #2CD5FF;
}
</style>