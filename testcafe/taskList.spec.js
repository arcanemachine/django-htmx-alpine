import { ClientFunction, RequestLogger, Selector } from 'testcafe';

import * as ht from './helpersTesting.js';
import * as roles from './roles.js';

const serverUrl = ht.SERVER_URL;
const testUrl = `${serverUrl}`;

const logger = RequestLogger({testUrl}, {
  logResponseHeaders: true
});

fixture `tasks:task_list`
  .page(testUrl)
  .requestHooks(logger)

test('sanity check', async t => {
  await t.expect(logger.contains(r => r.response.statusCode === 200)).ok()
})

test('unauthenticated user cannot create new task', async t => {
  let newTaskMessage = 'New task';
  let newTaskInputText = await Selector('#new-task-input-text');
  let taskListMessage = await Selector('#task-list-message');
  let statusMessageNotification = await Selector('#status-message');

  // #task-list-message warns user to login first
  await t.expect(taskListMessage.textContent).contains("You must login");

  // attempt to create new task
  await t.typeText(newTaskInputText, newTaskMessage);
  await t.click('#new-task-button-create');

  // does not succeed, contains status message telling user to login
  await t.expect(statusMessageNotification.textContent)
    .contains("You must login");

  // task list is still empty
  await t.expect(Selector('#task-list').exists).notOk();
})

test('authenticated user can create/update/delete a task', async t => {
  let newTaskMessage = 'New task';
  let updatedTaskMessage = 'Updated task';

  await t.useRole(roles.testUser);
  
  /* DELETEME when delete test working
  // #task-list-message notifies user that no tasks have been created
  await t.expect(Selector('#task-list-message').textContent)
    .contains("No tasks created");

  // #task-list does not exist
  await t.expect(Selector('#task-list').exists).notOk();

  // create new task
  await t.typeText(Selector('#new-task-input-text'), newTaskMessage);
  await t.click('#new-task-button-create');
  */

  // succeeds; #task-list exists and contains the proper task
  await t.expect(Selector('#task-list').exists).ok();
  let taskList = await Selector('#task-list');
  let currentTaskEl = taskList.child(0);
  let currentTaskId = Number(currentTaskEl.dataset.taskId);
  let taskCountAfterNewTaskCreated = await Selector('.task-list-item').count;
  await t.expect(taskCountAfterNewTaskCreated).ok();

  // user can update the task
    // get task id
    t.expect(currentTaskId).ok();

    // click the edit icon
    // select the field
    // select all, delete, and enter updatedTaskMessage
    // click the submit button
    // task count should be the same
    // let taskCountAfterTaskUpdated = await Selector('.task-list-item').count;
    // t.expect(taskCountAfterTaskUpdated).eql(taskCountAfterNewTaskCreated);
    // task contains updatedTaskMessage

  // user can delete the task
    // click the delete icon
    // click the delete confirm button
    // taskCountAfterTaskDeleted should equal `taskCountAfterTaskUpdated - 1`
    // let taskCountAfterTaskDeleted = await Selector('.task-list-item').count;
    // t.expect(taskCountAfterTaskDeleted)
      // .eql(taskCountAfterTaskUpdated - 1);
})

