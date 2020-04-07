<template>
  <el-image class="ap-image" :src="imgUrl">
    <div slot="placeholder" class="image-slot">
      <i class="ap-icon el-icon-loading"></i>
    </div>
    <div slot="error" class="image-slot">
      <i class="ap-icon el-icon-picture-outline"></i>
    </div>
  </el-image>
</template>
<script>
export default {
  props: {
    imgUrl: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang="less" scoped>
.ap-image {
  .ap-icon {
    font-size: 1.8em;
  }
}
</style>
