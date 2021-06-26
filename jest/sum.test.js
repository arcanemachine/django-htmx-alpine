/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */

const sum = require('./sum');

test.only('add 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test.only('add -1 + 2 to equal 1', () => {
  expect(sum(-1, 2)).toBe(1);
});
