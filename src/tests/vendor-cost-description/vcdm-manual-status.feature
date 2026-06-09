@REQ_APM-7086 @vcdm
Feature: [Vendor Cost Description Mapping] Update expiration status when approving

  Background:
    Given Access to the APM system
    And the user is on the Vendor Cost Description Mapping screen

  @TEST_APM-7477 @Functional @automation @regression @smoke @MVP2 @High @vcdm
  Scenario: [S15][APM-7086] If "Expiration Date - Today < 0 day", the status will be "Expired" when approving
    Given there are some items with Pending Approval status
    And they are matched with the condition "Expiration Date - Today < 0 day"
    When the user selects these items and clicks Approve button
    And the user clicks "Yes" in the message "Are you sure you want to approve the selected vendor costs?"
    Then it shows the message "Approved successfully."
    And the status of these items are changed from Pending Approval to Expired
