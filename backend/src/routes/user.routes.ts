import { Router } from "express";
import {
  getProfile,
  login,
  logout,
  register,
} from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
const router = Router();

router.post("/signup", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", authMiddleware ,  getProfile);

export default router;
