import { Star } from "lucide-react";

import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function Filter({
  showStarredOnly,
  setShowStarredOnly,
}: {
  showStarredOnly: boolean;
  setShowStarredOnly: (show: boolean) => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-32 right-6 rounded-full"
          onClick={() => setShowStarredOnly(!showStarredOnly)}
        >
          <Star
            className={
              showStarredOnly
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>Filter by star</p>
      </TooltipContent>
    </Tooltip>
  );
}
