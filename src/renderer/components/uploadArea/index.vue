<template>
  <div id="upload-container">
    <div id="upload-area">
      <input
        type="file"
        id="import-pic-box"
        class="import-book-box"
        name="file"
        accept="image/png, image/jpeg, image/gif, image/jpg, image/bmp"
        multiple="{true}"
        @change="handleFile"
        ref="inputer"
        title=" "
      />

      <div class="upload-pic" v-if="isShowAuthed || isAuthed">
        <span class="icon-upload"></span>
        <p class="upload-text">拖拽到此处或点击上传</p>
        <p class="upload-info">建议图片格式为：JPG/JPEG/BMP/PNG/GIF，大小不超过5M，最多可同时上传10张</p>
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
export default {
  data() {
    return {
      isShowAuthed: localStorage.getItem("isAuthed") === "yes",
      imageList: []
    };
  },
  computed: {
    ...mapGetters("app", ["isShowLogin", "isAuthed", "uploadList"])
  },
  methods: {
    ...mapActions("app", {
      setLoginDialog: "setLoginDialog",
      setUploadList: "setUploadList",
      fetchImages: "fetchImages",
      setActiveTab: "setActiveTab"
    }),
    handleLogin() {
      this.setLoginDialog(true);
    },
    async handleFile(event) {
      let inputDOM = this.$refs.inputer;
      let uploadFiles = [];
      this.setActiveTab(1);
      // 通过DOM取文件数据
      this.imageList = inputDOM.files;
      console.log(this.imageList[0], "this.imageList");
      for (let i = 0; i < this.imageList.length; i++) {
        let formData = new FormData();
        let size = Math.floor(this.imageList[i].size / 1024);
        if (size > 5 * 1024 * 1024) {
          this.$message("请选择5M以内的图片！");
          return false;
        }
        uploadFiles.push({
          url: window.webkitURL.createObjectURL(this.imageList[i]),
          finished: false,
          uploading: true,
          failed: false,
          link: null
        });
        this.setUploadList(_.cloneDeep(uploadFiles));
        formData.append("file", this.imageList[i]);
        const { data } = await axios.post(
          "http://localhost:8000/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );
        if (!data.url) {
          uploadFiles[i].failed = true;
          this.$message.error("图片上传失败，网络出现故障或图片重复上传");
          this.setUploadList(_.cloneDeep(uploadFiles));
          continue;
        }
        setTimeout(() => {
          uploadFiles[i].finished = true;
          uploadFiles[i].link = data.url;
          this.setUploadList(_.cloneDeep(uploadFiles));
          this.$message.success("上传成功");
        }, 2000);
      }
      this.fetchImages();
      // this.formData.append("file", this.imageList[0]);
      // this.formData.file = this.imageList[0];
      // console.log(this.imageList, this.urlList, this.formData);
      // axios
      //   .post("http://localhost:8000/upload", this.formData, {
      //     headers: {
      //       "Content-Type": "multipart/form-data"
      //     }
      //   })
      //   .then(res => {
      //     console.log(res);
      //     this.$message.success("上传成功");
      //   })
      //   .catch(error => {
      //     console.log(error);
      //     this.$message.error("上传失败");
      //   });
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
  border-radius: 50%;
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
  .login-account,
  .upload-pic {
    .icon-account,
    .icon-upload {
      color: white;
      font-size: 40px;
    }
    .upload-text,
    .upload-info {
      font-size: 22px;
      font-weight: 500;
      line-height: 37px;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
    }
    .upload-info {
      font-size: 12px;
      line-height: 15px;
      color: rgba(255, 255, 255, 0.6);
    }
  }
}
</style>
