<template>
  <el-dialog title="绑定图床账号" :visible.sync="isShowLogin" :show-close="false">
    <el-form :model="form">
      <el-form-item label="图床" :label-width="formLabelWidth">
        <el-select v-model="loginLibrary" placeholder="请选择" @change="handleChangeLibrary">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off" :placeholder="userPlaceholder"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input
          v-model="form.password"
          autocomplete="off"
          :placeholder="passPlaceholder"
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
import axios from "axios";
export default {
  data() {
    return {
      formLabelWidth: "60px",
      loading: false,
      form: {
        username: "",
        password: ""
      },
      options: [
        {
          value: "SM.MS",
          label: "SM.MS"
        },
        {
          value: "Imgur",
          label: "Imgur",
          disabled: true
        },
        {
          value: "Github",
          label: "Github",
          disabled: true
        },
        {
          value: "Gitee",
          label: "Gitee",
          disabled: true
        }
      ],
      value: ""
    };
  },
  computed: {
    ...mapGetters("app", ["isShowLogin", "loginLibrary", "isAuthed"]),
    userPlaceholder: function() {
      return "请输入" + this.loginLibrary + "用户名";
    },
    passPlaceholder: function() {
      return "请输入" + this.loginLibrary + "密码";
    }
  },
  watch: {
    isAuthed(newValue, oldValue) {
      if (newValue === true) {
        this.setLoginDialog(false);
        this.loading = false;
      }
    }
  },
  methods: {
    ...mapActions("app", {
      setLoginDialog: "setLoginDialog",
      setLoginLibrary: "setLoginLibrary",
      setAuth: "setAuth",
      fetchToken: "fetchToken",
      fetchImages: "fetchImages"
    }),
    handleClose() {
      this.setLoginDialog(false);
    },
    handleLogin() {
      this.loading = true;
      this.fetchToken({
        username: this.form.username,
        password: this.form.password,
        library: this.loginLibrary
      });
    },
    handleChangeLibrary(value) {
      this.setLoginLibrary(value);
    }
  },
};
</script>

<style lang="scss" scoped>
.el-dialog {
  height: 400px;
}
</style>
