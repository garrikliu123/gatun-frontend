<template>
  <el-dialog class="ap-dialog" title="Edit Category" :visible.sync="dialogVisible" width="1100px">
    <div class="dialog-inner">
      <el-form :model="formData" :rules="formRules" ref="editCategoryForm">
        <!-- Name -->
        <el-form-item label="Name" :label-width="formLabelWidth" prop="categoryName">
          <el-input v-model="formData.categoryName"></el-input>
        </el-form-item>

        <!-- Parameter -->
        <el-form-item label="Type" :label-width="formLabelWidth">
          <el-select
            class="form-item"
            v-model="formData.categoryType"
            placeholder="Select the type"
          >
            <el-option
              v-for="item in categoryTableConfig.typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="onSubmitClick">Submit</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions } from "vuex";
import { v4 as uuidv4 } from "uuid";
import categoryConfig from "./config/category_config.js";
import categoryApi from "api/category";
import categoryTableConfig from "./config/category_table_config.js";

export default {
  props: {
    mode: {
      required: true,
    },
    targetCategory: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      categoryTableConfig,
      dialogVisible: false,
      formData: {
        categoryName: "",
        categoryType: categoryTableConfig.typeOptions[0].value,
      },
      formRules: {
        categoryName: [
          {
            required: true,
            message: "Please enter a valid name",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "100px",
    };
  },

  watch: {
    targetCategory(category) {
      if (category) {
        Object.assign(this.formData, category);
      }
    },
  },

  methods: {
    onSubmitClick() {
      this.$refs.editCategoryForm.validate((valid) => {
        if (valid) {
          if (this.mode === categoryConfig.MODE.NEW) {
            const categoryId = uuidv4();
            this.formData.categoryId = categoryId;
            categoryApi.addCategory(this.formData).then((res) => {
              this.dialogVisible = false;
              this.getCategoryList();
              if (res.success) {
                this.$message({
                  type: "success",
                  message: "Add Category Success",
                });
              }
            });
          } else if (this.mode === categoryConfig.MODE.EDIT) {
            categoryApi.updateCategory(this.formData).then((res) => {
              this.dialogVisible = false;
              this.getCategoryList();
              if (res.success) {
                this.$message({
                  type: "success",
                  message: "Update Category Success",
                });
              }
            });
          }
        }
      });
    },

    ...mapActions(["getCategoryList"]),
  },
};
</script>

<style lang="less" scoped>
.ap-dialog {
  overflow-x: visible;
  .dialog-inner {
    max-height: 60vh;
    overflow-x: visible;
    overflow-y: auto;
    padding: 0 20px;
  }

  .form-item {
    width: 100%;
  }
}
</style>
