<template>
  <div class="ap-section-edit-tab">
    <!-- Add new product button 添加新产品按钮 -->
    <div class="add-btn-container">
      <el-button type="primary" @click="handleSectionAdd">ADD SECTION</el-button>
    </div>

    <el-table
      class="section-table"
      max-height="650"
      style="width: 100%;"
      :data="
        homeSectionList.filter(
          (data) =>
            (!search || data.sectionName.toLowerCase().includes(search.toLowerCase())) &&
            data.sectionType === sectionType
        )
      "
    >
      <el-table-column
        v-for="(config, index) in sectionTableConfig.rows"
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
            <el-select class="ap-select" v-model="sectionType" placeholder="Select the type">
              <el-option
                v-for="item in sectionTableConfig.sectionTypeOptions"
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
          <el-button @click="handleSectionEdit(scope.row)">
            Edit
          </el-button>
          <el-button type="danger" @click="handleSectionDelete(scope.row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <ap-addsection-dialog
      ref="addSectionDialog"
      :mode="mode"
      :targetSection="targetSection"
    ></ap-addsection-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AddSectionDialog from "./AddHomeSectionDialog";
import sectionConfig from "./config/section_config.js";
import sectionTableConfig from "./config/section_table_config.js";
import homeSectionApi from "api/homeSection.js";
export default {
  data() {
    return {
      search: "",
      mode: sectionConfig.MODE.NEW,
      sectionType: sectionTableConfig.sectionTypeOptions[0].value,
      sectionTableConfig,
      targetSection: null,
    };
  },

  computed: {
    ...mapGetters(["homeSectionList"]),
  },

  methods: {
    handleSectionAdd() {
      this.mode = sectionConfig.MODE.NEW;
      this.$refs.addSectionDialog.dialogVisible = true;
      this.targetSection = {
        sectionName: "",
        sectionType: sectionTableConfig.sectionTypeOptions[0].value,
        topicType: sectionTableConfig.typeOptions[0].value,
        sectionImage: "",
        sectionContentType: 1,
        categoryList: [],
        product: null,
        productList: [],
      };
    },

    handleSectionEdit(section) {
      this.mode = sectionConfig.MODE.EDIT;
      this.$refs.addSectionDialog.dialogVisible = true;
      this.targetSection = section;
    },
    handleSectionDelete(section) {
      const id = section.sectionId;
      const name = section.sectionName;

      this.$confirm(`Do you want to delete "${name}"? `, "Delete Action", {
        distinguishCancelAndClose: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      }).then(() => {
        homeSectionApi.deleteSection(id).then(() => {
          this.getHomeSectionList();
          this.$message({
            type: "success",
            message: "Delete Success",
          });
        });
      });
    },

    ...mapActions(["getHomeSectionList"]),
  },

  components: {
    "ap-addsection-dialog": AddSectionDialog,
  },
};
</script>

<style lang="less" scoped>
.ap-section-edit-tab {
  .add-btn-container {
    width: 100%;
    display: flex;
  }

  .section-table {
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
