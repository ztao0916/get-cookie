/*
 * @Author: ztao
 * @Date: 2023-05-15 17:56:01
 * @LastEditTime: 2023-06-01 21:24:41
 * @Description: 卖家精灵cookie获取
 */
const vanillaPuppeteer = require("puppeteer");
const { addExtra } = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const { USERNAME, PASSWORD } = require("../config/user");
const puppeteer = addExtra(vanillaPuppeteer);
puppeteer.use(StealthPlugin()); //躲避反扒追踪

const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

async function loginAndReturnCookie() {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: false,
    headless: true,
    ignoreDefaultArgs: ["--enable-automation"],
    args: [
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-first-run",
      "--no-sandbox",
      "--disable-infobars",
      "--no-zygote",
      "--ignore-certificate-errors",
      "--disable-web-security",
    ],
    defaultViewport: {
      width: 1600,
      height: 900,
    },
  });

  const page = await browser.newPage();

  // 跳转到登录页面
  await page.goto("https://www.sellersprite.com/cn/w/user/login");
  //点击切换到账号密码登录
  const pwdLoginSelector = "#pills-login>li:nth-child(2)>a";
  //账号输入框
  const usernameSelector =
    ".login-content>.login-new-box>#form_signin_password>.input-group.u-form.mt-5.pt-2>input[name=email]";
  //密码输入框
  const passwordSelector =
    ".login-content>.login-new-box>#form_signin_password>.input-group.u-form.mt-3>input[type=password]";
  await page.click(pwdLoginSelector);
  //登录按钮
  const loginBtnSelector = ".login-content>.login-new-box>button.login-btn";

  await page.click(pwdLoginSelector);
  await page.waitForSelector(".login-content>.login-new-box", {
    visible: true,
  });
  // 输入用户名和密码
  await page.type(usernameSelector, USERNAME);
  await page.type(passwordSelector, PASSWORD);
  // 回车登录
  await page.click(loginBtnSelector);
  // 等待登录成功的条件，可以根据实际情况修改
  await sleep(1500);
  const cookiesArr = await page.cookies();

  //格式化 cooKie
  const formatCookie = (cookies) => {
    let cookiesArr = [];
    for (let i = 0; i < cookies.length; i++) {
      let cookieItem = cookies[i];
      if (cookieItem.name) {
        let str =
          i == 0
            ? `${cookieItem.name}=${cookieItem.value}`
            : `${cookieItem.name}=${cookieItem.value};`;
        cookiesArr.push(str);
      }
    }
    //完成cookie拼接工作
    let cookiesStr = cookiesArr.reverse().join(" ");
    return cookiesStr;
  };

  const cookies = formatCookie(cookiesArr);
  await browser.close();
  return cookies;
}

module.exports = loginAndReturnCookie;
