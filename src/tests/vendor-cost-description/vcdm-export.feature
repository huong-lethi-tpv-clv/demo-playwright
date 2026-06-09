@REQ_APM-5854 @vcdm
Feature: [Vendor Cost Description Mapping] Export excel file

  Background:
    Given Access to the APM system
    And the user is on the Vendor Cost Description Mapping screen

  @TEST_APM-8133 @Functional @automation @regression @smoke @MVP2 @vcdm
  Scenario: [S16][APM-5854] Export function_Export successfully
    When the Vendor Cost Description Mapping table has data
    And the user sorts a column and checks some item lines
    And the user opens the Export popup
    And the options are All pages and Excel
    And the user clicks on Export
    Then the Export popup is closed
    And the message shows "The file is being exported!"
    And the result table is exported to Excel file with name "vendor_cost_description_mapping_list_yyyymmdd_hhmmssSSS.xlsx"
    And the message shows "The file has been exported successfully! View file"
    And the view file link can be clicked
    And the file is downloaded into the device with the same name as above
