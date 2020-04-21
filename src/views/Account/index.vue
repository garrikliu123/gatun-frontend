<template>
  <div class="ap-account">
    <el-tabs
      class="header-tabs"
      v-model="activeTab"
    >
      <el-tab-pane
        class="manage-panel"
        label="My Info"
        name="1"
      >
        <ap-my-info></ap-my-info>
      </el-tab-pane>
      <el-tab-pane
        class="manage-panel"
        label="My Order"
        name="2"
      >
        <ap-my-order></ap-my-order>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import MyInfo from "./myInfo";
import MyOrder from "./myOrder";
export default {
  data() {
    return {
      activeTab: "1"
    };
  },

  components: {
    "ap-my-info": MyInfo,
    "ap-my-order": MyOrder
  }
};
</script>
<style lang="less" scoped>
.ap-account {
  .el-tabs__content,
  .el-tabs--left {
    overflow: initial !important;
  }

  .header-tabs {
    margin: 20px 20px 0;
    // user-select: none;
  }

  .manage-panel {
    padding-top: 20px;
  }
}
</style>
