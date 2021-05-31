import * as h from '../support/helpers.js';
import * as keys from '../support/keys.js';

xdescribe('tasks:task_list', () => {
  let testUrl = h.urls.taskList;
  it('Does not allow unauthenticated user to create new task', () => {
    cy.visit(testUrl)

    // #task-list-message tells user to login first
    cy.get('#task-list-message')
      .contains('You must login');

    // attempt to create new task
    cy.get('#new-task-input-text')
      .type('New task');
    cy.get('#new-task-button-create')
      .click();

    // does not succeed, contains status message telling user to login
    cy.get('#status-message-notification')
      .contains('You must login');
  })
})

describe('users:login', () => {
  let username = keys.TEST_USER_USERNAME;
  let password = keys.TEST_USER_PASSWORD;
  let testUrl = h.urls.loginForm;

  Cypress.Commands.add('login', (csrfToken) => {
    cy.request({
      method: 'POST',
      url: h.urls.loginForm,
      failOnStatusCode: false, // dont fail so we can make assertions
      form: true, // we are submitting a regular form body
      body: {
        username,
        password,
        captcha_0: 'PASSED',
        captcha_1: 'PASSED',
        csrfmiddlewaretoken: csrfToken, // insert this as part of form body
      },
    })
  })

  it('Returns 403 without CSRF token', () => {
    cy.login('invalid-token')
      .its('status')
      .should('eq', 403);
  })

  it('Logs in the user via login()', () => {
    cy.request(h.urls.loginForm)
      .its('body')
      .then((body) => {
        const $html = Cypress.$(body);
        const csrfToken = $html
          .find('input[name="csrfmiddlewaretoken"]').val();
        cy.login(csrfToken)
          .then((resp) => {
            expect(resp.status).to.eq(200);
            expect(resp.body).to.include('You are now logged in');
          })
      })
  })

  xit('(slow) Logs in the user using form input', () => {
    cy.visit(testUrl);

    cy.get('#id_username').type(username);
    cy.get('#id_password').type(password);
    cy.get('#id_captcha_1').type('PASSED');
    cy.get('#form-button-submit').click();

  })

})
