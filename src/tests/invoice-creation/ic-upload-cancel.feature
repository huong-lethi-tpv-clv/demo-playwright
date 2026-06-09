@REQ_APM-2044
Feature: [Invoice Creation] Cancel uploading Vendor Invoice file

  Background:
    Given the user is on the Invoice Creation screen

  @TEST_APM-2061 @Functional @automation @regression @MVP1 @Low
  Scenario: [S2][APM-2044] Stop the uploading process by clicking Cancel
    When the user clicks the Show Vendor Inv. button
    And the user clicks the Upload button in the Vendor Invoice area
    And the user clicks the "Select file to upload" link in the Upload Invoice popup
    And the user selects a valid "PDF" file under 15MB
    And the user clicks the Upload button in the Upload Invoice popup
    And the user clicks the Cancel button while the file is uploading
    Then the Upload Invoice popup is closed
    And the uploaded file is not shown in the Vendor Invoice area
