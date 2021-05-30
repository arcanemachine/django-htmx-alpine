import serverUrl from './helpers.js';

let testUrl = `${serverUrl}`;

describe('tasks:task_list', () => {
  it('Loads the page', () => {
    cy.visit('http://192.168.1.120:8000')
    cy.contains('Todo')
  })
})
