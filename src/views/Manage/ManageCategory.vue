<template>
  <div class="ap-manage-product">
    <!-- Add new category button 添加新分类按钮 -->
    <div class="add-btn-container">
      <el-button type="primary" @click="handleCategoryAdd">ADD CATEGORY</el-button>
    </div>

    <!-- Category List Table 分类列表 -->
    <el-table
      class="product-table"
      max-height="650"
      :data="
        categoryList.filter(
          data =>
            (!search || data.categoryName.toLowerCase().includes(search.toLowerCase())) &&
            data.categoryType === categoryType
        )
      "
      style="width: 100%"
    >
      <el-table-column
        v-for="(config, index) in categoryTableConfig.rows"
        :key="index"
        :prop="config.key"
        :label="config.label"
        :width="config.width"
      >
      </el-table-column>

      <!-- Product Operation Column 商品操作列（修改，删除） -->
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <div class="header-control">
            <el-select class="ap-select" v-model="categoryType" placeholder="Select the type">
              <el-option
                v-for="item in categoryTableConfig.typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input v-model="search" placeholder="Please enter keyword" />
            <span style="display: none">{{ scope.$index }}</span>
          </div>
        </template>
        <template slot-scope="scope">
          <el-button @click="handleCategoryEdit(scope.row)">
            Edit
          </el-button>
          <el-button type="danger" @click="handleCateroyDelete(scope.row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <ap-addcategory-dialog
      ref="addCategoryDialog"
      :mode="mode"
      :targetCategory="targetCategory"
    ></ap-addcategory-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import categoryApi from "api/category";
import categoryConfig from "./config/category_config.js";
import categoryTableConfig from "./config/category_table_config.js";
import AddCategoryDialog from "./AddCategoryDialog";

export default {
  data() {
    return {
      mode: categoryConfig.MODE.NEW,
      search: "",
      categoryTableConfig,
      categoryType: categoryTableConfig.typeOptions[0].value,
      targetCategory: null
    };
  },

  computed: {
    ...mapGetters(["categoryList"])
  },

  methods: {
    handleCategoryAdd() {
      this.mode = categoryConfig.MODE.NEW;
      this.$refs.addCategoryDialog.dialogVisible = true;
      this.targetCategory = {
        categoryName: "",
        categoryType: categoryTableConfig.typeOptions[0].value
      };
    },

    handleCategoryEdit(category) {
      this.mode = categoryConfig.MODE.EDIT;
      this.$refs.addCategoryDialog.dialogVisible = true;
      this.targetCategory = category;
    },

    handleCateroyDelete(category) {
      const categoryId = category.categoryId;
      const categoryName = category.categoryName;

      this.$confirm(`Do you want to delete "${categoryName}"? `, "Delete Action", {
        distinguishCancelAndClose: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel"
      }).then(() => {
        categoryApi.deleteCategory(categoryId).then(() => {
          this.getCategoryList();
          this.$message({
            type: "success",
            message: "Delete Success"
          });
        });
      });
    },

    ...mapActions(["getCategoryList"])
  },

  components: {
    "ap-addcategory-dialog": AddCategoryDialog
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
    .header-control {
      display: flex;
    }

    .ap-select {
      margin-right: 20px;
    }
  }
}
</style>
