<template>
  <div id="ablum-view">
    <empty-page v-if="!(albums[0])"></empty-page>
    <div class="new-ablum-contaner" @click="handleNewAlbum">
      <div class="new-album">
        <span class="icon-add"></span>
        <span>新建相册</span>
      </div>
    </div>

    <el-row v-if="albums[0]">
      <el-col :span="8" v-for="(album,index) in albums" :key="album.hash">
        <div class="ablum-grid" @mouseenter="mouseOver(index)" @mouseleave="mouseOver(-1)">
          <div class="ablum-hover" v-if="hoverIndex===index">
            <div class="copy-link" @click="handleCopy(index)">
              <span class="icon-copy"></span>
            </div>
            <div class="delete-ablum" @click="handleDelete(index)">
              <span class="icon-delete"></span>
            </div>
          </div>
          <img v-bind:src="albums.items[0].url" class="ablum" alt @click="handleClick(index)" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import EmptyPage from "../emptyPage/index";
import { getHistory } from "@/apis/image";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    EmptyPage
  },
  computed: {
    ...mapGetters("app", ["albums", "isNewAlbum"])
  },
  methods: {
    ...mapActions("app", { setNewAlbum: "setNewAlbum" }),
    handleNewAlbum() {
      console.log("new");
      this.setNewAlbum(true);
    }
  },
  mounted() {
    console.log(this.albums, "albums");
  }
};
</script>

<style lang="scss" scoped>
#ablum-view {
  width: 100%;
  .new-ablum-contaner {
    width: 100vw;
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 50px;
    left: 0px;
    .new-album {
      width: 144px;
      height: 44px;
      background: rgba(47, 47, 47, 1);
      box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.16);
      opacity: 1;
      border-radius: 25px;
      line-height: 44px;
      font-size: 15px;
      color: white;
      text-align: center;
      cursor: pointer;
    }
  }

  .ablum-grid {
    position: relative;
    width: 200px;
    height: 123px;
    opacity: 1;
    border-radius: 5px;
    margin: 10px;
    display: flex;
    justify-content: center;
    overflow: hidden;
    box-shadow: 0 0 8px rgba($color: #000000, $alpha: 0.1);
    .ablum {
      height: 100%;
    }
    .ablum-hover {
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
      .copy-link,
      .delete-ablum {
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