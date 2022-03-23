/* eslint no-undef: 0 */

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

const username = keys.TEST_USER_USERNAME;
const password = keys.TEST_USER_PASSWORD;

const urlGetCsrfToken = Cypress.env('url_get_csrf_token');
const urlLogin = Cypress.env('url_login');
const urlRegister = Cypress.env('url_register');

Cypress.Commands.add('login', () => {
  cy.request(urlGetCsrfToken).then((resp) => {
    const csrfToken = resp.body;
    cy.request({
      method: 'POST',
      url: urlLogin,
      failOnStatusCode: false, // don't fail so we can make assertions
      form: true, // we are submitting a regular form body
      body: {
        username,
        password,
        captcha_0: 'PASSED',
        captcha_1: 'PASSED',
        csrfmiddlewaretoken: csrfToken, // insert this as part of form body
      },
    });
  });
})

Cypress.Commands.add('registerNewUser', () => {
  cy.request(urlGetCsrfToken)
    .its('body')
    .then((csrfToken) => {
      cy.request({
        method: 'POST',
        url: urlRegister,
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
