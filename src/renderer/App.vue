<template>
  <div id="app">
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
  methods: {},
  computed: {},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+SC");
/* CSS */
</style>
