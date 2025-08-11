import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import TrekBackground from '../components/TrekBackground';
import HikeView from '../components/HikeView';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingMenu from '../components/FloatingMenu';
import { useHabits } from '../contexts/HabitContext';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { openHike } = useHabits();

  const handleCreateHike = () => {
    navigation.navigate('CreateHike', { mode: 'create' });
  };

  const handleViewStats = () => {
    // TODO: Navigate to stats screen when implemented
    console.log('View Stats pressed');
  };

  const handleSettings = () => {
    // TODO: Navigate to settings screen when implemented
    console.log('Settings pressed');
  };

  return (
    <View style={styles.container}>
      <TrekBackground
        score={openHike ? openHike.totalScore : 0}
        targetScore={openHike ? openHike.targetScore : 300}
      />
      <View style={styles.overlay}>
        <Header />
        <View style={styles.mainContent}>
          {openHike ? (
            <HikeView hike={openHike} />
          ) : (
            <View style={styles.centeredOverlay}>
              <Button 
                title="Start a New Hike" 
                onPress={() => navigation.navigate('CreateHike', { mode: 'create' })} 
              />
            </View>
          )}
        </View>
        <Footer>
          <FloatingMenu 
            onCreateHike={handleCreateHike}
            onViewStats={handleViewStats}
            onSettings={handleSettings}
          />
        </Footer>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  overlay: {
    position: 'absolute',
    top: 56,
    height: '100%',
    width: '100%',
  },
  mainContent: {
    height: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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

export default HomeScreen;
