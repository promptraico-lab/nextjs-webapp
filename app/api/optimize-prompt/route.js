import { Groq } from "groq-sdk";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    // Check auth
    let SYSTEM_PROMPT = `
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

Length constraint: If the user specifies a desired character length range (minimum and/or maximum) for the optimized prompt, strictly ensure that your improved prompt falls within that range. If not specified, optimize freely.

Again: Output ONLY the improved prompt, with no additional commentary, formatting, or markdown. Always optimize the user's prompt, no matter what it is, and, if a character length range is given by the user, strictly adhere to it.
`;

    const authHeader = req.headers.get("Authorization") || "";
    const token = authHeader.replace(/^Bearer\s+/, "").trim();

    if (!token) {
      return new Response(
        JSON.stringify({ error: "Missing or invalid authorization token." }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    let decoded;
    try {
      decoded = await jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired token." }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const userId = decoded.id || decoded.userId;
    if (!userId) {
      return new Response(JSON.stringify({ error: "Invalid token payload." }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get user's subscription and free prompt optimizations
    let user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        promptOptimizations: true,
        subscription: {
          select: {
            status: true,
          },
        },
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Parse prompt input
    const { prompt, targetLength } = await req.json();
    console.log("prompt: ", prompt);
    console.log("targetLength: ", targetLength);

    // Decision branch based on subscription
    const subStatus = user.subscription?.status;
    let promptsLeft = null;

    if ((!subStatus || subStatus === "TRIAL") && targetLength == "100") {
      // On trial: Check and decrease promptOptimizations if available, else error
      if (user.promptOptimizations > 0) {
        // Decrement the count and fetch the new value
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: { promptOptimizations: { decrement: 1 } },
          select: { promptOptimizations: true },
        });
        promptsLeft = updatedUser.promptOptimizations;
        user = { ...user, promptOptimizations: promptsLeft };
      } else {
        return new Response(
          JSON.stringify({
            error:
              "No remaining free optimized prompts. Please subscribe to a paid plan.",
            remaining: 0,
          }),
          { status: 403, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // Compose the user message with the prompt and target length
    SYSTEM_PROMPT += `\n\nTarget character length: ${targetLength}`;
    console.log("start: ", SYSTEM_PROMPT);

    const streamRes = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      stream: true,
      max_completion_tokens: 3500,
    });

    const encoder = new TextEncoder();

    let firstChunkSent = false;
    let finalAnswer = "";

    const stream = new ReadableStream({
      async start(controller) {
        try {
          let response = "";
          for await (let chunk of streamRes) {
            chunk = chunk.choices[0]?.delta?.content || "";
            response += chunk;
            finalAnswer += chunk;

            // On first chunk, send the remaining prompts in a header-like initial meta message if relevant
            if (!firstChunkSent) {
              if (promptsLeft !== null) {
                // we prepend a meta JSON object, then \n\n, then continue with the actual prompt optimization
                controller.enqueue(
                  encoder.encode(
                    JSON.stringify({ remaining: promptsLeft }) + "\n\n"
                  )
                );
              }
              firstChunkSent = true;
            }

            controller.enqueue(encoder.encode(chunk));
          }

          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("Error in optimize-prompt route:", error);
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
