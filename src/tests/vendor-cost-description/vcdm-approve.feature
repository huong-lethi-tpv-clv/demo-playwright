@REQ_APM-1969 @vcdm
Feature: [Vendor Cost Description Mapping] Approve Vendor Costs

  Background:
    Given Access to the APM system
    And the user is on the Vendor Cost Description Mapping screen

  @TEST_APM-6831 @Functional @automation @regression @smoke @MVP2 @Low @scripts @vcdm
  Scenario: [S14][APM-1969] Approver can see the Approve button
    When the user observes the UI layout
    Then the Approve button is shown in the UI with disabled mode
    And the user changes to other page
    And the Approve button is shown in the UI with disabled mode

  @TEST_APM-6834 @Functional @automation @regression @smoke @MVP2 @Low @scripts @vcdm
  Scenario: [S14][APM-1969] Approver ticks on a row then the Approve button is enabled
    When the user ticks on a row
    Then the Approve button is enabled
    And the user un-ticks on that row
    And the Approve button is disabled

  @TEST_APM-6836 @Functional @automation @regression @smoke @MVP2 @Medium @vcdm
  Scenario Outline: [S14][APM-1969] Approver cannot approve the "<status>" item
    When the user ticks on a row with the "<status>" status
    And the user clicks on the Approve button
    Then it will show the warning message "The selected vendor costs should be in Pending Approval!"

  Examples:
    | status   |
    | Approved |
    | Rejected |
    | Expired  |
