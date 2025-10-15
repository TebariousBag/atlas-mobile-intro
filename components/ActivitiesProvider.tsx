import { useActivities } from "@/hooks/useActivities";
import { createContext, useContext } from "react";

type Activity = {
  id: number;
  steps: number;
  date: number;
};

type ActivitiesContextType = {
  getActivities: () => Activity[];
  activities: Activity[] | undefined;
  insertActivity: (steps: number, date: Date) => void;
  deleteAllActivities: () => void;
  deleteActivity: (id: number) => void;
};

const ActivitiesContext = createContext<ActivitiesContextType | undefined>(
  undefined
);

export const useActivitiesContext = () => {
  const context = useContext(ActivitiesContext);
  if (!context) {
    throw new Error(
      "useActivitiesContext must be used within an ActivitiesProvider"
    );
  }
  return context;
};

export function ActivitiesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const activitiesValue = useActivities();
  return (
    <ActivitiesContext.Provider value={activitiesValue}>
      {children}
    </ActivitiesContext.Provider>
  );
}
