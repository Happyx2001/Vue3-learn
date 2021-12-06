<template>
  <div class="sun">
    <h3>我是子组件（孙）</h3>
    inject接收的值：{{ ZhangSan }}
  </div>
</template>

<script>
import {inject} from "vue";

export default {
  name: "VueInject",
  setup() {
    // 接收 provide 传递来的数据
    const ZhangSan = inject("ZhangSan")

    return {
      ZhangSan
    }
  }
}
</script>

<style scoped>
.sun {
  padding: 10px;
  border: 2px solid red;
  background-color: #66a8cc;
}
</style>