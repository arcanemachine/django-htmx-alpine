import * as h from '../support/helpers.js';
import * as keys from '../support/keys.js';

xdescribe('commands.js: login(), loginByCsrf()', () => {
  it('loginByCsrf() - Logs in the user using valid CSRF token', () => {
    cy.request(h.urls.loginForm)
      .its('body')
      .then((body) => {
        const $html = Cypress.$(body);
        const csrfToken = $html
          .find('input[name="csrfmiddlewaretoken"]').val();
        cy.loginByCsrf(csrfToken)
          .then((resp) => {
            expect(resp.status).to.eq(200);
            expect(resp.body).to.include('You are now logged in');
        })
    })
  })

  it('loginByCsrf() - Returns 403 without CSRF token', () => {
    cy.loginByCsrf('invalid-token')
      .its('status')
      .should('eq', 403);
  })

  it('login() - Gets valid CSRF token and logs in the user', () => {
    cy.login()
      .then((resp) => {
        expect(resp.status).to.eq(200);
        expect(resp.body).to.include('You are now logged in');
    })
  })

  xit('(slow) Logs in the user using form input', () => {
    cy.visit(h.urls.loginForm);

    cy.get('#id_username').type(username);
    cy.get('#id_password').type(password);
    cy.get('#id_captcha_1').type('PASSED');
    cy.get('#form-button-submit').click();

  })

})

describe('tasks:task_list', () => {
  let testUrl = h.urls.taskList;

  let newTaskDescription = new Date().toString();

  xit('Does not allow unauthenticated user to create new task', () => {
    cy.visit(testUrl)

    // #task-list-message tells user to login first
    cy.get('#task-list-message')
      .contains('You must login');

    // attempt to create new task
    cy.get('#new-task-input-text')
      .type(newTaskDescription);
    cy.get('#new-task-button-create')
      .click();

    // does not succeed, contains status message telling user to login
    cy.get('#status-message-notification')
      .contains('You must login');
  })

  it('Allows authenticated user to create new task', () => {
    cy.login()
      .visit(testUrl)
      // .contains('No tasks created');  // task list empty

    // create new task
    cy.get('#new-task-input-text')
      .type(newTaskDescription)
      .get('#new-task-button-create')
      .click();

    // first task list item contains newTaskDescription
    cy.reload() // reload stale DOM after HTMX updates page content
      .get('#task-list').then(($ul) => {
        expect($ul.children(':first').text())
          .contains(newTaskDescription)
    })

  })

  // it('Logs in the user using the login modal', () => {})
  // it('Registers a new user using the register modal', () => {})
})
