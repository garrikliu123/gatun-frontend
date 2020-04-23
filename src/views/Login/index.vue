<template>
  <el-dialog
    class="ap-dialog"
    :title="mode == 'login' ? 'Log In' : 'Register'"
    :visible.sync="dialogVisible"
    :width="isPhoneSize ? '100%' : '1100px'"
  >
    <div class="dialog-inner">
      <el-form :model="formData" :rules="formRules" ref="editLoginForm">
        <template v-if="mode == 'login'">
          <!-- Name -->
          <el-form-item label="Email" :label-width="formLabelWidth" prop="userEmail">
            <el-input v-model="formData.userEmail" placeholder="Please enter email"></el-input>
          </el-form-item>

          <!-- Password -->
          <el-form-item label="Password" :label-width="formLabelWidth" prop="userPassword">
            <el-input
              v-model="formData.userPassword"
              show-password
              placeholder="Please enter password"
            ></el-input>
          </el-form-item>
        </template>
        <template v-else>
          <!-- Name -->
          <el-form-item label="First Name" :label-width="formLabelWidth" prop="userFirstName">
            <el-input
              v-model="formData.userFirstName"
              placeholder="Please enter first name"
            ></el-input>
          </el-form-item>

          <el-form-item label="Last Name" :label-width="formLabelWidth" prop="userLastName">
            <el-input
              v-model="formData.userLastName"
              placeholder="Please enter last name"
            ></el-input>
          </el-form-item>

          <!-- Email -->
          <el-form-item label="Email" :label-width="formLabelWidth" prop="userEmail">
            <el-input v-model="formData.userEmail" placeholder="Please enter email"></el-input>
          </el-form-item>

          <!-- Password -->
          <el-form-item label="Password" :label-width="formLabelWidth" prop="userPassword">
            <el-input
              v-model="formData.userPassword"
              show-password
              placeholder="Please enter password"
            ></el-input>
          </el-form-item>
        </template>
      </el-form>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button v-if="mode == 'login'" type="primary" @click="onSubmitClick">Log In</el-button>
      <el-button v-else type="primary" @click="onRegisterClick">Register</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { v4 as uuidv4 } from "uuid";
import { mapActions } from "vuex";
import userApi from "api/user";
import { validatePassword, validateEmail, validateName } from "common/utils/validateRules";
export default {
  props: {
    mode: {
      default: "login"
    }
  },
  data() {
    return {
      remember: false,
      formData: {
        userFirstName: "",
        userLastName: "",
        userEmail: "",
        userPassword: ""
      },
      dialogVisible: false,
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
        userEmail: [
          {
            required: true,
            message: "Please enter a valid email",
            trigger: "blur"
          },
          {
            validator: validateEmail,
            trigger: "blur"
          }
        ],
        userPassword: [
          {
            required: true,
            message: "Please enter a valid password",
            trigger: "blur"
          },
          {
            validator: validatePassword,
            trigger: "blur"
          }
        ]
      },
      formLabelWidth: "100px"
    };
  },

  computed: {
    ...mapGetters(["isPhoneSize"])
  },

  methods: {
    onSubmitClick() {
      this.$refs.editLoginForm.validate(valid => {
        if (valid) {
          userApi.login(this.formData).then(res => {
            this.dialogVisible = false;
            if (res.success) {
              this.$message({
                type: "success",
                message: "Login Success",
                showClose: true
              });
              this.setUser(res.user);
              this.getOrderHistory(res.user.userId);
            } else {
              this.formData = {
                userEmail: "",
                userPassword: ""
              };
            }
          });
        }
      });
    },

    onRegisterClick() {
      this.$refs.editLoginForm.validate(valid => {
        if (valid) {
          this.formData.userId = uuidv4();
          userApi.addUser(this.formData).then(res => {
            this.dialogVisible = false;
            if (res.success) {
              this.$message({
                type: "success",
                message: "Register Success",
                showClose: true
              });
            }
          });
        }
      });
    },

    ...mapActions(["setUser", "getOrderHistory"])
  }
};
</script>

<style lang="less" scoped>
.ap-dialog {
  margin: 0 5px;
  overflow-x: visible;
  .dialog-inner {
    max-height: 60vh;
    overflow-x: visible;
    overflow-y: auto;
    padding: 0 20px;
  }

  .form-item-right {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
