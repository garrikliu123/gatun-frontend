<template>
  <el-dialog class="ap-dialog" title="Edit Product" :visible.sync="dialogVisible" width="1100px">
    <el-form :model="formData" :rules="formRules" ref="editProductForm">
      <!-- Name -->
      <el-form-item label="Name" :label-width="formLabelWidth" prop="productName">
        <el-input v-model="formData.productName"></el-input>
      </el-form-item>

      <!-- Price -->
      <el-form-item label="Price" :label-width="formLabelWidth" prop="productPrice">
        <el-input v-model="formData.productPrice"></el-input>
      </el-form-item>

      <!-- Parameter -->
      <el-form-item label="Parameter" :label-width="formLabelWidth" prop="productParameter">
        <el-select class="form-item" v-model="formData.productParameter" filterable multiple>
          <el-option
            v-for="item in categoryListByParamter"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- Category -->
      <el-form-item label="Product" :label-width="formLabelWidth" prop="productCategory">
        <el-select class="form-item" v-model="formData.productCategory" filterable multiple>
          <el-option
            v-for="item in categoryListByProduct"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- Application -->
      <el-form-item label="Application" :label-width="formLabelWidth" prop="productApplication">
        <el-select class="form-item" v-model="formData.productApplication" filterable multiple>
          <el-option
            v-for="item in categoryListByApplication"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <!-- Pictures -->
    <el-upload
      class="dialog-picture-upload"
      action=""
      :http-request="onUploadImage"
      :before-upload="beforeUpload"
      :on-success="onUploadSuccess"
      :on-remove="onImageRemove"
      :file-list="formData.productImageList"
      list-type="picture-card"
    >
      <i class="el-icon-plus"></i>
    </el-upload>

    <!-- Rich Text Enter -->
    <el-tabs class="dialog-tabs" v-model="activeTabName">
      <!-- Description -->
      <el-tab-pane label="Description" name="1">
        <ap-texteditor v-model="formData.productDesc" />
      </el-tab-pane>

      <!-- Feature -->
      <el-tab-pane label="Feature" name="2">
        <ap-texteditor v-model="formData.productFeatures" />
      </el-tab-pane>

      <!-- Speces -->
      <el-tab-pane label="Specs" name="3">
        <ap-texteditor v-model="formData.productSpecs" />
      </el-tab-pane>

      <!-- Video -->
      <el-tab-pane label="Video" name="4">
        <ap-texteditor v-model="formData.productVideo" />
      </el-tab-pane>

      <!-- Warrant -->
      <el-tab-pane label="Warrant" name="5">
        <ap-texteditor v-model="formData.productWarranty" />
      </el-tab-pane>
    </el-tabs>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="onSubmitClick">Submit</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { v4 as uuidv4 } from "uuid";
import { uploadImage } from "api/common";
import productConfig from "./config/product_config.js";
import productApi from "api/product";
import TextEditor from "components/TextEditor";
import { checkDouble } from "common/utils/validateRules";
import { editProductForm as testFormData } from "common/config/testData";

export default {
  props: {
    mode: {
      required: true,
    },
    targetProduct: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      testFormData,
      activeTabName: "1",
      dialogVisible: false,
      formData: {
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
        productImageList: [],
      },
      formRules: {
        productName: [
          {
            required: true,
            message: "Please enter a valid name",
            trigger: "blur",
          },
        ],
        productPrice: [
          {
            required: true,
            message: "Please enter a valid price",
            trigger: "blur",
          },
          {
            validator: checkDouble("Please enter a valid number with two decimal places"),
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "100px",
    };
  },

  computed: {
    categoryListByProduct() {
      const result = [];
      this.categoryList.forEach((category) => {
        if (category.categoryType == "Product") {
          result.push({
            label: category.categoryName,
            value: category.categoryId,
          });
        }
      });
      return result;
    },
    categoryListByApplication() {
      const result = [];
      this.categoryList.forEach((category) => {
        if (category.categoryType == "Applications") {
          result.push({
            label: category.categoryName,
            value: category.categoryId,
          });
        }
      });
      return result;
    },
    categoryListByParamter() {
      const result = [];
      this.categoryList.forEach((category) => {
        if (category.categoryType == "Parameters") {
          result.push({
            label: category.categoryName,
            value: category.categoryId,
          });
        }
      });
      return result;
    },
    ...mapGetters(["categoryList"]),
  },

  watch: {
    targetProduct(product) {
      if (product) {
        Object.assign(this.formData, product);
      }
    },
  },

  methods: {
    onSubmitClick() {
      this.$refs.editProductForm.validate((valid) => {
        if (valid) {
          this.formData.productImages = JSON.stringify(this.formData.productImageList);
          if (this.mode === productConfig.MODE.NEW) {
            const productId = uuidv4();
            this.formData.productId = productId;

            productApi.addProduct(this.formData).then((res) => {
              this.dialogVisible = false;
              this.getProductList();
              if (res.success) {
                this.$message({
                  type: "success",
                  message: "Add Product Success",
                });
              }
            });
          } else if (this.mode === productConfig.MODE.EDIT) {
            productApi.updateProduct(this.formData).then((res) => {
              this.dialogVisible = false;
              this.getProductList();
              if (res.success) {
                this.$message({
                  type: "success",
                  message: "Update Product Success",
                });
              }
            });
          }
        }
      });
    },

    onUploadImage(req) {
      let filetype = "";
      if (req.file.type === "image/png") {
        filetype = "png";
      } else {
        filetype = "jpg";
      }

      // 重命名要上传的文件
      const filename = uuidv4() + "." + filetype;

      const formdata = new FormData();

      formdata.append("file", req.file);

      uploadImage(
        filename,
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
        (image) => {
          this.formData.productImageList.push(image);
        }
      );
    },

    // 验证文件合法性
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error("Image type should be JPED or PNG");
      }

      if (!isLt2M) {
        this.$message.error("Image size should less than 5MB");
      }

      return isJPG && isLt2M;
    },

    onUploadSuccess() {},

    onImageRemove(target) {
      let targetIndex = null;
      this.formData.productImageList.forEach((item, index) => {
        if (item.name === target.name) {
          targetIndex = index;
        }
      });

      if (targetIndex !== null) {
        this.formData.productImageList.splice(targetIndex, 1);
      }
    },

    ...mapActions(["getProductList"]),
  },

  components: {
    "ap-texteditor": TextEditor,
  },
};
</script>

<style lang="less">
.ap-dialog {
  .dialog-picture-upload {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin: 10px 0;
  }

  .form-item {
    width: 100%;
  }
}
</style>
