import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { HabitWithDetails } from '../types/types';

interface HabitListProps {
  habits: HabitWithDetails[];
  onEditHabit: (habit: HabitWithDetails) => void;
}

const HabitList: React.FC<HabitListProps> = ({ habits, onEditHabit }) => {
  if (habits.length === 0) {
    return (
      <Text style={styles.emptyText}>
        No habits added yet. Add your first habit to get started!
      </Text>
    );
  }

  return (
    <>
      {habits.map((habit) => (
        <TouchableOpacity 
          key={habit.id} 
          style={styles.habitItem} 
          onPress={() => onEditHabit(habit)}
        >
          <Text style={styles.habitIcon}>{habit.icon}</Text>
          <View style={styles.habitInfo}>
            <Text style={styles.habitName}>{habit.name}</Text>
            <Text style={styles.habitDetails}>
              +{habit.positiveScore} / {habit.negativeScore} • Weight: {habit.weight}
            </Text>
          </View>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  habitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 8,
  },
  habitIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    fontSize: 16,
    fontWeight: '600',
  },
  habitDetails: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  editText: {
    color: '#2a9d8f',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default HabitList; 