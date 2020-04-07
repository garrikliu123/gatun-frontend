<template>
  <div class="ap-manage-site">
    <el-tabs tab-position="left">
      <el-tab-pane label="HOME">
        <ap-home-edit-tab></ap-home-edit-tab>
      </el-tab-pane>
      <el-tab-pane label="CATEGORY">
        <ap-topic-edit-tab></ap-topic-edit-tab>
      </el-tab-pane>
      <el-tab-pane label="CONTACT US">
        <ap-article-edit-tab title="Contact Us"></ap-article-edit-tab>
      </el-tab-pane>
      <el-tab-pane label="ABOUT US">
        <ap-article-edit-tab title="About Us"></ap-article-edit-tab>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import ArticleEditTab from "./ArticleEditTab";
import TopicEditTab from "./TopicEditTab";
import HomeEditTab from "./HomeEditTab";
export default {
  data() {
    return {};
  },

  components: {
    "ap-article-edit-tab": ArticleEditTab,
    "ap-topic-edit-tab": TopicEditTab,
    "ap-home-edit-tab": HomeEditTab,
  },
};
</script>
<style lang="less">
.ap-manage-site {
  .el-tabs__header {
    margin-right: 30px !important;
  }

  .el-tabs {
    display: flex;
  }

  .el-tabs__content {
    width: 100%;
  }
}
</style>
