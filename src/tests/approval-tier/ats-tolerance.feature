@REQ_APM-12920 @approval-tier
Feature: [Approval Tier Setting] Tolerance Amount Limit and Tolerance Percentage validation

  Background:
    Given Access to the APM system
    And the user is on the Approval Tier Setting screen

  @TEST_APM-13278 @AM @Functional @MVP2 @Medium @automation @regression @smoke @scripts @approval-tier
  Scenario Outline: [S26][APM-12920] Tolerance Amount Limit (USD) - Validation message will be shown if entering the invalid value
    When The user is in Add New mode
    And Input "<value>" in Tolerance Amount Limit and focus out
    Then It will show "Please do not input Tolerance Amount Limit greater than 1,000,000,000,000.0000."

    Examples:
      | value              |
      | 1000000000000.0001 |
      | 1000000000001.0000 |
      | 2000000000000.0000 |

  @TEST_APM-13287 @AM @Functional @MVP2 @Medium @automation @regression @smoke @approval-tier
  Scenario Outline: [S26][APM-12920] Tolerance Percentage - Validation message will be shown if entering the invalid value
    When The user is in Add New mode
    And Input "<value>" in Tolerance Percentage and focus out
    Then It will show "Please do not input Tolerance Percentage greater than 100."

    Examples:
      | value  |
      | 100.01 |
      | 101.00 |
      | 200.00 |
