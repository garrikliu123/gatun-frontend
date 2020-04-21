<template>
  <div class="ap-cart">
    <div class="item-count-text">
      <span>{{ shoppingCart.length }} Item(s) in Your Shopping Cart</span>
    </div>
    <el-divider class="divider"></el-divider>
    <div>
      <div
        class="product-list"
        v-for="(item, index) in productList"
        :key="index"
      >
        <div class="product-item">
          <el-image
            style="width: 100px; height: 100px"
            :src="item.image.url"
            fit="contain"
          ></el-image>
          <div class="text-group">
            <div class="text-link-wrap">
              <el-link
                class="text-link"
                @click="onProductTitleClick(item)"
              >{{
                item.productName
              }}</el-link>
            </div>
            <div class="select-group">
              <el-input-number
                size="mini"
                :min="1"
                v-model="item.amount"
              ></el-input-number>
              <el-select
                v-if="item.options.length > 0"
                class="option-select"
                v-model="item.option"
                size="mini"
              >
                <el-option
                  v-for="o in item.options"
                  :key="o.value"
                  :label="o.label"
                  :value="o.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="right-group">
            <div
              class="price"
              v-if="item.productPrice * item.amount >= 1000"
              v-format="'$#,##0.00'"
            >
              {{ item.productPrice * item.amount }}
            </div>
            <div
              class="price"
              v-else
              v-format="'$##0.00'"
            >
              {{ item.productPrice * item.amount }}
            </div>
          </div>
          <i
            class="delete-icon el-icon-error"
            @click="onDeleteClick(item.productId)"
          ></i>
        </div>
        <el-divider class="divider"></el-divider>
      </div>
      <div
        class="footer-btn-group"
        v-if="productList.length > 0"
      >
        <span class="total-price">
          Total:
          <span
            v-if="totalPrice >= 1000"
            v-format="'$#,##0.00'"
          >
            {{ totalPrice }}
          </span>
          <span
            v-else
            v-format="'$##0.00'"
          >
            {{ totalPrice }}
          </span>
        </span>
        <div class="button-group">
          <el-button
            size="small"
            @click="onSaveCartClick"
          >SAVE EDIT</el-button>
          <el-button
            size="small"
            type="primary"
            @click="onCheckout"
          >CHECKOUT</el-button>
        </div>
      </div>
    </div>

    <!-- 支付 -->
  </div>
</template>
<script>
import { loadStripe } from "@stripe/stripe-js";
import { mapGetters, mapActions } from "vuex";
import checkoutApi from "api/checkout";
import _ from "lodash";
export default {
  data() {
    return {
      productList: []
    };
  },

  computed: {
    matchedProduct() {
      const list = [];

      this.shoppingCart.forEach(item => {
        const product = this.productListObj[item.productId];

        const imageList = JSON.parse(product.productImages);
        const productOptionList = JSON.parse(product.productOptions);
        const options = [];

        if (productOptionList) {
          productOptionList.forEach(o => {
            options.push({
              label: o,
              value: o
            });
          });
        }

        list.push({
          productId: item.productId,
          productName: product.productName,
          productPrice: product.productPrice,
          image: imageList[0],
          amount: item.amount,
          option: item.option,
          options
        });
      });
      return list;
    },
    totalPrice() {
      let price = 0;
      this.productList.forEach(item => {
        price += item.productPrice * item.amount;
      });
      return price;
    },
    ...mapGetters(["productListObj", "shoppingCart", "user"])
  },

  watch: {
    matchedProduct: {
      immediate: true,
      handler(list) {
        this.productList = _.cloneDeep(list);
      }
    }
  },

  methods: {
    onProductTitleClick(item) {
      this.$router.push("/product/" + item.productId);
    },

    onDeleteClick(id) {
      const index = this.productList.findIndex(item => {
        return item.productId === id;
      });
      this.productList.splice(index, 1);
    },

    async onCheckout() {
      if (!this.user) {
        this.$message({
          type: "error",
          message: "Please log in first!",
          showClose: true
        });
        return;
      }

      this.onSaveCartClick();

      const productItems = this.productList.map(item => {
        return {
          name: item.productName,
          description: "Option: " + item.option,
          images: [item.image.url],
          amount: item.productPrice * 100,
          currency: "cad",
          quantity: item.amount
        };
      });

      try {
        const { session } = await checkoutApi.createSession({
          items: productItems,
          customerEmail: this.user.userEmail,
          userId: this.user.userId
        });

        const stripe = await loadStripe(
          "pk_test_Q3mpLZeQr5ENsPzD3GWfFsDA00PblH3asT"
        );

        await stripe.redirectToCheckout({
          sessionId: session.id
        });
      } catch (e) {
        this.$message({
          type: "error",
          message: e,
          showClose: true
        });
      }
    },

    onSaveCartClick() {
      this.setCart(this.productList);
      this.$message({
        type: "success",
        message: "Save Edit Success",
        showClose: true
      });
    },

    ...mapActions(["setCart"])
  }
};
</script>

<style lang="less" scoped>
.ap-cart {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  .item-count-text {
    text-align: center;
    font-weight: bold;
  }

  .divider {
    margin: 5px 0 10px;
  }

  .product-item {
    position: relative;
    display: flex;
    margin-bottom: 5px;
    height: 100px;
  }

  .text-group {
    flex: 0 0 auto;
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    width: 300px;
    .text-link-wrap {
      display: flex;
    }
    .text-link {
      font-weight: bold;
      text-align: left;
      word-break: break-all;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      margin-bottom: 20px;
      margin-top: 10px;
    }
  }

  .price {
    font-weight: bold;
  }

  .delete-icon {
    position: absolute;
    font-size: 1.2em;
    top: 45px;
    right: 0;
    cursor: pointer;
    transition: 200ms;
  }

  .delete-icon:hover {
    color: #f56c6c;
  }

  .select-group {
    display: flex;
    .option-select {
      margin: 0 10px;
    }
  }

  .footer-btn-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .total-price {
      font-size: 1.5em;
      font-weight: bold;
    }

    .button-group {
      display: flex;
    }
  }
}
</style>
