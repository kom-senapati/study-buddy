"use client";

import StudyPlansList from "@/components/study-plan-list";
import { StudyPlansProvider } from "@/lib/hooks/use-study-plans";

export default function Home() {
  return (
    <>
      <StudyPlansProvider>
        <StudyPlansList />
      </StudyPlansProvider>
    </>
  );
}
