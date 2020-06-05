import request from "../utils/request";

export function addPicToAlbum(album_id, hash) {
  return request.get(`/albums/:${album_id}/item`, {
    params: {
      add: hash,
    },
  });
}
export function removePicToAlbum(album_id, hash) {
  return request.get(`/albums/:${album_id}/item`, {
    params: {
      remove: hash,
    },
  });
}
export function deleteAlbum(album_id) {
  return request.get(`/albums/:${album_id}/delete`);
}
export function createAlbum(album_name, album_description) {
  return request.post("/albums", {
    params: {
      album_name,
      album_description,
    },
  });
}
export function getAllAlbumItem(album_id) {
  return request.get(`/albums/:${album_id}`);
}
export function getAllAlbum() {
  return request.get("/albums");
}
