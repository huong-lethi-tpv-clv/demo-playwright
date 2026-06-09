@cost-code
Feature: [Cost Code List] Reject Cost Code(s)

  Background:
    Given Access to the APM system
    And the user is on the Cost Code List screen

  @REQ_APM-8240 @TEST_APM-9969 @Functional @MVP2 @automation @regression @smoke @High
  Scenario: [S20][APM-8240][Cost Code List][Reject 1st] Reject successfully when inputting full reasons for all rejected rows and confirming with Ok (reject many rows on 1 page)
    Given there are some selected items in 1 page
    And the user is in Reject mode
    When the Reject Reason fields have content for all selected rows
    And the user clicks on the Confirm button
    Then the system shows a popup with title "Confirm to reject cost codes" and message "Are you sure you want to reject cost codes?" with Ok and Cancel buttons
    And the user chooses Ok in the popup
    And the system shows a success message "Reject [number] cost codes successfully!"
    And the cost codes that are rejected change their status to Rejected
    And the Reject Reason column displays the reason
    And the selected rows are kept checked
    And the system returns to default mode for 1st Approver
    And the Approved/Rejected By and Approved/Rejected Date/Time columns are updated

  @REQ_APM-8240 @TEST_APM-9984 @Functional @MVP2 @automation @regression @smoke @High
  Scenario Outline: [S20][APM-8240][Cost Code List][Reject 1st] Show warning when rejecting items with wrong status
    Given the selected items have the status "<status>"
    When the user clicks on the Reject button
    Then the system displays a warning message with title "Warning" and message "The selected cost codes should be in Pending Accounting Approval!"
    And the selected rows keep their checkboxes

    Examples:
      | status                 |
      | Pending Admin Approval |
      | Rejected               |
      | SAP Interfacing        |
      | Inactive               |
      | Active                 |

  @REQ_APM-9622 @TEST_APM-10358 @Functional @High @MVP2 @automation @regression @smoke
  Scenario: [S21][APM-9622][Cost Code List][Reject Admin] Reject successfully when inputting full reasons for all rejected rows and confirming with Ok (reject many rows on 1 page)
    Given there are some valid selected items in 1 page
    And the user is in Reject mode
    When the Reject Reason fields have content for all selected rows
    And the user clicks on the Confirm button
    Then the system shows a popup with title "Confirm to reject cost code(s)" and message "Are you sure you want to reject cost code(s)?" with Ok and Cancel buttons
    And the user chooses Ok in the popup
    And the system shows a success message "Reject [number] cost code(s) successfully!" equal to the number of selected items
    And these cost codes change their status to Rejected
    And the Reject Reason column displays the reason
    And the selected rows are kept checked
    And the system returns to default mode for Final Approver
    And the Approved/Rejected By and Approved/Rejected Date/Time columns are updated
