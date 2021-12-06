<template>
  <div class="demo">
    <el-divider content-position="center">toRaw()、markRaw()</el-divider>
    <vue-to-raw></vue-to-raw>
    <el-divider content-position="center">customRef()</el-divider>
    <vue-custom-ref></vue-custom-ref>
  </div>
</template>

<script>
import VueToRaw from "../../components/demo5/VueToRaw.vue";
import VueCustomRef from "../../components/demo5/VueCustomRef.vue";

export default {
  name: "study05",
  components: {VueToRaw, VueCustomRef}
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