@api @regression
Feature: Blog API
  As an API consumer
  I want to manage posts and users
  So that I can integrate with the platform

  @smoke @positive
  Scenario: Get list of posts
    When I send a GET request to "/posts"
    Then the response status should be 200
    And the response should contain a list of items
    And each item should have properties "id", "title", "body", "userId"

  @smoke @positive
  Scenario: Get list of users
    When I send a GET request to "/users"
    Then the response status should be 200
    And the response should contain a list of items
    And each user should have properties "id", "name", "username", "email"

  @positive
  Scenario: Create a new post
    Given I have request data:
      | title  | foo |
      | body   | bar |
      | userId | 1   |
    When I send a POST request to "/posts" with the request data
    Then the response status should be 201
    And the response should contain the created item title "foo"
    And the response should contain a generated "id"

  @positive
  Scenario: Get a specific user
    When I send a GET request to "/users/1"
    Then the response status should be 200
    And the response should contain user with name "Leanne Graham"
    And the response should contain user email "Sincere@april.biz"