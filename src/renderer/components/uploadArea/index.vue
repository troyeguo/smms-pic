<template>
  <div id="upload-container">
    <div id="upload-area" @dragend="handleDrag">
      <input
        type="file"
        v-if="isShowAuthed || isAuthed"
        id="import-pic-box"
        class="import-book-box"
        name="file"
        accept="image/png, image/jpeg, image/gif, image/jpg, image/bmp"
        multiple="{true}"
        @change="chooseFile"
        ref="inputer"
        title=" "
      />

      <div class="progress-bar" ref="progress"></div>
      <div class="progress-info" v-if="uploadFiles[0]&&(progressWidth!==100)">
        <div>
          <p style="{width:'18px'}">正在上传</p>
          <p>进度：{{this.uploadingTask}}/{{this.uploadFiles.length}}</p>
        </div>
      </div>
      <div
        class="upload-pic"
        v-if="!uploadFiles[0]&&(isShowAuthed || isAuthed)||(progressWidth===100)"
        @dragover="fileDragover"
        @drop="fileDrop"
      >
        <span class="icon-upload"></span>
        <p class="upload-text">拖拽到此处或点击上传</p>
      </div>
      <div class="login-account" v-if="!(isShowAuthed || isAuthed)" @click="handleLogin">
        <span class="icon-account"></span>
        <p class="upload-text">点击绑定 SM.MS 账号</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import _ from "lodash";
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
// 加载数据库JSON文件
const adapter = new FileSync("db.json");
const db = low(adapter);
export default {
  data() {
    return {
      isShowAuthed: db.get("token").value(),
      imageList: [],
      progress: 0,
      uploadFiles: [],
      uploadingTask: 0
    };
  },
  computed: {
    ...mapGetters("app", ["isShowLogin", "isAuthed", "uploadList"]),
    progressWidth: function() {
      if (!this.uploadFiles[0]) {
        return 0;
      }
      if (this.uploadingTask >= this.uploadFiles.length) {
        return 100;
      }
      this.uploadingTask = 0;
      this.uploadFiles.forEach(item => {
        if (item.finished || item.failed) {
          this.uploadingTask++;
        }
      });
      return (this.uploadingTask / this.uploadFiles.length) * 100;
    }
  },
  methods: {
    ...mapActions("app", {
      setLoginDialog: "setLoginDialog",
      setUploadList: "setUploadList",
      fetchImages: "fetchImages",
      setActiveTab: "setActiveTab"
    }),
    fileDragover(e) {
      e.preventDefault();
      console.log("fileDragover");
    },
    fileDrop(e) {
      e.preventDefault();
      console.log("filedrop");
      const files = e.dataTransfer.files; // 获取到第一个上传的文件对象
      this.setActiveTab(1);
      // 通过DOM取文件数据
      this.imageList = files;
      this.handleFile();
    },
    chooseFile(e) {
      e.preventDefault();
      let inputDOM = this.$refs.inputer;
      this.setActiveTab(1);
      // 通过DOM取文件数据
      const files = inputDOM.files;
      this.imageList = files;
      this.handleFile();
    },
    handleDrag(event) {
      event.preventDefault();
      console.log("drag stop");
      return false;
    },
    handleProgress() {
      this.$refs.progress.setAttribute("style", `width:${this.progressWidth}%`);
      if (this.progressWidth === 100) {
        this.$refs.progress.setAttribute("style", `display:none`);
      }
    },
    handleLogin() {
      this.setLoginDialog(true);
    },
    async handleFile() {
      for (let i = 0; i < this.imageList.length; i++) {
        let size = Math.floor(this.imageList[i].size / 1024);
        if (size > 5 * 1024 * 1024) {
          this.$message("请选择5M以内的图片！");
          return false;
        }
        this.uploadFiles.push({
          url: window.webkitURL.createObjectURL(this.imageList[i]),
          finished: false,
          uploading: false,
          failed: false,
          waiting: true,
          link: null
        });
        this.setUploadList(_.cloneDeep(this.uploadFiles));
      }
      //二次上传时从上一次上传的终点开始传
      for (
        let i = this.uploadFiles.length - this.imageList.length;
        i < this.uploadFiles.length;
        i++
      ) {
        let formData = new FormData();
        this.uploadFiles[i].waiting = false;
        this.uploadFiles[i].uploading = true;
        this.setUploadList(_.cloneDeep(this.uploadFiles));
        formData.append(
          "file",
          this.imageList[i - (this.uploadFiles.length - this.imageList.length)]
        );
        await axios
          .post("http://localhost:3366/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(data => {
            this.uploadFiles[i].finished = true;
            this.handleProgress();
            this.uploadFiles[i].link = data.data.url;
            this.setUploadList(_.cloneDeep(this.uploadFiles));
            this.$message.success("上传成功");
          })
          .catch(err => {
            this.uploadFiles[i].failed = true;
            this.handleProgress();
            this.$message.error("图片上传失败，网络出现故障或图片重复上传");
            this.setUploadList(_.cloneDeep(this.uploadFiles));
          });
      }
      this.fetchImages();
    }
  }
};
</script>

<style lang="scss">
#upload-area input[type="file"] {
  text-indent: -999em;
  cursor: pointer;
  opacity: 0;
  outline: none;
  width: 100%;
  height: 100%;
  border-radius: 23px;
  font-size: 0px;
  position: absolute;
  left: 0px;
  top: 0px;
}

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
  cursor: pointer;
  position: relative;
  color: white;
  .progress-bar {
    height: 100%;
    border-radius: 23px 0px 0px 23px;
    font-size: 0px;
    position: absolute;
    left: 0px;
    top: 0px;
    background: rgba(255, 255, 255, 0.24);
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.36);
  }
  .progress-info {
    font-size: 20px;
    font-weight: 500;
    line-height: 33px;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
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
