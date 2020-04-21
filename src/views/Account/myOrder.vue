<template>
  <div class="ap-account-order">
    <el-collapse accordion>
      <el-collapse-item
        v-for="(item, index) in orderList"
        :key="index"
        :name="item.orderId"
      >
        <template slot="title">
          <div class="collapse-title">
            <div class="title-row">
              <i class="icon el-icon-postcard"></i>
              <span class="field">Order ID:</span>
              <span class="content">{{item.orderId}}</span>
              <el-divider direction="vertical"></el-divider>
            </div>

            <div class="title-row">
              <i class="icon el-icon-date"></i>
              <span class="field">Order Time:</span>
              <span class="content">{{formatDate(new Date(item.createTime))}}</span>
              <el-divider direction="vertical"></el-divider>
            </div>

            <div class="title-row">
              <i class="icon el-icon-money"></i>
              <span class="field">Total:</span>
              <span
                class="content"
                v-if="item.total >= 1000"
                v-format="'CAD $#,##0.00'"
              >
                {{ item.total }}
              </span>
              <span
                class="content"
                v-else
                v-format="'CAD $##0.00'"
              >
                {{ item.total }}
              </span>
            </div>
          </div>
        </template>
        <div class="shipping">
          <div class="shipping-row">
            <span class="shipping-field">Name:</span>
            {{item.orderShipping.name}}
          </div>
          <div class="shipping-row">
            <span class="shipping-field">Address 1:</span>
            {{item.orderShipping.line1}}
          </div>
          <div class="shipping-row">
            <span class="shipping-field">Address 2:</span>
            {{item.orderShipping.line2}}
          </div>
          <div class="shipping-row">
            <span class="shipping-field">City:</span>
            {{item.orderShipping.city}}
          </div>
          <div class="shipping-row">
            <span class="shipping-field">State:</span>
            {{item.orderShipping.state}}
          </div>
          <div class="shipping-row">
            <span class="shipping-field">Country:</span>
            {{item.orderShipping.country}}
          </div>
          <div class="shipping-row">
            <span class="shipping-field">Postal Code:</span>
            {{item.orderShipping.postal_code}}
          </div>
        </div>
        <el-divider></el-divider>
        <div
          class="product-item"
          v-for="(product, index) in item.orderDetail"
          :key="index"
        >
          <div class="product-wrap">
            <el-image
              style="width: 100px; height: 100px"
              :src="product.imageUrl"
              fit="contain"
            ></el-image>
            <div class="text-group">
              <span class="detail-field">
                <span class="detail-field-title">Name:</span>
                {{product.name}}
              </span>
              <span class="detail-field">
                <span class="detail-field-title">Description:</span>
                {{product.description}}
              </span>
              <span class="detail-field">
                <span class="detail-field-title">Quantity:</span>
                {{product.quantity}}
              </span>
            </div>
            <div class="right-group">
              <div
                class="price"
                v-if="product.amount / 100 * product.quantity >= 1000"
                v-format="'$#,##0.00'"
              >
                {{ product.amount / 100 * product.quantity }}
              </div>
              <div
                class="price"
                v-else
                v-format="'$##0.00'"
              >
                {{ product.amount / 100 * product.quantity }}
              </div>
            </div>
          </div>
          <el-divider></el-divider>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import _ from "lodash";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      orderList: []
    };
  },
  computed: {
    ...mapGetters(["orderHistory"])
  },

  watch: {
    orderHistory: {
      immediate: true,
      handler(list) {
        this.orderList = _.cloneDeep(list);
        this.orderList.forEach(order => {
          let total = 0;
          order.orderDetail.forEach(item => {
            total += item.amount * item.quantity;
          });
          order.total = total / 100;
        });
      }
    }
  },

  methods: {
    formatDate(date) {
      return (
        date.getFullYear() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes()
      );
    }
  }
};
</script>
<style lang="less">
.ap-account-order {
  .collapse-title {
    display: flex;
    .title-row {
      display: flex;
      align-items: center;
    }
    .icon {
      font-size: 1.2em;
      margin-right: 5px;
    }

    .field {
      font-size: 1.2em;
      font-weight: bold;
      margin-right: 10px;
    }

    .content {
      color: #697386;
    }
  }

  .el-collapse-item__content {
    background-color: #f5f7fa !important;
  }

  .product-item {
    .product-wrap {
      display: flex;
      padding: 0 20px;
    }

    .el-divider {
      margin: 20px;
    }
    .text-group {
      width: 400px;
      padding-top: 10px;
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .detail-field {
        font-size: 1.2em;
        word-break: break-all;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      .detail-field-title {
        font-weight: bold;
      }
    }

    .right-group {
      .price {
        margin-top: 10px;
        margin-left: 20px;
        font-size: 1.5em;
        font-weight: bold;
      }
    }
  }

  .shipping {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 20px;

    .shipping-row {
      font-size: 1.2em;
    }

    .shipping-field {
      font-weight: bold;
      margin-right: 5px;
    }
  }
}
</style>