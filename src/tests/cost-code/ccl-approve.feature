@cost-code
Feature: [Cost Code List] BPM (2nd Approver) approves Cost Code(s)

  Background:
    Given Access to the APM system
    And the user is on the Cost Code List screen

  @REQ_APM-8236 @TEST_APM-10026 @Functional @MVP2 @regression @automation @Low
  Scenario: [S20][APM-8236][Cost Code List][2nd-Approve] The Approve button is displayed in disabled mode when the user unselects all cost code rows
    Given the Approve button is displayed in disabled mode
    And the user selects at least one cost code row
    And the Approve button is displayed in enabled mode
    When the user unselects all cost code rows
    Then the Approve button is displayed in disabled mode

  @REQ_APM-8236 @TEST_APM-10028 @Functional @MVP2 @regression @automation @smoke @Medium
  Scenario: [S20][APM-8236][Cost Code List][2nd-Approve] Warning message when the 2nd Approver selects rows with all statuses
    Given the Approve button is displayed in disabled mode
    When the user selects cost code rows with Pending Admin Approval, Pending Accounting Approval, Rejected, SAP Interfacing, Active, and Inactive statuses
    And the Approve button is displayed in enabled mode
    And the 2nd Approver clicks on the Approve button
    Then the system shows a warning message with title "Warning" and message "The selected cost code(s) should be in Pending Admin Approval!"
