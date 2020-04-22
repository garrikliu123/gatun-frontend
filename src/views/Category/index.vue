<template>
  <div class="ap-category">
    <h1 class="title">{{ title }}</h1>
    <el-divider content-position="right">
      <i class="el-icon-shopping-bag-2" style="font-size: 1.2em;"></i>
    </el-divider>
    <div class="topic-list">
      <div
        class="topic-card-container"
        v-for="topic in matchedTopicList"
        :key="topic.topicId"
        @click="onCardClicked(topic.topicName)"
      >
        <el-card class="topic-card">
          <img :src="topic.topicImage" class="image" />
          <div class="card-title">
            <div class="title-text">{{ topic.topicName }}</div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    categoryType: {
      type: String,
      default: ""
    }
  },

  date() {
    return {};
  },

  computed: {
    title() {
      let title = "";
      if (this.categoryType.toLowerCase() === "products") {
        title = "PRODUCTS";
      } else if (this.categoryType.toLowerCase() === "applications") {
        title = "APPLICATIONS";
      } else if (this.categoryType.toLowerCase() === "parameters") {
        title = "PARAMETERS";
      }

      return title;
    },

    type() {
      let type = "";
      if (this.categoryType.toLowerCase() === "products") {
        type = "Product";
      } else if (this.categoryType.toLowerCase() === "applications") {
        type = "Applications";
      } else if (this.categoryType.toLowerCase() === "parameters") {
        type = "Parameters";
      }

      return type;
    },

    matchedTopicList() {
      let list = [];
      this.topicList.forEach(item => {
        if (item.topicType === this.type) {
          list.push(item);
        }
      });

      list.sort((a, b) => {
        let aIndex = parseInt(a.topicName.split("-")[0], 10);
        let bIndex = parseInt(b.topicName.split("-")[0], 10);
        aIndex = isNaN(aIndex) ? 0 : aIndex;
        bIndex = isNaN(bIndex) ? 0 : bIndex;

        return aIndex - bIndex;
      });

      return list;
    },

    ...mapGetters(["topicList"])
  },

  methods: {
    onCardClicked(topicName) {
      this.$router.push("/topic/" + topicName);
    }
  }
};
</script>
<style lang="less">
.ap-category {
  user-select: none;
  .title {
    margin-top: 50px;
    margin-bottom: 30px;
  }
  .topic-list {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }

  .topic-card-container {
    flex: 0 0 25%;
    padding: 5px 10px;
  }

  .topic-card {
    position: relative;
    width: 100%;
    overflow: hidden;
    height: 280px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    }

    .el-card__body {
      padding: 0px;
      height: 100%;
    }

    .image {
      display: block;
      width: 100%;
      height: 100%;
    }
    .card-title {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(0, -50%);
      background-color: rgba(0, 0, 0, 0.6);
      width: 100%;
      padding: 10px 0px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .title-text {
      width: 100%;
      color: rgba(74, 197, 254, 1);
      font-size: 1.4em;
      font-weight: bold;
      text-align: center;
      word-wrap: break-word;
    }
  }
}
</style>
