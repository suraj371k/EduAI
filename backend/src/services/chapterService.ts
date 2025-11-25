import { chapterAgent, createChapterTool } from "../utils/createChapter";

export const generateChapterForSubtopic = async (subtopic: {
  name: any;
  description: any;
}) => {
  const prompt = `
  Generate a chapter for this subtopic:
  
  ${JSON.stringify(subtopic, null, 2)}
  `;

  const firstResponse = await chapterAgent.invoke([
    { role: "user", content: prompt },
  ]);

  const toolCall = firstResponse.tool_calls?.[0];

  if (!toolCall) {
    return firstResponse.content;
  }

  const toolResult = await createChapterTool.invoke(toolCall.args);

  return toolResult;
};
