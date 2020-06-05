const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();
const router = new Router();
const axios = require("axios");
const qs = require("qs");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
// 加载数据库JSON文件
const adapter = new FileSync("db.json");
const db = low(adapter);

// 初始化数据库
db.defaults({ images: [], albums: [], token: null }).write();

let serverInfo = null;
let koaServer = null;

app.use(require("@koa/cors")());
app.use(require("koa-bodyparser")());
console.log("后台启动");
router.get("/token", async (ctx) => {
  console.log(ctx.request.query, "ctx.request.query");
  const { data } = await axios.post(
    "https://sm.ms/api/v2/token",
    qs.stringify(ctx.request.query)
  );
  if (!data.data.token) {
    console.log("获取数据出错");
    ctx.throw(401);
  }
  console.log(data.data.token);
  db.set("token", data.data.token).write();
  console.log(db.get("token").value());
  ctx.body = data.data;
});
router.get("/upload_history", async (ctx) => {
  console.log("我被调用了归属感");
  const { data } = await axios.get("https://sm.ms/api/v2/upload_history", {
    headers: {
      Authorization: db.get("token").value(),
    },
  });
  // console.log(data, "我被调用了");
  if (!data.data) {
    console.log("获取数据出错");
    ctx.throw(401);
  }
  // console.log(data.data);
  db.set("images", data.data).write();
  // console.log(db.get("token").value());
  ctx.body = data.data;
});
router.get("/delete", async (ctx) => {
  // console.log("我被调用了归属感");
  const { data } = await axios.get(
    `https://sm.ms/api/v2/delete/${ctx.request.query.hash}`,
    {
      headers: {
        Authorization: db.get("token").value(),
      },
    }
  );
  // console.log(data, "我被调用了");
  if (!data.data) {
    console.log("删除图片出错");
    ctx.throw(401, "删除图片出错");
  }
  // console.log(data.data);
  db.set("images", data.data).write();
  ctx.body = data.data;
});
app.use(router.routes()).use(router.allowedMethods());

function getIPAddress() {
  const interfaces = require("os").networkInterfaces();
  for (let devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
}

async function start() {
  try {
    const port = 8000;
    koaServer = await app.listen(port);
    const address = koaServer.address();
    serverInfo = {
      port: address.port,
      ip: getIPAddress(),
      local: "localhost",
      url: `http://localhost:${address.port}`,
    };

    // await reload(config, preload);

    return serverInfo;
  } catch (e) {
    return { message: e.message };
  }
}

// function stop(callback) {
//   if (koaServer) {
//     koaServer.close(() => {
//       serverInfo = null;
//       koaServer = null;
//       callback();
//     });
//   }
// }
async function startServer() {
  const { port, ip, local, message } = await start();
  if (message) {
    console.error(message);
  } else {
    console.info(
      `启动成功，本地访问 http://${local}:${port}，IP访问 http://${ip}:${port}`
    );
  }
}

startServer();
// module.exports = {
//   start,
//   stop,
// };
