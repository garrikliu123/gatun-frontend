<template>
  <div class="ap-topic-edit-tab">
    <!-- Add new product button 添加新产品按钮 -->
    <div class="add-btn-container">
      <el-button type="primary" @click="handleTopicAdd">ADD TOPIC</el-button>
    </div>

    <el-table
      class="topic-table"
      max-height="650"
      style="width: 100%;"
      :data="
        topicList.filter(
          data =>
            (!search || data.topicName.toLowerCase().includes(search.toLowerCase())) &&
            data.topicType === topicType
        )
      "
    >
      <el-table-column
        v-for="(config, index) in topicTableConfig.rows"
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
            <el-select class="ap-select" v-model="topicType" placeholder="Select the type">
              <el-option
                v-for="item in topicTableConfig.typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input v-model="search" placeholder="Please enter keyword" />
            <span style="display: none;">{{ scope.$index }}</span>
          </div>
        </template>
        <template slot-scope="scope">
          <el-button @click="handleTopicEdit(scope.row)">
            Edit
          </el-button>
          <el-button type="danger" @click="handleTopicDelete(scope.row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <ap-addtopic-dialog
      ref="addTopicDialog"
      :mode="mode"
      :targetTopic="targetTopic"
    ></ap-addtopic-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import topicConfig from "./config/topic_config.js";
import topicApi from "api/topic";
import topicTableConfig from "./config/topic_table_config.js";
import AddTopicDialog from "./AddTopicDialog";
export default {
  data() {
    return {
      mode: topicConfig.MODE.NEW,
      search: "",
      topicTableConfig,
      topicType: topicTableConfig.typeOptions[0].value,
      targetTopic: null
    };
  },

  computed: {
    ...mapGetters(["topicList", "topicCategoryList"])
  },

  methods: {
    handleTopicAdd() {
      this.mode = topicConfig.MODE.NEW;
      this.$refs.addTopicDialog.dialogVisible = true;
      this.targetTopic = {
        topicName: "",
        topicType: topicTableConfig.typeOptions[0].value,
        categoryList: null,
        topicImage: ""
      };
    },

    handleTopicEdit(topic) {
      this.mode = topicConfig.MODE.EDIT;
      this.$refs.addTopicDialog.dialogVisible = true;
      this.targetTopic = topic;

      const list = [];

      this.topicCategoryList.forEach(item => {
        if (item.topicId == this.targetTopic.topicId) {
          list.push(item.categoryId);
        }
      });
      this.targetTopic.categoryList = list;
    },

    handleTopicDelete(topic) {
      const id = topic.topicId;
      const name = topic.topicName;

      this.$confirm(`Do you want to delete "${name}"? `, "Delete Action", {
        distinguishCancelAndClose: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel"
      }).then(() => {
        topicApi.deleteTopic(id).then(() => {
          this.getTopicList();
          this.$message({
            type: "success",
            message: "Delete Success",
            showClose: true
          });
        });
      });
    },

    ...mapActions(["getTopicList"])
  },

  components: {
    "ap-addtopic-dialog": AddTopicDialog
  }
};
</script>
<style lang="less" scoped>
.ap-topic-edit-tab {
  .add-btn-container {
    width: 100%;
    display: flex;
  }

  .topic-table {
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
