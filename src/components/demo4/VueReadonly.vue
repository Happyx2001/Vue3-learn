<template>
  <h1>readonly()、shallowReadonly()</h1>
  <div>readonly: 让一个响应式数据变为只读的（深只读）。
    <br>shallowReadonly: 让一个响应式数据变为只读的（浅只读，深层数据依旧时响应式的）。
    <br>强制改变只读属性，会报错。
    <br>应用场景: 不希望数据被修改时。
  </div>
  <!--  强制改变只读属性，会报错-->
  <div>readonly 后的对象“张三”<br>
    名字：{{ ZhangSan.name }} <br>
    年龄：{{ ZhangSan.age }} <br>
    a.b.c：{{ ZhangSan.a.b.c }} <br>
    <el-button @click="ZhangSan.name += '~'">修改名字</el-button>
    <el-button @click="ZhangSan.age++">修改年龄</el-button>
    <el-button @click="ZhangSan.a.b.c = 123">修改深层属性</el-button>
  </div>
  <div>shallowReadonly 后的对象“李四”<br>
    名字：{{ LiSi.name }} <br>
    年龄：{{ LiSi.age }} <br>
    a.b.c：{{ LiSi.a.b.c }} <br>
    <el-button @click="LiSi.name += '~'">修改名字</el-button>
    <el-button @click="LiSi.age++">修改年龄</el-button>
    <el-button @click="LiSi.a.b.c++">修改深层属性</el-button>
  </div>
</template>

<script>
import {reactive, readonly, shallowReadonly} from "vue";

export default {
  name: "VueReadonly",
  setup() {
    let ZhangSan = reactive({
      name: '张三',
      age: 18,
      a: {
        b: {
          c: 666
        }
      }
    })

    let LiSi = reactive({
      name: '李四',
      age: 22,
      a: {
        b: {
          c: 233
        }
      }
    })

    // 给两个对象 只读属性
    ZhangSan = readonly(ZhangSan)   // 深只读
    LiSi = shallowReadonly(LiSi)   // 浅只读

    return {
      ZhangSan,
      LiSi
    }
  }
}
</script>

<style scoped>

</style>