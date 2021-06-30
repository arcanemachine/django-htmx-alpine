/* eslint no-undef: 0 */

import * as h from '../support/helpers.js';

describe("views: 'About'", () => {
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


