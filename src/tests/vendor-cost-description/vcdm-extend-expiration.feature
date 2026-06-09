@REQ_APM-1970 @vcdm
Feature: [Vendor Cost Description Mapping] Extend Vendor Cost assignment

  Background:
    Given Access to the APM system
    And the user is on the Vendor Cost Description Mapping screen

  @TEST_APM-8581 @Functional @automation @regression @smoke @MVP2 @Medium @vcdm
  Scenario Outline: [S17][APM-1970] The validation message will be shown if the status is not valid to extend
    When the user selects an item with the "<status>" status
    And the user clicks on the Extend button
    Then the system will show a toast message "The selected vendor costs should be in Approved!" with the "Warning" title
    And it keeps the selected row with the checkbox ticked-on

  Examples:
    | status           |
    | Pending Approval |
    | Rejected         |
    | Expired          |

  @TEST_APM-8585 @Functional @automation @regression @smoke @MVP2 @Low @vcdm
  Scenario: [S17][APM-1970] The Extend Vendor Cost popup will be closed when clicking on the X button
    When the user selects an Approved item
    And the user clicks on the Extend button
    Then the system opens the Extend Vendor Cost popup
    And the user clicks on the "X" button
    And the Extend Vendor Cost popup is closed
