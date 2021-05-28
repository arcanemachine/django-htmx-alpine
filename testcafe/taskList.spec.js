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
