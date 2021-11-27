<template>
  <div class="demo">
    <h2>setup 、ref、reactive</h2>
    <div class="learn">
      <h3 class="title">1. setup</h3>
      <span class="content">
        setup 编写 Vue3 的组合式Api（composition api）的地方，组件的所有方法和属性都写入其中。
      </span>
    </div>
    <div class="learn">
      <h3 class="title">2. ref</h3>
      <span class="content">
        ref() 修饰的数据会变成响应式数据，一般只能修饰基本数据类型，并且在setup中修改值的时候使用 属性名.value 修改<br/>
        ref() 修饰“对象类型”的时候，在内部调用了 reactive() <br>
        ref() 实现响应式使用的是 object.defineProperty()
      </span>
      <div class="test">
        <div class="refName">名字：{{ name }}</div>
        <div class="refAge">年龄：{{ age }}</div>
        <el-button @click="logName">打印名字、年龄</el-button>
        <el-button @click="changeName">改变名字、年龄</el-button>
      </div>
    </div>
    <div class="learn">
      <h3 class="title">3. reactive</h3>
      <span class="content">
        reactive() 类似于 ref()，可以将“对象数据类型”转化为响应式数据 <br>
        reactive() 实现响应式使用的是 Proxy
      </span>
      <div class="test">
        <div>{{ person.name }} + {{ person.age }} + {{ person.job.a.b.c }}</div>
        <span v-for="item in city" :key="`CITY_${item}`">|{{ item }}|</span>
      </div>
      <el-button @click="changeObject">改变</el-button>
    </div>
    <div class="learn">
      <h3 class="title">4. Vue3 跟 Vue2 的响应式原理的区别</h3>
      <div class="vue-2">
        <h4>Vue2</h4>
        <span>
          Vue2的响应式是使用了 object.defineProperty() 对所有数据都进行读取、修改进行拦截（数据劫持）。<br>
          但是这个方法不能劫持“数组类型”，因此Vue2对数组的方法进行了“重写”。<br>
          存在的问题：1. 新增属性、删除属性，页面不会刷新。2. 直接通过下标修改数组，页面不会自动更新。
        </span>
      </div>
      <div class="vue-3">
        <h4>Vue3</h4>
        <span>
          Vue3的响应式使用了ES6新增的 Proxy() 和 Reflect()。<br>
          Proxy：拦截对象中任意属性的变换，包括 读取、添加、删除 等 <br>
          Reflect：对源对象的属性进行操作。
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, reactive} from "vue"

export default {
  name: "demo1",
  // setup 存放composition api
  setup() {
    //  属性
    // 1. ref() 一般接收“基本类型”，但也可以是“对象类型”（不推荐）
    // ref() 修饰“对象类型”的时候，在内部调用了 reactive()
    // ref修饰的属性，具有响应式特征
    let name = ref('张三')
    let age = ref(20)
    // 2. reactive() 等同 ref()，接收“对象类型”的数据
    // 即使是深层嵌套也具有响应式
    let person = reactive({
      name: '李四',
      age: 18,
      job: {
        type: '前端',
        salary: "20K",
        a: {
          b: {
            c: 123
          }
        }
      }
    })
    let city = reactive(["北京", '上海', '广州', '深圳'])

    //  方法
    function logName() {
      console.log(`${name.value} ${age.value}`)
    }

    // JS修改响应式的数据：
    // 修改ref修饰的值的时候，需要使用 变量名.value 的方式来改变
    function changeName() {
      if (name.value === "张三" && age.value === 20) {
        name.value = "李四"
        age.value = 22
      } else {
        name.value = "张三"
        age.value = 20
      }

    }

    function changeObject() {
      person.age = 114514;
      person.name = "王老五";
      person.job.a.b.c = 666;
    }

    return {
      name,
      age,
      person,
      city,
      logName,
      changeName,
      changeObject
    }
  }
}

</script>
<style scoped>
.demo {
  height: 100%;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 5px 3px #66a8cc;
}

.learn {
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid black;
}

.el-button {
  margin-top: 20px;
}
</style>