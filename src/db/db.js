import * as pg from "pg";
import "dotenv/config";

const { Pool } = pg.default;

const config = {
  production: {
    db_url: process.env.DATABASE_URL,
  },
};

// if (process.env.NODE_ENV === "test") {
//   const dbConfig = {
//     user: process.env.PG_USER,
//     password: process.env.PG_PASSWORD,
//     port: process.env.PG_PORT,
//     host: process.env.PG_HOST,
//   };
//   pgtools.createdb(dbConfig, process.env.PG_TEST_DB, (err, res) => {
//     if (err) {
//       console.error(err);
//       process.exit(-1);
//     }
//     console.log(res);
//   });
// }

const pool = new Pool(
  process.env.NODE_ENV === "test"
    ? {
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        port: process.env.PG_PORT,
        host: process.env.PG_HOST,
        database: process.env.PG_TEST_DB,
      }
    : {
        connectionString: config.production.db_url,
        ssl: {
          rejectUnauthorized: false,
        },
      }
);

export default pool;
