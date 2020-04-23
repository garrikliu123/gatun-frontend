<template>
  <div class="ap-home-page">
    <!-- Carousel 轮播图 -->
    <el-carousel
      class="ap-carousel"
      :class="{ 'ap-carousel_phone': isPhoneSize }"
      trigger="click"
      :height="isPhoneSize ? '160px' : '500px'"
    >
      <el-carousel-item
        v-for="(item, index) in carouselList"
        :key="index"
        @click.native="onCarouselClick(item)"
      >
        <div class="carousel_img_container">
          <img class="carousel_img" :src="item.sectionImage" alt="" />
        </div>
      </el-carousel-item>
    </el-carousel>

    <!-- Recommand Topic List 首页推荐列表 -->
    <ap-recommend-topic-list
      class="ap-recommend-topic-list"
      :recommendTopicList="billboardList"
      @onBillboardClick="onBillboardClick"
    ></ap-recommend-topic-list>

    <el-divider class="divider"><i class="el-icon-shopping-bag-1"></i></el-divider>

    <!-- Recommend Products Group 首页推荐商品组 -->
    <ap-recommend-product-group class="ap-recommend-product-group" :productGroup="productSection">
    </ap-recommend-product-group>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import apRecommendTopicList from "./RecommendTopicList";
import apRecommendProductGroup from "./RecommendProductGroup";

export default {
  data() {
    return {};
  },

  computed: {
    carouselList() {
      const carouselList = [];
      this.homeSectionList.forEach(item => {
        if (item.sectionType == "Carousel") {
          carouselList.push(item);
        }
      });

      return carouselList;
    },
    billboardList() {
      const list = [];
      this.homeSectionList.forEach(item => {
        if (item.sectionType == "Billboard") {
          list.push(item);
        }
      });

      return list;
    },
    productSection() {
      const sectionList = [];
      this.homeSectionList.forEach(item => {
        if (item.sectionType == "ProductSection") {
          sectionList.push(item);
        }
      });

      sectionList.forEach(item => {
        const list = [];
        const productList = item.productList;
        productList.forEach(id => {
          if (this.productListObj[id]) {
            const p = this.productListObj[id];
            p.productImageList = JSON.parse(p.productImages);
            list.push(p);
          }
        });

        item.list = list;
      });

      return sectionList;
    },
    ...mapGetters(["homeSectionList", "productList", "productListObj", "isPhoneSize"])
  },

  methods: {
    onCarouselClick(item) {
      if (item.sectionContentType == 1) {
        this.$router.push("/product/" + item.product);
      } else if (item.sectionContentType == 2) {
        this.$router.push("/section/" + item.sectionId);
      } else if (item.sectionContentType == 3) {
        this.$router.push("/section/" + item.sectionId);
      }
    },

    onBillboardClick(item) {
      if (item.sectionContentType == 1) {
        this.$router.push("/product/" + item.product);
      } else if (item.sectionContentType == 2) {
        this.$router.push("/section/" + item.sectionId);
      } else if (item.sectionContentType == 3) {
        this.$router.push("/section/" + item.sectionId);
      }
    }
  },

  components: {
    "ap-recommend-topic-list": apRecommendTopicList,
    "ap-recommend-product-group": apRecommendProductGroup
  }
};
</script>
<style lang="less" scoped>
.ap-home-page {
  .ap-carousel {
    width: 100%;
    margin-top: 20px;
  }

  .carousel_img_container {
    height: 100%;
    .carousel_img {
      height: inherit;
    }
  }

  .ap-recommend-topic-list {
    margin: 20px 24px 0px;
  }

  .ap-recommend-product-group {
    margin: 20px 24px 0px;
  }

  .divider {
    margin: 40px 0 50px;
    .el-divider__text {
      font-size: 1.2em;
    }
  }

  .ap-carousel_phone {
    margin-top: 10px;
    .carousel_img_container {
      .carousel_img {
        width: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>
