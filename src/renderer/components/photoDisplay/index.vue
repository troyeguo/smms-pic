<template>
  <div id="photo-display" v-if="isDisplay">
    <div class="photo-mask"></div>
    <transition name="el-zoom-in-bottom">
      <div class="photo-container">
        <span class="icon-close" @click="handleClose"></span>
        <el-row>
          <el-col :span="24">
            <div class="photo-show">
              <span class="icon-next" @click="handlePrev"></span>
              <div class="photo-area">
                <img
                  v-bind:src="images[photoIndex].url"
                  alt
                  class="photo"
                  :style="images[photoIndex].width/images[photoIndex].height>608/339?{'width':'100%'}:{'height':'100%'}"
                />
              </div>
              <span class="icon-next icon-prev" @click="handleNext"></span>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="photo-operation">
              <div class="operation-button" @click="handleCopy(photoIndex)">
                <span class="icon-copy"></span>
                <span>复制链接</span>
              </div>
              <div class="operation-button" @click="handleDelete(photoIndex)">
                <span class="icon-delete"></span>
                <span>删除图片</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
const copy = require("copy-text-to-clipboard");

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters("app", ["images", "photoIndex", "isDisplay"])
  },
  methods: {
    ...mapActions("app", {
      setPhotoIndex: "setPhotoIndex",
      setDisplay: "setDisplay",
      fetchImages: "fetchImages",
      deleteImage: "deleteImage"
    }),
    handleClose() {
      this.setDisplay(false);
    },
    handlePrev() {
      if (this.photoIndex === 0) {
        this.$message.success("没有上一张啦！");
        return;
      }
      this.setPhotoIndex(this.photoIndex - 1);
    },
    handleNext() {
      if (this.photoIndex === this.images.length - 1) {
        this.$message.success("没有下一张啦！");
        return;
      }
      this.setPhotoIndex(this.photoIndex + 1);
    },
    handleCopy(index) {
      copy(this.images[index].url);
      this.$message.success("复制到剪切板");
    },
    handleDelete(index) {
      this.loading = true;
      this.$confirm("此操作将永久删除该图片, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          this.deleteImage(index);
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.photo-display {
  z-index: 20;
}
.icon-close {
  float: right;
  font-size: 25px;
  position: relative;
  top: 22px;
  right: 22px;
  cursor: pointer;
  z-index: 15;
}
.photo-mask {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.photo-container {
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100vw;
  height: 424px;
  background: rgba(0, 200, 157, 1);
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 30px 30px 0px 0px;
  z-index: 10;
  color: white;
  .photo-show {
    height: 339px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100vw;
    .photo-area {
      width: 608px;
      height: 339px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .icon-prev {
      transform: rotate(180deg);
    }
    .icon-prev,
    .icon-next {
      font-size: 50px;
      opacity: 0.8;
      cursor: pointer;
    }
  }
  .photo-operation {
    display: flex;
    justify-content: center;
    .operation-button {
      width: 131px;
      height: 40px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 25px;
      margin: 14px 6px;
      text-align: center;
      font-size: 15px;
      line-height: 40px;
      cursor: pointer;
    }
  }
}
</style>