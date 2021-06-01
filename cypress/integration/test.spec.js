import * as h from '../support/helpers.js';
import * as keys from '../support/keys.js';

describe('login and registration', () => {
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

  it('(slow) Logs in the user using form input', () => {
    const username = keys.TEST_USER_USERNAME;
    const password = keys.TEST_USER_PASSWORD;

    cy.visit(h.urls.loginForm);

    cy.get('#id_username').type(username);
    cy.get('#id_password').type(password);
    cy.get('#id_captcha_1').type('PASSED');
    cy.get('#form-button-submit').click();

  })

})

describe('tasks:task_list', () => {
  const testUrl = h.urls.taskList;

  const newTaskDescription = new Date().toString();

  it('Does not allow unauthenticated user to create new task', () => {
    cy.visit(testUrl)

    // #task-list-message tells user to login first
    cy.get('#task-list-message')
      .contains('You must login')

    // attempt to create new task
    cy.get('#task-create-input-description')
      .type(newTaskDescription)
    cy.get('#task-create-button-confirm')
      .click()

    // does not succeed, contains status message telling user to login
    cy.get('#status-message-notification')
      .contains('You must login')
  })

  it('Allows authenticated user to create new task', () => {
    cy.login().visit(testUrl)

    // create new task
    cy.get('#task-create-input-description')
        .type(newTaskDescription)  // enter task description
      .get('#task-create-button-confirm')
        .click()  // click submit button

    // first task list item contains newTaskDescription
    cy.reload() // reload stale DOM after HTMX updates page content
      .get('#task-list').then(($ul) => {
        expect($ul.children(':first').text())
          .contains(newTaskDescription)
    })

  })

  it('Allows authenticated user to update an existing task', () => {
    cy.login().visit(testUrl)

    cy.get('#task-list').then(($ul) => {
      // get newest task id
      const taskId = $ul.children()[0].dataset.taskId;

      // update newest task
      const updatedTaskMessage = new Date();
      cy.get(`#task-description-${taskId}`)
        .then(($descriptionEl) => {
          const originalTaskDescription = $descriptionEl.text()
          cy.get(`#task-icon-edit-${taskId}`).click()  // click the edit icon
          cy.get(`#task-update-description-${taskId}`)
            .type(String(updatedTaskMessage))  // edit the text
            .type('{enter}')  // submit
          cy.reload()
            .get(`#task-description-${taskId}`)
            .should('not.include.text', originalTaskDescription) // new description is different from old one
      })
    })
  })

  it('Allows authenticated user to delete an existing task', () => {
    cy.login()
      .visit(testUrl)

    cy.get('#task-list').then(($ul) => {
      // get newest task id
      const taskId = $ul.children()[0].dataset.taskId;

      // delete newest task
      cy.get(`#list-item-${taskId}`)
        .then(() => {
          cy.get(`#task-icon-delete-${taskId}`)
            .click() // click the delete icon
          cy.get(`#task-button-delete-${taskId}`)
            .click() // click the delete modal 'Confirm' button
      }).should('not.exist') // element no longer exists after deletion
    })
  })

  // it('Logs in the user using the login modal', () => {})
  // it('Registers a new user using the register modal', () => {})
})
