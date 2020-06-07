<template>
  <div ref="app" id="app">
    <login-dialog></login-dialog>
    <photo-display></photo-display>
    <el-row>
      <el-col :span="24">
        <frame />
      </el-col>
      <el-col :span="24">
        <upload-area></upload-area>
      </el-col>
      <el-col :span="24">
        <gallery-area></gallery-area>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UploadArea from "@/components/uploadArea";
import GalleryArea from "@/components/galleryArea";
import LoginDialog from "@/components/loginDialog";
import PhotoDisplay from "@/components/photoDisplay";
import Frame from "@/components/frame";
export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    UploadArea,
    GalleryArea,
    LoginDialog,
    PhotoDisplay,
    Frame
  }
};
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  justify-content: center;
  .test {
    position: absolute;
    left: 0px;
    top: 0px;
  }
}
</style>