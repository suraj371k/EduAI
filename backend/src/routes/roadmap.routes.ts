import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  deleteRoadmap,
  explainSubTopics,
  generateRoadmap,
  getRoadmapById,
  getSubTopic,
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

//explain subtopic
router.post("/subtopic/:subtopicId", authMiddleware, explainSubTopics);

//get subtopics with explanation
router.get("/subtopic/:subtopicId", authMiddleware, getSubTopic);

export default router;
