@REQ_APM-1961 @vcdm
Feature: [Vendor Cost Description Mapping] UI: Display vendor cost info

  Background:
    Given Access to the APM system
    And the user is on the Vendor Cost Description Mapping screen

  @TEST_APM-6543 @Functional @automation @regression @smoke @MVP2 @Medium @scripts @vcdm
  Scenario: [S13][APM-1961] The checkbox works well
    When the user ticks on the ALL checkbox in column header
    Then all element checkboxes are ticked
    And the user un-ticks on the ALL checkbox in column header
    And all element checkboxes are un-ticked
    And the user ticks on all element checkboxes
    And the ALL checkbox in column header is ticked
    And the user un-ticks on an element checkbox
    And the ALL checkbox in column header is un-ticked
