import Together from 'together-ai';
import dotenv from 'dotenv';
dotenv.config();

const client = new Together({
  apiKey: process.env['TOGETHER_API_KEY'], 
});

async function parsePromptWithML(prompt) {
  const systemPrompt = `
You are a compiler optimization assistant.
Given a natural language optimization request, extract the goal and parameters in JSON.
Valid keys: goal (e.g., "minimize_gas"), target (e.g., 10000), transformations (e.g., ["remove_sstore"]).
`;

  const response = await client.chat.completions.create({
    model: "meta-llama/Llama-3-8b-chat-hf",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt }
    ]
  });

  const content = response.choices[0].message.content;
  console.log('🔍 Raw LLM response:', content);

  try {
    const parsed = JSON.parse(content);
    return parsed;
  } catch (e) {
    console.warn("Defaulting...");
    return { goal: "minimize_gas" }; // fallback
  }
}

export { parsePromptWithML };
