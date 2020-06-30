<h4 align="center">
  A barber scheduling app that allows users to schedule an appointment with his favorite barber and shows to the barber his agenda for the day.
</h4>

## :rocket: Technologies

This project was developed at the [RocketSeat GoStack Bootcamp](https://rocketseat.com.br/bootcamp) with the following technologies:

-  [Node.js][nodejs]
-  [Express](https://expressjs.com/)
-  [VS Code][vc] with [ESLint][vceslint]
-  [Postgres](https://www.postgresql.org/)
-  [TypeORM](https://typeorm.io/)
-  [Docker](https://www.docker.com/)
-  [DBeaver](https://dbeaver.io/)
-  [bcryptjs](https://www.npmjs.com/package/bcryptjs)
-  [JWT](https://www.npmjs.com/package/jsonwebtoken)

---

## Install Dependencies.

```bash
yarn
```
_(During development, Yarn was used as a dependency manager)_

---

## (SQL)Execute Migrations.

```bash
yarn typeorm migration:run
```
_(During development, TypeORM was used as a ORM)_

---

## Run

```bash
yarn dev:server
```

---

By Walter Neto (https://www.linkedin.com/in/wvcneto)

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[vc]: https://code.visualstudio.com/
[vceditconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[vceslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
