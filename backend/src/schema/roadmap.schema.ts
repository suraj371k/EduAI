import { z } from "zod";

/** Enums */
const LevelEnum = z.enum(["beginner", "intermediate", "advanced", "expert"]);
const DifficultyEnum = z.enum(["easy", "medium", "hard"]);
const ResourceTypeEnum = z.enum([
  "article",
  "video",
  "book",
  "course",
  "documentation",
]);

/** Sub-schemas */
const SubtopicSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  estimatedMinutes: z.number().int().nonnegative().optional(),
});

const ResourceSchema = z.object({
  type: ResourceTypeEnum,
  title: z.string().optional(),
  url: z.string().url().optional(),
});

const TopicSchema = z.object({
  topicId: z.string().min(1), // your app-level ID (not mongodb _id)
  name: z.string().min(1),
  description: z.string().optional(),
  order: z.number().int().nonnegative().optional(),
  estimatedHours: z.number().nonnegative().optional(),
  difficulty: DifficultyEnum.optional(),
  // prerequisites refer to other topicId strings
  prerequisites: z.array(z.string()).optional(),
  subtopics: z.array(SubtopicSchema).optional(),
  resources: z.array(ResourceSchema).optional(),
  keyTakeaways: z.array(z.string()).optional(),
  practiceExercises: z.array(z.string()).optional(),
});

// Main schema
export const RoadmapInputSchema = z.object({
  // Basic Information
  title: z.string().min(1),
  subject: z.string().min(1),
  description: z.string().optional(),

  // User Input Parameters
  level: LevelEnum,
  learningGoals: z.array(z.string()).optional(),
  timeCommitment: z
    .object({
      hoursPerWeek: z.number().nonnegative().optional(),
      totalWeeks: z.number().int().nonnegative().optional(),
    })
    .optional(),
  prerequisites: z.array(z.string()).optional(),

  // AI Generated Content
  topics: z.array(TopicSchema).optional(),

  // Optional: createdAt / updatedAt (allow but not required)
  createdAt: z.preprocess(
    (v) => (v ? new Date(v as any) : undefined),
    z.date().optional()
  ),
  updatedAt: z.preprocess(
    (v) => (v ? new Date(v as any) : undefined),
    z.date().optional()
  ),
});

export type RoadmapInput = z.infer<typeof RoadmapInputSchema>;
