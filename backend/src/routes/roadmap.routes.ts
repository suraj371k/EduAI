import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  deleteRoadmap,
  generateRoadmap,
  getRoadmapById,
  getUserRoadmap,
} from "../controllers/roadmap.controller";

const router = Router();

//create roadmap
router.post("/", authMiddleware, generateRoadmap);

//get roadmap by users
router.get("/", authMiddleware, getUserRoadmap);

//get roadmap by id
router.get("/:id", authMiddleware, getRoadmapById);

//delete roadmap
router.delete("/:id", authMiddleware, deleteRoadmap);

export default router;
