@REQ_APM-10072
Feature: [Work Order Creation] Sub-Header - VVD Fields

  Background:
    Given Access to the APM system
    And the user is on the Work Order Creation screen

  @TEST_APM-11387 @Layout @Regression @Smoke @Automation @High @PM @work-order
  Scenario: Verify that the Voyage No field is disabled when no Vessel Code is selected
    Given I have not selected a Vessel Code
    When I view the Voyage No field
    Then the Voyage No field should be disabled

  @TEST_APM-11390 @Layout @Regression @Smoke @Automation @Low @PM @work-order
  Scenario: Verify that the VVD field is displayed with placeholders for Vessel Code, Voyage No, and Direction
    When I view the VVD fields
    Then I should see placeholders for "Search for vessel code", "Search for voyage no", and "Search for direction"
