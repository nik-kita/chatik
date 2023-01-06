# TODO complete this readme

### General info:
* The application is a composite from 3 projects:
    1. `chatik` (the main app, but for now it is approximately empty)
    2. `chatik-auth` (separate microservice for control all flows related to authentication/authorization logic)
    3. `chatik-ws` (messaging app)
* Websockets are constructed for working only with authenticated users:
    * the auth jobs, logic are delegated to `chatik-auth` microservice
    * jwt-access token is verified during connection


### Setup details:
* Project is related from:
    * postgres
    * ws
    * ...

* `pnpm` node package manager is used for this project
* Config logic:
    1. `.env` file should contain `NODE_ENV` with `test` or `dev` or `prod` values
    2. otherwise `NODE_ENV=test` from `.default.env` will be used
    3. all other environments are retrieved from `.***.env` file where `***` value from 1 and 2 articles
* Scripts:
    * optional:
        * `npm i -g pnpm`
    * install dependencies:
        * `pnpm i`
    * run migrations:
        * `npm run pg-migrations:cli` (custom cli was written)
    * run `chatik` app:
        * `npm run start:dev chatik`
    * run `chatik-auth` app:
        * `npm run start:dev chatik-auth`
    * run `chatik-ws` app:
        * `npm run start:dev chatik-ws`
    > other run types instead `start:dev` is not actual for current developing state of project
* Tests:
    * tests has their own `.test.env` for complicated tests with `setup-global.jest.ts` settings
    * run all tests:
        * `npm run test:all`
    * run for specific app:
        * `npm run test apps/chatik-ws` and etc.
    * run for specific lib:
        * `npm run test libs/config` and etc.
    > For now the test coverage is very weak... so command may have errors(
