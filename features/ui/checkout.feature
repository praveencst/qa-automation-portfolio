@ui @regression
Feature: Product Checkout Flow
  As a customer
  I want to purchase products
  So that I can complete my order

  Background:
    Given I am logged in as "standard_user"

  @e2e @critical
  Scenario: Complete purchase flow
    Given I add product "Sauce Labs Backpack" to cart
    When I go to the cart
    And I proceed to checkout
    And I fill in shipping information:
      | firstName | lastName | postalCode |
      | John      | Doe      | 12345      |
    And I continue to overview
    And I finish the checkout
    Then I should see the order confirmation message "Thank you for your order!"