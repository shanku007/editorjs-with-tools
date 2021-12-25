# Javascript package boilerplate by HackingBay

- Rollup + Babel + Prettier + Strict ESlint + Sass + VSCode - Enterprise grade boilerplate

- Minimalist js package boilerplate with rollup.js bundler and dev environment setup. No Sass/React support. For react use other template.

## Editor Configuration

- Editor of your preference. I used some VSCode specific config in .vscode folder and recommend plugins for enhanced experience.

Recommended VSCode Extensions:
- Prettier (Official) - Code formatter
- ESLint (Official) - Real time JS syntax validation

## Technologies Used

- Rollup.js
- Yarn
- Babel
- Prettier + ESlint
- Jest lint setup, jest can be added

## Steps to use this project
- Update **name**, **license**, **publishConfig** and **repository** fields in package.json as per your need.
- yarn build to prepare dist folder for publishing.
- Before publishing with npm make sure you are publishing to correct registry, public/private depending on project's need.

## Available Scripts

In the project directory, you can run:

### `yarn fix:all`

Runs prettier formatter followed by eslint and stylelint, to format code and fix lint issues.
Prettier is not good enough to run alone, must always be followed lint fixes included in this command.

### `npm login --registry https://PACKAGE-REGISTRY-URL`

If your account doesn't exist in internal registry, ask admin to enable account registration temporarily. And, run following for the first time. Run this command in the root of the project only, to make sure your account is created in our local internal registry not in the npm public registry.

`npm adduser --registry https://PACKAGE-REGISTRY-URL`

If your account exists, login to the registry and do npm publish to our internal registry but running following command. Do it carefully, else publish could be published to public npm registry, which requires taking immediate actions to get it removed with in few days of publishing.

### `npm publish --registry https://PACKAGE-REGISTRY-URL`

This commands publishes your package to our internal npm package registry.