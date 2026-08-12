const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../../src/pages/LoginPage');

Given('I am on the login page', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigate();
});

When('I enter username {string}', async function (username) {
  await this.page.fill('[data-test="username"]', username);
});

When('I enter password {string}', async function (password) {
  await this.page.fill('[data-test="password"]', password);
});

When('I click the login button', async function () {
  await this.page.click('[data-test="login-button"]');
});

Then('I should see the products page', async function () {
  await expect(this.page.locator('.title')).toHaveText('Products');
});

Then('the page title should be {string}', async function (expectedTitle) {
  await expect(this.page).toHaveTitle(expectedTitle);
});

Then('I should see an error message {string}', async function (expectedError) {
  const error = await this.loginPage.getErrorMessage();
  expect(error).toContain(expectedError);
});