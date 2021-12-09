<template>
  <div class="blog">
    <h1>Blog</h1>
    {{ blogData }}
  </div>
</template>

<script>
import {getBlogData} from "../../api/blog";
import {onMounted, reactive} from "vue";

export default {
  name: "blog",
  setup() {

    // 储存获取到的 blog 数据
    let blogData = reactive([])

    // 调用获取接口
    const getBlog = async () => {
      const data = await getBlogData()
      console.log(data, 123)
      blogData = data.record
    }

    onMounted(() => {
      getBlog()
    })

    return {
      blogData
    }
  }
}
</script>

<style scoped>
.blog {
  height: 100%;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 5px 3px #E353E3;
}

</style>