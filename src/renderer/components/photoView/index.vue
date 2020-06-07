<template>
  <div id="photo-view">
    <empty-page content="暂未上传图片" v-if="!(images[0])"></empty-page>
    <div class="photo-area" v-if="images[0]">
      <el-row>
        <el-col :span="8" v-for="(image,index) in images" :key="image.hash">
          <div class="photo-grid" @mouseenter="mouseOver(index)" @mouseleave="mouseOver(-1)">
            <div class="photo-hover" v-if="hoverIndex===index">
              <div class="copy-link" @click="handleCopy(index)">
                <span class="icon-copy"></span>
              </div>
              <div class="delete-photo" @click="handleDelete(index)">
                <span class="icon-delete"></span>
              </div>
            </div>
            <img v-bind:src="image.url" class="photo" alt @click="handleClick(index)" />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import EmptyPage from "../emptyPage/index";
import { getHistory } from "@/apis/image";
import { mapActions, mapGetters } from "vuex";
import { Message, MessageBox } from "element-ui";
import axios from "axios";
const copy = require("copy-text-to-clipboard");
export default {
  name: "photo-view",
  data() {
    return {
      isAuthed: localStorage.getItem("isAuthed") === "yes",
      hoverIndex: -1
    };
  },
  components: {
    EmptyPage
  },
  computed: {
    ...mapGetters("app", ["images"])
  },
  methods: {
    ...mapActions("app", {
      fetchImages: "fetchImages",
      deleteImage: "deleteImage",
      setDisplay: "setDisplay",
      setPhotoIndex: "setPhotoIndex"
    }),
    mouseOver(index) {
      this.hoverIndex = index;
    },
    handleClick(index) {
      this.setDisplay(true);
      this.setPhotoIndex(index);
    },
    handleCopy(index) {
      copy(this.images[index].url);
      Message.success("复制到剪切板");
    },
    handleDelete(index) {
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
  },
  async created() {
    this.fetchImages();
  }
};
</script>

<style lang="scss" scoped>
.photo-area {
  margin-bottom: 20px;
}
#photo-view {
  width: 100%;

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
    .photo-hover {
      position: absolute;
      width: 50px;
      height: 100%;
      top: 0px;
      right: 0px;
      background: rgba(0, 200, 157, 0.67);
      color: white;
      border-radius: 0px 5px 5px 0px;
      .copy-link,
      .delete-photo {
        width: 100%;
        opacity: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;

        .icon-delete,
        .icon-copy {
          font-size: 20px;
          line-height: 62px;
        }
        .icon-delete:hover,
        .icon-copy:hover {
          transform: scale(1.2);
        }
      }
    }
  }
}
</style>