<template>
  <div ref="app" id="app">
    <login-dialog></login-dialog>
    <photo-display></photo-display>
    <el-row>
      <el-col :span="24">
        <upload-photo></upload-photo>
      </el-col>
      <el-col :span="24">
        <tab-control></tab-control>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UploadPhoto from "@/components/uploadPhoto";
import TabControl from "@/components/tabControl";
import LoginDialog from "@/components/loginDialog";
import PhotoDisplay from "@/components/photoDisplay";
export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    UploadPhoto,
    TabControl,
    LoginDialog,
    PhotoDisplay
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