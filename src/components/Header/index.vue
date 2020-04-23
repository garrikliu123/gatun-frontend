<template>
  <div class="ap-header">
    <template v-if="!isPhoneSize">
      <el-menu
        class="ap-nav"
        mode="horizontal"
        :default-active="activeIndex"
        @select="handleNavSelect"
      >
        <div class="ap-nav-logo__container">
          <router-link to="/">
            <div class="logo-container">
              <img class="logo-image" :src="logoImage" alt="GATUN" />
            </div>
          </router-link>
          <!-- <img class="ap-nav-logo" src="~common/images/logo.png" alt="APERA" /> -->
        </div>
        <template v-for="(item, index) in navList">
          <el-menu-item
            v-if="item.onlyManager ? user && user.userType == 'manager' : true"
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
          <el-button slot="append" icon="el-icon-search" @click="onSearchClick"></el-button>
        </el-autocomplete>
        <div class="ap-nav-icon__group">
          <el-dropdown class="user">
            <span class="el-dropdown-link">
              <i class="ap-nav-icon el-icon-user-solid"></i>
            </span>
            <el-dropdown-menu slot="dropdown" v-if="!user">
              <el-dropdown-item @click.native="onUserClick('login')">Log In</el-dropdown-item>
              <el-dropdown-item @click.native="onUserClick('register')">Register</el-dropdown-item>
            </el-dropdown-menu>
            <el-dropdown-menu slot="dropdown" v-else>
              <el-dropdown-item @click.native="$router.push('account')"
                >My Account</el-dropdown-item
              >
              <el-dropdown-item @click.native="onLogoutClick()">Log Out</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-popover placement="bottom-end" width="500" trigger="click">
            <ap-cart></ap-cart>
            <i slot="reference" class="ap-nav-icon el-icon-shopping-cart-2"></i>
          </el-popover>
        </div>
      </el-menu>
    </template>
    <template v-else>
      <div class="ap-title_phone">
        <i @click="toggleMenu" class="ap-icon el-icon-menu"></i>
        <div class="ap-nav-logo__container">
          <router-link to="/">
            <div class="logo-container">
              <img class="logo-image" :src="logoImage" alt="GATUN" />
            </div>
          </router-link>
          <!-- <img class="ap-nav-logo" src="~common/images/logo.png" alt="APERA" /> -->
        </div>

        <div class="ap-nav-icon__group">
          <el-dropdown class="user">
            <span class="el-dropdown-link">
              <i class="ap-nav-icon el-icon-user-solid"></i>
            </span>
            <el-dropdown-menu slot="dropdown" v-if="!user">
              <el-dropdown-item @click.native="onUserClick('login')">Log In</el-dropdown-item>
              <el-dropdown-item @click.native="onUserClick('register')">Register</el-dropdown-item>
            </el-dropdown-menu>
            <el-dropdown-menu slot="dropdown" v-else>
              <el-dropdown-item @click.native="$router.push('account')"
                >My Account</el-dropdown-item
              >
              <el-dropdown-item @click.native="onLogoutClick()">Log Out</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-popover
            placement="bottom-end"
            :width="isPhoneSize ? screenWidth - 20 : 500"
            trigger="click"
          >
            <ap-cart></ap-cart>
            <i slot="reference" class="ap-nav-icon el-icon-shopping-cart-2"></i>
          </el-popover>
        </div>
      </div>
      <el-collapse-transition>
        <el-menu
          v-show="showMenu"
          class="ap-nav_phone"
          :default-active="activeIndex"
          @select="handleNavSelect"
        >
          <el-autocomplete
            class="ap-nav-search"
            placeholder="Please enter keyword"
            v-model="search"
            :fetch-suggestions="querySearch"
            :trigger-on-focus="false"
          >
            <el-button slot="append" icon="el-icon-search" @click="onSearchClick"></el-button>
          </el-autocomplete>

          <template v-for="(item, index) in navList">
            <el-menu-item
              v-if="item.onlyManager ? user && user.userType == 'manager' : true"
              :key="index"
              :index="index.toString()"
            >
              {{ item.title }}
            </el-menu-item>
          </template>
        </el-menu>
      </el-collapse-transition>
    </template>
    <ap-login ref="loginDialog" :mode="loginMode"></ap-login>
  </div>
</template>
<script>
import logoImage from "common/images/header_logo.png";
import { mapGetters, mapActions } from "vuex";
import headerNavConfig from "common/config/header_nav_config";
import LoginDialog from "views/Login";
import Cart from "components/Cart";
export default {
  data() {
    return {
      loginMode: "login",
      search: "",
      navList: headerNavConfig,
      activeIndex: "",
      showMenu: false,
      logoImage
    };
  },

  computed: {
    ...mapGetters(["productList", "user", "isPhoneSize", "screenWidth"])
  },

  watch: {
    "$route.fullPath": {
      immediate: true,
      handler(path) {
        if (path == "/manage") {
          if (!this.user || this.user.userType !== "manager") {
            this.$router.push("/");
          }
        } else if (path == "/account") {
          if (!this.user) {
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

      if (this.isPhoneSize) {
        this.showMenu = false;
      }
    },

    querySearch(queryString, cb) {
      const result = [];
      this.productList.forEach(item => {
        const priority = item.productName.toLowerCase().indexOf(queryString.toLowerCase());
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
          type: "warning",
          showClose: true
        });
      }
    },

    onUserClick(type) {
      this.loginMode = type;
      this.$refs.loginDialog.dialogVisible = true;
    },

    onLogoutClick() {
      this.logout();
      this.$router.push("home");
    },

    toggleMenu() {
      this.showMenu = !this.showMenu;
    },

    ...mapActions(["logout"])
  },

  components: {
    "ap-login": LoginDialog,
    "ap-cart": Cart
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

  .ap-title_phone {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 10px;

    .ap-icon {
      font-size: 1.5em;
      margin-right: 10px;
    }
  }

  .ap-nav_phone {
    width: 100% !important;
    .ap-nav-search {
      width: 100%;
      max-width: none;
      margin: 20px 0px;
    }
  }

  .logo-container {
    height: 60px;
    .logo-image {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }
}
</style>
