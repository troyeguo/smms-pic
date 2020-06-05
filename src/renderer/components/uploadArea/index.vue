<template>
  <div id="upload-area">
    <div class="upload-pic" v-if="isShowAuthed||isAuthed">
      <span class="icon-upload"></span>
      <p class="upload-text">拖拽到此处或点击上传</p>
    </div>
    <div class="login-account" v-if="!(isShowAuthed||isAuthed)" @click="handleLogin">
      <span class="icon-account"></span>
      <p class="upload-text">点击绑定 SM.MS 账号</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      isShowAuthed: localStorage.getItem("isAuthed") === "yes"
    };
  },
  computed: {
    ...mapGetters("app", ["isShowLogin", "isAuthed"])
  },
  methods: {
    ...mapActions("app", {
      setLoginDialog: "setLoginDialog"
    }),
    handleLogin() {
      this.setLoginDialog(true);
    }
  }
};
</script>

<style lang="scss" scoped>
#upload-area {
  width: calc(100vw - 60px);
  height: 135px;
  background: rgba(0, 0, 0, 1);
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.36);
  opacity: 0.81;
  border-radius: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 20px;
  z-index: -1;
  cursor: pointer;
  .login-account,
  .upload-pic {
    .icon-account,
    .icon-upload {
      color: white;
      font-size: 40px;
    }
    .upload-text {
      font-size: 22px;
      font-weight: 500;
      line-height: 37px;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
    }
  }
}
</style>