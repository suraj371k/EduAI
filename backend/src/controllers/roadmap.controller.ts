import { Request, Response } from "express";
import { RoadmapInput, RoadmapInputSchema } from "../schema/roadmap.schema";
import Roadmap from "../models/roadmap.model";
import { generateRoadmapTopics } from "../services/generateRoadmap";

export const generateRoadmap = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication required. Please login again.",
      });
    }

    // Validate input using Zod schema
    const validationResult = RoadmapInputSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid input data",
        errors: validationResult.error.issues,
      });
    }

    const input: RoadmapInput = validationResult.data;

    // Generate roadmap topics
    const generatedTopics = await generateRoadmapTopics(input);

    // Validate generated topics structure
    if (!generatedTopics || !generatedTopics.topics) {
      throw new Error("Invalid roadmap structure returned from AI");
    }

    const roadmapData = {
      userId,
      title: input.title,
      subject: input.subject,
      description: input.description,
      level: input.level,
      learningGoals: input.learningGoals,
      timeCommitment: input.timeCommitment,
      prerequisites: input.prerequisites,
      topics: generatedTopics.topics,
    };

    // Save to database
    const savedRoadmap = await Roadmap.create(roadmapData);

    return res.status(201).json({
      success: true,
      message: "Roadmap generated successfully",
      data: savedRoadmap,
    });
  } catch (error: any) {
    console.error(" Error in generate roadmap controller:", error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Database validation error",
        errors: Object.keys(error.errors).map((key) => ({
          field: key,
          message: error.errors[key].message,
        })),
      });
    }

    // Handle JSON parsing errors
    if (error instanceof SyntaxError || error.message?.includes("JSON")) {
      return res.status(500).json({
        success: false,
        message: "Failed to parse AI response. Please try again.",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }

    // Handle Zod validation errors
    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    // Handle API errors (rate limits, etc.)
    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        message: "API rate limit exceeded. Please try again later.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const getUserRoadmap = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    if (!userId) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }

    const roadmaps = await Roadmap.find({ userId });

    return res.status(200).json({ success: true, roadmaps });
  } catch (error) {
    console.log("Error in getting users roadmap controller:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getRoadmapById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ success: false, message: "id not found" });
    }

    const roadmap = await Roadmap.findById(id);

    return res.status(200).json({ success: true, roadmap });
  } catch (error) {
    console.log("Error in get roadmap by id controller", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const deleteRoadmap = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await Roadmap.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: true, message: "roadmap deleted successfully!" });

  } catch (error) {
    console.log("Error in get roadmap by id controller", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
