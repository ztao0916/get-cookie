/*
 * @Author: ztao
 * @Date: 2023-05-29 19:19:40
 * @LastEditTime: 2023-05-31 12:23:05
 * @Description:
 */
const express = require("express");
const app = express();
const loginAndReturnCookie = require("./common/login");
const log = require("./utils/log");

// 定义GET接口
app.get("/", (req, res) => {
  res.send("scm获取接口服务部署成功");
});
app.get("/scm/cookie", async (req, res) => {
  let cookie = await loginAndReturnCookie();
  if (cookie) {
    res.send({
      code: "0000",
      cookie: cookie,
      msg: "获取cookie成功",
    });
    log.info(`获取cookie成功`);
  } else {
    res.send({
      code: "9999",
      cookie: "",
      msg: "登录失败,请检查账号密码",
    });
    log.error(`登录失败,请检查账号密码, 错误原因:${cookie}`);
  }
});

app.listen(12000, () => {
  log.info("服务运行在12000端口");
});
