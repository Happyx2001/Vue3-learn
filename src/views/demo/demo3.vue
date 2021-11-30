<template>
  <div class="demo">
    <span class="title">Vue3的生命周期</span>
    <span class="radio">
      <el-radio v-model="radio1" label="1" border @change="changeImg">Vue3生命周期</el-radio>
      <el-radio v-model="radio1" label="2" border @change="changeImg">Vue2.X生命周期</el-radio>
    </span>
    <img src="../../assets/img/生命周期.png" alt="" v-show="imgShow">
    <img src="https://v3.cn.vuejs.org/images/lifecycle.svg" alt="" v-show="!imgShow">
  </div>
</template>

<script>

import {onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref} from "vue";

export default {
  name: "demo3",
  setup() {
    let imgShow = ref(false)

    function changeImg() {
      imgShow.value = !imgShow.value
    }

    // 2. 通过组合式Api使用生命周期钩子函数
    // 注意：setup执行在 created 之前，因此组合式api使用生命周期函数 执行快于 配置项形式
    onBeforeMount(() => {
      console.log('---onBeforeMount---')
    })
    onMounted(() => {
      console.log('---onMounted---')
    })
    onBeforeUpdate(() => {
      console.log('---onBeforeUpdate---')
    })
    onUpdated(() => {
      console.log('---onUpdated---')
    })
    onBeforeUnmount(() => {
      console.log('---onBeforeUnmount---')
    })
    onUnmounted(() => {
      console.log('---onUnmounted---')
    })

    return {
      imgShow,
      changeImg,
      radio1: ref('1'),
      radio2: ref('2')
    }
  },
  // 1. 通过配置项的形式使用生命周期钩子函数
  // beforeCreate() {
  //   console.log('---beforeCreate---')
  // },
  // created() {
  //   console.log('---created---')
  // },
  // beforeMount() {
  //   console.log('---beforeMount---')
  // },
  // mounted() {
  //   console.log('---mounted---')
  // },
  // beforeUpdate() {
  //   console.log('---beforeUpdate---')
  // },
  // updated() {
  //   console.log('---updated---')
  // },
  // unmounted() {
  //   console.log('---unmounted---')
  // }
}
</script>

<style scoped>
.demo img {
  width: 100%;
  height: 90%;
}

.demo {
  height: 100%;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 5px 3px #66a8cc;
}

.radio {
  margin-left: 30px;
}
</style>