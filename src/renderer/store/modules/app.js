import axios from "axios";
import { Message } from "element-ui";
import _ from "lodash";
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
// 加载数据库JSON文件
const adapter = new FileSync("db.json");
const db = low(adapter);
let state = {
  isShowLogin: false,
  isAuthed: false,
  images: db.get("images").value() || [],
  photoIndex: 0,
  isDisplay: false,
  activeTab: 0,
  uploadList: [],
};

let getters = {
  isShowLogin: (state) => state.isShowLogin,
  isAuthed: (state) => state.isAuthed,
  images: (state) => state.images,
  photoIndex: (state) => state.photoIndex,
  isDisplay: (state) => state.isDisplay,
  uploadList: (state) => state.uploadList,
  activeTab: (state) => state.activeTab,
};

let mutations = {
  SET_LOGIN_DIALOG: (state, isShowLogin) => {
    state.isShowLogin = isShowLogin;
  },
  SET_AUTH: (state, isAuthed) => {
    state.isAuthed = isAuthed;
  },
  SET_IMAGES: (state, images) => {
    state.images = images;
  },
  SET_PHOTO_INDEX: (state, photoIndex) => {
    state.photoIndex = photoIndex;
  },
  SET_DISPALY: (state, isDisplay) => {
    state.isDisplay = isDisplay;
  },
  SET_UPLOAD_LIST: (state, uploadList) => {
    state.uploadList = uploadList;
  },
  SET_ACTIVE_TAB: (state, activeTab) => {
    state.activeTab = activeTab;
  },
};

let actions = {
  setLoginDialog({ commit }, isShowLogin) {
    return commit("SET_LOGIN_DIALOG", isShowLogin);
  },
  setAuth({ commit }, isAuthed) {
    return commit("SET_AUTH", isAuthed);
  },
  setPhotoIndex({ commit }, photoIndex) {
    return commit("SET_PHOTO_INDEX", photoIndex);
  },
  setDisplay({ commit }, isDisplay) {
    return commit("SET_DISPALY", isDisplay);
  },
  setUploadList({ commit }, uploadList) {
    return commit("SET_UPLOAD_LIST", uploadList);
  },
  setActiveTab({ commit }, activeTab) {
    // console.log(activeTab, "asfafg");
    return commit("SET_ACTIVE_TAB", activeTab);
  },
  async fetchToken({ commit, dispatch }, data) {
    await axios
      .get("http://localhost:8000/token", {
        params: {
          username: data.username,
          password: data.password,
        },
      })
      .then((res) => {
        console.log(res);
        console.log("登录成功");
        Message.success("登录成功");
        localStorage.setItem("isAuthed", "yes");
        commit("SET_AUTH", true);
        dispatch("fetchImages");
      })
      .catch((error) => {
        console.log(error);
        Message.error("登录失败");
      });
  },
  async fetchImages({ commit }) {
    console.log("fetchimages");
    await axios
      .get("http://localhost:8000/upload_history")
      .then((res) => {
        // console.log(res.data, "fetchImages");
        commit("SET_IMAGES", _.cloneDeep(res.data.reverse()));
      })
      .catch((err) => {
        console.log(err);
        Message.error("获取图片出错");
      });
  },
  async deleteImage({ state, dispatch }, index) {
    console.log(state.images, index, state.images[index]);
    axios
      .get("http://localhost:8000/delete", {
        params: {
          hash: state.images[index].hash,
        },
      })
      .then((res) => {
        console.log(res);
        Message.success("删除图片成功");
      })
      .then((res) => {
        dispatch("fetchImages");
      })
      .catch((err) => {
        console.log(err);
        Message.error("删除图片失败");
      });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
