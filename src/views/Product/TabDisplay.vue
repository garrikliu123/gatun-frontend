<template>
  <div class="ap-tab-display">
    <el-tabs
      v-model="activeTab"
      type="border-card"
    >
      <el-tab-pane
        v-for="(item, index) in contentList"
        :label="item.label"
        :name="index.toString()"
        :key="index"
      >
        <ap-texteditor
          :readonly="true"
          :value="item.content"
        ></ap-texteditor>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TextEditor from "components/TextEditor";
export default {
  props: {
    product: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      activeTab: "0"
    };
  },

  computed: {
    contentList() {
      let list = [];
      const product = this.product;
      if (product) {
        if (product.productDesc) {
          list.push({
            label: "DESCRIPTION",
            content: product.productDesc
          });
        }

        if (product.productFeatures) {
          list.push({
            label: "FEATURES",
            content: product.productFeatures
          });
        }

        if (product.productVideo) {
          list.push({
            label: "VIDEO",
            content: product.productVideo
          });
        }

        if (product.productSpecs) {
          list.push({
            label: "SPECS",
            content: product.productSpecs
          });
        }

        if (product.productDocument) {
          list.push({
            label: "DOCUMENT",
            content: product.productDocument
          });
        }

        if (product.productWarranty) {
          list.push({
            label: "WARRANTY",
            content: product.productWarranty
          });
        }
      }
      return list;
    }
  },

  components: {
    "ap-texteditor": TextEditor
  }
};
</script>

<style lang="less">
.ap-tab-display {
  .el-tiptap-editor__menu-bar {
    height: 2px;
    overflow: hidden;
  }

  .el-tiptap-editor__menu-bar::before {
    display: none;
  }

  .el-tiptap-editor__menu-bubble {
    display: none;
  }

  .el-tabs--border-card {
    border: none !important;
  }

  .el-tabs__header {
    background-color: #409eff !important;
    user-select: none;
  }

  .el-tabs__item {
    color: #fff !important;
    font-weight: bold;
    height: 50px;
    line-height: 50px;
    &.is-active {
      color: #409eff !important;
    }
  }
}
</style>
