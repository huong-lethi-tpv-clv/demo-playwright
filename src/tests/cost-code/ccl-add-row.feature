@cost-code
Feature: [Cost Code List] Add new row(s)

  Background:
    Given Access to the APM system
    And the user is on the Cost Code List screen

  @REQ_APM-1952 @TEST_APM-8654 @Functional @automation @regression @smoke @MVP2 @Medium
  Scenario: [S17][APM-1952][Cost Code List][Add Row] Generate a new row when clicking on the Add Row button
    When the user clicks on the Add Row button
    Then a new row is inserted at the top of the grid table on the current page
    And all existing rows remain in their current state and position
    And the total number of results remains the same

  @REQ_APM-1952 @TEST_APM-8656 @Functional @automation @regression @smoke @MVP2 @Medium
  Scenario: [S17][APM-1952][Cost Code List][Add Row] Allow the user to add many new rows
    When the user clicks on the Add Row button many times
    Then the grid table generates new rows based on the number of times the button was clicked

  @REQ_APM-1952 @TEST_APM-8666 @Functional @automation @regression @smoke @MVP2 @Medium
  Scenario: [S17][APM-1952][Cost Code List][Add Row] The system removes the corresponding row when the creator clicks on the Remove icon
    Given the user has clicked on the Add Row button
    And a new row is displayed in the table
    And the Remove icon of the new rows is shown
    When the user clicks on the Remove icon
    Then the system removes the corresponding row

  @REQ_APM-1952 @TEST_APM-8667 @Functional @automation @regression @smoke @MVP2 @Medium
  Scenario: [S17][APM-1952][Cost Code List][Add Row] The system resets the corresponding row when the creator clicks on the Reset icon
    Given the user has clicked on the Add Row button
    And a new row is displayed in the table
    And the Reset icon of the new rows is shown
    When the user clicks on the Reset icon
    Then the system resets the corresponding row to the default values
