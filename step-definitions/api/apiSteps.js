const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { ApiClient } = require('../../src/api/ApiClient');

When('I send a GET request to {string}', async function (endpoint) {
  this.apiClient = new ApiClient(this.apiRequest);
  this.response = await this.apiRequest.get(endpoint);
});

Given('I have request data:', async function (dataTable) {
  this.requestData = dataTable.rowsHash();
  // Convert numeric strings to numbers
  if (this.requestData.userId) {
    this.requestData.userId = parseInt(this.requestData.userId, 10);
  }
});

When('I send a POST request to {string} with the request data', async function (endpoint) {
  this.apiClient = new ApiClient(this.apiRequest);
  this.response = await this.apiRequest.post(endpoint, { data: this.requestData });
});

Then('the response status should be {int}', async function (statusCode) {
  expect(this.response.status()).toBe(statusCode);
});

Then('the response should contain a list of items', async function () {
  const body = await this.response.json();
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);
});

Then('each item should have properties {string}, {string}, {string}, {string}', 
  async function (prop1, prop2, prop3, prop4) {
    const body = await this.response.json();
    const item = body[0];
    expect(item).toHaveProperty(prop1);
    expect(item).toHaveProperty(prop2);
    expect(item).toHaveProperty(prop3);
    expect(item).toHaveProperty(prop4);
});

Then('each user should have properties {string}, {string}, {string}, {string}', 
  async function (prop1, prop2, prop3, prop4) {
    const body = await this.response.json();
    const user = body[0];
    expect(user).toHaveProperty(prop1);
    expect(user).toHaveProperty(prop2);
    expect(user).toHaveProperty(prop3);
    expect(user).toHaveProperty(prop4);
});

Then('the response should contain the created item title {string}', async function (title) {
  const body = await this.response.json();
  expect(body.title).toBe(title);
});

Then('the response should contain a generated {string}', async function (field) {
  const body = await this.response.json();
  expect(body[field]).toBeDefined();
  expect(String(body[field]).length).toBeGreaterThan(0);
});

Then('the response should contain user with name {string}', async function (name) {
  const body = await this.response.json();
  expect(body.name).toBe(name);
});

Then('the response should contain user email {string}', async function (email) {
  const body = await this.response.json();
  expect(body.email).toBe(email);
});