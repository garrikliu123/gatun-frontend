<template>
  <div class="ap-article">
    <ap-texteditor
      :readonly="true"
      :value="article.articleContent"
    ></ap-texteditor>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import TextEditor from "components/TextEditor";

export default {
  props: {
    title: {
      required: true,
      default: ""
    }
  },

  data() {
    return {
      article: {
        articleId: "",
        articleContent: "",
        articleName: ""
      }
    };
  },

  computed: {
    ...mapGetters(["articleList"])
  },

  watch: {
    articleList: {
      immediate: true,
      handler() {
        this.getArticle();
      }
    },

    $route: {
      immediate: true,
      handler() {
        this.getArticle();
      }
    }
  },

  methods: {
    getArticle() {
      const list = this.articleList;
      let article = null;

      if (Array.isArray(list)) {
        article = list.find(item => {
          return item.articleName.toLowerCase() === this.title.toLowerCase();
        });
      }
      if (article) {
        Object.assign(this.article, article);
      }
    }
  },

  components: {
    "ap-texteditor": TextEditor
  }
};
</script>
<style lang="less">
.ap-article {
  margin-top: 20px;

  .el-tiptap-editor__menu-bar {
    height: 0px;
    overflow: hidden;
  }

  .el-tooltip {
    display: none;
  }

  .el-tiptap-editor__menu-bar::before {
    display: none;
  }

  .el-tiptap-editor__menu-bubble {
    display: none;
  }
}
</style>
