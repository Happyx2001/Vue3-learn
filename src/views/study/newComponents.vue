<template>
  <div class="demo">
    <h1>Vue3新的组件</h1>
    <el-divider content-position="center">Fragment</el-divider>
    <div>
      <h1>Fragment</h1>
      <div>
        在Vue2中，组件必须有一个根组件（div） <br>
        在Vue3中，组件可以没有根组件，内部会将多个标签包含在一个Fragment虚拟元素中 <br>
        <b>好处：</b>减少标签层级嵌套，减少内存占用。
      </div>
    </div>
    <el-divider content-position="center">Teleport</el-divider>
    <vue-teleport></vue-teleport>
    <el-divider content-position="center">Suspense</el-divider>
    <div class="Sus">
      <h2>我是上层组件</h2>
      <!--使用Suspense-->
      <Suspense class="Suspense">
        <!--v-slot:default 将要展示的组件-->
        <template v-slot:default>
          <vue-suspense></vue-suspense>
        </template>
        <!--v-slot:fallback 组件展示前的显示-->
        <template v-slot:fallback>
          <h3>加载中，请稍等 3S ...</h3>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script>
// 静态引入组件 (全部组件加载完毕，才会一起显示)
import VueTeleport from "../../components/newComponents/VueTeleport.vue";
// 动态引入组件 (那个组件先加载完毕，就先显示)
import {defineAsyncComponent} from "vue";

const VueSuspense = defineAsyncComponent(() => import('../../components/newComponents/VueSuspense.vue'))
export default {
  name: "newComponents",
  components: {
    VueTeleport,
    VueSuspense
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

.Sus {
  background-color: #2CD5FF;
  overflow: hidden;
}
</style>