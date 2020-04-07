<template>
  <div class="ap-article-edit-tab">
    <div class="save-btn-container">
      <el-button type="primary" @click="handleArticleSave">SAVE</el-button>
    </div>
    <ap-texteditor v-model="article.articleContent"></ap-texteditor>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { v4 as uuidv4 } from "uuid";
import articleApi from "api/article";
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

  watch: {
    articleList: {
      immediate: true,
      handler(list) {
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
    }
  },

  computed: {
    ...mapGetters(["articleList"])
  },

  methods: {
    handleArticleSave() {
      const article = this.article;
      if (article.articleId === "") {
        const articleId = uuidv4();
        article.articleId = articleId;
        article.articleName = this.title;
        articleApi.addArticle(article).then(res => {
          if (res.success) {
            this.$message({
              showClose: true,
              message: "Create Article Success!",
              type: "success"
            });
          }

          this.getArticleList();
        });
      } else if (this.article.articleId !== "") {
        articleApi.updateArticle(article).then(res => {
          if (res.success) {
            this.$message({
              showClose: true,
              message: "Save Article Success!",
              type: "success"
            });
          }

          this.getArticleList();
        });
      }
    },

    ...mapActions(["getArticleList"])
  },

  components: {
    "ap-texteditor": TextEditor
  }
};
</script>
<style lang="less" scoped>
.ap-article-edit-tab {
  .save-btn-container {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
  }
}
</style>
