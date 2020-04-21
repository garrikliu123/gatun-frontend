<template>
  <div class="ap-manage-page">
    <el-tabs
      class="header-tabs"
      v-model="activeTab"
    >
      <el-tab-pane
        class="manage-panel"
        label="Manage Product"
        name="1"
      >
        <ap-manage-product></ap-manage-product>
      </el-tab-pane>
      <el-tab-pane
        class="manage-panel"
        label="Manage Category"
        name="2"
      >
        <ap-manage-category></ap-manage-category>
      </el-tab-pane>
      <el-tab-pane
        class="manage-panel"
        label="Manage Site Page"
        name="3"
      >
        <ap-manage-site></ap-manage-site>
      </el-tab-pane>
      <!-- <el-tab-pane class="manage-panel" label="Order History" name="5">Order History</el-tab-pane> -->
      <!-- <el-tab-pane class="manage-panel" label="User List" name="6">User List</el-tab-pane> -->
    </el-tabs>
  </div>
</template>
<script>
import ManageProduct from "./ManageProduct";
import ManageCatefory from "./ManageCategory";
import ManageSite from "./ManageSite";

export default {
  data() {
    return {
      activeTab: "1"
    };
  },

  components: {
    "ap-manage-product": ManageProduct,
    "ap-manage-category": ManageCatefory,
    "ap-manage-site": ManageSite
  }
};
</script>
<style lang="less">
.ap-manage-page {
  .el-table {
    .el-table__body-wrapper {
    }
  }

  .el-tabs__content,
  .el-tabs--left {
    overflow: initial !important;
  }

  .header-tabs {
    margin: 20px 20px 0;
    user-select: none;
  }

  .manage-panel {
    padding-top: 20px;
  }
}
</style>
