import { test, expect } from '@playwright/test';

import LoginPage from '@pages/login-page';
import APIHelpers from '@helpers/api';

import { BASE_URL } from '@testData/urls';

test.beforeEach(async ({ page }) => {
	const loginPage = new LoginPage(page);

	await page.goto(BASE_URL);
	await loginPage.signIn(process.env.USER_NAME!, process.env.PASSWORD!);
});

test.describe('API reset filters', () => {
	test('Check API request status', async ({ page, request }) => {
		const apiHelpers = new APIHelpers(page, request);

		const token = await apiHelpers.interceptAccessToken();
		const reset = await apiHelpers.resetFiltersTest(token);
		expect(reset).toBe(200);
	});
});
