@REQ_APM-10504
Feature: [Work Order Creation] Sub-Header - Activity Date Label

  Background:
    Given Access to the APM system
    And the user is on the Work Order Creation screen

  @TEST_APM-10898 @Layout @PM @Automation @Regression @Medium @work-order
  Scenario: Verify Activity Date Label Displays Field Name
    When The user views the "Activity Date" field
    Then The label should display only the field name with no default value
