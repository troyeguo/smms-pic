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
// axios
//   .get("https://sm.ms/api/v2/upload_history", {
//     headers: {
//       Authorization: "ioTLRUHum8ky6YrVqTb3QY6yxITYcdT0",

//       crossDomain: true,
//       "Access-Control-Allow-Origin": "*"
//     }
//   })
//   .then(res => {
//     console.log(res);
//   });

export default {
  name: "zenpic",
  methods: {},
  computed: {}
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+SC");
/* CSS */
</style>
