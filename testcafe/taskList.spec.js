import { ClientFunction, RequestLogger, Selector } from 'testcafe';

import * as ht from './helpersTesting.js';

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
  let todoListMessage = await Selector('#todo-list-message');
  let statusMessageNotification = await Selector(
    '#status-message-notification');

  // element below text input warns user to login first
  await t.expect(todoListMessage.textContent).contains("You must login");

  // attempt to create new todo
  await t.typeText(newTaskInputText, newTaskMessage);
  await t.click('#new-task-button-create');

  // does not succeed, contains status message telling user to login
  await t.expect(statusMessageNotification.textContent)
    .contains("You must login");

  // todo list is still empty
  await t.expect(Selector('#todo-list').exists).notOk();
})

