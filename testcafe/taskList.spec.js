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

let newTaskMessage = 'Test task';

test('unauthenticated user cannot create new task', async t => {
  let newTaskInputText = await Selector('#new-task-input-text');
  let taskListMessage = await Selector('#task-list-message');
  let statusMessageNotification = await Selector(
    '#status-message-notification');

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

test('authenticated user can create new task', async t => {
  await t.useRole(roles.testUser);
  
  /*
  // #task-list-message notifies user that no tasks have been created
  await t.expect(Selector('#task-list-message').textContent)
    .contains("No tasks created");

  // #task-list does not exist
  await t.expect(Selector('#task-list').exists).notOk();
  */

  // create new task
  await t.typeText(Selector('#new-task-input-text'), newTaskMessage);
  await t.click('#new-task-button-create');

  // succeeds; #task-list exists and contains the proper task
  await t.expect(Selector('#task-list').exists).ok();
  await t.expect(Selector('.task-list-item').count).ok();
})
