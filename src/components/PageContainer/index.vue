<template>
  <div :class="isPhoneSize ? 'ap-page-upper_phone' : 'ap-page-container'">
    <div class="ap-page-upper">
      <ap-header class="ap-page-header"></ap-header>
      <div class="ap-page-content">
        <slot></slot>
      </div>
    </div>
    <!-- <ap-footer class="ap-page-footer"></ap-footer> -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import apHeader from "components/Header";
// import apFooter from "components/Footer";

export default {
  computed: {
    ...mapGetters(["isPhoneSize"])
  },
  components: {
    "ap-header": apHeader
    // "ap-footer": apFooter
  }
};
</script>
<style lang="less" scoped>
.ap-page-container {
  display: flex;
  flex-direction: column;
  min-width: @page-min-width;

  .ap-page-upper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .ap-page-content {
    flex: 1 0 auto;
    width: @page-min-width;
    margin: 0 auto;
  }
}

.ap-page-upper_phone {
  display: flex;
  flex-direction: column;
  width: 100%;

  .ap-page-upper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .ap-page-content {
    flex: 1 0 auto;
    width: 100%;
    margin: 0 auto;
  }
}
</style>
