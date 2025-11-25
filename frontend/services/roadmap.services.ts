import { api } from "@/lib/backendUrl";

type Level = "beginner" | "intermediate" | "advanced" | "expert";

type Difficulty = "easy" | "medium" | "hard";

type ResourceType = "article" | "video" | "book" | "course" | "documentation";

export interface Subtopic {
  name?: string;
  description?: string;
  estimatedMinutes?: number;
}

export interface Resource {
  type: ResourceType;
  title?: string;
  url?: string;
}

export interface Topic {
  topicId: string; // app-level ID
  name: string;
  description?: string;
  order?: number;
  estimatedHours?: number;
  difficulty?: Difficulty;
  prerequisites?: string[];
  subtopics?: Subtopic[];
  resources?: Resource[];
  keyTakeaways?: string[];
  practiceExercises?: string[];
}

export interface RoadmapInput {
  title: string;
  subject: string;
  description?: string;

  level: Level;
  learningGoals?: string[];

  timeCommitment?: {
    hoursPerWeek?: number;
    totalWeeks?: number;
  };

  prerequisites?: string[];

  topics?: Topic[];

  createdAt?: Date;
  updatedAt?: Date;
}

export interface Roadmap {
  _id: string;
  userId: string;
  title: string;
  subject: string;
  description?: string;
  level: Level;
  learningGoals?: string[];
  timeCommitment?: {
    hoursPerWeek?: number;
    totalWeeks?: number;
  };
  prerequisites?: string[];
  topics: Topic[];
  createdAt?: string;
  updatedAt?: string;
}

export const generateRoadmap = async (data: RoadmapInput): Promise<Roadmap> => {
  const res = await api.post(`/api/roadmaps/generate`, data);
  return res.data.data;
};

export const getRoadmap = async (): Promise<Roadmap> => {
  const res = await api.get(`/api/roadmaps`);
  return res.data.data;
};

export const getRoadmapById = async (id: string): Promise<Roadmap> => {
  const res = await api.get(`/api/roadmaps/${id}`);
  return res.data.data;
};

