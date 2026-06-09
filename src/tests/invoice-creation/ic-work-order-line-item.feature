@REQ_APM-1901
Feature: [Invoice Creation] Work Order Line Item collapse and expand

  Background:
    Given the user is on the Invoice Creation screen

  @TEST_APM-3106 @Functional @Smoke @automation @regression @MVP1 @Medium
  Scenario: [S4][APM-1901] Line Item table can be collapsed and expanded
    When the user opens an Invoice Detail via direct link
    Then the ">" button is displayed in front of the Work Order number
    And the Line Item table is collapsed by default
    When the user clicks the ">" button
    Then the Line Item table is expanded and the "V" button is shown
    When the user clicks the "V" button
    Then the Line Item table is collapsed and the ">" button is shown

  @TEST_APM-3105 @Functional @Smoke @automation @regression @MVP1 @Medium
  Scenario: [S4][APM-1901] Line Item checkboxes work correctly
    When the user opens an Invoice Detail via direct link
    And the user ticks the ALL checkbox in the first column
    Then all Line Item checkboxes are ticked
    When the user un-ticks the ALL checkbox
    Then all Line Item checkboxes are un-ticked
    When the user ticks all individual Line Item checkboxes
    Then the ALL checkbox is ticked
    When the user un-ticks one Line Item checkbox
    Then the ALL checkbox is un-ticked
