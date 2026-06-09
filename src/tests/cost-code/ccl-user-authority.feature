@cost-code
Feature: [Cost Code List] Show/hide buttons by user role

  Background:
    Given Access to the APM system
    And the user is on the Cost Code List screen

  @REQ_APM-8158 @TEST_APM-8476 @Layout @automation @regression @smoke @MVP2 @Low
  Scenario Outline: [S17][APM-8158][Cost Code List][User Authority] Creator user can see some enabled buttons
    When the user observes the UI
    Then the "<Button>" button is enabled
    And the UI layout matches the UI design
    And the user sorts data in a column
    And the "<Button>" button is still enabled
    And the user changes to another page
    And the "<Button>" button is still kept enabled

    Examples:
      | Button  |
      | Add Row |
      | Import  |
      | Export  |

  @REQ_APM-8158 @TEST_APM-8478 @Layout @automation @regression @smoke @MVP2 @Low
  Scenario Outline: [S17][APM-8158][Cost Code List][User Authority] Creator user can see some disabled buttons
    When the user observes the UI
    Then the "<Button>" button is disabled
    And the UI layout matches the UI design
    And the user sorts data in a column
    And the "<Button>" button is still disabled
    And the user changes to another page
    And the "<Button>" button is still kept disabled

    Examples:
      | Button     |
      | Edit       |
      | Copy       |
      | Deactivate |
      | Reactivate |
