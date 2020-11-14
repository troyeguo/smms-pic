<template>
  <div id="app" onmousedown="onDrop">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "app",
  methods: {
    onDrop: function() {
      console.log("drag");
      return false;
    }
  },
  computed: {}
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+SC");
/* CSS */
</style>
