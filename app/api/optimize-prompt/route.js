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

You must ensure that the improved prompt is as close as possible to the target character length specified by the user, while preserving all essential meaning and requirements. If the user's target length is shorter than the original, condense and remove unnecessary words. If the target length is longer, expand with clarifications, context, or examples as appropriate. Do not add any commentary or formatting.

Again: Output ONLY the improved prompt, with no additional commentary, formatting, or markdown. Always optimize the user's prompt, no matter what it is.
`;

export async function POST(req) {
  const { prompt, targetLength } = await req.json();

  // Compose the user message with the prompt and target length
  let userMessage = prompt;
  if (typeof targetLength === "number" && targetLength > 0) {
    userMessage += `\n\nTarget character length: ${targetLength}`;
  }

  const streamRes = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: userMessage,
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
