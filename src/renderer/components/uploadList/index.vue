<template>
  <div id="photo-view">
    <empty-page v-if="!uploadList[0]" content="没有上传任务"></empty-page>
    <el-row v-if="uploadList[0]">
      <el-col :span="8" v-for="(item,index) in uploadList" :key="index">
        <div class="photo-grid" @mouseenter="mouseOver(index)" @mouseleave="mouseOver(-1)">
          <div class="photo-hover" v-if="hoverIndex===index&&item.finished">
            <div class="copy-link" @click="handleCopy(index)">
              <span class="icon-copy"></span>
            </div>
          </div>
          <div
            class="photo-waiting"
            v-if="item.waiting&&!item.finished&&!item.failed&&!item.uploading"
          >
            <div>
              <span class="icon-waiting"></span>
              <p>等待上传</p>
            </div>
          </div>
          <div class="photo-loading" v-if="item.uploading&&!item.failed&&!item.finished">
            <div>
              <span class="icon-uploading"></span>
              <p>正在上传</p>
            </div>
          </div>
          <div class="photo-failed" v-if="item.failed">
            <div>
              <span class="icon-close"></span>
              <p>上传失败</p>
            </div>
          </div>
          <img v-bind:src="item.url" class="photo" alt />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import EmptyPage from "../emptyPage";
import axios from "axios";
const copy = require("copy-text-to-clipboard");

export default {
  data() {
    return {
      hoverIndex: -1
    };
  },
  components: {
    EmptyPage
  },
  computed: {
    ...mapGetters("app", ["uploadList"])
  },
  methods: {
    ...mapActions("app", {
      setLoginDialog: "setLoginDialog"
    }),
    mouseOver(index) {
      this.hoverIndex = index;
    },
    handleCopy(index) {
      copy(this.uploadList[index].link);
      this.$message.success("复制到剪切板");
    }
  },
  mounted() {
    console.log(this.uploadList, "uploadList");
  }
};
</script>

<style lang="scss">
#photo-view {
  width: 100%;
  margin-bottom: 20px;
  .photo-grid {
    cursor: pointer;
    position: relative;
    width: 200px;
    height: 123px;
    opacity: 1;
    border-radius: 5px;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    box-shadow: 0 0 8px rgba($color: #000000, $alpha: 0.1);
    .photo {
      height: 100%;
    }
    .photo-loading {
      background: rgba(5, 176, 138, 0.55);
    }
    .photo-failed {
      background-color: rgba(226, 0, 0, 0.5);
    }
    .photo-waiting {
      background-color: rgba(0, 0, 0, 0.5);
    }
    .photo-loading,
    .photo-waiting,
    .photo-failed {
      border-radius: 5px;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0px;
      right: 0px;
      font-size: 18px;
      font-weight: 500;
      line-height: 34px;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon-waiting,
      .icon-loading,
      .icon-close {
        font-size: 25px;
      }
    }
    .photo-hover {
      position: absolute;
      width: 50px;
      height: 100%;
      top: 0px;
      right: 0px;
      background: rgba(0, 200, 157, 0.67);
      /* display: flex; */
      /* justify-content: center; */
      /* align-items: stretch; */

      color: white;
      border-radius: 0px 5px 5px 0px;
      .copy-link {
        width: 100%;
        opacity: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        .icon-copy {
          font-size: 20px;
          line-height: 123px;
        }
        .icon-copy:hover {
          transform: scale(1.2);
        }
      }
    }
  }
}
</style>
