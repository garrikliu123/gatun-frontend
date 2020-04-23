<template>
  <div id="app">
    <ap-page-container
      :class="{ is_phone: isPhoneSize }"
      v-loading.fullscreen.lock="fullScreenLoading"
    >
      <template v-if="$route.meta.keepAlive">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </template>
      <template v-else>
        <router-view></router-view>
      </template>
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
    ...mapGetters(["fullScreenLoading", "isPhoneSize"])
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
