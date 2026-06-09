@cost-code
Feature: [Cost Code List] Copy Cost Code

  Background:
    Given Access to the APM system
    And the user is on the Cost Code List screen

  @REQ_APM-1955 @TEST_APM-9153 @Functional @automation @regression @smoke @MVP2 @Low
  Scenario: [S18][APM-1955][Cost Code List][Copy] The system removes the corresponding row when the creator clicks on the Remove icon
    Given the user has selected some rows
    And the user has clicked the Copy button and the new rows are displayed
    And the Remove icon of the new rows is shown
    When the user clicks on the Remove icon
    Then the system removes the corresponding row

  @REQ_APM-1955 @TEST_APM-9154 @Functional @automation @regression @smoke @MVP2 @Low
  Scenario: [S18][APM-1955][Cost Code List][Copy] The system resets the corresponding row when the creator clicks on the Reset icon
    Given the user has selected some rows
    And the user has clicked the Copy button and the new rows are displayed
    And the Reset icon of the new rows is shown
    When the user edits data in the new row
    And the user clicks on the Reset icon
    Then the system resets the corresponding row to the original value

  @REQ_APM-1955 @TEST_APM-9197 @Functional @automation @regression @smoke @MVP2 @Low
  Scenario: [S18][APM-1955][Cost Code List][Copy] Show group buttons and duplicated data rows when clicking multiple rows on multiple pages and copying in selected items page
    Given there are some selected items at multiple pages
    And the user is on the page that has the selected item
    When the user clicks the Copy button
    Then the Cancel and Save buttons are shown
    And the new rows are generated on top of the table
    And the data of the new copied rows is the same as the data of the selected rows
    And the checkbox column is hidden
    And there are Reset and Remove buttons at the end of the new rows
    And the new copied rows are highlighted
    And the pagination is not changed
