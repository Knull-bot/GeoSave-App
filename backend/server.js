import express from "express";
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/get-location", (req, res) => {
  res.send("Location pinned!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
