@REQ_APM-11571 @approval-tier
Feature: [Approval Tier Setting] Deactivate an approval setting

  Background:
    Given Access to the APM system
    And the user is on the Approval Tier Setting screen

  @TEST_APM-15323 @AM @Functional @MVP2 @Medium @automation @regression @smoke @approval-tier
  Scenario Outline: [S29][APM-11571] The Deactivate button is enabled when there is at least 1 row selected
    Given The Deactivate button is disabled as the default mode
    When Click on some "<status>" row(s)
    Then The Deactivate button is enabled

    Examples:
      | status              |
      | Active              |
      | Inactive            |
      | Active and Inactive |

  @TEST_APM-15325 @AM @Functional @MVP2 @Medium @automation @regression @smoke @approval-tier
  Scenario Outline: [S29][APM-11571] The system shows "The selected approval setting(s) should be in Active!" when deactivating the Inactive row
    When Click on some "<status>" row(s)
    And Click on the Deactivate button
    Then The system shows the toasty message: "The selected approval setting(s) should be in Active!"
    And Keep checkboxes for selected rows

    Examples:
      | status              |
      | Inactive            |
      | Active and Inactive |
