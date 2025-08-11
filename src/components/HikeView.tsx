import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import type { Hike } from '../types/types';

interface HikeViewProps {
  hike: Hike;
}

const HikeView: React.FC<HikeViewProps> = ({ hike }) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Text style={styles.title}>{hike.title}</Text>
        <Text style={styles.label}>Target Date:</Text>
        <Text style={styles.value}>{new Date(hike.targetDate).toLocaleDateString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  card: {
    borderRadius: 16,
    padding: 24,
    minWidth: 260,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: '#888',
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 2,
  },
});

export default HikeView;