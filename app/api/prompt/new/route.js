import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

export const POST = async (request) => {
  const { userId, prompt, tag } = await request.json();
  let optimized_prompt = ""

  const model = new OpenAI({ temperature: 0 });
  const lc_prompt = PromptTemplate.fromTemplate(
    `example query: Write a jira task title and description and acceptance criteria
    optimized prompt: Your task is to create a Jira task with a clear and concise title, description, and acceptance criteria. The title should accurately reflect the goal of the task, while the description should provide enough detail for developers to understand what needs to be done. The acceptance criteria should clearly outline the conditions that must be met in order for the task to be considered complete. These criteria should include specific requirements or functionality that need to be implemented, as well as any relevant testing or documentation that needs to be completed. Please note that your response should be flexible enough to allow for various possible scenarios and tasks. You should focus on providing a detailed and actionable task that can be easily understood by developers.
    
    You are an expert prompt engineer. Your job is to create optimized and detailed prompts that can help users generate good results from chatgpt. Do not answer the given user query. Only respond with an optimized prompt. Do not provide any explanations. Now Create a detailed prompt based on the user given {query}
    `
  );
  const chainA = new LLMChain({ llm: model, prompt:lc_prompt });
  try {
    const resA = await chainA.call({ query: prompt });
    console.log({ resA });
    optimized_prompt = resA["text"]
  } catch (error) {
    console.log(error)
  }

  try {
    await connectToDB();
    const newPrompt = new Prompt({ creator: userId, prompt, optimized_prompt, tag });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
