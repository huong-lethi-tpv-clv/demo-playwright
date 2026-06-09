@REQ_APM-9635 @approval-tier
Feature: [Approval Tier Setting] Show/hide buttons by user role

  Background:
    Given Access to the APM system
    And the user is on the Approval Tier Setting screen

  @TEST_APM-10317 @Functional @Low @MVP2 @automation @regression @smoke @scripts @approval-tier
  Scenario: [S21][APM-9635] The creator can see the Export, Import, Copy, Edit, and Add Row buttons with the respective default mode
    Given Login to the system with the creator account
    And Navigate to the Approval Tier Setting UI
    When Observe the button group in the top right of the grid
    Then Display the Export, Import, and Add Row buttons in the enabled mode
    And Display the Copy and Edit button in the disabled mode

  @TEST_APM-10318 @Functional @Low @MVP2 @automation @regression @smoke @scripts @approval-tier
  Scenario: [S21][APM-9635] The visitor can see the Export, and Import buttons with the respective default mode
    Given Login to the system with the visitor account
    And Navigate to the Approval Tier Setting UI
    When Observe the button group in the top right of the grid
    Then Display the Export button in the enabled mode
