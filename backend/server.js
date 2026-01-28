import express from "express";
import cors from "cors";
import { Client } from "pg";

const db = new Client({
  user: "myuser",
  port: 5432,
  password: "postgres",
  host: "localhost",
  database: "postgres",
});

await db.connect();

const app = express();
const port = 5050;

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/get-location", async (req, res) => {
  const date = new Date();
  // const formattedDate = date.toLocaleDateString(undefined, {
  //   day: "numeric",
  //   month: "long",
  //   year: "numeric",
  // });
  // const formattedTime = date.toLocaleTimeString(undefined, {
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   hour12: false,
  // });
  // const customDate = `${formattedDate} ${formattedTime}`;
  // console.log(typeof req.body.longitude, req.body.latitude, date);
  await db.query(
    "INSERT INTO locations (latitude, longitude, created_at) VALUES($1, $2, $3)",
    [req.body.latitude, req.body.longitude, date]
  );

  res.send("Location pinned!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// CREATE TABLE users (
//     id SERIAL PRIMARY KEY,
//     username TEXT NOT NULL,
//     role TEXT NOT NULL DEFAULT 'user',
//     department TEXT
// );

// CREATE TABLE locations(
// id SERIAL PRIMARY KEY,
// latitude NUMERIC(9, 6) NOT NULL,
// longitude NUMERIC(9, 6) NOT NULL,
// created_at TIMESTAMP NOT NULL,
// user_id INTEGER REFERENCES users(id)
// )
