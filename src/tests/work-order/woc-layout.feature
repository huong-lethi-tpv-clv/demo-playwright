@REQ_APM-10091 @REQ_APM-10504
Feature: [Work Order Creation] Layout - Grid Table and Sub-Header

  Background:
    Given Access to the APM system
    And the user is on the Work Order Creation screen

  @TEST_APM-10913 @Layout @PM @Automation @Regression @Medium @work-order
  Scenario: Verify Grid Table is Displayed Correctly on Work Order Creation Screen
    When The page loads completely
    Then The grid table should be displayed correctly

  @TEST_APM-10886 @Layout @PM @Automation @Regression @High @work-order
  Scenario: Verify Sub-header Fields Displayed
    When The page loads completely
    Then The sub-header fields Vendor, Terminal/Yard and Activity Date should be displayed
