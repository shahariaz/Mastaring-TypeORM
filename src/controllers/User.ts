import { Request, Response } from "express";
import { AppDataSource } from "..";
import { User } from "../entities/User";

class UserController {
  async getAllUsers(req: Request, res: Response): Promise<void> {
    const userRepo = AppDataSource.getRepository(User);
    const userlist = await userRepo.find();
    res.json(userlist);
  }
  async deleteUser(req: Request, res: Response): Promise<void> {
    const userRepo = AppDataSource.getRepository(User);
    const isUserExist = await userRepo.findOneBy({
      id: parseInt(req.params.id),
    });
    res.json({
      message: "User deleted successfully",
    });
  }
  async createUser(req: Request, res: Response): Promise<void> {
    const { firstName, lastName, email, password, id } = req.body;
    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({
        message: "Please provide all the details",
      });
    }
    const userRepo = AppDataSource.getRepository(User);
    const isExist = await userRepo.find({
      where: {
        email: req.body.email,
      },
    });
    if (isExist.length > 0) {
      res.status(409).json({
        message: "User with the same email already exists",
      });
    }
    let user = new User();
    user = req.body;
    await userRepo.save(user);
    res.json({
      message: "User created successfully",
      user,
    });
  }
}
export default UserController;
