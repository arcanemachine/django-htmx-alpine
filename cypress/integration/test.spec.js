import * as h from './helpers.js';

let testUrl = h.serverUrl;

describe('tasks:task_list', () => {
  it('Loads the page', () => {
    cy.visit(testUrl)

    // #task-list-message tells user to login first
    cy.get('#task-list-message')
      .contains('You must login')

    // attempt to create new task
    cy.get('#new-task-input-text')
      .type('New task')
    cy.get('#new-task-button-create')
      .click()

    // does not succeed, contains status message telling user to login
    cy.get('#status-message-notification')
      .contains('You must login')
  })
})
