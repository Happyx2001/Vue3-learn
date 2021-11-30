<template>
  <div class="computed">
    <h1>Vue3的computed</h1>
    <el-form ref="computedFormRef" label-width="70px">
      <el-form-item label="前名：">
        <el-input v-model="person.first" placeholder="输入前名"/>
      </el-form-item>
      <el-form-item label="后名：">
        <el-input v-model="person.second" placeholder="输入后名"/>
      </el-form-item>
      <el-form-item label="全名：">
        <el-input v-model="person.fullName"/>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
// 1. Vue3 使用计算属性需要从 'vue' 中导入
import {reactive, computed} from "vue"

export default {
  name: "VueComputed",
  setup() {
    let person = reactive({
      first: "",
      second: ""
    })
    // 2. 使用计算属性
    // 简写：没有考虑计算属性被修改的情况（更改计算属性不会影响被计算的属性）
    // 2.1 函数写法：作为一个单独的函数来写，需要导出该函数
    // let fullName = computed(() => {
    //   return person.first + person.second
    // })
    // 2.1 对象方法写法：将计算属性赋给一个对象为方法，导出对象时，计算属性也会被导出
    // person.fullName = computed(() => {
    //   return person.first + '-' + person.second
    // })

    // 完整写法：考虑对计算属性的读写
    person.fullName = computed({
      // 读取
      get() {
        return person.first + '-' + person.second
      },
      // 修改
      set(value) {
        // 这里的操作是：根据计算属性读取的值，修改被计算的属性
        const newName = value.split('-')
        person.first = newName[0]
        person.second = newName[1]
      }
    })

    // 3. 导出计算属性（如果是函数写法就需要单独导出，如果是对象方法写法则导出对象即可）
    return {
      person,
    }
  }
}
</script>

<style scoped>
.el-form {
  margin-top: 20px;
}
</style>