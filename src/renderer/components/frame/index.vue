<template>
  <div id="frame">
    <img src="@/assets/logo.svg" alt class="logo" />
    <span class="icon-close" @click="close"></span>
    <div class="drag-zone"></div>
    <span class="icon-minimize" @click="minimize"></span>
  </div>
</template>

<script>
const { ipcRenderer } = require("electron");
export default {
  name: "frame",
  methods: {
    shrink() {
      ipcRenderer.send("shrink");
    },
    minimize() {
      ipcRenderer.send("minimize");
    },
    close() {
      ipcRenderer.send("close");
    }
  }
};
</script>

<style lang="scss" scoped>
#frame {
  width: 100vw;
  height: 40px;
  font-size: 20px;
  line-height: 30px;
  background-color: rgba(0, 0, 0, 0.08);
  color: rgba(0, 0, 0, 0.7);
  font-weight: 300;
  .drag-zone {
    height: 40px;
    width: calc(100% - 160px);
    position: absolute;
    top: 0px;
    left: 40px;
    -webkit-app-region: drag;
  }
  .logo {
    width: 30px;
    margin: 5px;
  }
  .icon-shrink,
  .icon-minimize,
  .icon-close {
    display: block;
    float: right;
    margin: 10px 10px;
    cursor: pointer;
  }
}
</style>