# SkyCell Technical Test

### Installation
You need to have Node.js installed at least version 18+, preferably the latest LTS version. 
After that enter project folder and run `npm` command to install needed packages:

	cd skycell-tech-interview
	npm install
	npx playwright install --with-deps

### How to run tests:
When above steps are done, it is ready to run test with Playwright, just use `npm` with following commands (just speed up runs only in chrome):

	npm run test

Project's package.json file include following scripts commants to run the tests in different modes:
	
	# Runs tests for browsers: chromium, firefox and webkit
	npm run test-all-browsers

	# Runs tests only with one browser, in below example a chromium browser
	npm run test --project=chromium

	# Same as above but with UI interface where user can lunch tests manually
	npm run test-ui

	# Runs test in dedug mode where user can closely checks why something does not work
	npm run test-debug
    
	# Runs test in dedug mode using VS Code launch.json settings
	npm run test-vsc-debug

    # And some more

### Test results and html report
Playwright configuration is set to show a `list` report in command line.<br>
Additionally it saves a video with `html` report after test run, it can be found in `playwright-report` folder.

### Notes
Other than that:
- Added basic linting confguration
- Using "Page Object Model" pattern. Some shared elements like tables are seperated from each page as one class.
- Missing in some places reliable selectors to locate an element, so I've used `locator()` method unfortuantelly. Best if application had more `data-testid`
- As the table contents loads quite quickly and sometimes can take quite a long time I've uased custom dalay from helpers folder
- Tried to reset filters after log in using api helpers but for me It does not work, application just POST some defaults and some checkboxes are marked. For example for "Shipments" view I used "manual" unmarking checkboxes as in other way it would influence the table output.
- I've ommited adding fixtures, but in bigger and more complicated tests it would be needed to make test even more readable and orginized

#### By Kamil Staniak
