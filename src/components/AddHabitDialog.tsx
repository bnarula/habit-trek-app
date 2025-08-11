import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useHabits } from '../contexts/HabitContext';
import type { Habit } from '../types/types';
import Picker from 'react-native-picker-select';

const AVAILABLE_ICONS = [
  { name: '🏃‍♂️', label: 'Running' },
  { name: '🏋️‍♂️', label: 'Gym' },
  { name: '🧘‍♀️', label: 'Yoga' },
  { name: '📚', label: 'Reading' },
  { name: '💧', label: 'Water' },
  { name: '🥗', label: 'Healthy Eating' },
  { name: '😴', label: 'Sleep' },
  { name: '📝', label: 'Journaling' },
  { name: '🎯', label: 'Goal' },
  { name: '❤️', label: 'Heart' },
];

const DEFAULT_ICON = '🎯';

interface AddHabitDialogProps {
  hikeId: string;
  habit?: Habit; // For editing existing habit
  visible: boolean;
  onClose: () => void;
}

const AddHabitDialog: React.FC<AddHabitDialogProps> = ({ hikeId, habit, visible, onClose }) => {
  const { addHabit, updateHabit } = useHabits();
  const [name, setName] = useState(habit?.name || '');
  const [icon, setIcon] = useState(habit?.icon || DEFAULT_ICON);
  const [notes, setNotes] = useState(habit?.notes || '');
  const [weight, setWeight] = useState(habit?.weight?.toString() || '1');
  const [positiveScore, setPositiveScore] = useState(habit?.positiveScore?.toString() || '10');
  const [negativeScore, setNegativeScore] = useState(habit?.negativeScore?.toString() || '-5');

  const handleSubmit = () => {
    if (!name.trim()) return;

    const habitData = {
      name: name.trim(),
      icon,
      notes: notes.trim(),
      weight: Number(weight),
      positiveScore: Number(positiveScore),
      negativeScore: Number(negativeScore),
    };

    if (habit) {
      // Update existing habit
      updateHabit({
        ...habit,
        ...habitData,
      });
    } else {
      // Create new habit
      addHabit(hikeId, habitData);
    }

    // Reset form
    setName('');
    setIcon(DEFAULT_ICON);
    setNotes('');
    setWeight('1');
    setPositiveScore('10');
    setNegativeScore('-5');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.dialog}>
            <Text style={styles.title}>{habit ? "Edit Habit" : "Add New Habit"}</Text>
            <Text style={styles.description}>
              {habit ? "Update the details of this habit." : "Add a new habit to your current Hike."}
            </Text>

            <Text style={styles.label}>Habit Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Morning Run"
              value={name}
              onChangeText={setName}
            />

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <Text style={styles.label}>Weight</Text>
                <TextInput
                  style={styles.input}
                  placeholder="1"
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.halfWidth}>
                <Text style={styles.label}>Positive Score</Text>
                <TextInput
                  style={styles.input}
                  placeholder="10"
                  value={positiveScore}
                  onChangeText={setPositiveScore}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <Text style={styles.label}>Negative Score (Penalty)</Text>
            <TextInput
              style={styles.input}
              placeholder="-5"
              value={negativeScore}
              onChangeText={setNegativeScore}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Notes (Optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Any specific notes about this habit..."
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
            />

            <View style={styles.buttonRow}>
              <Button title="Cancel" onPress={onClose} color="#888" />
              <Button title={habit ? "Save Changes" : "Add Habit"} onPress={handleSubmit} />
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    minWidth: 320,
    width: '90%',
    maxWidth: 400,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 15,
    marginTop: 12,
    marginBottom: 4,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 8,
  },
  picker: {
    height: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default AddHabitDialog; 