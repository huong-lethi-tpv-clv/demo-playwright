@REQ_APM-1962 @REQ_APM-6655 @vcdm
Feature: [Vendor Cost Description Mapping] Add new Vendor cost

  Background:
    Given Access to the APM system
    And the user is on the Vendor Cost Description Mapping screen

  @TEST_APM-7026 @Functional @automation @regression @MVP2 @High @scripts @vcdm
  Scenario: [S14][APM-1962] Generate new row when add a Vendor cost
    When the user clicks on the "Add Row" button
    Then a new row should be inserted at the top of the grid table on the current page
    And all existing rows should remain in their current state and position
    And the total number of results should remain the same

  @TEST_APM-7028 @Functional @automation @regression @smoke @MVP2 @High @scripts @vcdm
  Scenario: [S14][APM-1962] Allow the user to add new many rows
    When the user clicks on the "Add Row" button many times
    Then the grid table will generate new rows based on the times the user clicks

  @TEST_APM-7040 @Functional @automation @regression @smoke @MVP2 @Medium @scripts @vcdm
  Scenario: [S14][APM-1962] The system removes the corresponding row when the user clicks on "Delete" icon
    Given the user has clicked on the "Add Row" button
    And a new row has displayed in the table
    And the "Delete" icon of the new row has been shown
    When the creator clicks on the "Delete" icon
    Then the VCDM row is removed

  @TEST_APM-6910 @Functional @automation @regression @smoke @MVP2 @Low @scripts @vcdm
  Scenario: [S14][APM-6655] Vendor_Search like Vendor Code
    When the user clicks Add Row button
    And the user enters the Vendor Code in the Vendor field
    Then the system will search like data and show the result in the list
    And the user selects an item in VCDM
    And the selected item will be shown in Vendor field with Code and Name

  @TEST_APM-6971 @Functional @automation @regression @smoke @MVP2 @Low @vcdm
  Scenario: [S14][APM-6655] CHORUS Cost Code_Search like the Code
    When the user clicks Add Row button
    And the user enters the CHORUS Cost Code in the CHORUS Cost Code field
    Then the system will search like data and show the result in the list
    And the user selects an item in VCDM
    And the selected item will be shown in CHORUS Cost Code field with Code and Name

  @TEST_APM-6972 @Functional @automation @regression @smoke @MVP2 @Low @vcdm
  Scenario: [S14][APM-6655] CHORUS Cost Code_Search like with the Name
    When the user clicks Add Row button
    And the user enters the Name in the CHORUS Cost Code field
    Then the system will search like data and show the result in the list
    And the user selects an item in VCDM
    And the selected item will be shown in CHORUS Cost Code field with Code and Name
    And the user clears data in CHORUS Cost Code field
    And it will show all data in the list

  @TEST_APM-7032 @Functional @automation @regression @smoke @MVP2 @Low @vcdm
  Scenario: [S14][APM-6655] Yard_Search like Yard Code
    When the user clicks Add Row button
    And the user enters the Yard Code in the Yard field
    Then the system will search like data and show the result in the list
    And the user selects an item in VCDM
    And the selected item will be shown in Yard field with Code
    And the user clears data in Yard field
    And it will show all data in the list
