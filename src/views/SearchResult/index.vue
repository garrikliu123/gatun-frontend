<template>
  <div class="ap-search-result">
    <h1 class="title">{{ matchedProduct.length }} Result(s) found for '{{ search }}'</h1>
    <el-divider content-position="right">
      <i class="el-icon-search" style="font-size: 1.2em;"></i>
    </el-divider>
    <ap-product-list class="product-list" :productList="matchedProduct"></ap-product-list>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ProductList from "components/ProductList";
export default {
  props: {
    search: {
      default: "",
    },
  },

  computed: {
    matchedProduct() {
      const result = [];
      this.productList.forEach((item) => {
        const priority = item.productName.toLowerCase().indexOf(this.search.toLowerCase());
        if (priority >= 0) {
          const obj = Object.assign({}, item, priority);
          obj.productImageList = JSON.parse(obj.productImages);
          result.push(obj);
        }
      });

      result.sort((a, b) => {
        if (a.priority < b.priority) {
          return -1;
        } else if (a.priority == b.priority) {
          return 0;
        } else {
          return 1;
        }
      });

      return result;
    },
    ...mapGetters(["productList"]),
  },

  components: {
    "ap-product-list": ProductList,
  },
};
</script>
<style lang="less" scoped>
.ap-search-result {
  .title {
    margin-top: 50px;
    margin-bottom: 30px;
  }
}
</style>
