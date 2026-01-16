import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();
router.post("/login", login);
router.post("/register", signup);
export default router;
