import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Hike, Habit, DailyScoreLog } from '../types/types';

const HIKES_KEY = 'hikes';
const HABITS_KEY = 'habits';
const DAILY_SCORES_KEY = 'dailyScores';

export const useHabitStorage = () => {
  const saveHikes = async (hikes: Hike[]) => {
    try {
      await AsyncStorage.setItem(HIKES_KEY, JSON.stringify(hikes));
    } catch (error) {
      console.error('Error saving hikes:', error);
    }
  };

  const loadHikes = async (): Promise<Hike[]> => {
    try {
      const data = await AsyncStorage.getItem(HIKES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading hikes:', error);
      return [];
    }
  };

  const saveHabits = async (habits: Habit[]) => {
    try {
      await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(habits));
    } catch (error) {
      console.error('Error saving habits:', error);
    }
  };

  const loadHabits = async (): Promise<Habit[]> => {
    try {
      const data = await AsyncStorage.getItem(HABITS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading habits:', error);
      return [];
    }
  };

  const saveDailyScores = async (scores: DailyScoreLog[]) => {
    try {
      await AsyncStorage.setItem(DAILY_SCORES_KEY, JSON.stringify(scores));
    } catch (error) {
      console.error('Error saving daily scores:', error);
    }
  };

  const loadDailyScores = async (): Promise<DailyScoreLog[]> => {
    try {
      const data = await AsyncStorage.getItem(DAILY_SCORES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading daily scores:', error);
      return [];
    }
  };

  return {
    saveHikes,
    loadHikes,
    saveHabits,
    loadHabits,
    saveDailyScores,
    loadDailyScores,
  };
}; 