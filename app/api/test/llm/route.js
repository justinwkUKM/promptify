import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

export const GET = async (request) => {
  // We can construct an LLMChain from a PromptTemplate and an LLM.
  const model = new OpenAI({ temperature: 0 });
  const query = "Write a recipe for mutton biryani";
  const lc_prompt = PromptTemplate.fromTemplate(
    `example query: Write a jira task title and description and acceptance criteria
    optimized prompt: Your task is to create a Jira task with a clear and concise title, description, and acceptance criteria. The title should accurately reflect the goal of the task, while the description should provide enough detail for developers to understand what needs to be done. The acceptance criteria should clearly outline the conditions that must be met in order for the task to be considered complete. These criteria should include specific requirements or functionality that need to be implemented, as well as any relevant testing or documentation that needs to be completed. Please note that your response should be flexible enough to allow for various possible scenarios and tasks. You should focus on providing a detailed and actionable task that can be easily understood by developers.
    You are an expert prompt engineer. Your job is to create optimized and detailed prompts that can help users generate good results from chatgpt. Do not answer the given user query. Only respond with an optimized prompt. Do not provide any explanations. Now Create a detailed prompt based on the user given prompt: {query}
    `
  );
  const chainA = new LLMChain({ llm: model, prompt: lc_prompt });

  try {
    // The result is an object with a `text` property.
    const resA = await chainA.call({ query: query });
    // console.log({ resA });
    return new Response(JSON.stringify("A"), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
