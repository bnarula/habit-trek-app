import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';

interface FloatingMenuProps {
  onCreateHike?: () => void;
  onViewStats?: () => void;
  onSettings?: () => void;
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({ 
  onCreateHike, 
  onViewStats, 
  onSettings 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleMenu = () => {
    const toValue = isExpanded ? 0 : 1;
    
    Animated.spring(animation, {
      toValue,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
    
    setIsExpanded(!isExpanded);
  };

  const menuItemStyle = (index: number) => ({
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -(60 * (index + 1))],
        }),
      },
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
    ],
    opacity: animation,
  });

  const mainButtonRotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg'],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      {/* Menu Items */}
      <Animated.View style={[styles.menuItem, menuItemStyle(2)]}>
        <TouchableOpacity 
          style={[styles.menuButton, styles.settingsButton]} 
          onPress={onSettings}
        >
          <Text style={styles.menuButtonText}>⚙️</Text>
        </TouchableOpacity>
        <Text style={styles.menuLabel}>Settings</Text>
      </Animated.View>

      <Animated.View style={[styles.menuItem, menuItemStyle(1)]}>
        <TouchableOpacity 
          style={[styles.menuButton, styles.statsButton]} 
          onPress={onViewStats}
        >
          <Text style={styles.menuButtonText}>📊</Text>
        </TouchableOpacity>
        <Text style={styles.menuLabel}>Stats</Text>
      </Animated.View>

      <Animated.View style={[styles.menuItem, menuItemStyle(0)]}>
        <TouchableOpacity 
          style={[styles.menuButton, styles.createButton]} 
          onPress={onCreateHike}
        >
          <Text style={styles.menuButtonText}>🥾</Text>
        </TouchableOpacity>
        <Text style={styles.menuLabel}>New Hike</Text>
      </Animated.View>

      {/* Main Toggle Button */}
      <Animated.View style={mainButtonRotation}>
        <TouchableOpacity style={styles.mainButton} onPress={toggleMenu}>
          <Text style={styles.mainButtonText}>+</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    alignItems: 'center',
  },
  mainButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  mainButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  menuItem: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
  },
  menuButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  createButton: {
    backgroundColor: '#FF9800',
  },
  statsButton: {
    backgroundColor: '#2196F3',
  },
  settingsButton: {
    backgroundColor: '#9C27B0',
  },
  menuButtonText: {
    fontSize: 20,
  },
  menuLabel: {
    marginTop: 5,
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
});

export default FloatingMenu;
