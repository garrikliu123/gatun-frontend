<template>
  <div>
    <ap-product-list
      class="product-list"
      :title="matchedSection.sectionName"
      :productList="matchedProductList"
    ></ap-product-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductList from "components/ProductList";
export default {
  props: {
    sectionId: {
      default: "",
    },
  },
  date() {
    return {};
  },
  computed: {
    matchedSection() {
      let section = this.homeSectionList.find((section) => {
        if (section.sectionId == this.sectionId) {
          return true;
        }
      });

      if (!section) {
        section = {
          success: false,
        };
      }

      return section;
    },
    matchedProductList() {
      const list = [];

      if (this.matchedSection.sectionContentType == 2) {
        const productList = this.matchedSection.productList;
        productList.forEach((id) => {
          if (this.productListObj[id]) {
            const p = this.productListObj[id];
            p.productImageList = JSON.parse(p.productImages);
            list.push(p);
          }
        });
      } else if (this.matchedSection.sectionContentType == 3) {
        const productIdSet = new Set();
        if (this.productCategoryList) {
          this.productCategoryList.forEach((item) => {
            if (this.matchedSection.categoryList.includes(item.categoryId)) {
              productIdSet.add(item.productId);
            }
          });
        }

        if (this.productList) {
          this.productList.forEach((product) => {
            if (productIdSet.has(product.productId)) {
              product.productImageList = JSON.parse(product.productImages);
              list.push(product);
            }
          });
        }
      }

      return list;
    },

    ...mapGetters(["homeSectionList", "productListObj", "productList", "productCategoryList"]),
  },
  watch: {
    matchedSection(section) {
      if (section && section.success === false) {
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
