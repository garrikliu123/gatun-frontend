<template>
  <div class="my-info">
    <div class="edit-info-form">
      <h2>Edit Account Information</h2>
      <el-form class="account-form" :model="formData" :rules="formRules" ref="editInfoForm">
        <!-- Name -->
        <el-form-item label="First Name" :label-width="formLabelWidth" prop="userFirstName">
          <el-input
            v-model="formData.userFirstName"
            placeholder="Please enter first name"
          ></el-input>
        </el-form-item>

        <el-form-item label="Last Name" :label-width="formLabelWidth" prop="userLastName">
          <el-input v-model="formData.userLastName" placeholder="Please enter last name"></el-input>
        </el-form-item>

        <!-- Email -->
        <el-form-item label="Email" :label-width="formLabelWidth">
          <el-input :value="user ? user.userEmail : ''" placeholder="Please enter email"></el-input>
        </el-form-item>

        <el-form-item label="User ID" :label-width="formLabelWidth">
          <el-input :value="user ? user.userId : ''"></el-input>
        </el-form-item>

        <el-form-item class="change-password-item" label="" :label-width="formLabelWidth">
          <el-checkbox
            v-model="changePassword"
            label="Change Password"
            border
            size="medium"
          ></el-checkbox>
        </el-form-item>

        <template v-if="changePassword">
          <!-- Password -->
          <el-form-item
            label="Current Password"
            :label-width="formLabelWidth"
            prop="currentPassword"
          >
            <el-input
              v-model="formData.currentPassword"
              show-password
              placeholder="Please enter password"
            ></el-input>
          </el-form-item>

          <el-form-item label="New Password" :label-width="formLabelWidth" prop="newPassword">
            <el-input
              v-model="formData.newPassword"
              show-password
              placeholder="Please enter password"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="Confirm New Password"
            :label-width="formLabelWidth"
            prop="confirmPassword"
          >
            <el-input
              v-model="formData.confirmPassword"
              show-password
              placeholder="Please enter password"
            ></el-input>
          </el-form-item>
        </template>

        <el-form-item class="form-item-button">
          <el-popconfirm
            title="Do you want to save the edit?"
            @onConfirm="onSaveEdit"
            confirmButtonText="Yes"
            cancelButtonText="Cancel"
          >
            <el-button slot="reference" type="primary">Save Edit</el-button>
          </el-popconfirm>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import userApi from "api/user";
import { validatePassword, validateName } from "common/utils/validateRules";
export default {
  data() {
    return {
      changePassword: false,
      formData: {
        userFirstName: "",
        userLastName: "",
        userEmail: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      },

      formRules: {
        userFirstName: [
          {
            validator: validateName,
            trigger: "blur"
          }
        ],
        userLastName: [
          {
            validator: validateName,
            trigger: "blur"
          }
        ],
        currentPassword: [
          {
            required: true,
            message: "Please enter a valid password",
            trigger: "blur"
          },
          {
            validator: validatePassword,
            trigger: "blur"
          }
        ],
        newPassword: [
          {
            required: true,
            message: "Please enter a valid password",
            trigger: "blur"
          },
          {
            validator: validatePassword,
            trigger: "blur"
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: "Please enter a valid password",
            trigger: "blur"
          },
          {
            validator: validatePassword,
            trigger: "blur"
          },
          {
            validator: this.validateConfirmPassword,
            trigger: "blur"
          }
        ],
        formLabelWidthL: "200px"
      }
    };
  },

  computed: {
    ...mapGetters(["user", "isPhoneSize"])
  },

  watch: {
    user: {
      immediate: true,
      handler(user) {
        if (user && user.userEmail) {
          this.formData.userId = user.userId;
          this.formData.userFirstName = user.userFirstname;
          this.formData.userLastName = user.userLastname;
          this.formData.userEmail = user.userEmail;
        }
      }
    }
  },

  methods: {
    onSaveEdit() {
      this.$refs.editInfoForm.validate(valid => {
        if (valid) {
          if (!this.changePassword) {
            userApi
              .updateUser({
                userId: this.formData.userId,
                userEmail: this.formData.userEmail,
                userFirstname: this.formData.userFirstName,
                userLastname: this.formData.userLastName
              })
              .then(res => {
                if (res.success) {
                  this.$message({
                    type: "success",
                    message: "Edit Account Info Success",
                    showClose: true
                  });
                }
              });
          } else {
            userApi
              .login({
                userEmail: this.formData.userEmail,
                userPassword: this.formData.currentPassword
              })
              .then(res => {
                if (res.success) {
                  userApi
                    .updateUser({
                      userId: this.formData.userId,
                      userEmail: this.formData.userEmail,
                      userPassword: this.formData.newPassword
                    })
                    .then(res => {
                      if (res.success) {
                        this.logout();
                        this.$router.push("home");
                        this.$message({
                          type: "success",
                          message: "Edit Account Info Success",
                          showClose: true
                        });
                      }
                    });
                }
              });
          }
        }
      });
    },

    /* 验证密码 */
    validateConfirmPassword(rule, value, callback) {
      if (value === this.formData.newPassword) {
        callback();
      } else {
        callback("Confirmed Password does not match new password.");
      }
    },

    ...mapActions(["logout"])
  }
};
</script>

<style lang="less">
.my-info {
  display: flex;

  h2 {
    margin-top: 0;
  }

  .change-password-item {
    display: flex;
    justify-content: flex-start;

    margin-top: 40px;
  }

  .edit-info-form {
    flex: 1 1 auto;
  }

  .account-form {
    margin-right: 100px;
  }

  .form-item-button {
    display: flex;
    justify-content: flex-end;
  }
}

.is_phone .my-info .account-form {
  margin: 0px !important;
}

.is_phone .el-form-item {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .el-form-item__content {
    margin-left: 0px !important;
    width: 100%;
  }
}
</style>
