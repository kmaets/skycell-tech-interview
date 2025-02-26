import { Locator, Page } from '@playwright/test';

import delay from '@helpers/delay';

import { FILTERS } from '@testData/filters';

export default class LoggersPage {
	readonly page: Page;
	readonly pairedCheckbox: Locator;
	readonly notPairedCheckbox: Locator;

	constructor(page: Page) {
		this.page = page;
		this.pairedCheckbox = page.locator('[data-id="PAIRED-checkbox"]');
		this.notPairedCheckbox = page.locator('[data-id="NOT_PAIRED-checkbox"]');
	}

	/**
	 * Sets pairing status filter based on the passed value
	 * @param status pairing status filter value
	 */
	setPairingStatusFilter = async (status: string): Promise<void> => {
		switch (status) {
			case FILTERS.loggers.pairingStatus.paired:
				await this.pairedCheckbox.click();
				break;
			case FILTERS.loggers.pairingStatus.notPaired:
				await this.notPairedCheckbox.click();
				break;
			default:
				break;
		}
		await delay(3000);
	};
}
