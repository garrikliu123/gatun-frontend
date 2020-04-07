<template>
  <el-dialog class="ap-dialog" title="Edit Topic" :visible.sync="dialogVisible" width="1100px">
    <div class="dialog-inner">
      <el-form :model="formData" :rules="formRules" ref="editTopicForm">
        <!-- Name -->
        <el-form-item label="Name" :label-width="formLabelWidth" prop="topicName">
          <el-input v-model="formData.topicName"></el-input>
        </el-form-item>

        <!-- Type -->
        <el-form-item label="Type" :label-width="formLabelWidth">
          <el-select
            class="form-item"
            v-model="formData.topicType"
            placeholder="Select the type"
            :disabled="mode == topicConfig.MODE.EDIT"
          >
            <el-option
              v-for="item in topicTableConfig.typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- Category -->
        <el-form-item label="Category" :label-width="formLabelWidth" prop="categoryList">
          <el-select class="form-item" v-model="formData.categoryList" filterable multiple>
            <el-option
              v-for="item in matchedCategoryList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- Pictures -->
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :http-request="onUploadImage"
          :before-upload="beforeUpload"
          :on-success="onUploadSuccess"
        >
          <img v-if="formData.topicImage" :src="formData.topicImage" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="onSubmitClick">Submit</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { v4 as uuidv4 } from "uuid";
import { mapGetters, mapActions } from "vuex";
import { uploadImage } from "api/common";
import topicApi from "api/topic";
import topicConfig from "./config/topic_config.js";
import topicTableConfig from "./config/topic_table_config.js";

export default {
  props: {
    mode: {
      required: true,
    },
    targetTopic: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      topicConfig,
      topicTableConfig,
      dialogVisible: false,
      formData: {
        topicName: "",
        topicType: topicTableConfig.typeOptions[0].value,
        topicImage: "",
        categoryList: [],
      },
      formRules: {
        topicName: [
          {
            required: true,
            message: "Please enter a valid name",
            trigger: "blur",
          },
        ],
        categoryList: [
          {
            required: true,
            message: "Please select a category",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "100px",
    };
  },

  computed: {
    matchedCategoryList() {
      const result = [];
      this.categoryList.forEach((item) => {
        if (item.categoryType === this.formData.topicType) {
          result.push({
            label: item.categoryName,
            value: item.categoryId,
          });
        }
      });
      return result;
    },
    ...mapGetters(["categoryList"]),
  },

  watch: {
    targetTopic(topic) {
      if (topic) {
        Object.assign(this.formData, topic);
      }
    },
    "formData.topicType"() {
      if (this.mode == topicConfig.MODE.NEW) {
        this.formData.categoryList = [];
      }
    },
  },

  methods: {
    onSubmitClick() {
      this.$refs.editTopicForm.validate((valid) => {
        if (valid) {
          if (this.mode === topicConfig.MODE.NEW) {
            const topicId = uuidv4();
            this.formData.topicId = topicId;
            topicApi.addTopic(this.formData).then((res) => {
              this.dialogVisible = false;
              this.getTopicList();
              if (res.success) {
                this.$message({
                  type: "success",
                  message: "Add Topic Success",
                });
              }
            });
          } else if (this.mode === topicConfig.MODE.EDIT) {
            topicApi.updateTopic(this.formData).then((res) => {
              this.dialogVisible = false;
              this.getTopicList();
              if (res.success) {
                this.$message({
                  type: "success",
                  message: "Update Topic Success",
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
          if (image.url) {
            this.formData.topicImage = image.url;
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

    ...mapActions(["getTopicList"]),
  },
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
