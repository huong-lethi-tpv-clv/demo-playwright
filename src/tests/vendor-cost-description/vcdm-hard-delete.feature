@REQ_APM-1966 @vcdm
Feature: [Vendor Cost Description Mapping] Hard delete Vendor cost(s)

  Background:
    Given Access to the APM system
    And the user is on the Vendor Cost Description Mapping screen

  @TEST_APM-7973 @Functional @automation @regression @smoke @MVP2 @Low @scripts @vcdm
  Scenario: [S16][APM-1966] The Delete button switches to enable mode when the user selects at least 1 item
    Given the Delete button shows in disable mode by default
    When the user selects 1 item in VCDM
    Then the Delete button is enabled
    And the user changes to other pages
    And the Delete button is still enabled

  @TEST_APM-7974 @Functional @automation @regression @smoke @MVP2 @Low @scripts @vcdm
  Scenario: [S16][APM-1966] The Delete button switches to disable mode when the user unselects all items
    Given the Delete button shows in disable mode by default
    When the user selects some items in VCDM
    And the Delete button is enabled
    And the user changes to other pages and selects some items
    And the Delete button is still enabled
    And the user unselects all items
    Then the Delete button is disabled

  @TEST_APM-7975 @Functional @automation @regression @smoke @MVP2 @Low @vcdm
  Scenario: [S16][APM-1966] Show the confirmation popup when the user selects Pending Approval items to delete
    Given the Delete button shows in disable mode by default
    When the user selects some Pending Approval items
    And the Delete button is enabled
    And the user clicks on the Delete button
    Then the system shows a confirmation popup titled "Delete Vendor Costs" and the content "This action can not be undone. Are you sure you want to remove the selected items from the list?"
    And it displays 2 buttons Yes and No

  @TEST_APM-7976 @Functional @automation @regression @smoke @MVP2 @High @scripts @vcdm
  Scenario: [S16][APM-1966] Delete Pending Approval items successfully
    Given the Delete button shows in disable mode by default
    When the user selects some Pending Approval items and deletes
    Then the selected items will be removed from the list

  @TEST_APM-7977 @Functional @automation @regression @smoke @MVP2 @Medium @scripts @vcdm
  Scenario: [S16][APM-1966] Cancel the confirmation popup
    Given the Delete button shows in disable mode by default
    When the user selects some Pending Approval items and clicks delete
    And the system shows a confirmation popup titled "Delete Vendor Costs" and the content "This action can not be undone. Are you sure you want to remove the selected items from the list?"
    And the user clicks on the No button
    Then the popup is closed
    And all selected items and their checkboxes are still kept

  @TEST_APM-7983 @Functional @automation @regression @smoke @MVP2 @Medium @scripts @vcdm
  Scenario: [S16][APM-1966] Show the message when the user selects Approved/Expired/Rejected items
    Given the Delete button shows in disable mode by default
    When the user selects some Approved/Expired/Rejected items and clicks delete
    Then the system shows a toast message "The selected vendor costs should be in Pending Approval!"
    And all selected items and their checkboxes are still kept
