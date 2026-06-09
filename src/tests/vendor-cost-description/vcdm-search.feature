@REQ_APM-1960 @vcdm
Feature: [Vendor Cost Description Mapping] Search Vendor cost

  Background:
    Given Access to the APM system
    And the user is on the Vendor Cost Description Mapping screen

  @TEST_APM-7509 @Functional @automation @regression @smoke @MVP2 @Low @scripts @vcdm
  Scenario: [S15][APM-1960] RHQ_Show RHQ field with default All
    Given the expand mode is opened
    When the user observes the default of RHQ field
    Then it shows All in RHQ field

  @TEST_APM-7516 @Functional @automation @regression @smoke @MVP2 @Low @scripts @vcdm
  Scenario: [S15][APM-1960] Yard_Show Yard with default All
    When the user observes the default of Yard field
    Then it shows All in Yard field

  @TEST_APM-7523 @Functional @automation @regression @smoke @MVP2 @Low @vcdm
  Scenario: [S15][APM-1960] Vendor_Show Vendor with default All
    When the user observes the default of Vendor field
    Then it shows All in Vendor field

  @TEST_APM-7530 @TESTSET_APM-9660 @Functional @Low @MVP2 @automation @regression @scripts @smoke @vcdm
  Scenario: [S15][APM-1960] Status_Show Status with default APPROVED
    Given the expand mode is opened
    When the user observes the default of Status field
    Then it shows APPROVED in Status field

  @TEST_APM-7537 @Functional @automation @regression @smoke @MVP2 @Low @scripts @vcdm
  Scenario: [S15][APM-1960] Chorus Cost Code_Show Chorus Cost Code with default All
    When the user observes the default of Chorus Cost Code field
    Then it shows All in Chorus Cost Code field

  @TEST_APM-7544 @Functional @automation @regression @smoke @MVP2 @Low @scripts @vcdm
  Scenario: [S15][APM-1960] ERP Account Code_Show ERP Account Code with default All
    Given the expand mode is opened
    When the user observes the default of ERP Account Code field
    Then it shows All in ERP Account Code field

  @TEST_APM-7551 @Functional @automation @regression @smoke @MVP2 @Low @scripts @vcdm
  Scenario: [S15][APM-1960] Vendor Cost Description_Default blank in field
    When the user observes the default of Vendor Cost Description field
    Then the default value is blank in the Vendor Cost Description field
    And the placeholder shows "Search for vendor code description"

  @TEST_APM-7554 @Functional @automation @regression @smoke @MVP2 @Low @scripts @vcdm
  Scenario: [S15][APM-1960] Approver/Rejecter_Default blank in field
    Given the expand mode is opened
    When the user observes the default of Approver/Rejecter field
    Then it shows blank in Approver/Rejecter field
    And the placeholder shows "Search for username & email"

  @TEST_APM-7575 @Functional @automation @regression @smoke @MVP2 @Low @scripts @vcdm
  Scenario: [S15][APM-1960] Mode_Switch between Collapse and Expand Mode
    When the default mode of the search filters is collapse
    And the user clicks on the Expand all filters button to view the search filters in expand mode
    Then the filter will expand to Expand Mode
    And the user clicks on the Collapse filters button to view the search filters in collapse mode
    And the filter will collapse to Collapse Mode

  @TEST_APM-7604 @Functional @automation @regression @smoke @MVP2 @Low @scripts @vcdm
  Scenario: [S15][APM-1960] Yard_Can search and select data in the dropdown list
    When the user clicks on the Yard field
    And the user inputs data to search in VCDM
    Then the list shows the result based on search data
    And the user selects 1 item in VCDM
    And the selected item is displayed on the Yard field and search data is removed
    And the user inputs other data to search in VCDM
    And the list shows the result based on other data
    And the user selects some items in VCDM
    And the selected items are displayed on the Yard field and search data is removed

  @TEST_APM-7606 @Functional @automation @regression @smoke @MVP2 @Low @vcdm
  Scenario: [S15][APM-1960] Vendor_Can search and select data in the dropdown list (by code or name)
    When the user clicks on the Vendor field
    And the user inputs data to search in VCDM
    Then the list shows the result based on search input
    And the user selects 1 item in VCDM
    And the selected item is displayed on the Vendor field and search data is removed
    And the user inputs other data to search in VCDM
    And the list shows the result based on search data
    And the user selects some items in VCDM
    And the selected items are displayed on the Vendor field and search data is removed

  @TEST_APM-7607 @Functional @automation @regression @smoke @MVP2 @Low @vcdm
  Scenario: [S15][APM-1960] CHORUS Cost Code_Can search and select data in the dropdown list (by code or name)
    When the user clicks on the CHORUS Cost Code field
    And the user inputs data to search in VCDM
    Then the list shows the result based on search data
    And the user selects 1 item in VCDM
    And the selected item is displayed on the CHORUS Cost Code field and search data is removed
    And the user inputs other data to search in VCDM
    And the list shows the result based on search input
    And the user selects some items in VCDM
    And the selected items are displayed on the CHORUS Cost Code field and search data is removed

  @TEST_APM-7608 @Functional @automation @regression @smoke @MVP2 @Low @vcdm
  Scenario: [S15][APM-1960] Status_Can search and select data in the dropdown list
    When the user clicks on the Status field
    And the user inputs data to search in VCDM
    Then the list shows the result based on search data
    And the user selects 1 item in VCDM
    And the selected item is displayed on the Status field and search data is removed
    And the user inputs other data to search in VCDM
    And the list shows the result based on other data
    And the user selects some items in VCDM
    And the selected items are displayed on the Status field and search data is removed

  @TEST_APM-7609 @Functional @automation @regression @smoke @MVP2 @Low @vcdm
  Scenario: [S15][APM-1960] ERP Account Code_Can search and select data in the dropdown list
    When the user clicks on the ERP Account Code field
    And the user inputs data to search in VCDM
    Then the list shows the first result based on search data
    And the user selects 1 item in VCDM
    And the selected item is displayed on the ERP Account Code field and search data is removed
    And the user inputs other data to search in VCDM
    And the list shows the second result based on search data
    And the user selects some items in VCDM
    And the selected items are displayed on the ERP Account Code field and search data is removed
