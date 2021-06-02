import * as h from '../support/helpers.js';
import * as keys from '../support/keys.js';

describe('auth (registration, login, logout)', () => {

  it("userIsAuthenticated view reflects authentication state", () => {
    cy.visit(h.urls.userIsAuthenticated).contains('false')
      .login()
      .visit(h.urls.userIsAuthenticated).contains('true')
  })

  it("Registers a new user using the Register modal", () => {
    const username = h.randomString()
    const password = h.randomString()

    cy.visit(h.urls.taskList)
    
    // click the Register navbar item
    cy.get('[data-cy="navbar-burger"]').click()
      .get('[data-cy="navbar-item-register"]').first().click()

    // fill out and submit the form
    cy.get('[data-cy="register-input-username"]').type(username)
      .get('[data-cy="register-input-password1"]').type(password)
      .get('[data-cy="register-input-password2"]').type(password)
      .get('[data-cy="register-input-captcha"]').type('PASSED')
      .get('[data-cy="register-button-confirm"]').click()

    // after redirect, #status-message contains success message
    cy.contains('[data-cy="status-message"]', 'Registration successful')

    // user authentication check view returns 'true'
    cy.visit(h.urls.userIsAuthenticated).contains('true')
  })

  it("Logs in the user using the Login modal", () => {
    const username = keys.TEST_USER_USERNAME;
    const password = keys.TEST_USER_PASSWORD;

    cy.visit(h.urls.taskList)
    
    // click the Login navbar item
    cy.get('[data-cy="navbar-burger"]').click()
      .get('[data-cy="navbar-item-login"]').first().click()

    // fill out and submit the form
    cy.get('[data-cy="login-input-username"]').type(username)
      .get('[data-cy="login-input-password"]').type(password)
      .get('[data-cy="login-input-captcha"]').type('PASSED')
      .get('[data-cy="login-button-confirm"]').click()

    // after redirect, #status-message contains success message
    cy.contains('[data-cy="status-message"]', 'Login successful')

    // user authentication check view returns 'true'
    cy.visit(h.urls.userIsAuthenticated).contains('true')
  })

  it("Logs out the user using the Logout modal", () => {
    cy.login().visit(h.urls.taskList)

    // click the Logout navbar item
    cy.get('[data-cy="navbar-burger"]').click()
      .get('[data-cy="navbar-item-logout"]').first().click()

    // click the confirm button
    cy.get('[data-cy="logout-button-confirm"]').click()

    // after redirect, #status-message contains success message
    cy.contains('[data-cy="status-message"]', 'Logout successful')

    // user authentication check view returns 'true'
    cy.visit(h.urls.userIsAuthenticated).contains('false')
  })

  it("Logs in the user using special form input view", () => {
    const username = keys.TEST_USER_USERNAME;
    const password = keys.TEST_USER_PASSWORD;

    cy.visit(h.urls.loginForm)

    // fill out and submit the form
    cy.get('#id_username').type(username)
      .get('#id_password').type(password)
      .get('#id_captcha_1').type('PASSED')
      .get('#form-button-submit').click()

    // after redirect, #status-message contains success message
    cy.contains('[data-cy="status-message"]', 'Login successful')

    // user authentication check view returns 'true'
    cy.visit(h.urls.userIsAuthenticated).contains('true')
  })

  it("loginByCsrf() - Logs in the user using valid CSRF token", () => {
    cy.request(h.urls.loginForm)
      .its('body')
      .then((body) => {
        const $html = Cypress.$(body);
        const token = $html.find('input[name="csrfmiddlewaretoken"]').val()
        cy.loginByCsrf(token)
          .then((resp) => {
            expect(resp.status).to.eq(200);
            expect(resp.body).to.include('Login successful');
        })
    })

    // user authentication check view returns 'true'
    cy.visit(h.urls.userIsAuthenticated).contains('true')
  })

  it("loginByCsrf() - Returns 403 without CSRF token", () => {
    cy.loginByCsrf('invalid-token')
      .its('status')
      .should('eq', 403);
  })

  it("login() - Gets valid CSRF token and logs in the user", () => {
    cy.login()

    // user authentication check view returns 'true'
    cy.visit(h.urls.userIsAuthenticated).contains('true')
  })

})

describe("view: about", () => {
  const testUrl = h.urls.about;

  it("Alpine.JS demo adds 1 to counter when pressing the button", () => {
    cy.visit(testUrl)

      /* example using .then() chain and expect()
    cy.get('[data-cy="demo-alpine-counter-text"]').then((counter) => {
      cy.expect(counter.text()).to.equal('0')
    })

      /* example using should()
    cy.get('[data-cy="demo-alpine-counter-text"]').should('have.text', '0')
      */

    cy.get('[data-cy="demo-alpine-counter-button"]').then(($counterButton) => {
      cy.get('[data-cy="demo-alpine-counter-text"]').then(($counterText) => {

        // counter text should initially be '0'
        cy.get($counterText).should('have.text', '0')

        // counter text should be '1' after clicking the button
        cy.get($counterButton).click()
          .get($counterText).should('have.text', '1')

        // counter text should be '2' after clicking the button again
        cy.get($counterButton).click()
          .get($counterText).should('have.text', '2')

      })
    })
  })

  it("HTMX demo works with default options", () => {
    cy.visit(testUrl)
      .get('[data-cy="demo-htmx-input-submit"]').click()
      .get('[data-cy="demo-htmx-target"]')
      .should('contain.text', `The temperature in`)
      .should('contain.text', 'degrees Celsius')
  })

  it("HTMX demo works with valid city", () => {
    const cityName = 'New York City';

    cy.visit(testUrl)
      .get('[data-cy="demo-htmx-input-city"]').clear().type('New York City')
      .get('[data-cy="demo-htmx-input-submit"]').click()
      .get('[data-cy="demo-htmx-target"]')
      .should('contain.text', `The temperature in ${cityName}`)
      .should('contain.text', 'degrees Celsius')
  })

  it("HTMX demo works with metric units", () => {
    cy.visit(testUrl)
      .get('[data-cy="demo-htmx-input-units-metric"]')
      .click()
      .get('[data-cy="demo-htmx-input-submit"]').click()
      .get('[data-cy="demo-htmx-target"]')
      .should('contain.text', `The temperature in`)
      .should('contain.text', 'degrees Celsius')
  })

  it("HTMX demo works with imperial units", () => {
    cy.visit(testUrl)
    cy.get('[data-cy="demo-htmx-input-units-imperial"]')
      .click()
    cy.get('[data-cy="demo-htmx-input-submit"]').click()
    cy.get('[data-cy="demo-htmx-target"]')
      .should('contain.text', `The temperature in`)
      .should('contain.text', 'degrees Fahrenheit')
  })

  it("HTMX demo returns 404 for non-existent city", () => {
    cy.visit(testUrl)
    cy.get('[data-cy="demo-htmx-input-city"]').clear().type('Fake City')
    cy.get('[data-cy="demo-htmx-input-submit"]').click()
    cy.get('[data-cy="demo-htmx-target"]')
      .should('contain.text', `404`)
  })
})

describe("view: tasks:task_list", () => {
  const testUrl = h.urls.taskList;

  const newTaskDescription = new Date().toString();

  it("Does not allow unauthenticated user to create new task", () => {
    cy.visit(testUrl)

    // #task-list-message tells user to login first
    cy.get('#task-list-message')
      .contains('You must login')

    // attempt to create new task
    cy.get('#task-create-input-description')
      .type(newTaskDescription)
      .get('#task-create-button-confirm')
      .click()

    // does not succeed, contains status message telling user to login
      .get('[data-cy="status-message"]').contains('You must login')
  })

  it("Allows authenticated user to create new task", () => {
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

  it("Allows authenticated user to update an existing task", () => {
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

  it("Allows authenticated user to delete an existing task", () => {
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
            .get(`#task-button-delete-${taskId}`)
            .click() // click the delete modal 'Confirm' button
      }).should('not.exist') // element no longer exists after deletion
    })
  })

})
