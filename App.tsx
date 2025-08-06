/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, Button } from 'react-native';
import TrekBackground from './src/components/TrekBackground';
import HikeView from './src/components/HikeView';
import CreateHikeDialog from './src/components/CreateHikeDialog';
import { HabitProvider, useHabits } from './src/contexts/HabitContext';

function MainApp() {
  const isDarkMode = useColorScheme() === 'dark';
  const { activeHike } = useHabits();
  const [showDialog, setShowDialog] = useState(false);

  return (
    <View style={styles.container}>
      <TrekBackground
        score={activeHike ? activeHike.totalScore : 0}
        targetScore={activeHike ? activeHike.targetScore : 300}
      />
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {activeHike ? (
        <HikeView hike={activeHike} />
      ) : (
        <View style={styles.centeredOverlay}>
          <Button title="Start a New Hike" onPress={() => setShowDialog(true)} />
          <CreateHikeDialog visible={showDialog} onClose={() => setShowDialog(false)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centeredOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});

export default function App() {
  return (
    <HabitProvider>
      <MainApp />
    </HabitProvider>
  );
}
