import { useState } from "react";

import { Plus } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function AddStudyPlan({
  onAdd,
}: {
  onAdd: (title: string) => void;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newPlanTitle, setNewPlanTitle] = useState<string>("");

  const generateNewPlan = () => {
    onAdd(newPlanTitle);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              className="fixed bottom-20 right-6 rounded-full"
              size="icon"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Add a study plan</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Study Plan</DialogTitle>
          <DialogDescription>
            Enter a title for your new study plan. We&apos;ll generate the
            content for you.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={newPlanTitle}
              onChange={(e) => setNewPlanTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={generateNewPlan}>Generate Plan</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
