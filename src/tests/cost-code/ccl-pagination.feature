@cost-code
Feature: [Cost Code List] Pagination

  Background:
    Given Access to the APM system
    And the user is on the Cost Code List screen

  @REQ_APM-1951 @TEST_APM-8499 @Functional @automation @regression @smoke @MVP2 @Low
  Scenario: [S17][APM-1951][Cost Code List] Pagination - Navigate to a specific page number
    When the user clicks on a specific page number
    Then the user is taken to that specific page
    And the data in the Cost Code list updates correctly in accordance with the Show n items setting
