<template>
  <div class="testComponents">
    <h1>测试组件</h1>
    <div>组件传值 props</div>
    <div>组件分发事件 emit</div>
    <p>测试姓名：{{ person.name }}，年龄：{{ person.age }}</p>
    <el-button type="primary" @click="test">测试触发组件的 hello 事件</el-button>
  </div>
</template>

<script>
import {reactive} from "vue";

export default {
  name: "PropData",
  // props: 接收父组件传递过来的值, 会被包裹成 Proxy 对象
  props: ["job"],
  // emits:[] Vue3中发射自定义事件, 必须先用 emits: [事件名, 事件名, ...] 包裹事件 (2)
  emits: ["hello"],
  beforeCreate() {
    console.log(this)
  },
  setup(props, context) {
    console.log("===setup()===", props, "props")  // 打印 job
    console.log(context.attrs, "context.attrs")  // 打印 school 因为它未被声明接收
    console.log(context.emit, "contest.emit")   // 触发的自定义事件的
    console.log(context.slots, "context.slots")  // 插槽
    /**
     * setup() 的注意点:
     * 1. setup() 执行的时间：
     *  在 beforeCreate 之前执行一次，此时 this 为 undefined
     *
     *  2. setup() 的参数 setup(props, context)
     *    props: 值为对象，（组件外部传递过来的，并且组件内部声明接收了的属性）
     *    context: 上下文对象，包含：
     *      attrs: 值为对象，（组件外部传递过来的，但是没有在props中配置声明的属性，相当于 this.$attrs
     *      slots: 收到的插槽内容，相当于 this.$slots
     *      emit: 分发自定义事件的函数，相当于 this.$emit
     */
    let person = reactive({
      name: "张三",
      age: 21
    })

    function test() {
      // context.emit(自定义事件名, 要传递的参数)  发射自定义事件  (1)
      context.emit("hello", person.name)
    }

    return {
      person,
      test
    }
  }
}
</script>

<style scoped>
.testComponents {
  padding: 10px;
  border: 5px double red;
  border-radius: 10px;
}
</style>