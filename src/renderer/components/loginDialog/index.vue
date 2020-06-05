<template>
  <el-dialog title="使用 SM.MS 账号登录" :visible.sync="isShowLogin" :show-close="false">
    <el-form :model="form">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off" placeholder="请输入 SM.MS 用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input
          v-model="form.password"
          autocomplete="off"
          placeholder="请输入 SM.MS 密码"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleLogin" :loading="loading">登 录</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getToken } from "../../apis/token";
import { Message } from "element-ui";
import axios from "axios";
export default {
  data() {
    return {
      formLabelWidth: "60px",
      loading: false,
      form: {
        name: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters("app", ["isShowLogin"])
  },
  methods: {
    ...mapActions("app", {
      setLoginDialog: "setLoginDialog",
      setAuth: "setAuth",
      fetchToken: "fetchToken",
      fetchImages: "fetchImages"
    }),
    handleClose() {
      this.setLoginDialog(false);
    },
    async handleLogin() {
      this.loading = true;
      console.log(this.form.name, this.form.password);
      await this.fetchToken({
        username: this.form.username,
        password: this.form.password
      });
      await this.fetchImages();
      // await axios
      //   .get("http://localhost:8000/token", {
      //     params: {
      //       username: this.form.username,
      //       password: this.form.password
      //     }
      //   })
      //   .then(res => {
      //     console.log(res);
      //     console.log("登录成功");
      //     Message.success("登录成功");
      //     localStorage.setItem("isAuthed", "yes");
      //     this.setAuth(true);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //     Message.error("登录失败");
      //     console.log("登录失败");
      //   });
      this.setLoginDialog(false);
      this.loading = false;
    }
  }
};
</script>

<style>
.el-dialog {
}
</style>