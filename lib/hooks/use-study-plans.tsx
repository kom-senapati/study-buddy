import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { StudyPlan } from "../study-plans.types";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";

let nextId = 1;

type StudyPlansContextType = {
  filteredStudyPlans: StudyPlan[];
  generateStudyPlan: (title: string) => void;
  deleteStudyPlan: (id: string) => void;
  toggleStar: (id: string) => void;
  showStarredOnly: boolean;
  setShowStarredOnly: (show: boolean) => void;
};

const StudyPlansContext = createContext<StudyPlansContextType | undefined>(
  undefined
);

export function StudyPlansProvider({ children }: { children: ReactNode }) {
  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>([]);
  const [filteredStudyPlans, setFilteredStudyPlans] =
    useState<StudyPlan[]>(studyPlans);
  const [showStarredOnly, setShowStarredOnly] = useState(false);

  useEffect(() => {
    if (showStarredOnly) {
      setFilteredStudyPlans(studyPlans.filter((plan) => plan.starred));
    } else {
      setFilteredStudyPlans(studyPlans);
    }
  }, [showStarredOnly, studyPlans]);

  const addStudyPlan = (plan: Omit<StudyPlan, "id">) => {
    setStudyPlans([...studyPlans, { ...plan, id: nextId++ }]);
  };

  const generateStudyPlan = async (title: string) => {
    const response = await fetch("/api/study-plan", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
    const newPlan = await response.json();

    addStudyPlan({ ...newPlan, starred: false });
  };

  const deleteStudyPlan = (id: string) => {
    const numId = parseInt(id);
    setStudyPlans(studyPlans.filter((plan) => plan.id !== numId));
  };

  const toggleStar = (id: string) => {
    const numId = parseInt(id);
    setStudyPlans(
      studyPlans.map((plan) =>
        plan.id === numId ? { ...plan, starred: !plan.starred } : plan
      )
    );
  };

  useCopilotReadable({
    description: "This is a list of study plans",
    value: studyPlans,
  });

  useCopilotAction({
    name: "addStudyPlan",
    description:
      "Generates and add a new study plan based on user query and title",
    parameters: [
      {
        name: "title",
        description: "The title of the topic",
        type: "string",
      },
      {
        name: "description",
        description:
          "The short description of the study plan for topic under 100 characters",
        type: "string",
      },
      {
        name: "studyPlan",
        description:
          "A step by step study plan(atleast 5 steps, generally 10 steps) for the topic in ordered list markdown format",
        type: "string",
      },
      {
        name: "tips",
        description:
          "Tips(atmost 5) for the study plan in unordered list markdown format",
        type: "string",
      },
    ],
    handler: async (args) => {
      console.log(args);
      addStudyPlan({
        ...args,
        starred: false,
      });
    },
  });

  useCopilotAction({
    name: "deleteStudyPlan",
    description: "Deletes a study plan",
    parameters: [
      {
        name: "id",
        description: "The id of the study plan to delete",
        type: "string",
      },
    ],
    handler: ({ id }) => {
      deleteStudyPlan(id);
    },
  });

  return (
    <StudyPlansContext.Provider
      value={{
        filteredStudyPlans,
        generateStudyPlan,
        deleteStudyPlan,
        toggleStar,
        showStarredOnly,
        setShowStarredOnly,
      }}
    >
      {children}
    </StudyPlansContext.Provider>
  );
}

export function useStudyPlans() {
  const context = useContext(StudyPlansContext);
  if (!context) {
    throw new Error("useStudyPlans must be used within a StudyPlansProvider");
  }
  return context;
}
