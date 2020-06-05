import request from "../utils/request";

export function getToken(username, password) {
  return request.get("/token", {
    params: {
      username,
      password,
    },
  });
}
