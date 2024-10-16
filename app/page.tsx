"use client";

import StudyPlansList from "@/components/study-plan-list";
import { StudyPlansProvider } from "@/lib/hooks/use-study-plans";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

export default function Home() {
  return (
    <>
      <CopilotKit runtimeUrl="/api/copilotkit">
        <StudyPlansProvider>
          <StudyPlansList />
        </StudyPlansProvider>
        <CopilotPopup
          instructions="You are Study Buddy that creates a study plan for given topic and also give some tips.Assist user in helpful way."
          labels={{
            title: "Study Buddy",
            initial:
              "Welcome to Study Buddy! What study plan would you like to create today?",
          }}
        />
      </CopilotKit>
    </>
  );
}
