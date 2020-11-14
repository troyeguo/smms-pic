<template>
  <div id="setting-page">
    <el-row>
      <span class="setting-title">选择图床</span>
    </el-row>
    <el-row :gutter="20">
      <el-row :span="4" :offset="2">
        <div class="library-container">
          <div class="libray-icon">
            <img src="../../assets/sm.png" alt style="height:100%" />
          </div>
          <span class="library-title">SM.MS</span>
          <el-button
            type="primary"
            @click="handleLogin('SM.MS')"
            size="medium"
            round
          >{{smmsToken?library==="SM.MS"?"解绑":"选择":"绑定"}}</el-button>
        </div>
      </el-row>
      <el-row :span="4" :offset="4">
        <div class="library-container">
          <div class="libray-icon">
            <img src="../../assets/imgur.png" alt style="height:100%" />
          </div>
          <span class="library-title">Imgur</span>
          <el-button
            type="primary"
            @click="handleLogin('Imgur')"
            size="medium"
            round
          >{{smmsToken?library==="SM.MS"?"解绑":"选择":"绑定"}}</el-button>
        </div>
      </el-row>
      <el-row :span="4" :offset="4">
        <div class="library-container">
          <div class="libray-icon">
            <img src="../../assets/github.png" alt style="height:100%" />
          </div>
          <span class="library-title">Github</span>
          <el-button
            type="primary"
            @click="handleLogin('Github')"
            size="medium"
            round
          >{{smmsToken?library==="SM.MS"?"解绑":"选择":"绑定"}}</el-button>
        </div>
      </el-row>
      <el-row :span="4" :offset="4">
        <div class="library-container">
          <div class="libray-icon">
            <img src="../../assets/gitee.png" alt style="height:100%" />
          </div>
          <span class="library-title">Gitee</span>
          <el-button
            type="primary"
            @click="handleLogin('Gitee')"
            size="medium"
            round
          >{{smmsToken?library==="SM.MS"?"解绑":"选择":"绑定"}}</el-button>
        </div>
      </el-row>
    </el-row>

    <el-row>
      <span class="setting-title">设置代理</span>
    </el-row>
    <el-row>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="协议" size="medium">
          <el-radio v-model="formInline.protocal" label="1" size="medium">http</el-radio>
          <el-radio v-model="formInline.protocal" label="2" size="medium">socks</el-radio>
        </el-form-item>

        <el-form-item label="地址" size="medium">
          <el-input v-model="formInline.url" placeholder="127.0.0.1"></el-input>
        </el-form-item>
        <el-form-item label="端口" size="medium">
          <el-input-number
            v-model="formInline.port"
            @change="handleChange"
            :min="1"
            :max="10"
            label="端口"
            placeholder="1080"
          ></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" size="medium">保存</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <span class="setting-title" style="margin-right:20px">自动复制图片地址</span>
      <el-switch v-model="value" active-color="#00c89d" @change="onSwitch"></el-switch>
    </el-row>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
// 加载数据库JSON文件
const adapter = new FileSync("db.json");
const db = low(adapter);
export default {
  data() {
    return {
      value: db.get("isCopy").value() === "yes" ? true : false,
      formInline: {
        url: "",
        port: "",
        protocal: null
      },
      library: db.get("library").value,
      smmsToken: db.get("smmsToken").value
    };
  },
  computed: {
    ...mapGetters("app", ["isShowLogin", "isAuthed", "uploadList"])
  },
  methods: {
    ...mapActions("app", {
      setLoginDialog: "setLoginDialog",
      setLoginLibrary: "setLoginLibrary",
      setUploadList: "setUploadList",
      fetchImages: "fetchImages",
      setActiveTab: "setActiveTab"
    }),
    handleChange(value) {
      console.log(value);
    },
    handleLogin(library) {
      console.log(library);
      this.setLoginLibrary(library);
      this.setLoginDialog(true);
    },
    onSubmit() {
      console.log("sumbit");
    },
    onSwitch(value) {
      console.log(value, "value");
      db.set("isCopy", value ? "yes" : "no").write();
    }
  }
};
</script>

<style lang="scss" scoped>
#setting-page {
  margin-left: 10px;
  .el-row {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
  }
  .el-input {
    width: 150px;
  }
  .el-radio {
    width: 50px;
    margin-right: 10px;
  }
  .el-input-number {
    width: 130px;
  }
  .el-button {
    font-family: "Noto Sans SC", -apple-system, BlinkMacSystemFont, Segoe UI,
      Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif !important;
    background-color: #00c89d;
    border: none;
  }
  .copy-link {
    display: flex;
    justify-content: center;
  }
  .setting-title {
    font-size: 16px;
    font-weight: bold;
  }
  .library-container {
    display: flex;
    justify-content: space-between;
    .libray-icon {
      display: inline-block;
      height: 25px;
      width: 30px;
      margin-left: 20px;
      margin-top: 5px;
    }
    .library-title {
      display: inline-block;
      font-size: 16px;
      line-height: 30px;
      color: #353535;
      margin-right: 10px;
    }
    .library-action {
      display: inline-block;
      width: 84px;
      height: 30px;
      background: #00c89d;
      opacity: 1;
      border-radius: 15px;
      font-size: 14px;
      line-height: 30px;
      color: #ffffff;
      opacity: 1;
      text-align: center;
      margin-right: 20px;
      cursor: pointer;
    }
  }
}
</style>