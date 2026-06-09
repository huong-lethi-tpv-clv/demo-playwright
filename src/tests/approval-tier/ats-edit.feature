@REQ_APM-1992 @approval-tier
Feature: [Approval Tier Setting] Edit approval setting

  Background:
    Given Access to the APM system
    And the user is on the Approval Tier Setting screen

  @TEST_APM-11881 @AM @Functional @MVP2 @Medium @automation @regression @smoke @approval-tier
  Scenario Outline: [S24][APM-1992] Warning Message - Show message when the Creator selects many items and clicks on Edit button
    When The Creator selects "<Items>"
    And The Creator clicks Edit button
    Then The system shows a toasty warning message
    And The warning message has title "Warning" and content "You can not edit more than 1 row."
    And Keep checkboxes for selected items

    Examples:
      | Items                             |
      | more than 1 Active items          |
      | more than 1 Inactive items        |
      | 1 Active item and 1 Inactive item |

  @TEST_APM-11884 @AM @Functional @Medium @MVP2 @regression @smoke @approval-tier
  Scenario: [S24][APM-1992] Warning Message - Show message when the Creator selects item that are not in Active status to edit
    When The Creator selects an Inactive item
    And The Creator clicks Edit button
    Then The system shows a toasty warning message
    And The warning message has title "Warning" and content "The selected approval tier setting should be in Active!"
    And Keep checkboxes for selected items

  @TEST_APM-11889 @AM @Functional @MVP2 @Medium @automation @regression @smoke @approval-tier
  Scenario: [S24][APM-1992] Reset - The Creator can reset to origin data in all fields
    Given The Creator selects an Active item
    And The Creator clicks Edit button
    And The edited row will have Reset button at the end of the table
    When The Creator changes data for all available fields
    And Click Reset button
    Then The data in all fields is back to original data
    And The UI will still in Edit Mode

  @TEST_APM-11891 @AM @Functional @Low @MVP2 @automation @regression @smoke @scripts @approval-tier
  Scenario Outline: [S24][APM-1992] Confirmation popup - The UI will display a confirmation message when the Creator performs some actions without saving
    Given The Creator selects an Active item
    And The Creator clicks Edit button
    And The UI will be changed to Edit Mode
    When The Creator "<Action>"
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

@REQ_APM-10443 @approval-tier
  @TEST_APM-12711 @AM @Functional @Low @MVP2 @automation @regression @smoke @approval-tier
  Scenario: [S25][APM-10443] Save - Clear Currency value when the Creator does not input the Approval Amount Limit
    Given There is Active item with value in Approval Amount Limit column
    And The Creator selects this Active item
    And The Creator clicks Edit button
    And The UI will be changed to Edit Mode
    When The Creator removes original value of Approval Amount Limit
    And All the fields have passed the validations
    And The edited row does not duplicate together or duplicate any existing rows
    And Click on the Save button
    Then The original value of Approval Amount Limit will be cleared successfully
