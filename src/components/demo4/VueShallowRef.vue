<template>
  <h1 class="title">shallowRef()、shallowReactive()</h1>
  <div class="content">
    shallowReactive: 修饰对象，只处理对象最外层属性的响应式（浅响应式）<br>
    shallowRef: 只处理基本数据类型的响应式，不进行对象的响应式处理（ref修饰对象会自动调用reactive）<br>
    使用时机：↓====↓<br>
    如果有一个对象数据，结构较深，但只变化外层属性 ===> shallowReactive <br>
    如果有一个对象数据，后续功能不会修改对象中的属性，而是生成新的对象去替换 ===> shallowRef
  </div>
  <div class="mr-t-20">
    a: {{ person.a }} <br>
    b.c.d: {{ person.b.c.d }} <br>
    <!--    注意！！！深层属性只是没有”响应式“，不代表不能被改变-->
    <!--    当第一层属性因为”响应式“改变时，会刷新界面，展现被改变后的属性-->
    <el-button @click="person.a += '~'">改变a</el-button>
    <el-button @click="person.b.c.d += '~'">改变c</el-button>
  </div>
  <div class="mr-t-20">
    cat: {{ animal.cat }} <br>
    <!--    修改属性不会有响应式，替换属性就会-->
    <el-button @click="animal.cat += '~'">改变cat</el-button>
    <el-button @click="animal={cat: '嘤嘤嘤~~~'} ">替换cat</el-button>
  </div>
</template>

<script>
import {shallowReactive, shallowRef} from 'vue'

export default {
  name: "VueShallowRef",
  setup() {
    // 1. shallowReactive: 修饰对象，只处理对象最外层属性的响应式（浅响应式）
    // 注意！！！深层属性只是没有”响应式“，不代表不能被改变
    //          当第一层属性因为”响应式“改变时，会刷新界面，展现被改变后的属性
    let person = shallowReactive({
      a: '我可以被修改',
      b: {
        c: {
          d: '我不能被修改'
        }
      }
    })

    // 2. shallowRef: 只处理基本数据类型的响应式，不进行对象的响应式处理
    // 修改属性不会有响应式，替换属性就会
    let animal = shallowRef({
      cat: '喵喵喵'
    })


    return {
      person,
      animal
    }
  }
}
</script>

<style scoped>

</style>