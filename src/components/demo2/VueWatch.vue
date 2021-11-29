<template>
  <div class="vue-watch">
    <h1>Vue3的watch()</h1>
    <div class="content">
      number的值：{{ number }}
    </div>
    <el-button type="primary" round @click="number++">改变 number 的值</el-button>
    <div class="content">
      name：{{ name }}
    </div>
    <el-button type="primary" round @click="changeName">改变 number 的值</el-button>
    <div class="content">
      年龄：{{ person.age }} <br>
      工作：{{ person.job }} <br>
      数字：{{ person.a.b.c }}
    </div>
    <el-button type="primary" round @click="person.age++">改变年龄</el-button>
    <el-button type="primary" round @click="person.job += '~'">改变工作</el-button>
    <el-button type="primary" round @click="person.a.b.c++">改变数字</el-button>
  </div>
</template>

<script>
// 1. 引入 watch
import {reactive, ref, watch} from 'vue'

export default {
  name: "VueWatch",
  setup() {
    let number = ref(0)
    let name = ref('张三')
    let person = reactive({
      age: 18,
      job: "学生",
      a: {
        b: {
          c: 0
        }
      }
    })
    // 监视 watch
    // watch(监听对象, 回调函数(改变后的值, 改变前的值))
    // 情况一：监听 ref 定义的响应式数据
    // watch(number, (newValue, oldValue) => {
    //   console.log('number的值改变了', newValue, oldValue)
    // })

    // 情况二：监听多个 ref 定义的响应式数据 （watch可以重复写，vue2则不行）
    // 这种情况会返回n个数组，对应n个监听的数据
    watch([number, name], (newValue, oldValue) => {
      console.log('number的值改变了', newValue, oldValue)
    }, {immediate: true})
    // watch的第三个参数 {immediate: true, deep: true}
    // immediate 开启立即监听，deep 开启深层监听

    // 情况三：监听 reactive 定义的响应式数据
    // 注意：此时强制开启深度监视（配置deep无效）
    //      此处无法正确获取 oldValue
    watch(person, (newValue, oldValue) => {
      console.log('person改变了', newValue, oldValue)
    }, {deep: false})  // {deep: false} 无效（强制deep: true)

    // 情况四：监听 reactive 所定义的一个响应式数据中的某个属性
    // watch(() => person.name, (newValue, oldValue) => {
    //   console.log('person.age改变了', newValue, oldValue)
    // },{deep: false})  // 有效
    // PS: 监听对象的某个属性的时候，可以配置 deep

    // 情况五：监听 reactive 所定义的一个响应式数据中的 多个 属性
    watch([() => person.age, () => person.job], (newValue, oldValue) => {
          console.log('person的属性改变了', newValue, oldValue)
        }
    )

    watch(() => person.a, (newValue, oldValue) => {
      console.log('person.a的深层改变了', newValue, oldValue)
    }, {deep: true})  // {deep: false} 无效（强制deep: true)

    function changeName() {
      name.value = "李四"
    }

    return {
      number,
      name,
      person,
      changeName
    }
  }
}
</script>

<style scoped>
.el-button {
  margin: 10px 10px 10px 0px;
}
</style>