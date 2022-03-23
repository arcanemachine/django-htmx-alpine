/* eslint no-undef: 0 */

describe("view: tasks:task_list", () => {
  const testUrl = Cypress.env('url_task_list');

  const newTaskDescription = new Date().toString();

  it("Unauthenticated user cannot create a new task", () => {
    cy.visit(testUrl)

    cy.get('[data-cy="task-create-input-description"]')
      .type(newTaskDescription) // enter task description
      .get('[data-cy="task-create-button-confirm"]')
      .click() // click 'Create' button

    // does not succeed, contains status message telling user to login
    cy.get('[data-cy="status-message"]').contains('You must login')
  })

  it("Authenticated user can create a new task", () => {
    cy.login().visit(testUrl)

    cy.get('[data-cy="task-create-input-description"]')
      .type(newTaskDescription) // enter task description
      .get('[data-cy="task-create-button-confirm"]')
      .click() // click submit button
      .get('[data-cy="task-list"]')
      .should('contain', newTaskDescription)
  })

  it("New task appears at the top of the list", () => {
    cy.login().visit(testUrl)

    cy.get('[data-cy="task-create-input-description"]')
      .type(newTaskDescription) // enter task description
      .get('[data-cy="task-create-button-confirm"]')
      .click() // click submit button
      .get('[data-cy="task-list"]').then(($ul) => {
        cy.get($ul.children(':first'))
          .should('contain', newTaskDescription)
    })
  })

  it("Update an existing task", () => {
    cy.login()
      .visit(testUrl)
      .get('[data-cy="task-list"]').then(($ul) => {
        const taskId = $ul.children()[0].dataset.taskId; // get newest task id

        const updatedTaskMessage = new Date();
        cy.get(`[data-cy="task-description-${taskId}"]`)
          .then(($descriptionEl) => {
            const originalTaskDescription = $descriptionEl.text()
            cy.get(`[data-cy="task-icon-edit-${taskId}"]`).click()
              .get(`[data-cy="task-update-description-${taskId}"]`)
              .type(String(updatedTaskMessage)) // edit the text
              .type('{enter}') // submit
            cy.reload()
              .get(`[data-cy="task-description-${taskId}"]`)
                // new description is different from old one
              .should('not.include.text', originalTaskDescription)
        })
    })
  })

  it("Delete an existing task", () => {
    cy.login()
      .visit(testUrl)
      .get('[data-cy="task-list"]').then(($ul) => {
        const taskId = $ul.children()[0].dataset.taskId; // get newest task id

        cy.get(`[data-cy="task-item-${taskId}"]`)
          .then(() => {
            cy.get(`[data-cy="task-icon-delete-${taskId}"]`)
              .click() // click the delete icon
              .get(`[data-cy="task-button-delete"]`)
              .click() // click the delete modal 'Confirm' button
        }).then(() => {
          cy.get(`[data-cy="task-item-${taskId}"]`)
            .should('not.exist') // element no longer exists after deletion
        });
    })
  })

  it("Mark incomplete task as complete using the checkbox", () => {
    cy.login()
      .visit(testUrl)
      .get('.task-item').first().then(($task) => { // get the first task
        const taskId = $task.data().taskId;
        const taskDescriptionSelector = 
          `[data-cy="task-description-${taskId}"]`
        const taskInputIsCompleteSelector = 
          `[data-cy="task-checkbox-is-complete-${taskId}"]`

        // if the task is complete, then first mark it incomplete
        cy.get(taskInputIsCompleteSelector)
          .then(($taskInputIsComplete) => {
            if ($taskInputIsComplete.prop('checked')) {
              $taskInputIsComplete.click()
            }
        })

        // task should not be strikethrough
        cy.get(taskDescriptionSelector)
          .should('not.have.class', 'text-strikethrough') // not strikethrough
          .get(taskInputIsCompleteSelector).click() // click the checkbox
          .get(taskDescriptionSelector)
          .should('have.class', 'text-strikethrough') // is now  strikethrough

    })
  })

  it("Mark complete task as incomplete using the checkbox", () => {
    cy.login()
      .visit(testUrl)
      .get('.task-item').first().then(($task) => { // get the first task
        const taskId = $task.data().taskId;
        const taskDescriptionSelector = 
          `[data-cy="task-description-${taskId}"]`
        const taskInputIsCompleteSelector = 
          `[data-cy="task-checkbox-is-complete-${taskId}"]`

        // if the task is complete, then first mark it incomplete
        cy.get(taskInputIsCompleteSelector)
          .then(($taskInputIsComplete) => {
            if (!$taskInputIsComplete.prop('checked')) {
              $taskInputIsComplete.click()
            }
        })

        // task should not be strikethrough
        cy.get(taskDescriptionSelector)
          .should('have.class', 'text-strikethrough') // not strikethrough
          .get(taskInputIsCompleteSelector).click() // click the checkbox
          .get(taskDescriptionSelector)
          .should('not.have.class', 'text-strikethrough') // is strikethrough

    })
  })
})
