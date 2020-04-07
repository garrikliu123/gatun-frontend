<template>
  <el-card class="ap-billboard" :body-style="{ padding: '0px' }">
    <img class="image" :src="imgUrl" alt="img" />
  </el-card>
</template>
<script>
export default {
  props: {
    imgUrl: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="less" scoped>
.ap-billboard {
  .image {
    width: 100%;
    display: block;
  }
}
</style>
