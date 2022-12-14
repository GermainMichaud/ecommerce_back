# Light Ecommerce application

> Made with ExpressJS, Mongoose, Typescript

---

## Summary

- [Getting started](#Getting-started)
  - [Clone Repository](#Clone-the-repository)
  - [Install dependencies](#Install-dependencies)
  - [Set the env file](#Set-the-env-file)
  - [Seed the database](#Seed-the-database)
  - [Run the project in `DEV` mode](#Run-the-project-in-DEV-mode)
  - [Run the project in `PRODUCTION` mode](#Run-the-project-in-PRODUCTION-mode)
  - [Run tests](#Run-tests)

---

## Getting starting

### Clone the repository

```sh
git clone git@github.com:GermainMichaud/ecommerce_back.git
cd ecommerce_back/
```

### Install dependencies

```sh
# with npm (default for this project)
npm install

# with yarn
yarn

# with pnpm
pnpm install
```

### Set the env file

> create a `.env` file and set variables

```sh
PORT=4000
DATABASE_URL="mongodb+srv://<USERNAME>:<PASSWORD>@<HOST>/<DB_NAME>?retryWrites=true&w=majority"
database="mongodb+srv://<USERNAME>:<PASSWORD>@<HOST>/<DB_NAME>?retryWrites=true&w=majority"
```

### Seed the database

```sh
# with npm
npm run seed

# with yarn
yarn seed

# with pnpm
pnpm seed
```

### Run the project in `DEV` mode

```sh
# with npm
npm run dev

# with yarn
yarn dev

# with pnpm
pnpm dev
```

### Run the project in `PRODUCTION` mode

```sh
# with npm
npm start

# with yarn
yarn start

# with pnpm
pnpm start
```

### Run tests

```sh
# with npm
npm test

# with yarn
yarn test

# with pnpm
pnpm test
```
