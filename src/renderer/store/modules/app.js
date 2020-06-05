import axios from "axios";
import { Message } from "element-ui";
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
// 加载数据库JSON文件
const adapter = new FileSync("db.json");
const db = low(adapter);
let state = {
  isShowLogin: false,
  isAuthed: false,
  isNewAlbum: true,
  isAddAlbum: false,
  images: db.get("images").value() || [],
  albums: db.get("ablums").value() || [],
  photoIndex: 0,
  isDisplay: false,
};

let getters = {
  isShowLogin: (state) => state.isShowLogin,
  isAuthed: (state) => state.isAuthed,
  isNewAlbum: (state) => state.isNewAlbum,
  isAddAlbum: (state) => state.isAddAlbum,
  images: (state) => state.images,
  albums: (state) => state.albums,
  photoIndex: (state) => state.photoIndex,
  isDisplay: (state) => state.isDisplay,
};

let mutations = {
  SET_LOGIN_DIALOG: (state, isShowLogin) => {
    state.isShowLogin = isShowLogin;
  },
  SET_AUTH: (state, isAuthed) => {
    state.isAuthed = isAuthed;
  },
  SET_NEW_ALBUM: (state, isNewAlbum) => {
    state.isNewAlbum = isNewAlbum;
  },
  SET_ADD_ALBUM: (state, isAddAlbum) => {
    state.isAddAlbum = isAddAlbum;
  },
  SET_IMAGES: (state, images) => {
    state.images = images;
  },
  SET_ALBUMS: (state, albums) => {
    state.albums = albums;
  },
  SET_PHOTO_INDEX: (state, photoIndex) => {
    state.photoIndex = photoIndex;
  },
  SET_DISPALY: (state, isDisplay) => {
    state.isDisplay = isDisplay;
  },
};

let actions = {
  setLoginDialog({ commit }, isShowLogin) {
    return commit("SET_LOGIN_DIALOG", isShowLogin);
  },
  setAuth({ commit }, isAuthed) {
    return commit("SET_AUTH", isAuthed);
  },
  setNewAlbum({ commit }, isNewAlbum) {
    return commit("SET_NEW_ALBUM", isNewAlbum);
  },
  setAddAlbum({ commit }, isAddAlbum) {
    return commit("SET_ADD_ALBUM", isAddAlbum);
  },
  setAlbums({ commit }, albums) {
    return commit("SET_ALBUMS", albums);
  },
  setPhotoIndex({ commit }, photoIndex) {
    return commit("SET_PHOTO_INDEX", photoIndex);
  },
  setDisplay({ commit }, isDisplay) {
    return commit("SET_DISPALY", isDisplay);
  },
  async fetchToken({ commit }, data) {
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
        console.log(res.data, "fetchImages");
        // this.setImages(res);
        commit("SET_IMAGES", res.data);
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
