/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { HabitProvider } from './src/contexts/HabitContext';

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <HabitProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppNavigator />
    </HabitProvider>
  );
};

export default App;
