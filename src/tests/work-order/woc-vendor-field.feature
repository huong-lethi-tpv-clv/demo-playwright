@REQ_APM-10504
Feature: [Work Order Creation] Sub-Header - Vendor Field Search

  Background:
    Given Access to the APM system
    And the user is on the Work Order Creation screen

  @TEST_APM-10895 @Functional @PM @Automation @Regression @Medium @work-order
  Scenario: Verify Vendor Field Uses %LIKE% Search
    When The user types a search term in the "Vendor" field
    Then The Vendor field should retrieve the closest results using a %LIKE% search
