@REQ_APM-25933
Feature: [Invoice Creation] Attach CNTR No. in WO during invoicing

  Background:
    Given the user is on the Invoice Creation screen with System Admin role

  @TEST_APM-26535 @AM @MVP3 @Functional @regression @Medium @automation
  Scenario Outline: [S45][APM-25933] Enable CNTR Select button when at least 1 line item is checked
    When the user opens an invoice in "<state>" state that has a Work Order
    And the CNTR Select button is disabled by default
    And the user checks one line item
    Then the CNTR Select button is enabled

    Examples:
      | state    |
      | Creation |
      | detail   |
