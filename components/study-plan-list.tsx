import { useStudyPlans } from "@/lib/hooks/use-study-plans";
import StudyPlanCard from "./study-plan";
import AddStudyPlan from "./add-study-plan";
import { StudyPlan } from "@/lib/study-plans.types";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import Filter from "./filter";
import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "@/components/theme/theme-toggle";

export default function StudyPlansList() {
  const {
    filteredStudyPlans: studyPlans,
    generateStudyPlan,
    deleteStudyPlan,
    toggleStar,
    showStarredOnly,
    setShowStarredOnly,
  } = useStudyPlans();

  return (
    <main className="container mx-auto p-4">
      <nav className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Study Buddy</h1>
        <Link href="https://github.com/kom-senapati/study-buddy">
          <GitHubLogoIcon className="w-6 h-6" />
        </Link>
      </nav>
      <h1 className="text-2xl text-center text-accent-foreground font-bold mb-6">
        Study Plans
      </h1>
      {studyPlans.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {studyPlans.map((plan: StudyPlan) => (
            <StudyPlanCard
              key={plan.id}
              plan={plan}
              toggleStar={toggleStar}
              deletePlan={deleteStudyPlan}
            />
          ))}
        </div>
      ) : showStarredOnly ? (
        <p className="text-center text-muted-foreground">
          No starred study plans yet. Star one study plan.
        </p>
      ) : (
        <p className="text-center text-muted-foreground">
          No study plans yet. Click the button below to create one.
        </p>
      )}
      <TooltipProvider>
        <ModeToggle />
        <Filter
          showStarredOnly={showStarredOnly}
          setShowStarredOnly={setShowStarredOnly}
        />
        <AddStudyPlan onAdd={generateStudyPlan} />
      </TooltipProvider>
    </main>
  );
}
