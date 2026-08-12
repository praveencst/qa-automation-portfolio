const { Before, After, BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium, request } = require('playwright');
setDefaultTimeout(15000);

let browser;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: true });
});

Before(async function () {
  // Clean API context for JSONPlaceholder
  this.apiRequest = await request.newContext({
    baseURL: 'https://jsonplaceholder.typicode.com'
  });

  // Browser context WITH baseURL set for Sauce Demo
  const context = await browser.newContext({
    baseURL: 'https://www.saucedemo.com'
  });
  this.page = await context.newPage();
});

After(async function ({ result }) {
  if (result.status === 'FAILED' && this.page) {
    const screenshot = await this.page.screenshot({ path: `reports/screenshot-${Date.now()}.png` });
    this.attach(screenshot, 'image/png');
  }
  if (this.page) await this.page.close();
  if (this.apiRequest) await this.apiRequest.dispose();
});

AfterAll(async function () {
  await browser.close();
});