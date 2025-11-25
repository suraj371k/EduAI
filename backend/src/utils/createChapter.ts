import { tool, createAgent, initChatModel } from "langchain";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import * as z from "zod";
import dotenv from "dotenv";
dotenv.config();

const model = await initChatModel("google-genai:gemini-2.5-pro", {
  model: "gemini-2.5-pro",
  apiKey: process.env.GEMINI_API_KEY!,
  temperature: 0.3,
});

export const createChapterTool = tool(
  async ({
    topicName,
    description,
  }: {
    topicName: string;
    description: string;
  }) => {
    const prompt = `
Generate a complete chapter for "${topicName}".

Description: ${description}

Include:
- Definition
- Explanation
- Examples
- Practice questions
`;

    const result = await model.invoke(prompt);
    return result.content;
  },
  {
    name: "create_chapter",
    description:
      "Generate a chapter for a topic give me directly chapters do not say ofcourse here is the topic or something",
    schema: z.object({
      topicName: z.string(),
      description: z.string(),
    }),
  }
);

export const chapterAgent = model.bindTools([createChapterTool]);
