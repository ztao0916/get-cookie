/*
 * @Author: ztao
 * @Date: 2021-11-23 15:18:10
 * @LastEditTime: 2023-06-01 09:45:57
 * @Description: 日志的处理
 */
const path = require("path");
const log4js = require("log4js");
log4js.configure(path.resolve(__dirname, "../config/log4js.json"));
let log = log4js.getLogger("sellerspriteCookie");
module.exports = log;
