// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import * as keys from './keys.js';
import * as h from './helpers.js';

let username = keys.TEST_USER_USERNAME;
let password = keys.TEST_USER_PASSWORD;

let loginFormUrl = h.urls.loginForm;

Cypress.Commands.add('loginByCsrf', (csrfToken) => {
  cy.request({
    method: 'POST',
    url: h.urls.login,
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

Cypress.Commands.add('login', () => {
  cy.request(h.urls.getCsrfToken)
    .its('body')
    .then((resp) => {
      cy.loginByCsrf(resp);
  })
})

Cypress.Commands.add('registerNewUser', (csrfToken) => {
  cy.request(h.urls.getCsrfToken)
    .its('body')
    .then((csrfToken) => {
      cy.request({
        method: 'POST',
        url: h.urls.register,
        failOnStatusCode: false, // don't fail so we can make assertions
        form: true, // we are submitting a regular form body
        body: {
          username,
          password1: password,
          password2: password,
          captcha_0: 'PASSED',
          captcha_1: 'PASSED',
          csrfmiddlewaretoken: csrfToken, // insert this as part of form body
        },
      })
  })
})


