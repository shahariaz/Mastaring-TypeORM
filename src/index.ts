import express, { Request, Response } from "express";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import UserRoute from "./routes/User";
const app = express();

app.use(express.json());

app.use("/auth", UserRoute);

app.post("/create", async (req: Request, res: Response) => {
  const userRepo = AppDataSource.getRepository(User);
  let user = new User();
  user = req.body;
  console.log(user);
  await userRepo.save(user);
  res.json({
    message: "User created successfully",
    user,
  });
});
app.post("/update/:id", async (req: Request, res: Response) => {
  const userRepo = AppDataSource.getRepository(User);
  let user = await userRepo.findOneBy({ id: parseInt(req.params.id) });
  if (user) {
    Object.assign(user, req.body);
    await userRepo.save(user);
    res.json({ message: "User updated successfully", user });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});
app.post("/find/:byname", async (req: Request, res: Response) => {
  const userRepo = AppDataSource.getRepository(User);
  const allUsersByName = await userRepo.find({
    where: {
      firstName: req.params.byname,
    },
  });
  res.json(allUsersByName);
});

export const AppDataSource = new DataSource({
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
