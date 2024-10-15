import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { StudyPlan } from "../study-plans.types";

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

  const generateStudyPlan = (title: string) => {
    const newPlan: StudyPlan = {
      id: nextId++,
      title,
      description: "This is a sample study plan description",
      studyPlan: "This is a sample study plan",
      tips: "These are some sample study tips",
      starred: false,
    };

    addStudyPlan(newPlan);
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
