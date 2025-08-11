// Types for Hike, Habit, Milestone, etc. for React Native

export interface Hike {
  id: string;
  title: string;
  startDate: string; // ISO date string
  targetDate: string; // ISO date string
  targetScore: number;
  status: "DRAFT" | "ACTIVE" | "COMPLETED" | "ABANDONED";
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
  positiveScore: number; // points for completing the habit
  negativeScore: number; // penalty for missing the habit
}

export interface DailyScoreLog {
  id: string;
  habitId: string;
  date: string; // YYYY-MM-DD format
  score: number; // 0 = missed, 1 = completed
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

// For habit selection from previous hikes
export interface HabitTemplate {
  id: string;
  name: string;
  icon: string;
  notes: string;
  weight: number;
  // These will be set when adding to new hike
  positiveScore?: number;
  negativeScore?: number;
}
