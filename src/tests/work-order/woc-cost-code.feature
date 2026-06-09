@REQ_APM-10091
Feature: [Work Order Creation] Cost Code - No Cost Code Message

  Background:
    Given Access to the APM system
    And the user is on the Work Order Creation screen

  @TEST_APM-10921 @Layout @PM @Automation @Regression @Medium @work-order
  Scenario: Verify "No Cost Code Added" Message is Displayed
    Given No cost items have been added to the grid table
    When The page loads completely
    Then The table should display a "No Cost Code Added" message
