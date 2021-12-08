<template>
  <div>
    <h1>toRaw()、markRaw()</h1>
    <div class="content">toRaw(): <br>
      作用：将一个由“reactive”生成的响应式对象转为普通对象 <br>
      使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新
    </div>
    <div>
      <div class="mr-t-20">姓名: {{ ZhangSan.name }} <br>
        年龄: {{ ZhangSan.age }} <br>
        <el-button @click="addAge">加年龄</el-button>
      </div>
    </div>
    <div class="content mr-t-20">markRaw(): <br>
      作用：标记一个对象，使其永远不会变成响应式对象。<br>
      使用场景：<br>
      1. 有些值不应该被设置为响应式的，例如 复杂的第三方类库等。 <br>
      2. 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能
    </div>
    <div>
      <div class="mr-t-20">
        张三：{{ ZhangSan }} <br>
        <el-button @click="addCar">加辆车</el-button>
        <el-button @click="addCarPrice">增加车的价钱</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive, toRaw, markRaw} from "vue";

export default {
  name: "VueToRaw",
  setup() {
    let ZhangSan = reactive({
      name: '张三',
      age: 20,
      job: '前端工程师',
      car: {}
    })

    // 注意：没有响应式指的是 ==> 页面不会随着数据改变而改变，数据实际上还是能够被更改，但是页面不会刷新。
    // 1. 使用 toRaw，使得 a 为 ZhangSan 的普通对象
    function addAge() {
      let a = toRaw(ZhangSan)  // 注意：a、ZhangSan 同源
      a.age++
      console.log(a, ZhangSan) // a 是没有被 proxy 修饰的源对象
    }

    // 2. 使用 markRaw
    function addCar() {
      let car = {name: '奔驰', price: 40}
      ZhangSan.car = markRaw(car)
    }

    function addCarPrice() {
      ZhangSan.car.price++   // car被markRaw修饰了，car没有响应式
      console.log(ZhangSan.car, "被markRaw修饰了，没有响应式")
    }

    return {
      ZhangSan,
      addAge,
      addCar,
      addCarPrice
    }
  }
}
</script>

<style scoped>

</style>