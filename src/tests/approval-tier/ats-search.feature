@REQ_APM-1989 @approval-tier
Feature: [Approval Tier Setting] Search approval setting

  Background:
    Given Access to the APM system
    And the user is on the Approval Tier Setting screen

  @TEST_APM-10260 @Functional @MVP2 @Medium @automation @regression @smoke @approval-tier
  Scenario: [S21][APM-1989] Reset button works correctly
    When Input searching condition in all fields of Collapse Filters mode
    And Click on the Reset button to clear collapse data
    Then All fields are gone back to default value
    And Click on Expand All Filters button first time
    And Input searching condition in all fields of Expand All Filters mode first time
    And Click on the Reset button to clear expand data
    And All fields are gone back to default value with expand data

  @TEST_APM-10270 @Functional @Low @MVP2 @automation @regression @smoke @approval-tier
  Scenario: [S21][APM-1989] RHQ - Can search LIKE data in this field and select data
    When Input valid searching condition in RHQ field
    Then The searching result is shown with LIKE mode
    And Select an item in the searching result
    And Selected item is shown in this field

  @TEST_APM-10280 @Functional @Low @MVP2 @automation @regression @smoke @approval-tier
  Scenario: [S21][APM-1989] Office - Can search LIKE data in this field and select data
    When Input valid searching condition in Office field
    Then The searching result is shown with LIKE mode
    And Select an item in the searching result
    And Selected item is shown in this field

  @TEST_APM-10282 @Functional @Low @MVP2 @automation @regression @smoke @scripts @approval-tier
  Scenario: [S21][APM-1989] Approver - It allows to input free text
    When Enter free text in Approver field
    Then It allows to input free text

  @TEST_APM-10377 @Functional @Low @MVP2 @automation @regression @smoke @scripts @approval-tier
  Scenario: [S21][APM-1989] Status - Can search LIKE data in this field and select data
    When Input valid searching condition in Status field
    Then The searching result is shown with LIKE mode
    And Select an item in the searching result
    And Selected item is shown in this field

  @TEST_APM-10390 @Functional @Low @MVP2 @automation @regression @smoke @approval-tier
  Scenario: [S21][APM-1989] Cost Code - It allows to input free text
    When Enter free text in Cost Code field
    Then It allows to input free text
