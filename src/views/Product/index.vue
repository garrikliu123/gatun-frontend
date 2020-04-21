<template>
  <div class="ap-product">
    <div class="product-show">
      <!-- Carousel 轮播图 -->
      <el-carousel class="ap-carousel" height="500px">
        <el-carousel-item v-for="item in matchedProduct.productImageList || []" :key="item.name">
          <el-image class="carousel_img" fit="contain" :src="item.url"></el-image>
        </el-carousel-item>
      </el-carousel>
      <div class="right-group">
        <div class="title">
          {{ matchedProduct.productName }}
        </div>
        <el-divider content-position="right"
          ><i class="ap-nav-icon el-icon-shopping-cart-2" style="font-size: 1.2em;"></i
        ></el-divider>
        <div class="price" v-if="matchedProduct.productPrice >= 1000" v-format="'CAD $#,##0.00'">
          {{ matchedProduct.productPrice }}
        </div>
        <div class="price" v-else v-format="'CAD $##0.00'">
          {{ matchedProduct.productPrice }}
        </div>
        <el-select
          v-if="productOptions.length > 0"
          class="option-select"
          v-model="optionChoose"
          placeholder="Please select an option"
          size="small"
        >
          <el-option
            v-for="item in productOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-input-number class="count" v-model="count" :min="1" :max="100"></el-input-number>
        <el-button type="success" class="button" @click="onAddClick">ADD TO CART</el-button>
      </div>
    </div>
    <ap-tab-display class="ap-tab-display" :product="matchedProduct"></ap-tab-display>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import TabDisplay from "./TabDisplay";
export default {
  props: {
    productId: {
      default: ""
    }
  },

  data() {
    return {
      count: 1,
      optionChoose: ""
    };
  },

  computed: {
    matchedProduct() {
      const product = this.productList.find(product => {
        if (product.productId === this.productId) {
          product.productImageList = JSON.parse(product.productImages);
          product.productFileList = JSON.parse(product.productFiles);
          product.productOptionList = JSON.parse(product.productOptions);
          return true;
        }
      }) || {
        success: false
      };
      return product;
    },
    imageList() {
      let list = [];
      if (this.matchedProduct.productImageList) {
        list = this.matchedProduct.productImageList.map(image => {
          return image.url;
        });
      }

      return list;
    },
    productOptions() {
      const list = [];
      const productOptionList = this.matchedProduct.productOptionList;
      if (productOptionList && productOptionList.length > 0) {
        productOptionList.forEach(item => {
          list.push({
            label: item,
            value: item
          });
        });
      }
      return list;
    },
    ...mapGetters(["productList", "shoppingCart"])
  },

  watch: {
    matchedProduct(product) {
      if (product && product.success === false) {
        this.$router.push("/");
      }
    },
    productOptions: {
      immediate: true,
      deep: true,
      handler(list) {
        if (list.length > 0) {
          this.optionChoose = list[0].value;
        }
      }
    }
  },

  methods: {
    onAddClick() {
      this.addProudctToCart({
        productId: this.matchedProduct.productId,
        amount: this.count,
        option: this.optionChoose
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
    "ap-tab-display": TabDisplay
  }
};
</script>
<style lang="less">
.ap-product {
  .el-carousel__item {
    display: flex;
    align-items: center;
    justify-content: center;
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

    .option-select {
      margin-bottom: 20px;
    }
  }

  .ap-tab-display {
    margin-bottom: 30px;
  }
}
</style>
