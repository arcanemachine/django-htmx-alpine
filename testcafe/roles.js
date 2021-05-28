import { Role } from 'testcafe';

import * as ht from './helpersTesting.js';
import * as keys from './keys.js';

const serverUrlUrl = ht.SERVER_URL;
let loginUrl = `${backendUrl}/users/login/?form=1`;

export const testUser = Role(loginUrl, async t => {
    let username = 'testcafe_user';
    let password = keys.TEST_USER_PASSWORD;

    await t.typeText('#id_username', username);
    await t.typeText('#id_password', password);
    await t.typeText('#id_captcha_1', 'PASSED');
    await t.click('#form-button-submit');
})
