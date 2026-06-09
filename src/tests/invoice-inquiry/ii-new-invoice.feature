@REQ_APM-1647
Feature: [Invoice Inquiry] New Invoice button opens Invoice Creation in a new tab

  Background:
    Given the user has accessed the Invoice Inquiry page

  @TEST_APM-2109 @Functional @automation @regression @MVP1 @High
  Scenario: [S1][APM-1647] The Invoice Creation page opens in a new tab when clicking New Invoice
    When the user clicks the New Invoice button
    Then the Invoice Creation page is opened in a new tab
    And the Invoice Creation page is displayed
