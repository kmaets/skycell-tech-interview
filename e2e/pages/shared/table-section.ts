import { Locator, Page } from '@playwright/test';

export default class TableSection {
	readonly page: Page;
	readonly tableHeaders: Locator;
	readonly tableRows: Locator;

	constructor(page: Page) {
		this.page = page;
		this.tableHeaders = page.getByRole('table').locator('thead th');
		this.tableRows = page.getByRole('table').locator('tbody tr');
	}

	/**
	 * Waits until the table content is visible based on the last cell
	 */
	async waitForTableContentToBeLoaded() {
		await this.tableRows.last().locator('td').last().waitFor();
	}

	/**
	 * Returns an index of a column in a table based on the columns name param
	 * @param columnName name of the column to find
	 */
	async getTableColumnIndex(columnName: string): Promise<number> {
		const tableHeadersTitles: string[] = await this.tableHeaders.allInnerTexts();

		return tableHeadersTitles.findIndex(elem => elem.includes(columnName));
	};

	/**
	 * Finds the column and gets its values
	 * @param columnName name of the column to seatch for
	 * @returns array of column values
	 */
	async getTableColumnValues(columnName: string): Promise<string[]> {
		const columnIndex = await this.getTableColumnIndex(columnName);
		const columnRowValues: string[] = await this.tableRows.locator(`td:nth-child(${columnIndex + 1})`).allInnerTexts();

		return columnRowValues;
	};
}
