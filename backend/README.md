

# Backend

Backend repository of the gopronto-admin project.

## Instructions to run the backend
1. Add an environment file(.env) to the backend(gopronto-admin/backend/)
  - add your own database credentials in the .env file
  - add your own JWT_SECRET in the .env file

Example of file:

    DATABASE_USER=<your database id>
    DATABASE_PASSWORD=<your database password>
    DATABASE_NAME=<your database name>
    DATABASE_PORT=<your database port>
    DATABASE_HOST=<your database address>

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## License

Nest is [MIT licensed](LICENSE).
