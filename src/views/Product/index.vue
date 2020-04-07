<template>
  <div class="ap-product">
    <div class="product-show">
      <!-- Carousel 轮播图 -->
      <el-carousel class="ap-carousel" height="500px">
        <el-carousel-item v-for="item in matchedProduct.productImageList || []" :key="item.name">
          <div class="carousel_img_container">
            <img class="carousel_img" :src="item.url" />
          </div>
        </el-carousel-item>
      </el-carousel>
      <div class="right-group">
        <div class="title">
          {{ matchedProduct.productName }}
        </div>
        <el-divider content-position="right"
          ><i class="ap-nav-icon el-icon-shopping-cart-2"></i
        ></el-divider>
        <div class="price" v-if="matchedProduct.productPrice >= 1000" v-format="'CAD $#,##0.00'">
          {{ matchedProduct.productPrice }}
        </div>
        <div class="price" v-else v-format="'CAD $##0.00'">
          {{ matchedProduct.productPrice }}
        </div>
        <el-input-number class="count" v-model="count" :min="1" :max="100"></el-input-number>
        <el-button type="success" class="button">ADD TO CART</el-button>
      </div>
    </div>
    <ap-tab-display class="ap-tab-display" :product="matchedProduct"></ap-tab-display>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import TabDisplay from "./TabDisplay";
export default {
  props: {
    productId: {
      default: "",
    },
  },

  data() {
    return {
      count: 1,
    };
  },

  computed: {
    matchedProduct() {
      const product = this.productList.find((product) => {
        if (product.productId === this.productId) {
          product.productImageList = JSON.parse(product.productImages);
          return true;
        }
      }) || {
        success: false,
      };
      return product;
    },
    ...mapGetters(["productList"]),
  },

  watch: {
    matchedProduct(product) {
      if (product && product.success === false) {
        this.$router.push("/");
      }
    },
  },

  components: {
    "ap-tab-display": TabDisplay,
  },
};
</script>
<style lang="less">
.ap-product {
  .el-carousel__item {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .carousel_img_container {
    .carousel_img {
      width: 100%;
    }
  }

  .el-carousel {
    .el-carousel__indicators {
      width: 100% !important;
    }

    &:hover {
      .el-carousel__indicators {
        background-color: rgba(31, 45, 61, 0.1);
        transition: background 500ms ease-in-out;
      }
    }
  }

  .product-show {
    width: 100%;
    display: flex;
    margin: 30px 0px;

    .ap-carousel {
      flex: 0 0 700px;
      height: 500px;
      margin-right: 60px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
      border-radius: 4px;
    }

    .right-group {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .title {
      margin-bottom: 50px;
      font-size: 3em;
      word-break: break-all;
      text-align: left;
      font-weight: bold;
    }

    .price {
      font-size: 1.5em;
      font-weight: bold;
      margin-bottom: 40px;
    }

    .button {
      font-size: 1.8em;
    }

    .count {
      margin-bottom: 30px;
    }
  }

  .ap-tab-display {
    margin-bottom: 30px;
  }
}
</style>
