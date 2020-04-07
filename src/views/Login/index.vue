<template>
  <el-dialog
    class="ap-dialog"
    :title="mode == 'login' ? 'Log In' : 'Register'"
    :visible.sync="dialogVisible"
    width="1100px"
  >
    <div class="dialog-inner">
      <el-form :model="formData" :rules="formRules" ref="editLoginForm">
        <!-- Name -->
        <el-form-item label="Email" :label-width="formLabelWidth" prop="userEmail">
          <el-input v-model="formData.userEmail" placeholder="Please enter email"></el-input>
        </el-form-item>

        <el-form-item label="Password" :label-width="formLabelWidth" prop="userPassword">
          <el-input
            v-model="formData.userPassword"
            show-password
            placeholder="Please enter password"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="mode == 'login'" class="form-item-right">
          <el-checkbox v-model="remember">Remember Me</el-checkbox>
        </el-form-item>
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
import { mapActions } from "vuex";
import userApi from "api/user";
import { validatePassword, validateEmail } from "common/utils/validateRules";
export default {
  props: {
    mode: {
      default: "login",
    },
  },
  data() {
    return {
      remember: false,
      formData: {
        userEmail: "",
        userPassword: "",
      },
      dialogVisible: false,
      formRules: {
        userEmail: [
          {
            required: true,
            message: "Please enter a valid email",
            trigger: "blur",
          },
          {
            validator: validateEmail,
            trigger: "blur",
          },
        ],
        userPassword: [
          {
            required: true,
            message: "Please enter a valid password",
            trigger: "blur",
          },
          {
            validator: validatePassword,
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "100px",
    };
  },

  methods: {
    onSubmitClick() {
      this.$refs.editLoginForm.validate((valid) => {
        if (valid) {
          userApi.login(this.formData).then((res) => {
            this.dialogVisible = false;
            if (res.success) {
              this.$message({
                type: "success",
                message: "Login Success",
              });
              this.setUser({
                userEmail: this.formData.userEmail,
                isManager: res.isManager ? res.isManager : false,
              });
            } else {
              this.formData = {
                userEmail: "",
                userPassword: "",
              };
            }
          });
        }
      });
    },

    onRegisterClick() {
      this.$refs.editLoginForm.validate((valid) => {
        if (valid) {
          userApi.addUser(this.formData).then((res) => {
            this.dialogVisible = false;
            if (res.success) {
              this.$message({
                type: "success",
                message: "Register Success",
              });
            }
          });
        }
      });
    },

    ...mapActions(["setUser"]),
  },
};
</script>

<style lang="less" scoped>
.ap-dialog {
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
