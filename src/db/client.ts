import knex, { Knex } from "knex";

const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE } = process.env;

export const dbClient: Knex = knex({
  client: "pg",
  connection: {
    user: PGUSER,
    password: PGPASSWORD,
    host: PGHOST,
    database: PGDATABASE,
  },
});
