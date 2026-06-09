@cost-code
Feature: [Cost Code List] Enhance Add New with Cost Category, Cost Sub-Category, Detail Code

  Background:
    Given Access to the APM system
    And the user is on the Cost Code List screen

  @REQ_APM-8235 @TEST_APM-9144 @Functional @automation @regression @smoke @MVP2 @Low
  Scenario: [S18][APM-8235][Cost Code List][Add New] Cost Code is deleted when Cost Category is deleted in case of copy row
    When the user copies some rows
    And the user deletes data in the "Cost Category" field
    Then the data in the "Cost Sub-Category" field is deleted and it is disabled
    And the data in the "Cost Code" field is deleted
    And the user selects data in the "Cost Category" field
    And the Cost Code is not shown
    And the user selects data in the "Cost Sub-Category" field
    And the Cost Code is shown

  @REQ_APM-8235 @TEST_APM-9149 @Functional @automation @regression @smoke @MVP2 @Low
  Scenario: [S18][APM-8235][Cost Code List][Add New] Cost Code is deleted when Cost Sub-Category is deleted in case of copy row
    When the user copies some rows
    And the user deletes data in the "Cost Sub-Category" field
    Then the data in the "Cost Code" field is deleted
    And the user selects data in the "Cost Sub-Category" field
    And the Cost Code is shown
