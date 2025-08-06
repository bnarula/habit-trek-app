
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Hike, Habit, DailyScoreLog, Milestone, HabitWithDetails } from '../types/types';
import { format, parseISO, addDays, differenceInDays } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';



const HIKES_LS_KEY = 'hikes';
const HABITS_LS_KEY = 'habits';
const SCORES_LS_KEY = 'dailyScores';
const MILESTONE_NAMES = ["Base Camp", "Foothills", "Ridge Line", "Ice Fall", "The Ledge", "Crevasse Field", "High Camp", "The Traverse", "Hillary Step", "Summit"];

interface HabitContextType {
  hikes: Hike[];
  activeHike: Hike | undefined;
  habits: HabitWithDetails[];
  dailyScores: DailyScoreLog[];
  createHike: (hikeData: Omit<Hike, 'id' | 'status' | 'totalScore' | 'milestones' | 'nextMilestone' | 'habits'>) => void;
  addHabit: (hikeId: string, habitData: Omit<Habit, 'id' | 'hikeId' | 'totalScore' | 'scoreLogs'>) => void;
  updateHabit: (habitData: Habit) => void;
  deleteHabit: (habitId: string) => void;
  logScore: (habitId: string, date: Date, scoreValue: number) => void;
  getHabitById: (habitId: string) => HabitWithDetails | undefined;
  getScoresForHabit: (habitId: string) => DailyScoreLog[];
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider = ({ children }: { children: ReactNode }) => {
  const [hikes, setHikes] = useState<Omit<Hike, 'totalScore' | 'milestones' | 'nextMilestone' | 'habits'>[]>([]);
  const [habits, setHabits] = useState<Omit<Habit, 'totalScore' | 'scoreLogs'>[]>([]);
  const [dailyScores, setDailyScores] = useState<DailyScoreLog[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      try {
        const storedHikes = await AsyncStorage.getItem(HIKES_LS_KEY);
        if (storedHikes) setHikes(JSON.parse(storedHikes));
        const storedHabits = await AsyncStorage.getItem(HABITS_LS_KEY);
        if (storedHabits) setHabits(JSON.parse(storedHabits));
        const storedScores = await AsyncStorage.getItem(SCORES_LS_KEY);
        if (storedScores) setDailyScores(JSON.parse(storedScores));
      } catch (error) {
        console.error("Failed to parse from AsyncStorage", error);
      }
      setIsLoaded(true);
    })();
  }, []);

  // Persist to AsyncStorage whenever data changes
  useEffect(() => { if (isLoaded) AsyncStorage.setItem(HIKES_LS_KEY, JSON.stringify(hikes)); }, [hikes, isLoaded]);
  useEffect(() => { if (isLoaded) AsyncStorage.setItem(HABITS_LS_KEY, JSON.stringify(habits)); }, [habits, isLoaded]);
  useEffect(() => { if (isLoaded) AsyncStorage.setItem(SCORES_LS_KEY, JSON.stringify(dailyScores)); }, [dailyScores, isLoaded]);

  // --- DERIVED DATA ---
  const habitsWithDetails: HabitWithDetails[] = React.useMemo(() => {
    return habits.map(habit => {
      const scoresForHabit = dailyScores.filter(score => score.habitId === habit.id);
      const totalScore = scoresForHabit.reduce((sum, score) => sum + (score.score * habit.weight), 0);
      return {
        ...habit,
        scoreLogs: scoresForHabit,
        totalScore,
      };
    });
  }, [habits, dailyScores]);

  const hikesWithDetails: Hike[] = React.useMemo(() => {
    return hikes.map(hike => {
      const habitsForHike = habitsWithDetails.filter(habit => habit.hikeId === hike.id);
      const totalScore = habitsForHike.reduce((sum, habit) => sum + habit.totalScore, 0);
      const milestones: Milestone[] = [];
      let nextMilestone: Milestone | undefined = undefined;
      const durationDays = differenceInDays(parseISO(hike.targetDate), parseISO(hike.startDate));
      if (hike.targetScore > 0 && durationDays > 0) {
        const expectedRate = hike.targetScore / durationDays;
        for (let i = 0; i < 10; i++) {
          const milestoneScore = Math.round((hike.targetScore / 10) * (i + 1));
          const daysToReachMilestone = Math.max(1, milestoneScore / expectedRate);
          const expectedDate = addDays(parseISO(hike.startDate), daysToReachMilestone);
          const milestone: Milestone = {
            name: MILESTONE_NAMES[i],
            score: milestoneScore,
            expectedDate: expectedDate.toISOString(),
          };
          milestones.push(milestone);
          if (!nextMilestone && milestone.score > totalScore) {
            nextMilestone = milestone;
          }
        }
      }
      return {
        ...hike,
        habits: habitsForHike,
        totalScore,
        milestones,
        nextMilestone
      };
    });
  }, [hikes, habitsWithDetails]);

  const activeHike = hikesWithDetails.find(h => h.status === 'in-progress');

  // --- ACTIONS ---
  const createHike: HabitContextType['createHike'] = (hikeData) => {
    const newHike = {
      ...hikeData,
      id: Math.random().toString(36).substring(2), // fallback for uuid
      status: 'in-progress' as const,
    };
    const updatedHikes = hikes.map(h => ({ ...h, status: 'completed' as const }));
    setHikes([...updatedHikes, newHike]);
  };

  const addHabit: HabitContextType['addHabit'] = (hikeId, habitData) => {
    const newHabit = {
      ...habitData,
      id: Math.random().toString(36).substring(2),
      hikeId,
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const updateHabit: HabitContextType['updateHabit'] = (updatedHabitData) => {
    setHabits(prev => prev.map(h => h.id === updatedHabitData.id ? {
      id: h.id,
      hikeId: h.hikeId,
      name: updatedHabitData.name,
      icon: updatedHabitData.icon,
      notes: updatedHabitData.notes,
      weight: updatedHabitData.weight
    } : h));
  };

  const deleteHabit: HabitContextType['deleteHabit'] = (habitId) => {
    setHabits(prev => prev.filter(h => h.id !== habitId));
    setDailyScores(prev => prev.filter(s => s.habitId !== habitId));
  };

  const logScore: HabitContextType['logScore'] = (habitId, date, scoreValue) => {
    const dateString = format(date, 'yyyy-MM-dd');
    setDailyScores(prevScores => {
      const existingLogIndex = prevScores.findIndex(log => log.habitId === habitId && log.date === dateString);
      if (existingLogIndex > -1) {
        const updatedScores = [...prevScores];
        updatedScores[existingLogIndex].score = scoreValue;
        return updatedScores;
      } else {
        const newLog: DailyScoreLog = {
          id: Math.random().toString(36).substring(2),
          habitId,
          date: dateString,
          score: scoreValue,
        };
        return [...prevScores, newLog];
      }
    });
  };

  const getHabitById: HabitContextType['getHabitById'] = (habitId) => {
    return habitsWithDetails.find(h => h.id === habitId);
  };

  const getScoresForHabit: HabitContextType['getScoresForHabit'] = (habitId) => {
    return dailyScores.filter(score => score.habitId === habitId);
  };

  if (!isLoaded) {
    return null; // Render nothing until hydration is complete
  }

  const contextValue: HabitContextType = {
    hikes: hikesWithDetails,
    activeHike,
    habits: habitsWithDetails,
    dailyScores,
    createHike,
    addHabit,
    updateHabit,
    deleteHabit,
    logScore,
    getHabitById,
    getScoresForHabit,
  };

  return (
    <HabitContext.Provider value={contextValue}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};
