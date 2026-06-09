@cost-code
Feature: [Cost Code List] Accountant assigns ERP Account Code for Cost Code

  Background:
    Given Access to the APM system
    And the user is on the Cost Code List screen

  @REQ_APM-8954 @TEST_APM-9839 @Functional @MVP2 @automation @regression @smoke @Medium
  Scenario Outline: [S20][APM-8954][Cost Code List][Assign ERP] Show validation when combining valid and invalid status rows on the same page
    When the user selects a row with the invalid status "<Status>"
    And the user selects a row with the status "Pending Accounting Approval" in the same page
    And the user clicks on the Assign ERP button
    Then the system shows a validation message "The selected cost code(s) should be in Pending Accounting Approval!" with title "Warning"
    And the checkboxes are kept for selected rows

    Examples:
      | Status                 |
      | PENDING ADMIN APPROVAL |
      | SAP INTERFACING        |
      | REJECTED               |
      | ACTIVE                 |
      | INACTIVE               |

  @REQ_APM-8954 @TEST_APM-9844 @Functional @MVP2 @Medium @automation @regression @smoke
  Scenario: [S20][APM-8954][Cost Code List][Assign ERP] ERP Account Code - Search like ERP Account Code
    Given the Assign ERP mode is open
    When the user enters the ERP Account Code in the ERP Account Code field
    Then the system searches using LIKE and shows the result in the list
    And the user selects an item
    And the selected item is shown in the ERP Account Code field
    And the user clears data in the ERP Account Code field using the X button
    And all data is shown in the list

  @REQ_APM-8954 @TEST_APM-9851 @Functional @Low @MVP2 @automation @regression
  Scenario: [S20][APM-8954][Cost Code List][Assign ERP] ERP Account Code - Can remove the selected ERP Account Code by clicking on the X icon
    Given the Assign ERP mode is open
    When the user searches and selects an ERP Account Code in the ERP Account Code field
    And the user clicks on the X icon to remove the selected item
    Then the selected item is removed from the ERP Account Code field
    And the ERP Account Code item is not highlighted

  @REQ_APM-8954 @TEST_APM-9854 @Functional @Low @MVP2 @automation @regression @smoke
  Scenario: [S20][APM-8954][Cost Code List][Assign ERP] The Discard Change message will not be shown if clicking Cancel without a selected ERP Account Code (single select)
    When the user selects a row with the status "Pending Accounting Approval"
    And the user clicks on the Assign ERP button
    And the user selects data in the ERP Account Code field
    And the user clicks the X button to delete data in the ERP Account Code field
    And the user clicks on the Cancel button
    Then the Discard Change message will not be shown
    And the Assign ERP mode is closed and the selected row is kept
