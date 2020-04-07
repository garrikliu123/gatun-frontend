<template>
  <div id="app">
    <ap-page-container v-loading.fullscreen.lock="fullScreenLoading">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </ap-page-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import apPageContainer from "components/PageContainer";
export default {
  name: "app",

  data() {
    return {};
  },

  computed: {
    ...mapGetters(["fullScreenLoading"])
  },

  mounted() {
    this.initSite();
  },

  methods: {
    ...mapActions(["initSite"])
  },

  components: {
    "ap-page-container": apPageContainer
  }
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
}
</style>
