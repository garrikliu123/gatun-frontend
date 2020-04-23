<template>
  <div class="product-list-container">
    <h1 v-if="title" class="product-list-title">{{ title }}</h1>
    <div class="product-list">
      <div class="product-show-container" v-for="(product, index) in productList" :key="index">
        <ap-product-show
          class="product-show"
          :title="product.productName"
          :imgUrl="
            product.productImageList && product.productImageList[0]
              ? product.productImageList[0].url
              : ''
          "
          :price="product.productPrice"
          shadow="hover"
          @productClick="onProductClick(product.productId)"
          @addCartClick="onAddCartClick(product)"
        ></ap-product-show>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import apProductShow from "components/ProductShow";

export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    productList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },

  methods: {
    onProductClick(productId) {
      this.$router.push("/product/" + productId);
    },

    onAddCartClick(product) {
      const productOptionList = JSON.parse(product.productOptions);
      const productId = product.productId;
      this.addProudctToCart({
        productId,
        amount: 1,
        option: productOptionList && productOptionList.length > 0 ? productOptionList[0] : ""
      });

      this.$message({
        type: "success",
        message: "Add Success!",
        showClose: true
      });
    },

    ...mapActions(["addProudctToCart"])
  },

  components: {
    "ap-product-show": apProductShow
  }
};
</script>
<style lang="less">
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

.is_phone {
  .product-show-container {
    flex: 0 0 50% !important;

    .product-show {
      margin: 0;
      margin-bottom: 10px;
      margin-right: 5px;
      border: none;
    }

    .product-img-container {
      height: 200px !important;
      .el-image__inner {
        object-fit: contain;
      }
    }
  }
}
</style>
