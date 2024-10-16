import { Star, Trash2 } from "lucide-react";

import { StudyPlan } from "@/lib/study-plans.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "./ui/button";
import Markdown from "react-markdown";

export default function StudyPlanCard({
  plan,
  toggleStar,
  deletePlan,
}: {
  plan: StudyPlan;
  toggleStar: (id: string) => void;
  deletePlan: (id: string) => void;
}) {
  return (
    <Sheet key={plan.id}>
      <SheetTrigger asChild>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">{plan.title}</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                toggleStar(String(plan.id));
              }}
            >
              <Star
                className={
                  plan.starred
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            </Button>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-lg">
              {plan.description}
            </CardDescription>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                deletePlan(String(plan.id));
              }}
            >
              <Trash2 className="h-5 w-5 text-destructive" />
            </Button>
          </CardFooter>
        </Card>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{plan.title}</SheetTitle>
          <SheetDescription>{plan.description}</SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <h3 className="font-bold text-xl mb-4">Study Plan</h3>
          <Markdown>{plan.studyPlan}</Markdown>
          <h3 className="font-bold text-xl my-4">Study Tips</h3>
          <Markdown>{plan.tips}</Markdown>
        </div>
      </SheetContent>
    </Sheet>
  );
}
