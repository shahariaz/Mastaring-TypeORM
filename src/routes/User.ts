import express from "express";
import UserController from "../controllers/User";
const router = express.Router();

const userController = new UserController();
router.get("/alluser", (req, res) => userController.getAllUsers(req, res));
router.delete("/delete/:id", (req, res) => userController.deleteUser(req, res));
export default router;
