<template>
  <div>
    <ap-product-list
      class="ap-product-list"
      v-for="(list, index) in productGroup"
      :key="index"
      :title="list.sectionName"
      :productList="list.list"
    >
    </ap-product-list>
  </div>
</template>
<script>
import apProductList from "components/ProductList";

export default {
  props: {
    productGroup: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },

  components: {
    "ap-product-list": apProductList,
  },
};
</script>
<style lang="less" scoped>
.ap-product-list {
  margin-top: 20px;
}
</style>
