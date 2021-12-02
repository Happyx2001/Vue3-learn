<template>
  <div class="demo4 demo">
    <el-divider content-position="center">toRef()、toRefs()</el-divider>
    <vue-to-ref></vue-to-ref>
    <el-divider content-position="center">shallowReactive()、shallowRef()</el-divider>
    <vue-shallow-ref></vue-shallow-ref>
    <el-divider content-position="center">readonly()、shallowReadonly()</el-divider>
    <vue-readonly></vue-readonly>
  </div>
</template>

<script>

import {reactive, toRef, toRefs} from "vue";
import VueToRef from "../../components/demo4/VueToRef.vue";
import VueShallowRef from "../../components/demo4/VueShallowRef.vue";
import VueReadonly from "../../components/demo4/VueReadonly.vue";

export default {
  name: "study04",
  components: {VueToRef, VueShallowRef, VueReadonly}
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