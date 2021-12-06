<template>
  <div class="demo">
    <el-divider content-position="center">provide()、inject()</el-divider>
    <vue-provide></vue-provide>
    <el-divider content-position="center">判断响应式数据</el-divider>
    <judgment-data></judgment-data>
  </div>
</template>

<script>
import VueProvide from "../../components/demo6/VueProvide.vue";
import JudgmentData from "../../components/demo6/JudgmentData.vue";

export default {
  name: "study06",
  components: {VueProvide, JudgmentData}
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