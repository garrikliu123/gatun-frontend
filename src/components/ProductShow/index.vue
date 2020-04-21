<template>
  <el-card
    class="ap-product-card"
    :body-style="{ padding: '0px' }"
    :shadow="shadow"
    @click.native="$emit('productClick')"
  >
    <div class="product-img-container">
      <div class="image-cover"></div>
      <ap-image
        class="product-img"
        :imgUrl="imgUrl"
      ></ap-image>
    </div>

    <div class="divider-container">
      <el-divider content-position="right">
        <i class="el-icon-shopping-bag-2"></i>
      </el-divider>
    </div>

    <p class="product-title">{{ title }}</p>
    <p class="product-price">${{ price }}</p>

    <el-button
      class="product-add-button"
      type="primary"
      @click.stop="$emit('addCartClick')"
    >ADD TO CART</el-button>
  </el-card>
</template>
<script>
import apImage from "components/common/Image";

export default {
  props: {
    shadow: {
      type: String,
      default: "always"
    },

    title: {
      type: String,
      default: ""
    },

    imgUrl: {
      tyle: String,
      default: ""
    },

    price: {
      type: [String, Number],
      default: ""
    }
  },

  components: {
    "ap-image": apImage
  }
};
</script>
<style lang="less" scoped>
.ap-product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;

  .product-img-container {
    width: 100%;
    height: 280px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .product-img {
    height: 100%;
  }

  .divider-container {
    padding: 0 10px;
  }

  .product-title {
    font-size: 1.2em;
    word-break: break-all;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    margin: 0;
    margin-top: 10px;
    height: 60px;
    font-weight: bold;
    padding: 0 10px;
  }

  .product-price {
    flex: 1 1 auto;
    margin: 0;
    padding: 10px 0px 20px;
    font-size: 1.2em;
    font-weight: bold;
  }
}
</style>
