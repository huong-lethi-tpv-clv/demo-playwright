@REQ_APM-1642
Feature: [Invoice Creation] Upload Vendor Invoice file

  Background:
    Given the user is on the Invoice Creation screen

  @TEST_APM-2064 @Functional @automation @regression @smoke @MVP1 @High
  Scenario: [S1][APM-1642] Upload Vendor Invoice successfully with a valid PDF file
    When the user clicks the Show Vendor Inv. button
    And the user clicks the Upload button in the Vendor Invoice area
    And the user clicks the "Select file to upload" link in the Upload Invoice popup
    And the user selects a valid "PDF" file under 15MB
    And the user clicks the Upload button in the Upload Invoice popup
    Then the Upload Invoice popup is closed
    And the Vendor Invoice area is displayed with the correct UI layout
    And the uploaded file is shown in the Vendor Invoice area

  @TEST_APM-2260 @Functional @automation @regression @smoke @MVP1 @High
  Scenario: [S1][APM-1642] Upload Vendor Invoice successfully with a valid PNG file
    When the user clicks the Show Vendor Inv. button
    And the user clicks the Upload button in the Vendor Invoice area
    And the user clicks the "Select file to upload" link in the Upload Invoice popup
    And the user selects a valid "PNG" file under 15MB
    And the user clicks the Upload button in the Upload Invoice popup
    Then the Upload Invoice popup is closed
    And the Vendor Invoice area is displayed with the correct UI layout
    And the uploaded file is shown in the Vendor Invoice area

  @TEST_APM-2261 @Functional @automation @regression @smoke @MVP1 @Medium
  Scenario: [S1][APM-1642] Upload Vendor Invoice successfully with a valid JPG file
    When the user clicks the Show Vendor Inv. button
    And the user clicks the Upload button in the Vendor Invoice area
    And the user clicks the "Select file to upload" link in the Upload Invoice popup
    And the user selects a valid "JPG" file under 15MB
    And the user clicks the Upload button in the Upload Invoice popup
    Then the Upload Invoice popup is closed
    And the Vendor Invoice area is displayed with the correct UI layout
    And the uploaded file is shown in the Vendor Invoice area
