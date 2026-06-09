@REQ_APM-10097
Feature: [Work Order Creation] Grid Table - Add Row and Trash Icon

  Background:
    Given Access to the APM system
    And the user is on the Work Order Creation screen

  @TEST_APM-11315 @Layout @Regression @Smoke @Automation @High @Automated @PM @work-order
  Scenario: Verify that the "Add Row" button is displayed on the Work Order Creation page
    When The page loads completely
    Then The "Add Row" button should be displayed

  @TEST_APM-11316 @Layout @Regression @Smoke @Automation @Medium @PM @Automated @work-order
  Scenario: Verify that newly added rows are inserted at the top of the grid table
    When The user clicks the "Add Row" button
    Then A new row should be inserted at the top of the grid table

  @TEST_APM-11317 @Functional @Regression @Smoke @Automation @High @Automated @PM @work-order
  Scenario: Verify that clicking the "Trash" icon removes the corresponding row
    When The user clicks the "Add Row" button
    And The user clicks the "Trash" icon
    Then The system should remove the corresponding row from the table
