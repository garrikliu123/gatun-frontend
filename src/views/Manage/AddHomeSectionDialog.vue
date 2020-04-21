<template>
  <div>
    <el-dialog class="ap-dialog" title="Edit Section" :visible.sync="dialogVisible" width="1100px">
      <div class="dialog-inner">
        <el-form :model="formData" :rules="formRules" ref="editSectionForm">
          <el-form-item label="Name" :label-width="formLabelWidth" prop="sectionName">
            <el-input v-model="formData.sectionName"></el-input>
          </el-form-item>

          <el-form-item label="Section Type" :label-width="formLabelWidth">
            <el-select
              class="form-item"
              v-model="formData.sectionType"
              placeholder="Select the type"
            >
              <el-option
                v-for="item in sectionTableConfig.sectionTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="form-radio-group" :label-width="formLabelWidth">
            <el-radio-group v-model="formData.sectionContentType">
              <el-radio-button :label="1" :disabled="formData.sectionType == 'ProductSection'"
                >Single Product</el-radio-button
              >
              <el-radio-button :label="2">Product Group</el-radio-button>
              <el-radio-button :label="3" :disabled="formData.sectionType == 'ProductSection'"
                >Topic</el-radio-button
              >
            </el-radio-group>
          </el-form-item>

          <!-- Product -->
          <el-form-item
            v-if="formData.sectionContentType != 3 && formData.sectionContentType == 1"
            label="Product"
            :label-width="formLabelWidth"
            prop="product"
          >
            <el-select
              key="product"
              class="form-item"
              v-model="formData.product"
              filterable
              placeholder="Please select a product"
            >
              <el-option
                v-for="item in matchedProductList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <!-- Product -->
          <el-form-item
            v-if="formData.sectionContentType != 3 && formData.sectionContentType == 2"
            label="Product"
            :label-width="formLabelWidth"
            prop="productList"
          >
            <el-select
              key="productList"
              class="form-item"
              v-model="formData.productList"
              filterable
              placeholder="Please select a product"
              multiple
            >
              <el-option
                v-for="item in matchedProductList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <!-- TOPIC -->
          <el-form-item
            v-if="formData.sectionContentType == 3"
            label="Topic Type"
            :label-width="formLabelWidth"
          >
            <el-select
              key="topicType"
              class="form-item"
              v-model="formData.topicType"
              placeholder="Select the type"
            >
              <el-option
                v-for="item in sectionTableConfig.typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            v-if="formData.sectionContentType == 3"
            label="Category"
            :label-width="formLabelWidth"
            prop="categoryList"
          >
            <el-select
              key="categoryList"
              class="form-item"
              v-model="formData.categoryList"
              filterable
              multiple
            >
              <el-option
                v-for="item in matchedCategoryList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <!-- IMAGE -->
          <el-upload
            v-if="formData.sectionType != 'ProductSection'"
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="onUploadImage"
            :before-upload="beforeUpload"
            :on-success="onUploadSuccess"
          >
            <img v-if="formData.sectionImage" :src="formData.sectionImage" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="onSubmitClick">Submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { mapGetters, mapActions } from "vuex";
import { uploadImage } from "api/common";
import sectionConfig from "./config/section_config.js";
import sectionTableConfig from "./config/section_table_config.js";
import homeSectionApi from "api/homeSection.js";
export default {
  props: {
    mode: {
      required: true
    },
    targetSection: {
      type: Object,
      default() {
        return null;
      }
    }
  },

  data() {
    return {
      dialogVisible: false,
      sectionTableConfig,
      formData: {
        sectionName: "",
        sectionType: sectionTableConfig.sectionTypeOptions[0].value,
        topicType: sectionTableConfig.typeOptions[0].value,
        sectionImage: "",
        sectionContentType: 1,
        categoryList: [],
        product: null,
        productList: []
      },
      formRules: {
        sectionName: [
          {
            required: true,
            message: "Please enter a valid name",
            trigger: "blur"
          }
        ],
        product: [
          {
            required: true,
            message: "Please select a product",
            trigger: "blur"
          }
        ],
        productList: [
          {
            required: true,
            message: "Please select a product",
            trigger: "blur"
          }
        ],
        categoryList: [
          {
            required: true,
            message: "Please select a category",
            trigger: "blur"
          }
        ]
      },
      formLabelWidth: "100px"
    };
  },

  computed: {
    matchedCategoryList() {
      const result = [];
      this.categoryList.forEach(item => {
        if (item.categoryType === this.formData.topicType) {
          result.push({
            label: item.categoryName,
            value: item.categoryId
          });
        }
      });
      return result;
    },

    matchedProductList() {
      const result = [];
      this.productList.forEach(item => {
        result.push({
          label: item.productName,
          value: item.productId
        });
      });
      return result;
    },

    ...mapGetters(["categoryList", "productList"])
  },

  watch: {
    targetSection(section) {
      if (section) {
        Object.assign(this.formData, section);
      }
    },
    "formData.sectionType": {
      immediate: true,
      handler(type) {
        if (type == "ProductSection") {
          this.formData.sectionContentType = 2;
        }
      }
    },

    "formData.topicType"() {
      this.formData.categoryList = [];
    }
  },

  methods: {
    onSubmitClick() {
      this.$refs.editSectionForm.validate(valid => {
        if (valid) {
          if (this.mode === sectionConfig.MODE.NEW) {
            const sectionId = uuidv4();

            const obj = {
              sectionId: sectionId,
              sectionData: JSON.stringify(this.formData)
            };

            homeSectionApi.addSection(obj).then(res => {
              this.dialogVisible = false;
              this.getHomeSectionList();
              if (res.success) {
                this.$message({
                  type: "success",
                  message: "Add Section Success",
                  showClose: true
                });
              }
            });
          } else if (this.mode === sectionConfig.MODE.EDIT) {
            const obj = {
              sectionId: this.formData.sectionId,
              sectionData: JSON.stringify(this.formData)
            };

            homeSectionApi.updateSection(obj).then(res => {
              this.dialogVisible = false;
              this.getHomeSectionList();
              if (res.success) {
                this.$message({
                  type: "success",
                  message: "Update Section Success",
                  showClose: true
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
          headers: { "Content-Type": "multipart/form-data" }
        },
        image => {
          if (image.url) {
            this.formData.sectionImage = image.url;
          }
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

    ...mapActions(["getHomeSectionList"])
  }
};
</script>

<style lang="less">
.ap-dialog {
  overflow-x: visible;
  .dialog-inner {
    max-height: 60vh;
    overflow-x: visible;
    overflow-y: auto;
    padding: 0 20px;
  }

  .form-radio-group {
    display: flex;
    justify-content: flex-start;
  }

  .form-item {
    width: 100%;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 400px;
    height: 180px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    height: 180px;
    display: block;
  }
}
</style>
