import { Pool } from "pg";
import config from "./config.config.js";

// Create the connection pool
const pool = new Pool({
  connectionString: config.database_url,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
});

pool.on("connect", () => {
  console.log("Connected to Neon database");
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export default pool;
