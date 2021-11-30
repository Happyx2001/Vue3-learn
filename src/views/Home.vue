<template>
  <el-container class="home-container" style="height: 100%">
    <el-header>
      <div class="title">
        <img src="" alt="">
        <span>Vue3 学习</span>
      </div>
      <el-button type="success" round @click="goHome">回到首页</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="collapse-button" @click="toggleCollapse">|||</div>
        <el-menu
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            router
            :collapse="isCollapse"
            :collapse-transition="false"
            collapse="true"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <setting/>
              </el-icon>
              <span>Vue3学习demo</span>
            </template>
            <el-menu-item index="/home/demo1">ref()、reactive()</el-menu-item>
            <el-menu-item index="/home/demo2">ref()拓展、computed()、watch()</el-menu-item>
            <el-menu-item index="/home/demo3">Vue3生命周期</el-menu-item>
            <el-menu-item index="/home/hooks">Hooks</el-menu-item>

          </el-sub-menu>
          <el-menu-item index="/home/blog">
            <el-icon>
              <icon-menu/>
            </el-icon>
            <span>博客</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// Vue3使用路由，需要先引入 useRoute、useRouter
import {useRoute, useRouter} from 'vue-router'
import {defineComponent, ref} from "vue";
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons'

export default defineComponent({
      components: {
        Location, Document, Setting, IconMenu,
      },
      setup() {
        // ps: 这两个都需要提前声明
        const route = useRoute()  // 相对于Vue2 =  this.$route()
        const router = useRouter()  // 相当于Vue2 = this.$router()

        const isCollapse = ref(true)
        const handleOpen = (key, keyPath) => {
          console.log(key, keyPath)
        }
        const handleClose = (key, keyPath) => {
          console.log(key, keyPath)
        }
        const goHome = () => {
          router.push('/home')
        }
        // 控制侧边栏折叠
        function toggleCollapse() {
          this.isCollapse = !this.isCollapse
        }
        return {
          isCollapse,
          handleOpen,
          handleClose,
          goHome,
          toggleCollapse
        }
      }
    }
)
</script>

<style scoped>
.el-container {
  height: 100%;
}

.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #00a0e9;
  line-height: 60px;
}

.el-header .title {
  font-size: 32px;
  color: white;
  margin-left: 30px;
}

.el-main {
  background-color: #f7f7f7;
}

.el-button {
  height: 32px;
}

.collapse-button {
  background-color: #E353E3;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  cursor: pointer;
}
</style>