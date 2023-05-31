服务器系统只能选择乌班图,运行命令之前需要加`sudo`,表示权限最高



然后使用的是宝塔面板



宝塔面板  安装`node pm2 nginx`等程序



安装完成的`node` 需要设置软链接才能使用

```javascript
# 版本v.14.18.3换成服务器安装的版本,pm2
ln -s /www/server/nvm/versions/node/v14.18.3/bin/node /usr/local/bin/node
ln -s /www/server/nvm/versions/node/v14.18.3/bin/npm /usr/local/bin/npm
ln -s /www/server/nvm/versions/node/v14.18.3/bin/pm2 /usr/local/bin/pm2
```

日志纪录比较简单一些,采用`log4js`

部署的话,采用`pm2`部署



### 未来

有机会使用`nestjs`集成到一个架子里面,以后使用只需要添加就好了,以后就以`nestjs`为主,处理接口之类的`api`部署,个人的项目,部署到`vercel`

