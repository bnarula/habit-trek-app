// Types for Hike, Habit, Milestone, etc. for React Native

export interface Hike {
  id: string;
  title: string;
  startDate: string; // ISO date string
  targetDate: string; // ISO date string
  targetScore: number;
  status: "in-progress" | "completed" | "abandoned";
  // Calculated properties
  totalScore: number;
  habits: HabitWithDetails[];
  milestones: Milestone[];
  nextMilestone?: Milestone;
}

export interface Habit {
  id: string;
  hikeId: string;
  name: string;
  icon: string;
  notes: string;
  weight: number; // multiplier for scoring impact
}

export interface DailyScoreLog {
  id: string;
  habitId: string;
  date: string; // YYYY-MM-DD format
  score: number;
}

export interface Milestone {
  name: string;
  score: number;
  expectedDate: string; // ISO String
}

// Combined type for display purposes
export interface HabitWithDetails extends Habit {
  scoreLogs: DailyScoreLog[];
  totalScore: number;
}
