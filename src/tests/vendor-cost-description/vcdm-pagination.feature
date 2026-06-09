@REQ_APM-6301 @vcdm
Feature: Pagination (common) - Vendor Cost Description Mapping

  Background:
    Given Access to the APM system
    And the user is on the Vendor Cost Description Mapping screen

  @TEST_APM-6554 @Functional @automation @regression @smoke @MVP2 @Medium @scripts @vcdm
  Scenario: [S13][APM-6301] Navigate to a specific page number
    When the user clicks on a specific page number in VCDM
    Then the user should be taken to that specific page
    And the data in the Vendor Cost Description Mapping list should update correctly in accordance with the Show n items setting

  @TEST_APM-6555 @Functional @automation @regression @MVP2 @Low @vcdm
  Scenario: [S13][APM-6301] Navigate to the next page
    Given the user is on a specific page
    When the user clicks the "Next" icon
    Then the user should be taken to the next page
    And the data in the Vendor Cost Description Mapping list should update correctly in accordance with the Show n items setting

  @TEST_APM-6556 @Functional @automation @regression @smoke @MVP2 @Low @vcdm
  Scenario: [S13][APM-6301] Navigate to the previous page
    Given the user is not on the first page
    When the user clicks the "Previous" icon
    Then the user should be taken to the previous page
    And the data in the Vendor Cost Description Mapping list should update correctly in accordance with the Show n items setting

  @TEST_APM-6557 @Functional @automation @regression @smoke @MVP2 @Low @scripts @vcdm
  Scenario: [S13][APM-6301] Navigate to the last page
    Given the user is not on the last page
    When the user clicks on the "Last" button
    Then the user should be taken to the last page
    And the data in the Vendor Cost Description Mapping list should update correctly in accordance with the Show n items setting

  @TEST_APM-6558 @Functional @automation @regression @smoke @MVP2 @Low @scripts @vcdm
  Scenario: [S13][APM-6301] Navigate to the first page
    Given the user is not on the first page
    When the user clicks on the "First" button
    Then the user should be taken to the first page
    And the data in the Vendor Cost Description Mapping list should update correctly in accordance with the Show n items setting
