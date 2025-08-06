import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useHabits } from '../contexts/HabitContext';

interface CreateHikeDialogProps {
  visible: boolean;
  onClose: () => void;
}

const CreateHikeDialog: React.FC<CreateHikeDialogProps> = ({ visible, onClose }) => {
  const { createHike } = useHabits();
  const [title, setTitle] = useState('');
  const [targetDate, setTargetDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [targetScore, setTargetScore] = useState('1000');

  const handleSubmit = () => {
    if (!title.trim()) return;
    createHike({
      title,
      startDate: new Date().toISOString(),
      targetDate: targetDate.toISOString(),
      targetScore: Number(targetScore) || 0,
    });
    setTitle('');
    setTargetScore('1000');
    setTargetDate(new Date());
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
        <View style={styles.dialog}>
          <Text style={styles.title}>Start a New Hike</Text>
          <Text style={styles.label}>Hike Title</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Fitness Peak Q3"
            value={title}
            onChangeText={setTitle}
          />
          <Text style={styles.label}>Target Date</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.inputButton}>
            <Text>{targetDate.toDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={targetDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(_, date) => {
                setShowDatePicker(false);
                if (date) setTargetDate(date);
              }}
              minimumDate={new Date()}
            />
          )}
          <Text style={styles.label}>Target Score (Optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 1000"
            value={targetScore}
            onChangeText={setTargetScore}
            keyboardType="numeric"
          />
          <View style={styles.buttonRow}>
            <Button title="Cancel" onPress={onClose} color="#888" />
            <Button title="Begin Hike" onPress={handleSubmit} />
          </View>
        </View>
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
  dialog: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    minWidth: 300,
    width: '85%',
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
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  inputButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});

export default CreateHikeDialog;