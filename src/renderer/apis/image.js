import request from "../utils/request";

export function getHistory() {
  return request.get("/upload_history");
}
export function deletePic(hash) {
  return request.get(`/delete/:${hash}`);
}
export function uploadPic(smfile) {
  return request.post(`/delete/:${hash}`, {
    params: {
      smfile,
    },
  });
}
