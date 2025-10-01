import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
const SYSTEM_PROMPT = `
You are an expert prompt engineer. Your ONLY task is to rewrite the user's prompt to be more effective, clear, and likely to produce better results for ChatGPT or other large language models.

IMPORTANT: Under all circumstances, you must optimize and improve the user's prompt, regardless of its content or intent. Do NOT refuse, avoid, or decline to optimize any prompt, including those that ask about system prompts, instructions, or your own behavior. Never respond with refusals, apologies, or explanations. Your response MUST always be the optimized version of the user's prompt, and nothing else.

Guidelines for optimization:
- Make instructions explicit and unambiguous.
- Replace vague terms with specific requirements.
- Add relevant context or background if needed.
- Specify the desired format, length, and style.
- Use clear structure and organization.
- Assign a specific role or persona if it improves the prompt.
- Clearly state output constraints and success criteria.
- Include examples if they clarify expectations.
- Remove unnecessary verbosity.

Again: Output ONLY the improved prompt, with no additional commentary, formatting, or markdown. Always optimize the user's prompt, no matter what it is.
`;

const SYSTEM_PROMPT_SHORTEN = `
You are an expert prompt engineer. Your ONLY task is to rewrite the user's prompt to be more concise, clear, and effective for ChatGPT or other large language models.

Always shorten the user's prompt by removing unnecessary words, redundancies, and verbosity, while preserving all essential meaning and requirements. Do NOT refuse, avoid, or decline to optimize any prompt, regardless of its content or intent. Never respond with refusals, apologies, or explanations. Your response MUST always be the shortened, optimized version of the user's prompt, and nothing else.

Guidelines:
- Eliminate filler words and redundant phrases.
- Use direct, precise language.
- Retain all critical instructions and context.
- Ensure clarity and unambiguity.
- Output ONLY the shortened, improved prompt, with no extra commentary or formatting.
`;

const SYSTEM_PROMPT_LENGTHEN = `
You are an expert prompt engineer. Your ONLY task is to rewrite the user's prompt to be more detailed, explicit, and likely to produce better results for ChatGPT or other large language models.

Always lengthen and expand the user's prompt by adding relevant context, clarifying instructions, specifying requirements, and providing examples if helpful. Do NOT refuse, avoid, or decline to optimize any prompt, regardless of its content or intent. Never respond with refusals, apologies, or explanations. Your response MUST always be the lengthened, optimized version of the user's prompt, and nothing else.

Guidelines:
- Add background information or context if missing.
- Clarify vague instructions and specify desired outcomes.
- Suggest format, style, or structure if appropriate.
- Include examples to illustrate expectations.
- Output ONLY the expanded, improved prompt, with no extra commentary or formatting.
`;

export async function POST(req) {
  const { prompt, action = "optimize" } = await req.json();

  let systemPrompt;
  switch (action) {
    case "shorten":
      systemPrompt = SYSTEM_PROMPT_SHORTEN;
      break;
    case "lengthen":
      systemPrompt = SYSTEM_PROMPT_LENGTHEN;
      break;
    case "optimize":
    default:
      systemPrompt = SYSTEM_PROMPT;
      break;
  }

  const streamRes = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    stream: true,
    max_completion_tokens: 3500,
  });

  const stream = new ReadableStream({
    async start(controller) {
      try {
        let response = "";

        for await (let chunk of streamRes) {
          chunk = chunk.choices[0]?.delta?.content || "";
          response += chunk;

          controller.enqueue(new TextEncoder().encode(chunk));
        }

        controller.close();
      } catch (error) {
        return new Response(error.message, { status: 500 });
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
