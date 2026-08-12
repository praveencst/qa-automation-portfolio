class CheckoutPage {
  constructor(page) {
    this.page = page;

    // Step One: Information locators
    this.firstNameInput = '[data-test="firstName"]';
    this.lastNameInput = '[data-test="lastName"]';
    this.postalCodeInput = '[data-test="postalCode"]';
    this.continueButton = '[data-test="continue"]';
    this.cancelButtonStepOne = '[data-test="cancel"]';

    // Step Two: Overview locators
    this.itemTotalLabel = '.summary_subtotal_label';
    this.taxLabel = '.summary_tax_label';
    this.totalLabel = '.summary_total_label';
    this.finishButton = '[data-test="finish"]';
    this.cancelButtonStepTwo = '[data-test="cancel"]';

    // Step Three: Complete locators
    this.completeHeader = '.complete-header';
    this.completeText = '.complete-text';
    this.backHomeButton = '[data-test="back-to-products"]';

    // Error handling
    this.errorMessage = '[data-test="error"]';
  }

  // ==================== STEP ONE: INFORMATION ====================

  /**
   * Fill in the shipping information form
   * @param {Object} info - { firstName, lastName, postalCode }
   */
  async fillShippingInformation(info) {
    await this.page.fill(this.firstNameInput, info.firstName);
    await this.page.fill(this.lastNameInput, info.lastName);
    await this.page.fill(this.postalCodeInput, info.postalCode);
  }

  /**
   * Click Continue to proceed to overview
   */
  async continueToOverview() {
    await this.page.click(this.continueButton);
  }

  /**
   * Get error message text (e.g., missing required fields)
   * @returns {Promise<string|null>}
   */
  async getErrorMessage() {
    const errorLocator = this.page.locator(this.errorMessage);
    if (await errorLocator.isVisible().catch(() => false)) {
      return await errorLocator.textContent();
    }
    return null;
  }

  // ==================== STEP TWO: OVERVIEW ====================

  /**
   * Get the item subtotal (before tax)
   * @returns {Promise<string>}
   */
  async getItemTotal() {
    return await this.page.textContent(this.itemTotalLabel);
  }

  /**
   * Get the tax amount
   * @returns {Promise<string>}
   */
  async getTax() {
    return await this.page.textContent(this.taxLabel);
  }

  /**
   * Get the final total (item total + tax)
   * @returns {Promise<string>}
   */
  async getTotal() {
    return await this.page.textContent(this.totalLabel);
  }

  /**
   * Click Finish to complete the order
   */
  async finishCheckout() {
    await this.page.click(this.finishButton);
  }

  /**
   * Get all product names in the checkout overview
   * @returns {Promise<string[]>}
   */
  async getOverviewItemNames() {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }

  // ==================== STEP THREE: COMPLETE ====================

  /**
   * Get the order confirmation header text
   * @returns {Promise<string>}
   */
  async getConfirmationHeader() {
    return await this.page.textContent(this.completeHeader);
  }

  /**
   * Get the order confirmation description text
   * @returns {Promise<string>}
   */
  async getConfirmationText() {
    return await this.page.textContent(this.completeText);
  }

  /**
   * Click Back Home to return to products page
   */
  async goBackHome() {
    await this.page.click(this.backHomeButton);
  }

  /**
   * Check if checkout is complete by verifying the confirmation header
   * @returns {Promise<boolean>}
   */
  async isCheckoutComplete() {
    return await this.page.locator(this.completeHeader).isVisible();
  }

  // ==================== UTILITY ====================

  /**
   * Complete the full checkout flow in one call
   * @param {Object} shippingInfo - { firstName, lastName, postalCode }
   */
  async completeFullCheckout(shippingInfo) {
    await this.fillShippingInformation(shippingInfo);
    await this.continueToOverview();
    await this.finishCheckout();
  }
}

module.exports = { CheckoutPage };