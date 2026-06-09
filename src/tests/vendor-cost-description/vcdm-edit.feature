@REQ_APM-1963 @vcdm
Feature: [Vendor Cost Description Mapping] Edit Vendor cost

  Background:
    Given Access to the APM system
    And the user is on the Vendor Cost Description Mapping screen

  @TEST_APM-7490 @Functional @automation @regression @smoke @MVP2 @Low @scripts @vcdm
  Scenario Outline: [S15][APM-1963] Keep as old data for fields with "<status>" status
    When the creator selects 1 row with "<status>" status
    And the creator clicks the Edit button
    Then the RHQ, Yard Code, Vendor, Vendor Cost Description, Module, CHORUS Cost Code, Effective Date, Expiration Date fields should display as editable fields
    And the data of the selected row should keep as old data

  Examples:
    | status           |
    | Pending Approval |
    | Rejected         |

  @TEST_APM-7491 @Functional @automation @regression @smoke @MVP2 @Low @vcdm
  Scenario Outline: [S15][APM-1963] The creator can edit on RHQ for "<status>" status
    Given the creator has selected 1 row with "<status>" status
    And the creator has clicked the Edit button
    And the editable row is displaying in the table
    When the user enters a valid RHQ Code in the RHQ field
    Then the system executes a search matching the entered data and displays the results in a list
    When the user selects an item from the search results
    Then the selected item's Code is displayed in the RHQ field
    When the user clears data in the RHQ field
    Then the system refreshes and shows all possible data in the list

  Examples:
    | status           |
    | Pending Approval |
    | Rejected         |

  @TEST_APM-7493 @Functional @automation @regression @smoke @MVP2 @Low @vcdm
  Scenario Outline: [S15][APM-1963] The creator can edit on Vendor field for "<status>" status
    Given the creator has selected 1 row with "<status>" status
    And the creator has clicked the Edit button
    And the editable row is displaying in the table
    When the user enters a valid Vendor in the Vendor field
    Then the system executes a search matching the entered data and displays the results in a list
    When the user selects an item from the search results
    Then the selected item's Code is displayed in the Vendor field
    When the user clears data in the Vendor field
    Then the system refreshes and shows all possible data in the list

  Examples:
    | status           |
    | Pending Approval |
    | Rejected         |

  @TEST_APM-7494 @Functional @automation @regression @smoke @MVP2 @Low @scripts @vcdm
  Scenario Outline: [S15][APM-1963] The creator can edit on Vendor Cost Description field for "<status>" status
    Given the creator has selected 1 row with "<status>" status
    And the creator has clicked the Edit button
    And the editable row is displaying in the table
    When the user inputs Vendor Cost Description with number of characters less than 500
    Then the inputted value should show on Vendor Cost Description field

  Examples:
    | status           |
    | Pending Approval |
    | Rejected         |
