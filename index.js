/*
 * @Author: ztao
 * @Date: 2023-05-29 19:19:40
 * @LastEditTime: 2023-05-29 19:25:14
 * @Description:
 */
const express = require("express");
const app = express();
const loginAndReturnCookie = require("./login");

// 定义GET接口
app.get("/scm/cookie", async (req, res) => {
  let cookie = await loginAndReturnCookie();
  if (cookie) {
    res.send({
      code: 200,
      cookie: cookie,
      msg: "获取cookie成功",
    });
  } else {
    res.send({
      code: "9999",
      cookie: "",
      msg: "登录失败,请检查账号密码",
    });
  }
});

app.listen(4600, () => {
  console.log("Server is running on port 4600");
});
