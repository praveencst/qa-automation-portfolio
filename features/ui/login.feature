@ui @regression @smoke
Feature: Sauce Demo Login
  As a customer
  I want to log in to the application
  So that I can access the product catalog

  Background:
    Given I am on the login page

  @positive
  Scenario: Successful login with valid credentials
    When I enter username "standard_user"
    And I enter password "secret_sauce"
    And I click the login button
    Then I should see the products page
    And the page title should be "Swag Labs"

  @negative
  Scenario Outline: Failed login with invalid credentials
    When I enter username "<username>"
    And I enter password "<password>"
    And I click the login button
    Then I should see an error message "<error_message>"

    Examples:
      | username      | password     | error_message                                                             |
      | invalid_user  | secret_sauce | Epic sadface: Username and password do not match any user in this service |
      | standard_user | wrong_pass   | Epic sadface: Username and password do not match any user in this service |
      |               | secret_sauce | Epic sadface: Username is required                                        |