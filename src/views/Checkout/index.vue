<template>
  <div class="ap-checkout">
    <h1>Checkout</h1>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
// import orderApi from "api/order";
// import checkoutApi from "api/checkout";
export default {
  data() {
    return {
      checkout_session_id: ""
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        if (to.query && to.query.checkout_session_id) {
          this.checkout_session_id = to.query.checkout_session_id;
          this.$notify({
            title: "Success!",
            message: "Thank you, your payment is successful!",
            type: "success"
          });

          this.setCart([]);
        } else {
          this.$notify({
            title: "Sorry!",
            message: "Sorry, your payment is failed!",
            type: "error"
          });
        }

        this.$router.push("/");
      }
    }
  },

  methods: {
    ...mapActions(["setCart", "getOrderHistory"])
  }
};
</script>
<style lang="less">
.ap-checkout {
}
</style>