import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";

// hooks for use of database activities
type Activity = {
  id: number;
  steps: number;
  date: number;
};

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>();
  const db = useSQLiteContext();

  function getActivities() {
    return db.getAllSync<Activity>(
      "SELECT * FROM activities ORDER BY date DESC"
    );
  }

  function deleteAllActivities() {
    db.runSync(`DELETE FROM activities`);
    reload();
  }

  function insertActivity(steps: number, date: Date) {
    const timestamp = Math.floor(date.getTime() / 1000);
    db.runSync(`INSERT INTO activities (steps, date) VALUES (?, ?)`, [
      steps,
      timestamp,
    ]);
    reload();
  }

  function deleteActivity(id: number) {
    db.runSync(`DELETE FROM activities WHERE id = ?`, [id]);
    reload();
  }

  function reload() {
    const data = getActivities();
    setActivities(data);
  }

  useEffect(() => {
    reload();
  }, []);

  return {
    getActivities,
    activities,
    insertActivity,
    deleteAllActivities,
    deleteActivity,
  };
}
