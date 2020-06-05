<template>
  <div id="gallery-area">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="photo-album-title">
          <div
            class="photo-title"
            v-bind:class="{'active-title': activeIndex===0}"
            @click="handleSelect(0)"
          >
            <span class="icon-photo"></span>
            <span>我的上传</span>
          </div>
          <div
            class="album-title"
            v-bind:class="{'active-title': activeIndex===1}"
            @click="handleSelect(1)"
          >
            <span class="icon-album"></span>
            <span>我的相册</span>
          </div>
        </div>
      </el-col>
      <el-col :span="24" v-show="activeIndex===0" class="gallery-content">
        <keep-alive>
          <photo-view></photo-view>
        </keep-alive>
      </el-col>
      <el-col :span="24" v-show="activeIndex===1" class="gallery-content">
        <keep-alive>
          <album-view></album-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PhotoView from "../photoView";
import AlbumView from "../albumView";
export default {
  name: "gallery-area",

  components: {
    PhotoView,
    AlbumView
  },
  data() {
    return {
      activeIndex: 1
    };
  },
  methods: {
    handleSelect(key) {
      this.activeIndex = key;
    }
  }
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 0.5rem;
  height: 0.5rem;
  background: hsla(0, 0%, 100%, 0.6);
}

::-webkit-scrollbar-track {
  border-radius: 0;
}

::-webkit-scrollbar-thumb {
  border-radius: 0;
  background-color: rgba(95, 95, 95, 0.4);
  transition: all 0.2s;
  border-radius: 0.5rem;

  &:hover {
    background-color: rgba(95, 95, 95, 0.7);
  }
}
#gallery-area {
  display: flex;
  justify-content: center;

  .el-row {
    .gallery-content {
      overflow-y: scroll;
      height: calc(100vh - 230px);
      padding: 0 40px 0 40px !important;
      margin: 20px 0 20px 0;
    }
    .photo-album-title {
      display: flex;
      justify-content: center;

      .photo-title,
      .album-title {
        cursor: pointer;
        width: 144px;
        height: 44px;
        background: white;
        opacity: 1;
        border-radius: 25px;
        color: black;
        font-size: 16px;
        font-weight: bold;
        line-height: 27px;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon-photo {
          font-size: 20px;
          margin-right: 10px;
          color: white;
        }
        .icon-album {
          font-size: 22px;
          margin-right: 10px;
          color: white;
        }
      }
      .active-title {
        background: rgba(47, 47, 47, 1);
        color: white;
      }
    }
  }
}
</style>