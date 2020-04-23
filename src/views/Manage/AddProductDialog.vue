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

      <el-form-item label="Options" :label-width="formLabelWidth" prop="productApplication">
        <el-select
          class="form-item product-options"
          v-model="formData.productOptionList"
          multiple
          filterable
          allow-create
          default-first-option
          no-data-text="You can enter an option for this product"
        ></el-select>
      </el-form-item>
    </el-form>

    <!-- Pictures -->
    <el-upload
      class="dialog-picture-upload"
      action=""
      :http-request="onUploadImage"
      :before-upload="beforeUploadImage"
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

      <!-- Files -->
      <el-tab-pane label="Files" name="5">
        <el-upload
          multiple
          action=""
          :http-request="onUploadFile"
          :before-upload="beforeUploadFile"
          :before-remove="beforeFileRemove"
          :on-remove="onFileRemove"
          :file-list="formData.productFileList"
        >
          <el-button size="small" type="primary">Upload File</el-button>
        </el-upload>
      </el-tab-pane>

      <!-- Parts -->
      <!-- <el-tab-pane label="Parts" name="6"> </el-tab-pane> -->

      <!-- Warrant -->
      <el-tab-pane label="Warrant" name="7">
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
      required: true
    },
    targetProduct: {
      type: Object,
      default() {
        return null;
      }
    }
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
        productFileList: [],
        productParts: [],
        productApplication: [],
        productParameter: [],
        productOptionList: [],
        productImageList: []
      },
      formRules: {
        productName: [
          {
            required: true,
            message: "Please enter a valid name",
            trigger: "blur"
          }
        ],
        productPrice: [
          {
            required: true,
            message: "Please enter a valid price",
            trigger: "blur"
          },
          {
            validator: checkDouble("Please enter a valid number with two decimal places"),
            trigger: "blur"
          }
        ]
      },
      formLabelWidth: "100px"
    };
  },

  computed: {
    categoryListByProduct() {
      const result = [];
      this.categoryList.forEach(category => {
        if (category.categoryType == "Product") {
          result.push({
            label: category.categoryName,
            value: category.categoryId
          });
        }
      });
      return result;
    },
    categoryListByApplication() {
      const result = [];
      this.categoryList.forEach(category => {
        if (category.categoryType == "Applications") {
          result.push({
            label: category.categoryName,
            value: category.categoryId
          });
        }
      });
      return result;
    },
    categoryListByParamter() {
      const result = [];
      this.categoryList.forEach(category => {
        if (category.categoryType == "Parameters") {
          result.push({
            label: category.categoryName,
            value: category.categoryId
          });
        }
      });
      return result;
    },
    ...mapGetters(["categoryList"])
  },

  watch: {
    targetProduct(product) {
      if (product) {
        Object.assign(this.formData, product);
      }
    }
  },

  methods: {
    onSubmitClick() {
      this.$refs.editProductForm.validate(valid => {
        if (valid) {
          this.formData.productImages = JSON.stringify(this.formData.productImageList);
          this.formData.productOptions = JSON.stringify(this.formData.productOptionList);
          this.formData.productFiles = JSON.stringify(this.formData.productFileList);
          if (this.mode === productConfig.MODE.NEW) {
            const productId = uuidv4();
            this.formData.productId = productId;

            productApi.addProduct(this.formData).then(res => {
              this.dialogVisible = false;
              this.getProductList();
              if (res.success) {
                this.$message({
                  type: "success",
                  message: "Add Product Success",
                  showClose: true
                });
              }
            });
          } else if (this.mode === productConfig.MODE.EDIT) {
            productApi.updateProduct(this.formData).then(res => {
              this.dialogVisible = false;
              this.getProductList();
              if (res.success) {
                this.$message({
                  type: "success",
                  message: "Update Product Success",
                  showClose: true
                });
              }
            });
          }
        }
      });
    },

    onUploadFile(req) {
      const filename = req.file.name;
      const formdata = new FormData();
      formdata.append("file", req.file);

      uploadImage(
        filename,
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" }
        },
        file => {
          this.formData.productFileList.push(file);
        }
      );
    },

    onUploadImage(req) {
      const filename = req.file.name;
      const formdata = new FormData();
      formdata.append("file", req.file);

      uploadImage(
        filename,
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" }
        },
        image => {
          this.formData.productImageList.push(image);
        }
      );
    },

    // 验证文件合法性
    beforeUploadImage(file) {
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

    // 验证文件合法性
    beforeUploadFile(file) {
      const isLt2M = file.size / 1024 / 1024 < 10;

      if (!isLt2M) {
        this.$message.error("File size should less than 10MB");
      }

      return isLt2M;
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

    onFileRemove(target) {
      let targetIndex = null;
      this.formData.productFileList.forEach((item, index) => {
        if (item.name === target.name) {
          targetIndex = index;
        }
      });

      if (targetIndex !== null) {
        this.formData.productFileList.splice(targetIndex, 1);
      }
    },

    beforeFileRemove(file) {
      return this.$confirm(`Do you want to delete ${file.name}？`);
    },

    ...mapActions(["getProductList"])
  },

  components: {
    "ap-texteditor": TextEditor
  }
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
