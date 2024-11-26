import express, { Request, Response } from "express";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  const userRepo = AppDataSource.getRepository(User);
  //find all the Records in the repository
});

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5434,
  username: "root",
  password: "root",
  database: "typeorm_db",
  entities: ["src/entities/*{.ts,.js}"],
  synchronize: true,
  logging: true,
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
