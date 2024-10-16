import { z } from "zod";

export type StudyPlan = {
  id: number;
  title: string;
  description: string;
  studyPlan: string;
  tips: string;
  starred: boolean;
};

export const StudyPlanSchema = z.object({
  title: z.string().describe("The title of the topic"),
  description: z
    .string()
    .describe(
      "The short description of the study plan for topic under 100 characters"
    ),
  studyPlan: z
    .string()
    .describe(
      "A step by step study plan(atleast 5 steps, generally 10 steps) for the topic in ordered list markdown format"
    ),
  tips: z
    .string()
    .describe(
      "Tips(atmost 5) for the study plan in unordered list markdown format"
    ),
});
