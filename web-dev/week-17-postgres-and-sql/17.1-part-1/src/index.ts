import { Client } from "pg";
import "dotenv/config";

// const pgClient = new Client(process.env.POSTGRES_URL);

const pgClient = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: 5432,
  host: process.env.DB_HOST,
  database: process.env.DB,
  ssl: true,
});

async function main() {
  await pgClient.connect();
  const response = await pgClient.query("SELECT * FROM users;");
  console.log(response.rows);
}

main();
