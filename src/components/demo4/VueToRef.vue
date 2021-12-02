<template>
  <div class="demo4">
    <h1 class="title">toRef()、toRefs()</h1>
    <div class="content">toRef的作用：创建一个ref对象，其value值指向另一个对象中的某个属性。
      <br>语法：const name = toRef(person, 'name') \\\\ name 就是 person 对象中的 name 属性
      <br>应用：将响应式对象中的某个属性“单独”提供给外部使用时。
      <br>toRefs 与 toRef 功能一致，可以批量创建多个ref对象。（toRefs(person)）
      <br>注意：这样提取出来的属性 与 原来的对象 还算是同一个，也就是说改变其中一个，另外一个也会变。
    </div>
    <br>
    <div class="mr-t-20">姓名: {{ name }} <br>
      年龄: {{ age }} <br>
      工资: {{ salary + 'k' }}
    </div>
    <el-button @click="salary++">加薪</el-button>
    <div style="border-top: 1px solid red">x: {{ x }}, y: {{ y }}, z: {{ z }}</div>
  </div>
</template>

<script>

import {reactive, toRef, toRefs} from "vue";

export default {
  name: "VueToRef",
  setup() {
    let person = reactive({
      name: '张三',
      age: 20,
      job: '前端工程师',
      salary: 20,
      a: {
        b: {
          c: 666
        }
      }
    })

    let newPer = reactive({
      x: 123,
      y: 233,
      z: 345
    })

    // 使用toRef，将 person 中的属性单独提取出来
    // toRef(目标对象, '要提取的目标属性')
    // 注意：这样提取出来的属性 与 原来的对象中的属性 还算是同一个，也就是说改变其中一个，另外一个也会变。
    let name = toRef(person, 'name')
    let age = toRef(person, 'age')
    let salary = toRef(person, 'salary')
    console.log(name, age, salary, 'toRef()')

    // 使用toRefs
    let x = toRefs(newPer)
    console.log(x, 'toRefs()')

    return {
      // 单独返回 name age salary
      name,
      age,
      salary,
      // 导出被 toRefs 修饰的属性们
      ...toRefs(newPer)
    }
  }


}
</script>

<style scoped>
</style>