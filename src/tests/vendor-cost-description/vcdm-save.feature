@REQ_APM-1965 @vcdm
Feature: [Vendor Cost Description Mapping] Save a Vendor cost

  Background:
    Given Access to the APM system
    And the user is on the Vendor Cost Description Mapping screen

  @TEST_APM-8589 @Functional @automation @regression @smoke @MVP2 @High @scripts @vcdm
  Scenario: [S17][APM-8154] The Vendor Cost changes status from "Rejected" to "Pending Approval" after saving
    Given the creator has selected 1 item and clicked on "Edit" button
    And this vendor cost mapping status is "Rejected"
    When the creator edits valid information to all fields
    And the creator clicks on "Save" button
    Then the vendor cost is saved successfully
    And the status of this vendor should change from "Rejected" to "Pending Approval"
    And the Updated By and Update DateTime should be updated as Singapore time
