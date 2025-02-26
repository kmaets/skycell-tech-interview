import { Locator, Page } from '@playwright/test';

import delay from '@helpers/delay';

import { FILTERS } from '@testData/filters';

export default class ShipmentsPage {
	readonly page: Page;
	readonly notStartedCheckbox: Locator;
	readonly inTransitCheckbox: Locator;
	readonly closedCheckbox: Locator;
	readonly checkedCheckbox: Locator;

	constructor(page: Page) {
		this.page = page;
		this.notStartedCheckbox = page.locator('[data-id="airportOptions"]').first().getByText('Not Started', { exact: true });
		this.inTransitCheckbox = page.locator('[data-id="airportOptions"]').first().getByText('In Transit', { exact: true });
		this.closedCheckbox = page.locator('[data-id="airportOptions"]').first().getByText('Closed', { exact: true });
		this.checkedCheckbox = page.locator('input[type="checkbox"]');
	}

	/**
	 * Unchecks all marked checkboxes
	 */
	async disbleCheckBoxes(): Promise<void> {
		await this.checkedCheckbox.first().waitFor();
		for (const checkBox of await this.checkedCheckbox.all()) {
			await checkBox.uncheck();
		}
	}

	/**
	 * Sets shipment status filter based on the passed value
	 * @param status shipment status filter value
	 */
	async setShipmentStatusFilter(status: string): Promise<void> {
		switch (status) {
			case FILTERS.shipments.status.notStarted:
				await this.notStartedCheckbox.click();
				break;
			case FILTERS.shipments.status.inTransit:
				await this.inTransitCheckbox.click();
				break;
			case FILTERS.shipments.status.closed:
				await this.closedCheckbox.click();
				break;
			default:
				break;
		}
		await delay(3000);
	};
}
