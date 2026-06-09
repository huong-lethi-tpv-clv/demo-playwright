@REQ_APM-6649
Feature: [Menu Bar] Open new tab when clicking a page in expanded menu bar

  Background:
    Given the user is on any APM page

  @TEST_APM-8688 @Functional @automation @regression @smoke @MVP2 @High
  Scenario Outline: [S17][APM-6649] Clicking a menu item in expand mode opens the corresponding page in a new tab
    When the user opens the expand mode of the menu bar
    And the user opens all menu categories
    And the user clicks on "<Page>" in the menu bar
    Then the corresponding page opens in a new tab

    Examples:
      | Page                                 |
      | Invoice Creation                     |
      | Invoice Inquiry                      |
      | Cost Code List                       |
      | Vendor/Yard Cost Description Mapping |
      | Approval Tier Setting                |
