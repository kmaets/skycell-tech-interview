import { Locator, Page } from '@playwright/test';

export default class LoginPage {
	readonly page: Page;
	readonly USERNAME_INPUT: Locator;
	readonly PASSWORD_INPUT: Locator;
	readonly LOGIN_BUTTON: Locator;
	readonly LOGIN_ALERT: Locator;

	constructor(page: Page) {
		this.page = page;
		this.USERNAME_INPUT = page.getByLabel('Email Address');
		this.PASSWORD_INPUT = page.getByLabel('Password');
		this.LOGIN_BUTTON = page.getByRole('button', { name: 'Login' });
		this.LOGIN_ALERT = page.getByRole('alert', { name: /Invalid.*/i });
	}

	enterUsername = async (username: string): Promise<void> => {
		await this.USERNAME_INPUT.fill(username);
	};

	enterPassword = async (password: string): Promise<void> => {
		await this.PASSWORD_INPUT.fill(password);
	};

	submitLogin = async (): Promise<void> => {
		await this.LOGIN_BUTTON.click();
	};

	signIn = async (username: string, password: string): Promise<void> => {
		await this.enterUsername(username);
		await this.enterPassword(password);
		await this.submitLogin();
	};

	/* findFailedLoginAlert = async (): Promise<Locator> => {
		return this.page.getByRole('alert');
	};

	findAlertText = async (): Promise<Locator> => {
		return this.page.getByRole('alert').locator(SELECTORS.alert);
	}; */
}

/* const SELECTORS = {
	userNameInput: 'username',
	passwordInput: 'password',
	submitButtonText: 'Log in',
	alert: 'ul > li',
}; */
