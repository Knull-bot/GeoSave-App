import { Client } from "pg";
import dotenv from "dotenv";

const client = new Client({
  user: "myuser",
  port: 5432,
  password: "postgres",
  host: "localhost",
  database: "postgres",
});
dotenv.config();

await client.connect();

export default client;
