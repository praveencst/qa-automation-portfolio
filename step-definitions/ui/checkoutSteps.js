const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../../src/pages/LoginPage');
const { ProductsPage } = require('../../src/pages/ProductsPage');
const { CartPage } = require('../../src/pages/CartPage');
const { CheckoutPage } = require('../../src/pages/CheckoutPage');

Given('I am logged in as {string}', async function (username) {
  const loginPage = new LoginPage(this.page);
  await loginPage.navigate();
  await loginPage.login(username, 'secret_sauce');
});

Given('I add product {string} to cart', async function (productName) {
  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.addProductToCart(productName);
});

When('I go to the cart', async function () {
  this.cartPage = new CartPage(this.page);
  await this.cartPage.navigateToCart();
});

When('I proceed to checkout', async function () {
  await this.cartPage.proceedToCheckout();
  this.checkoutPage = new CheckoutPage(this.page);
});

When('I fill in shipping information:', async function (dataTable) {
  const info = dataTable.hashes()[0];
  await this.checkoutPage.fillShippingInformation({
    firstName: info.firstName,
    lastName: info.lastName,
    postalCode: info.postalCode
  });
});

When('I continue to overview', async function () {
  await this.checkoutPage.continueToOverview();
});

When('I finish the checkout', async function () {
  await this.checkoutPage.finishCheckout();
});

Then('I should see the order confirmation message {string}', async function (expectedMessage) {
  const actualHeader = await this.checkoutPage.getConfirmationHeader();
  expect(actualHeader).toBe(expectedMessage);
});