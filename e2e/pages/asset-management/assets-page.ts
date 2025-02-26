import { Locator, Page } from '@playwright/test';

import delay from '@helpers/delay';

import { FILTERS } from '@testData/filters';

export default class AssetsPage {
	readonly page: Page;
	readonly palletCheckbox: Locator;
	readonly containerCheckbox: Locator;

	constructor(page: Page) {
		this.page = page;
		this.palletCheckbox = page.locator('[data-id="PALLET-checkbox]');
		this.containerCheckbox = page.locator('[data-id="CONTAINER-checkbox"]');
	}

	/**
	 * Sets assete type filter based on the passed value
	 * @param type asset type filter value
	 */
	async setAssetTypeFilter(type: string): Promise<void> {
		switch (type) {
			case FILTERS.assets.assetType.pallet:
				await this.palletCheckbox.click();
				break;
			case FILTERS.assets.assetType.container:
				await this.containerCheckbox.click();
				break;
			default:
				break;
		}
		await delay(3000);
	};
}
