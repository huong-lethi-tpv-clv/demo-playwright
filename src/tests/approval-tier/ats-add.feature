@REQ_APM-1991 @approval-tier
Feature: [Approval Tier Setting] Add approval setting

  Background:
    Given Access to the APM system
    And the user is on the Approval Tier Setting screen

  @TEST_APM-10744 @AM @Functional @Low @MVP2 @automation @regression @smoke @scripts @approval-tier
  Scenario: [S22][APM-1991] Role - Only Creator can see the Add Row button
    When Observe the Approval Tier Setting screen
    Then Add Row button is visible

  @TEST_APM-10751 @AM @Functional @Low @MVP2 @automation @regression @smoke @scripts @approval-tier
  Scenario: [S22][APM-1991] Add - Allow the user to add many new rows if the Creator clicks Add Row button many times
    When Click Add Row button many times
    Then The system adds many new approval setting rows on the top of current page
    And Total pages and rows on current page is not counted again

  @TEST_APM-10817 @AM @Functional @MVP2 @Medium @automation @regression @smoke @approval-tier
  Scenario: [S22][APM-1991] Office - The field should enable after RHQ is inputted
    Given the user clicks the Add Row button
    When RHQ is inputted
    Then the Office field should be enabled
    And the default value should be empty

  @TEST_APM-10837 @AM @Function @Low @MVP2 @automation @regression @smoke @scripts @approval-tier
  Scenario Outline: [S22][APM-1991] Confirmation popup - The UI will display a confirmation message when the Creator performs some actions without saving
    Given the user clicks the Add Row button
    And The UI will be changed to Add New Mode
    When The creator "<Action>"
    Then The UI will display a confirmation message
    And The title is "Discard changes?"
    And The body is "These changes would not be saved."
    And The primary button is Yes
    And The secondary button is Cancel

    Examples:
      | Action                                |
      | Clicks Cancel button                  |
      | Clicks Search button                  |
      | Clicks Sort buttons in the grid table |
      | Clicks to another page                |
      | Change item per page                  |

@REQ_APM-11179 @approval-tier
  @TEST_APM-11267 @AM @Functional @Low @MVP2 @automation @regression @smoke @scripts @approval-tier
  Scenario Outline: [S23][APM-11179] Approval Amount Limit - Show validation message again when the Creator continues to input an invalid number
    Given The creator inputs "<Invalid Number 1>" in the Approval Amount Limit field
    And The Creator focuses out
    And Show "<Validation Message 1>"
    When The Creator focuses on Approval Amount Limit field
    And The creator continues inputting "<Invalid Number 2>" in the Approval Amount Limit field
    And The Creator continues focusing out
    Then Continue show "<Validation Message 2>"

    Examples:
      | Invalid Number 1         | Validation Message 1                                                          | Invalid Number 2         | Validation Message 2                                                          |
      | 1,000,000,000,000.0001   | Please do not input Approval Amount Limit greater than 1,000,000,000,000.0000 | 0                        | Approval Amount Limit must be greater than 0                                  |
      | 0                        | Approval Amount Limit must be greater than 0                                  | 1,000,000,000,000.0001   | Please do not input Approval Amount Limit greater than 1,000,000,000,000.0000 |
