import { useMemo } from 'react';
import { format, differenceInDays } from 'date-fns';
import type { Hike, Habit, HabitWithDetails, DailyScoreLog } from '../types/types';

export const useHabitCalculations = () => {
  const calculateHabitDetails = (
    habit: Habit,
    dailyScores: DailyScoreLog[]
  ): HabitWithDetails => {
    const habitScores = dailyScores.filter(score => score.habitId === habit.id);
    const totalScore = habitScores.reduce((sum, score) => {
      if (score.score === 1) {
        return sum + habit.positiveScore;
      } else if (score.score === 0) {
        return sum + habit.negativeScore;
      }
      return sum;
    }, 0);

    const completedDays = habitScores.filter(score => score.score === 1).length;
    const missedDays = habitScores.filter(score => score.score === 0).length;
    const totalDays = habitScores.length;

    return {
      ...habit,
      totalScore,
      completedDays,
      missedDays,
      totalDays,
      completionRate: totalDays > 0 ? (completedDays / totalDays) * 100 : 0,
    };
  };

  const calculateHikeProgress = (hike: Hike, habits: Habit[], dailyScores: DailyScoreLog[]) => {
    const hikeHabits = habits.filter(habit => habit.hikeId === hike.id);
    const habitsWithDetails = hikeHabits.map(habit => 
      calculateHabitDetails(habit, dailyScores)
    );

    const totalScore = habitsWithDetails.reduce((sum, habit) => sum + habit.totalScore, 0);
    const totalDays = differenceInDays(new Date(), new Date(hike.startDate)) + 1;
    const progressPercentage = hike.targetScore > 0 ? (totalScore / hike.targetScore) * 100 : 0;

    return {
      ...hike,
      totalScore,
      totalDays,
      progressPercentage,
      habitsWithDetails,
    };
  };

  const getHabitTemplates = (habits: Habit[]): Habit[] => {
    const uniqueHabits = new Map<string, Habit>();
    
    habits.forEach(habit => {
      const key = `${habit.name}-${habit.icon}`;
      if (!uniqueHabits.has(key)) {
        uniqueHabits.set(key, habit);
      }
    });

    return Array.from(uniqueHabits.values());
  };

  const getCurrentStreak = (habitId: string, dailyScores: DailyScoreLog[]): number => {
    const habitScores = dailyScores
      .filter(score => score.habitId === habitId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    let streak = 0;
    for (const score of habitScores) {
      if (score.score === 1) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  return {
    calculateHabitDetails,
    calculateHikeProgress,
    getHabitTemplates,
    getCurrentStreak,
  };
}; 