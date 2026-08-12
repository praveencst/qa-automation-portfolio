class ProductsPage {
  constructor(page) {
    this.page = page;
    this.title = '.title';
    this.inventoryItems = '.inventory_item';
    this.addToCartButton = (productName) => 
      `div:has-text("${productName}") >> [data-test^="add-to-cart"]`;
    this.cartBadge = '.shopping_cart_badge';
  }

  async getTitle() {
    return await this.page.textContent(this.title);
  }

  async addProductToCart(productName) {
    await this.page.click(this.addToCartButton(productName));
  }

  async goToCart() {
    await this.page.click('.shopping_cart_link');
  }
}

module.exports = { ProductsPage };