import { APIRequestContext, Page } from '@playwright/test';

import { API_URL } from '@testData/urls';

export default class APIHelpers {
	readonly page: Page;
	readonly apiContext: APIRequestContext;

	constructor(page: Page, apiContext: APIRequestContext) {
		this.page = page;
		this.apiContext = apiContext;
	}

	async interceptAccessToken(): Promise<string> {
		const response = await this.page.waitForResponse(response => response.url().includes('/openid-connect/token') && response.status() === 200);
		const accessToken = (await response.json()).access_token;

		return accessToken;
	};

	async getUserPreferences(token: string) {
		return this.apiContext.get(`${API_URL}/users/preferences`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => {
			return res.status() === 200 ? res.json() : 'Could not get user preferences';
		});
	}

	async resetFiltersTest(token: string) {
		return this.apiContext.post(`${API_URL}/users/preferences/filter`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			data: {
				value: '{}',
				// value: '{\"TrackAndTrace-Shipments\":{\"filterOptions\":{\"statuses\":[]}},\"assets\":{\"filterOptions\":{\"pairingStatuses\":[]}}}',
			},
		}).then((res) => {
			return res.status();
		});
	}
}
