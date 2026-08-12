class CartPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.cartItems = '.cart_item';
    this.itemName = '.inventory_item_name';
    this.itemPrice = '.inventory_item_price';
    this.removeButton = (itemName) => `div.cart_item:has-text("${itemName}") >> [data-test^="remove"]`;
    this.checkoutButton = '[data-test="checkout"]';
    this.continueShoppingButton = '[data-test="continue-shopping"]';
    this.cartQuantity = '.cart_quantity';
  }

  /**
   * Navigate directly to the cart page
   */
  async navigateToCart() {
    await this.page.goto('/cart.html');
  }

  /**
   * Get all product names currently in the cart
   * @returns {Promise<string[]>}
   */
  async getCartItemNames() {
    return await this.page.locator(this.cartItems).locator(this.itemName).allTextContents();
  }

  /**
   * Check if a specific product is in the cart
   * @param {string} productName
   * @returns {Promise<boolean>}
   */
  async isProductInCart(productName) {
    const names = await this.getCartItemNames();
    return names.includes(productName);
  }

  /**
   * Remove a specific product from the cart
   * @param {string} productName
   */
  async removeProduct(productName) {
    await this.page.click(this.removeButton(productName));
  }

  /**
   * Get the quantity of a specific cart item
   * @param {string} productName
   * @returns {Promise<string>}
   */
  async getItemQuantity(productName) {
    const itemRow = this.page.locator(this.cartItems).filter({ hasText: productName });
    return await itemRow.locator(this.cartQuantity).textContent();
  }

  /**
   * Get the price of a specific cart item
   * @param {string} productName
   * @returns {Promise<string>}
   */
  async getItemPrice(productName) {
    const itemRow = this.page.locator(this.cartItems).filter({ hasText: productName });
    return await itemRow.locator(this.itemPrice).textContent();
  }

  /**
   * Get total number of items in cart
   * @returns {Promise<number>}
   */
  async getCartItemCount() {
    return await this.page.locator(this.cartItems).count();
  }

  /**
   * Click the Checkout button to proceed
   */
  async proceedToCheckout() {
    await this.page.click(this.checkoutButton);
  }

  /**
   * Click Continue Shopping to go back to products
   */
  async continueShopping() {
    await this.page.click(this.continueShoppingButton);
  }
}

module.exports = { CartPage };