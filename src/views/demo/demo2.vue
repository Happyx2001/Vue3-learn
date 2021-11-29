<template>
  <div class="demo">
    <h1>setup拓展，computed()，watch()</h1>
    <el-divider content-position="center">setup拓展, 父子组件相关</el-divider>
    <setup-props @hello="showHello" job="前端工程师" school="广东海洋大学">
      <template v-slot:testslot1>
        <span>测试插槽1</span>
      </template>
      <template v-slot:testslot2>
        <span>测试插槽2</span>
      </template>
    </setup-props>
    <el-divider content-position="center">computed()</el-divider>
    <vue-computed></vue-computed>
    <el-divider content-position="center">watch()</el-divider>
    <vue-watch></vue-watch>
    <el-divider content-position="center">watchEffect()</el-divider>
    <vue-watch-effect></vue-watch-effect>
  </div>
</template>

<script>
import SetupProps from "../../components/demo2/SetupProps.vue";
import VueComputed from "../../components/demo2/VueComputed.vue";
import VueWatch from "../../components/demo2/VueWatch.vue";
import VueWatchEffect from "../../components/demo2/VueWatchEffect.vue";

export default {
  name: "demo2",
  components: {SetupProps, VueComputed, VueWatch, VueWatchEffect},
  setup() {
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
     *      emit: 分发自定义时间的函数，相当于 this.$emit
     *
     * 实际操作 见: PropsData 组件
     */

    // 触发自定义事件（自定义事件由setup-props组件发出）
    function showHello(value) {
      alert(`Hello Vue3,我是${value}`)
    }

    return {
      showHello
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
</style>