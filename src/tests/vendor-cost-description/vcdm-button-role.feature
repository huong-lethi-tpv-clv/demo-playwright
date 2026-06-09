@REQ_APM-6833 @vcdm
Feature: [Vendor Cost Description Mapping] Show buttons by user roles

  Background:
    Given Access to the APM system
    And the user is on the Vendor Cost Description Mapping screen

  @TEST_APM-7585 @Functional @automation @regression @smoke @MVP2 @Low @scripts @vcdm
  Scenario: [S15][APM-6833] Approver_Default showing 3 buttons (Approve, Reject, Export) for Approver
    When the user observes the buttons on the header
    Then it displays 3 buttons: Approve, Reject and Export button

  @TEST_APM-7590 @Functional @automation @regression @smoke @MVP2 @Low @scripts @vcdm
  Scenario: [S15][APM-6833] Creator_Default showing buttons for Creator (Delete, Edit, Copy, Extend, Export, Import, Add Row)
    When the user observes the buttons on the header
    Then it displays buttons: Delete, Extend, Edit, Copy, Export, Import, Add Row button
