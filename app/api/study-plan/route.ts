import { model } from "@/lib/groq";
import { StudyPlanSchema } from "@/lib/study-plans.types";
import { generateObject } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const prompt = `Generate a study plan for the topic "${body.title}" with the following requirements:
        - The short description of the study plan should be under 100 characters.
        - The study plan should have at least 5 steps and generally 10 steps in ordered list markdown format.
        - The tips should have at most 5 tips in unordered list markdown format.`;

    const result = await generateObject({
      model,
      schema: StudyPlanSchema,
      prompt,
    });

    return NextResponse.json(result.object);
  } catch (error) {
    console.error("Error generating recipe:", error);
    return NextResponse.json({ error: "Failed to generate recipe." });
  }
}
