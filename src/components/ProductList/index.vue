<template>
  <div class="product-list-container">
    <h1 v-if="title" class="product-list-title">{{ title }}</h1>
    <div class="product-list">
      <div class="product-show-container" v-for="(product, index) in productList" :key="index">
        <ap-product-show
          class="product-show"
          :title="product.productName"
          :imgUrl="product.productImageList ? product.productImageList[0].url : ''"
          :price="product.productPrice"
          shadow="hover"
          @productClick="onProductClick(product.productId)"
          @addCartClick="onAddCartClick"
        ></ap-product-show>
      </div>
    </div>
  </div>
</template>
<script>
import apProductShow from "components/ProductShow";

export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    productList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },

  methods: {
    onProductClick(productId) {
      this.$router.push("/product/" + productId);
    },

    onAddCartClick() {
      console.log("Add Cart");
    },
  },

  components: {
    "ap-product-show": apProductShow,
  },
};
</script>
<style lang="less" scoped>
.product-list-container {
  .product-list-title {
    margin-bottom: 30px;
  }

  .product-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .product-show-container {
    flex: 0 0 25%;
  }

  .product-show {
    cursor: pointer;
    margin: 0 10px 10px 0px;
  }
}
</style>
