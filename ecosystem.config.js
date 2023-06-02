/*
 * @Author: ztao
 * @Date: 2021-11-23 10:16:40
 * @LastEditTime: 2023-06-01 21:31:55
 * @Description: pm2配置文件
 */
module.exports = {
  apps: [
    {
      name: "sellersprite-cookie",
      cwd: "./", //应用程序所在的目录
      script: "./app.js",
      watch: true, //不监听进程
      ignore_watch: ["node_modules", "log"],
      autorestart: false, //禁用崩溃或退出时自动重启[解决运行结束重启问题]
      vizion: false, //禁用vizion特性(版本控制)
      cron_restart: "0 0 0 * * *", //每天0点重启一次
    },
  ],
};
