<template>
  <el-dialog title="使用 SM.MS 账号登录" :visible.sync="isNewAlbum" :show-close="false">
    <el-form :model="form">
      <el-form-item label="相册名称" :label-width="formLabelWidth">
        <el-input v-model="form.albumName" autocomplete="off" placeholder="请输入相册名称"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleCreate" :loading="loading">创建</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      formLabelWidth: "60px",
      loading: false,
      isShow: true,
      form: {
        albumName: ""
      }
    };
  },
  mounted() {
    console.log(this.isNewAlbum, "newalbum");
  },
  computed: {
    ...mapGetters("app", ["isNewAlbum"])
  },

  methods: {
    ...mapActions("app", {
      setNewAlbum: "setNewAlbum"
    }),
    handleClose() {
      // console.log(this.isNewAlbum);
      this.setNewAlbum(false);
    },
    handleCreate() {
      console.log("create");
    }
  }
};
</script>

<style lang="scss" scoped>
#new-album-dialog {
}
</style>