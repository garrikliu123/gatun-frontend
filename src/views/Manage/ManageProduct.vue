<template>
  <div class="ap-manage-product">
    <!-- Add new product button 添加新产品按钮 -->
    <div class="add-btn-container">
      <el-button type="primary" @click="handleProductAdd">ADD PRODUCT</el-button>
    </div>

    <!-- Product List Table 商品列表 -->
    <el-table
      class="product-table"
      max-height="650"
      :data="
        productList.filter(
          data => !search || data.productName.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column
        v-for="(config, index) in productTableConfig.rows"
        :key="index"
        :prop="config.key"
        :label="config.label"
        :width="config.width"
      >
      </el-table-column>

      <!-- Product Operation Column 商品操作列（修改，删除） -->
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" placeholder="Please enter keyword" />
          <span style="display: none">{{ scope.$index }}</span>
        </template>
        <template slot-scope="scope">
          <el-button @click="handleProductEdit(scope.row)">
            Edit
          </el-button>
          <el-button type="danger" @click="handleProductDelete(scope.row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <ap-addproduct-dialog
      ref="addProductDialog"
      :mode="mode"
      :targetProduct="targetProduct"
    ></ap-addproduct-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import productTableConfig from "./config/product_table_config.js";
import AddProductDialog from "./AddProductDialog";
import productConfig from "./config/product_config.js";
import productApi from "api/product";

export default {
  data() {
    return {
      mode: productConfig.MODE.NEW,
      search: "",
      productTableConfig,
      targetProduct: null
    };
  },

  computed: {
    ...mapGetters(["productList", "productCategoryList"])
  },

  methods: {
    handleProductAdd() {
      this.mode = productConfig.MODE.NEW;
      this.$refs.addProductDialog.dialogVisible = true;
      this.targetProduct = {
        productName: "",
        productDesc: "",
        productSpecs: "",
        productWarranty: "",
        productVideo: "",
        productFeatures: "",
        productPrice: "",
        productCategory: [],
        productApplication: [],
        productParameter: [],
        productImageList: []
      };
    },
    handleProductEdit(product) {
      this.mode = productConfig.MODE.EDIT;
      this.$refs.addProductDialog.dialogVisible = true;
      product.productImageList = JSON.parse(product.productImages);

      product.productCategory = [];
      product.productApplication = [];
      product.productParameter = [];

      this.productCategoryList.forEach(item => {
        if (product.productId == item.productId && item.categoryType == "Product") {
          product.productCategory.push(item.categoryId);
        } else if (product.productId == item.productId && item.categoryType == "Applications") {
          product.productApplication.push(item.categoryId);
        } else if (product.productId == item.productId && item.categoryType == "Parameters") {
          product.productParameter.push(item.categoryId);
        }
      });
      this.targetProduct = product;
    },
    handleProductDelete(product) {
      const productId = product.productId;
      const productName = product.productName;

      this.$confirm(`Do you want to delete "${productName}"? `, "Delete Action", {
        distinguishCancelAndClose: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel"
      }).then(() => {
        productApi.deleteProduct(productId).then(() => {
          this.getProductList();
          this.$message({
            type: "success",
            message: "Delete Success"
          });
        });
      });
    },

    ...mapActions(["getProductList"])
  },

  components: {
    "ap-addproduct-dialog": AddProductDialog
  }
};
</script>
<style lang="less" scoped>
.ap-manage-product {
  .add-btn-container {
    width: 100%;
    display: flex;
  }

  .product-table {
    margin-top: 20px;
  }
}
</style>
