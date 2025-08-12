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
import { Provider as PaperProvider } from 'react-native-paper';
import {HabitTrekTheme} from './src/theme';

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <HabitProvider>
      <PaperProvider theme={HabitTrekTheme}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppNavigator />
    </PaperProvider>
    </HabitProvider>
  );
};

export default App;
