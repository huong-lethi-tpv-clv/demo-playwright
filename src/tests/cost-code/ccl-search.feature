@cost-code
Feature: [Cost Code List] Search cost code(s)

  Background:
    Given Access to the APM system
    And the user is on the Cost Code List screen

  @REQ_APM-1950 @TEST_APM-9442 @TEST_APM-9450 @TEST_APM-9466 @TEST_APM-9474 @TEST_APM-9515 @TEST_APM-9523 @TEST_APM-9531 @Functional @automation @regression @smoke @MVP2 @Low
  Scenario Outline: [S19][APM-1950][Cost Code List][Search] <fieldName> - Can search and select data in the dropdown list
    When the user clicks on the "<fieldName>" search field
    And the user inputs data to search
    Then the list shows results based on the search data
    And the user selects 1 item
    And the selected item is displayed in the "<fieldName>" field and the search data is removed
    And the user inputs other data to search
    And the list shows results based on the other search data
    And the user selects some items
    And the selected items are displayed in the "<fieldName>" field and the search data is removed

    Examples:
      | fieldName             |
      | ERP Account Code      |
      | Status                |
      | Cost Sub-Category     |
      | Activity Date         |
      | Module                |
      | Legacy Auto Cost Code |
      | Legacy Accrual Flag   |

  @REQ_APM-8725 @TEST_APM-9489 @Functional @automation @regression @smoke @MVP2 @Medium
  Scenario: [S19][APM-8725][Cost Code List][Search] Selected items will be un-selected when clicking the Search button
    When the user selects some items in some pages
    And the user selects ALL items in the current page
    And the user clicks on the Search button
    Then all selected items are un-selected
    And the total selected items count returns to 0

  @REQ_APM-8725 @TEST_APM-9494 @Functional @automation @regression @smoke @MVP2 @Medium
  Scenario: [S19][APM-8725][Cost Code List][Search] Cost Code - The system will search for "%LIKE%" based on the entered text
    When the user inputs data in the "Cost Code" search field
    And the user clicks on the Search button
    Then the system searches with LIKE based on the entered text
    And the user inputs other data in the "Cost Code" search field
    And the user clicks on the Search button
    And the system searches with LIKE based on the entered text

  @REQ_APM-8725 @TEST_APM-9495 @Functional @automation @regression @smoke @MVP2 @Medium
  Scenario: [S19][APM-8725][Cost Code List][Search] Cost Code Description - The system will search for "%LIKE%" based on the entered text
    When the user inputs data in the "Cost Code Description" search field
    And the user clicks on the Search button
    Then the system searches with LIKE based on the entered text
    And the user inputs other data in the "Cost Code Description" search field
    And the user clicks on the Search button
    And the system searches with LIKE based on the entered text

  @REQ_APM-11914 @TEST_APM-15302 @AM @Functional @MVP2 @Medium @automation @regression @smoke
  Scenario Outline: [S29][APM-11914][Cost Code List] Search data with the SVVD Required? filter
    Given the user expands the search area
    When the user selects "<option>" for the "SVVD Required?" filter
    And the user clicks on the Search button
    Then the search result returns data corresponding with the selected "<option>" conditions

    Examples:
      | option |
      | Yes    |
      | No     |
      | All    |
