import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface HikeFormProps {
  title: string;
  targetDate: Date;
  targetScore: string;
  onTitleChange: (title: string) => void;
  onTargetDateChange: (date: Date) => void;
  onTargetScoreChange: (score: string) => void;
}

const HikeForm: React.FC<HikeFormProps> = ({
  title,
  targetDate,
  targetScore,
  onTitleChange,
  onTargetDateChange,
  onTargetScoreChange,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Hike Details</Text>
      
      <Text style={styles.label}>Hike Title</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Fitness Peak Q3"
        value={title}
        onChangeText={onTitleChange}
      />

      <Text style={styles.label}>Target Date</Text>
      <TouchableOpacity 
        onPress={() => setShowDatePicker(true)} 
        style={styles.dateButton}
      >
        <Text>{targetDate.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={targetDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_, date) => {
            setShowDatePicker(false);
            if (date) onTargetDateChange(date);
          }}
          minimumDate={new Date()}
        />
      )}

      <Text style={styles.label}>Target Score (Optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 1000"
        value={targetScore}
        onChangeText={onTargetScoreChange}
        keyboardType="numeric"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 12,
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
  dateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
  },
});

export default HikeForm; 