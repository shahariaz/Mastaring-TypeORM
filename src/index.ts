import express, { Request, Response } from "express";
import "reflect-metadata";
import { DataSource } from "typeorm";
const app = express();

app.use(express.json());

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5434,
  username: "root",
  password: "root",
  database: "typeorm_db",
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const port = 8003;
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});
