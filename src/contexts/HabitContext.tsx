
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useHabitStorage } from '../hooks/useHabitStorage';
import { useHabitCalculations } from '../hooks/useHabitCalculations';
import type { Hike, Habit, HabitWithDetails, DailyScoreLog, HabitTemplate } from '../types/types';

interface HabitContextType {
  hikes: Hike[];
  habits: Habit[];
  dailyScores: DailyScoreLog[];
  openHike: Hike | null;
  createHike: (hikeData: Omit<Hike, 'id' | 'status'>) => void;
  startHike: (hikeId: string) => void;
  addHabit: (hikeId: string, habitData: Omit<Habit, 'id' | 'hikeId'>) => void;
  updateHabit: (habit: Habit) => void;
  deleteHabit: (habitId: string) => void;
  logDailyScore: (habitId: string, score: 0 | 1, date?: string) => void;
  getHabitTemplates: () => HabitTemplate[];
  addHabitFromTemplate: (hikeId: string, template: HabitTemplate) => void;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};

interface HabitProviderProps {
  children: React.ReactNode;
}

export const HabitProvider: React.FC<HabitProviderProps> = ({ children }) => {
  const [hikes, setHikes] = useState<Hike[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [dailyScores, setDailyScores] = useState<DailyScoreLog[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { saveHikes, loadHikes, saveHabits, loadHabits, saveDailyScores, loadDailyScores } = useHabitStorage();
  const { calculateHikeProgress, getHabitTemplates: getTemplates } = useHabitCalculations();

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      const [loadedHikes, loadedHabits, loadedScores] = await Promise.all([
        loadHikes(),
        loadHabits(),
        loadDailyScores(),
      ]);
      
      setHikes(loadedHikes);
      setHabits(loadedHabits);
      setDailyScores(loadedScores);
      setIsLoaded(true);
    };

    loadData();
  }, []);

  // Save data when it changes
  useEffect(() => {
    if (isLoaded) {
      saveHikes(hikes);
    }
  }, [hikes, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      saveHabits(habits);
    }
  }, [habits, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      saveDailyScores(dailyScores);
    }
  }, [dailyScores, isLoaded]);

  // Computed values
  const openHike = hikes.find(hike => hike.status === 'ACTIVE' || hike.status === "DRAFT") || null;

  const createHike = (hikeData: Omit<Hike, 'id' | 'status'>) => {
    const newHike: Hike = {
      ...hikeData,
      id: Date.now().toString(),
      status: 'DRAFT',
    };
    setHikes(prev => [...prev, newHike]);
  };

  const startHike = (hikeId: string) => {
    setHikes(prev => prev.map(hike => 
      hike.id === hikeId ? { ...hike, status: 'ACTIVE' } : hike
    ));
  };

  const addHabit = (hikeId: string, habitData: Omit<Habit, 'id' | 'hikeId'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: Date.now().toString(),
      hikeId,
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const updateHabit = (updatedHabit: Habit) => {
    setHabits(prev => prev.map(habit => 
      habit.id === updatedHabit.id ? updatedHabit : habit
    ));
  };

  const deleteHabit = (habitId: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== habitId));
    setDailyScores(prev => prev.filter(score => score.habitId !== habitId));
  };

  const logDailyScore = (habitId: string, score: 0 | 1, date?: string) => {
    const scoreDate = date || new Date().toISOString().split('T')[0];
    const existingScoreIndex = dailyScores.findIndex(
      s => s.habitId === habitId && s.date === scoreDate
    );

    if (existingScoreIndex >= 0) {
      setDailyScores(prev => prev.map((s, i) => 
        i === existingScoreIndex ? { ...s, score } : s
      ));
    } else {
      const newScore: DailyScoreLog = {
        id: Date.now().toString(),
        habitId,
        date: scoreDate,
        score,
      };
      setDailyScores(prev => [...prev, newScore]);
    }
  };

  const getHabitTemplates = (): HabitTemplate[] => {
    return getTemplates(habits).map(habit => ({
      id: habit.id,
      name: habit.name,
      icon: habit.icon,
      notes: habit.notes || '',
      weight: habit.weight,
    }));
  };

  const addHabitFromTemplate = (hikeId: string, template: HabitTemplate) => {
    addHabit(hikeId, {
      name: template.name,
      icon: template.icon,
      notes: template.notes,
      weight: 1,
      positiveScore: 10,
      negativeScore: -5,
    });
  };

  const value: HabitContextType = {
    hikes,
    habits,
    dailyScores,
    openHike,
    createHike,
    startHike,
    addHabit,
    updateHabit,
    deleteHabit,
    logDailyScore,
    getHabitTemplates,
    addHabitFromTemplate,
  };

  return (
    <HabitContext.Provider value={value}>
      {children}
    </HabitContext.Provider>
  );
};
