@cost-code
Feature: [Cost Code List] Edit Cost Code

  Background:
    Given Access to the APM system
    And the user is on the Cost Code List screen

  @REQ_APM-1953 @TEST_APM-9594 @Functional @automation @regression @MVP2 @Medium
  Scenario: [S19][APM-1953][Cost Code List][Edit] Show warning when editing more than 1 row
    When the user selects multiple items on the current page
    And the user clicks on the Edit button
    Then the system shows a warning message with title "Warning" and content "You can not edit more than 1 row."
    And the selected checkboxes are kept
