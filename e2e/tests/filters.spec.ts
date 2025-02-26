import { test, expect } from '@playwright/test';

import LoginPage from '@pages/login-page';
import LoggersPage from '@pages/asset-management/loggers-page';
import AssetsPage from '@pages/asset-management/assets-page';
import ShipmentsPage from '@pages/track-trace/shippments-page';
import TableSection from '@pages/shared/table-section';

import APIHelpers from '@helpers/api';

import { BASE_URL, ASSET_MANANGEMENT, TRACK_TRACE } from '@testData/urls';
import { FILTERS } from '@testData/filters';

test.beforeEach(async ({ page, request }) => {
	const loginPage = new LoginPage(page);
	const apiHelpers = new APIHelpers(page, request);

	await page.goto(BASE_URL);
	await loginPage.signIn(process.env.USER_NAME!, process.env.PASSWORD!);

	const token = await apiHelpers.interceptAccessToken();
	const resetFilters = await apiHelpers.resetFiltersTest(token);
	await expect(resetFilters).toBe(200);
});

test.describe('Tables filtering', () => {
	test('Should filter Loggers table by "Not Paired"', async ({ page }) => {
		const loggersPage = new LoggersPage(page);
		const tableSection = new TableSection(page);

		await test.step('Open Asset Management Loggers page', async () => {
			await page.goto(BASE_URL + ASSET_MANANGEMENT.loggers);
			await tableSection.waitForTableContentToBeLoaded();
		});

		await test.step('Set "Not Paired" for "Pairing Status" filter', async () => {
			await loggersPage.setPairingStatusFilter(FILTERS.loggers.pairingStatus.notPaired);
		});

		await test.step('Fetch "Pairing Status" column values from table', async () => {
			const columnValues = await tableSection.getTableColumnValues('Pairing Status');

			columnValues.forEach(async (value) => {
				await expect(value).toBe('Not Paired');
			});
		});
	});

	test('Should filter Assets table by "Container" for "Asset Type"', async ({ page }) => {
		const assetsPage = new AssetsPage(page);
		const tableSection = new TableSection(page);

		await test.step('Open Asset Management Assets page', async () => {
			await page.goto(BASE_URL + ASSET_MANANGEMENT.assets);
			await tableSection.waitForTableContentToBeLoaded();
		});

		await test.step('Set "Container" for "Asset Type" filter', async () => {
			await assetsPage.setAssetTypeFilter(FILTERS.assets.assetType.container);
		});

		await test.step('Fetch "Asset Type" column values from table', async () => {
			const columnValues = await tableSection.getTableColumnValues('Asset Type');

			columnValues.forEach(async (value) => {
				await expect(value).toBe('Container');
			});
		});
	});

	test('Should filter Shipments table by "Closed" for "Shipment Status"', async ({ page }) => {
		const shipmentsPage = new ShipmentsPage(page);
		const tableSection = new TableSection(page);

		await test.step('Open Track&Trace Shipments page', async () => {
			await page.goto(BASE_URL + TRACK_TRACE.shipments);
			await tableSection.waitForTableContentToBeLoaded();
		});

		await test.step('Set "Closed" for "Status" filter', async () => {
			await shipmentsPage.disbleCheckBoxes();
			await shipmentsPage.setShipmentStatusFilter(FILTERS.shipments.status.closed);
		});

		await test.step('Fetch "Status" column values from table', async () => {
			const columnValues = await tableSection.getTableColumnValues('Status');

			columnValues.forEach(async (value) => {
				await expect(value).toBe('Closed');
			});
		});
	});
});
