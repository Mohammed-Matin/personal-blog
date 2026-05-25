import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(import.meta.dirname, "../../.env") });

if(!process.env.PORT) {
  throw new Error("PORT environment variable is not initialised.")
}

if(!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not initialised.")
}

if(!process.env.FRONTEND_URL) {
  throw new Error("FRONTEND_URL environment variable is not initialised.")
}

const config = {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  frontend_url: process.env.FRONTEND_URL
};

export default config;