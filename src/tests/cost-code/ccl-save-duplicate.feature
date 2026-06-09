@cost-code
Feature: [Cost Code List] Save Cost Code and duplication check when updating

  Background:
    Given Access to the APM system
    And the user is on the Cost Code List screen

  @REQ_APM-9631 @TEST_APM-9884 @TEST_APM-9892 @TEST_APM-9900 @Functional @MVP2 @automation @regression @smoke @High
  Scenario Outline: [S20][APM-9631][Cost Code List][Save] Edit - Show success message when editing a <initialStatus> item with a Cost Code different from any existing item
    When the user picks a "<initialStatus>" item
    And the user clicks on the Edit button
    And the user modifies the Cost Category, Cost Sub-Category and Detail Code to values different from any existing item
    And the user clicks on the Save button
    Then the success message is shown with title "Success" and message "Save [number] cost code(s) successfully!"
    And the status changes to Pending Accounting Approval
    And the system updates the Updated By and Updated Date/Time fields
    And the rows are saved with the new values
    And the rows keep their position in the table
    And the selected checkboxes are kept

    Examples:
      | initialStatus               |
      | Pending Accounting Approval |
      | Pending Admin Approval      |
      | Rejected                    |
