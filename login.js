/*
 * @Author: ztao
 * @Date: 2023-05-15 17:56:01
 * @LastEditTime: 2023-05-29 19:22:29
 * @Description:
 */
/*
 * @Author: ztao
 * @Date: 2023-05-15 17:56:01
 * @LastEditTime: 2023-05-22 12:23:25
 * @Description:
 */
const { chromium, webkit, firefox } = require("playwright");
const axios = require("axios");
const { addExtra } = require("playwright-extra");
const stealth = require("puppeteer-extra-plugin-stealth");
const { USERNAME, PASSWORD } = require("./config");
// 启用 Stealth 模式
const playwright = addExtra(chromium);
playwright.use(stealth());

const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

async function loginAndReturnCookie() {
  const browser = await playwright.launch({
    headless: true,
    channel: "msedge",
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  // 跳转到登录页面
  await page.goto("https://web.scm.tmall.com/login");

  // 等待 iframe 元素加载完成
  await page.waitForSelector("iframe");

  // 获取 iframe 元素的句柄
  const frameHandle = await page.$("#alibaba-login-box");
  // 进入 iframe 上下文
  const frame = await frameHandle.contentFrame();

  // 等待登录表单元素加载完成
  await frame.waitForSelector("#login-form");
  // 输入用户名和密码
  await frame.type("#fm-login-id", USERNAME);
  await frame.type("#fm-login-password", PASSWORD);
  // 点击登录按钮
  await frame.click(".fm-submit");

  // 等待登录成功的条件，可以根据实际情况修改
  await sleep(3000);
  const cookiesArr = await context.cookies();

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
  //根据cookie发送请求并返回链接
  const url = "https://web.scm.tmall.com/";
  const params = {
    frameUrl:
      "https://web.scm.tmall.com/pages/fbae/vendor_b2_auto_login_product_trace ",
  };
  try {
    let res = await axios({
      method: "get",
      url: `https://seller.scm.tmall.com/b2-login-gsp/getProductTraceUrl?requestUrl=https%3A%2F%2Fsuppliers.aliexpress.com%2F%23%2Fproduct%2Fsourcing%2Flist`,
      headers: {
        cookie: cookies,
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36",
      },
    });
    let targetUrl = res.data.data;
    await page.goto(targetUrl, { waitUntil: "domcontentloaded" });
    await sleep(2000);
    //获取targetUrl的cookie
    const targetCookiesArr = await context.cookies();
    const targetCookies = formatCookie(targetCookiesArr);
    await browser.close();
    return targetCookies;
  } catch (error) {
    console.log(error);
  }
}

module.exports = loginAndReturnCookie;
