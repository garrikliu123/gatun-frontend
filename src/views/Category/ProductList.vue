<template>
  <div>
    <ap-product-list
      class="product-list"
      :title="topicName"
      :productList="matchedProductList"
    ></ap-product-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductList from "components/ProductList";
export default {
  props: {
    topicName: {
      default: "",
    },
  },
  date() {
    return {};
  },
  computed: {
    matchedTopic() {
      const topic = this.topicList.find((topic) => {
        if (topic.topicName === this.topicName) {
          return true;
        }
      }) || {
        success: false,
      };
      return topic;
    },
    matchedCategoryList() {
      const list = [];
      if (this.matchedTopic && this.matchedTopic.topicId) {
        const topicId = this.matchedTopic.topicId;
        this.topicCategoryList.forEach((item) => {
          if (item.topicId === topicId) {
            list.push(item.categoryId);
          }
        });
      }
      return list;
    },
    matchedProductList() {
      const productIdSet = new Set();
      if (this.productCategoryList) {
        this.productCategoryList.forEach((item) => {
          if (this.matchedCategoryList.includes(item.categoryId)) {
            productIdSet.add(item.productId);
          }
        });
      }

      const list = [];

      if (this.productList) {
        this.productList.forEach((product) => {
          if (productIdSet.has(product.productId)) {
            product.productImageList = JSON.parse(product.productImages);
            list.push(product);
          }
        });
      }

      return list;
    },
    ...mapGetters(["topicList", "productList", "productCategoryList", "topicCategoryList"]),
  },
  watch: {
    matchedTopic(topic) {
      if (topic && topic.success === false) {
        this.$router.push("/");
      }
    },
  },
  components: {
    "ap-product-list": ProductList,
  },
};
</script>

<style lang="less" scoped>
.product-list {
  margin-top: 50px;
}
</style>
