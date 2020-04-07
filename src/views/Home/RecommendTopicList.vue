<template>
  <div class="ap-preference-list">
    <ap-billboard
      class="ap-billboard"
      v-for="(item, index) in recommendTopicList"
      :key="index"
      :imgUrl="item.sectionImage"
      @click.native="$emit('onBillboardClick', item)"
    ></ap-billboard>
  </div>
</template>
<script>
import apBillBoard from "components/Billboard";

export default {
  props: {
    recommendTopicList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },

  components: {
    "ap-billboard": apBillBoard,
  },
};
</script>
<style lang="less" scoped>
.ap-preference-list {
  display: flex;
  flex-direction: column;
  .ap-billboard {
    margin-top: 5px;
  }
}
</style>
