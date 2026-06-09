@REQ_APM-28833 @invoice-creation
Feature: [Invoice Creation] Page layout and navigation

  @TEST_APM-28825 @TESTSET_APM-28824 @Functional @automation @regression @smoke
  Scenario: Access to the Invoice Creation page
    When the user navigates to the Invoice Creation screen
    Then the title "Invoice Creation" is displayed

  @TEST_APM-28826 @TESTSET_APM-28824 @Functional @automation @regression @smoke
  Scenario: Check the Confirm button is enabled
    When the user navigates to the Invoice Creation screen
    Then the Confirm button is enabled
