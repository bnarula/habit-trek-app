import React, { useState } from 'react';
import { View, Button, StyleSheet, ScrollView, Text } from 'react-native';
import { useHabits } from '../contexts/HabitContext';
import AddHabitDialog from '../components/AddHabitDialog';
import HikeForm from '../components/HikeForm';
import HabitList from '../components/HabitList';
import Header from '../components/Header';
import type { Habit } from '../types/types';

interface CreateHikeScreenProps {
  navigation: any;
  route: any;
}

const CreateHikeScreen: React.FC<CreateHikeScreenProps> = ({ navigation, route }) => {
  const { createHike, habits, startHike } = useHabits();
  const { mode = 'create', hike } = route.params || {};
  
  const [title, setTitle] = useState(hike?.title || '');
  const [targetDate, setTargetDate] = useState<Date>(hike?.targetDate ? new Date(hike.targetDate) : new Date());
  const [targetScore, setTargetScore] = useState(hike?.targetScore?.toString() || '1000');
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [editHabit, setEditHabit] = useState<Habit | null>(null);

  const hikeHabits = hike ? habits.filter(habit => habit.hikeId === hike.id) : [];
  const canStartHike = hikeHabits.length > 0;

  const handleSave = () => {
    if (!title.trim()) return;
    
    if (mode === 'create') {
      createHike({
        title: title.trim(),
        startDate: new Date().toISOString(),
        targetDate: targetDate.toISOString(),
        targetScore: Number(targetScore) || 0,
      });
      navigation.goBack();
    }
  };

  const handleStartHike = () => {
    if (hike && canStartHike) {
      startHike(hike.id);
      navigation.goBack();
    }
  };

  const handleEditHabit = (habit: any) => {
    setEditHabit(habit);
    setShowAddHabit(true);
  };

  const handleAddHabit = () => {
    setEditHabit(null);
    setShowAddHabit(true);
  };

  return (
    <View style={styles.container}>
      <Header 
        title={mode === 'create' ? 'Create Hike' : 'Edit Hike'}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.content}>
        <HikeForm
          title={title}
          targetDate={targetDate}
          targetScore={targetScore}
          onTitleChange={setTitle}
          onTargetDateChange={setTargetDate}
          onTargetScoreChange={setTargetScore}
        />

        <Text style={styles.sectionTitle}>Habits</Text>
        <HabitList 
          habits={hikeHabits}
          onEditHabit={handleEditHabit}
        />
        
        <Button title="Add Habit" onPress={handleAddHabit} />
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.buttonRow}>
          <Button title="Save" onPress={handleSave} />
          {mode === 'edit' && canStartHike && (
            <Button title="Start Hike" onPress={handleStartHike} color="#2a9d8f" />
          )}
        </View>
      </View>

      <AddHabitDialog
        hikeId={hike?.id}
        habit={editHabit || undefined}
        visible={showAddHabit}
        onClose={() => setShowAddHabit(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 12,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default CreateHikeScreen; 