/* eslint no-undef: 0 */

import * as h from '../support/helpers.js';
import * as keys from '../support/keys.js';

describe('auth (registration, login, logout)', () => {

  it("(utility) Ensures a test user exists in the database", () => {
    cy.registerNewUser();
  })

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

    // form response contains success message
    cy.contains('[data-cy="register-form-response"]', 'Success!')

    // after redirect, status-message contains success message
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

    // form response contains success message
    cy.contains('[data-cy="login-form-response"]', 'Success!')

    // after redirect, status-message contains success message
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

    // after redirect, status-message contains success message
    cy.contains('[data-cy="status-message"]', 'Logout successful')

    // user authentication check view returns 'true'
    cy.visit(h.urls.userIsAuthenticated).contains('false')
  })

  it("login() - Gets valid CSRF token and logs in the user", () => {
    cy.login()

    // user authentication check returns 'true'
    cy.visit(h.urls.userIsAuthenticated).contains('true')
  })

})


