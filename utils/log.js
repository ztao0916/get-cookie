/*
 * @Author: ztao
 * @Date: 2021-11-23 15:18:10
 * @LastEditTime: 2023-05-31 12:28:21
 * @Description: 日志的处理
 */
const path = require("path");
const log4js = require("log4js");
log4js.configure(path.resolve(__dirname, "../config/log4js.json"));
let log = log4js.getLogger("smcCookie");
module.exports = log;
