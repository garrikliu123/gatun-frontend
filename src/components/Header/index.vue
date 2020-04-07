<template>
  <div class="ap-header">
    <el-menu
      class="ap-nav"
      mode="horizontal"
      :default-active="activeIndex"
      @select="handleNavSelect"
    >
      <div class="ap-nav-logo__container">
        <router-link to="/">
          <h1 class="nav-title">GATUN</h1>
        </router-link>
        <!-- <img class="ap-nav-logo" src="~common/images/logo.png" alt="APERA" /> -->
      </div>
      <template v-for="(item, index) in navList">
        <el-menu-item
          v-if="item.onlyManager ? (user && user.isManager == true) : true"
          :key="index"
          :index="index.toString()"
        >
          {{ item.title }}
        </el-menu-item>
      </template>

      <el-autocomplete
        class="ap-nav-search"
        placeholder="Please enter keyword"
        v-model="search"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="onSearchClick"
        ></el-button>
      </el-autocomplete>
      <div class="ap-nav-icon__group">
        <el-dropdown class="user">
          <span class="el-dropdown-link">
            <i class="ap-nav-icon el-icon-user-solid"></i>
          </span>
          <el-dropdown-menu
            slot="dropdown"
            v-if="!user"
          >
            <el-dropdown-item @click.native="onUserClick('login')">Log In</el-dropdown-item>
            <el-dropdown-item @click.native="onUserClick('register')">Register</el-dropdown-item>
          </el-dropdown-menu>
          <el-dropdown-menu
            slot="dropdown"
            v-else
          >
            <el-dropdown-item @click.native="onLogoutClick()">Log Out</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <i class="ap-nav-icon el-icon-shopping-cart-2"></i>
      </div>
    </el-menu>
    <ap-login
      ref="loginDialog"
      :mode="loginMode"
    ></ap-login>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import headerNavConfig from "common/config/header_nav_config";
import LoginDialog from "views/Login";
export default {
  data() {
    return {
      loginMode: "login",
      search: "",
      navList: headerNavConfig,
      activeIndex: ""
    };
  },

  computed: {
    ...mapGetters(["productList", "user"])
  },

  watch: {
    "$route.fullPath": {
      immediate: true,
      handler(path) {
        if (path == "/manage") {
          if (!this.user || !this.user.isManager) {
            this.$router.push("/");
          }
        }
      }
    }
  },

  methods: {
    handleNavSelect(key) {
      const targetNav = this.navList[key];
      this.$router.push(targetNav.link);
    },

    querySearch(queryString, cb) {
      const result = [];
      this.productList.forEach(item => {
        const priority = item.productName
          .toLowerCase()
          .indexOf(queryString.toLowerCase());
        if (priority >= 0) {
          result.push({
            value: item.productName,
            id: item.productId,
            priority
          });
        }
      });

      result.sort((a, b) => {
        if (a.priority < b.priority) {
          return -1;
        } else if (a.priority == b.priority) {
          return 0;
        } else {
          return 1;
        }
      });

      cb(result);
    },

    onSearchClick() {
      if (this.search) {
        this.$router.push("/search/" + this.search);
      } else {
        this.$message({
          message: "Please enter some keyword!",
          type: "warning"
        });
      }
    },

    onUserClick(type) {
      this.loginMode = type;
      this.$refs.loginDialog.dialogVisible = true;
    },

    onLogoutClick() {
      this.logout();
    },

    ...mapActions(["logout"])
  },

  components: {
    "ap-login": LoginDialog
  }
};
</script>
<style lang="less">
.ap-header {
  user-select: none;
  outline: none;
  .ap-nav-logo__container {
    flex: 1 1 auto;
    display: flex;
    justify-content: flex-start;

    a {
      text-decoration: none;
    }

    .nav-title {
      margin: 0;
      text-align: left;
      color: #2c3e50;
    }
  }
  .ap-nav-logo {
    width: 200px;
  }

  .ap-nav-icon__group {
    flex: 0 0 auto;
    .user {
      margin-right: 10px;
    }
  }

  .ap-nav-icon {
    font-size: 1.5em;
    margin-right: 20px;
    cursor: pointer;
    &:last-of-type {
      margin-right: 0;
    }
  }

  .ap-nav-search {
    flex: 1 1 auto;
    max-width: 250px;
    margin: 0 20px;
  }

  .ap-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
  }

  .el-dropdown {
    color: #2c3e50;
    font-size: 16px;
  }
}
</style>
