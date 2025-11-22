import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { RoadmapInput } from "../schema/roadmap.schema";


export async function generateRoadmapTopics(input: RoadmapInput) {
    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-pro",
      apiKey: process.env.GEMINI_API_KEY!,
      temperature: 0.3,
      maxOutputTokens: 20000,
    });
  
    const prompt = `You are an expert learning path designer. Generate a comprehensive, structured learning roadmap.
    
    **Requirements:**
    - Title: ${input.title}
    - Subject: ${input.subject}
    - Level: ${input.level}
    - Learning Goals: ${
      input.learningGoals?.join(", ") || "General understanding"
    }

    - Time Commitment: ${
      input.timeCommitment
        ? `${input.timeCommitment.hoursPerWeek || 0} hours/week for ${
            input.timeCommitment.totalWeeks || 0
          } weeks`
        : "Flexible"
    }
    - Prerequisites: ${input.prerequisites?.join(", ") || "None"}
    
    **Instructions:**
    1. Create 5-10 topics that progressively build knowledge from ${
      input.level
    } level
    2. Each topic should have a unique topicId (format: "topic_1", "topic_2", etc.)
    3. Order topics logically (order: 1, 2, 3...)
    4. Set realistic estimatedHours for each topic
    5. Assign appropriate difficulty (easy/medium/hard)
    6. Define prerequisites using topicId references from earlier topics
    7. Include 3-5 subtopics per topic with estimated minutes
    8. Provide 3-5 high-quality, real resources (mix of articles, videos, courses, documentation)
    9. List 3-5 key takeaways per topic
    10. Suggest 2-4 practical exercises per topic
    
    **CRITICAL: Return ONLY valid JSON. No markdown, no explanation, no code blocks. Start directly with { and end with }**
    
    **IMPORTANT: The response MUST be a JSON object with a "topics" array at the root level.**
    
    JSON Schema:
    {
      "topics": [
        {
          "topicId": "string (e.g., topic_1)",
          "name": "string",
          "description": "string",
          "order": "number",
          "estimatedHours": "number",
          "difficulty": "easy | medium | hard",
          "prerequisites": ["array of topicId strings"],
          "subtopics": [
            {
              "name": "string",
              "description": "string",
              "estimatedMinutes": "number"
            }
          ],
          "resources": [
            {
              "type": "article | video | book | course | documentation",
              "title": "string",
              "url": "string (valid URL)"
            }
          ],
          "keyTakeaways": ["array of strings"],
          "practiceExercises": ["array of strings"]
        }
      ]
    }
    
    Generate the roadmap now. Remember: wrap the topics array in an object with "topics" key:`;
  
    // Invoke with simple string prompt
    const response = await model.invoke(prompt);
  
    // Extract content
    let content = "";
  
    if (typeof response.content === "string") {
      content = response.content;
    } else if (Array.isArray(response.content)) {
      content = response.content
        .map((block: any) => {
          if (typeof block === "string") return block;
          if (block.type === "text") return block.text;
          return "";
        })
        .join("");
    }
  
  
    // Clean up markdown code blocks if present
    content = content
      .replace(/```json\s*/g, "")
      .replace(/```\s*/g, "")
      .trim();
  
    // Parse JSON
    try {
      let result = JSON.parse(content);
  
      // If the AI returned an array directly, wrap it in an object
      if (Array.isArray(result)) {
        console.log("AI returned array directly, wrapping in topics object");
        result = { topics: result };
      }
  
      // Validate that topics exist
      if (!result.topics || !Array.isArray(result.topics)) {
        console.error("Invalid response structure:", result);
        throw new Error("Response does not contain a valid topics array");
      }
  
      console.log(`Successfully parsed ${result.topics.length} topics`);
      return result;
    } catch (parseError: any) {
      console.error("Failed to parse AI response:");
      console.error("Content length:", content.length);
      console.error("First 1000 chars:", content.substring(0, 1000));
      console.error("Last 500 chars:", content.substring(content.length - 500));
      console.error("Parse error:", parseError.message);
  
      throw new Error(`AI did not return valid JSON: ${parseError.message}`);
    }
  }