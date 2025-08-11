import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface HeaderProps {
  onBackPress?: () => void;
  onMenuPress?: () => void;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  onBackPress, 
  onMenuPress, 
  title = "Habit Trek" 
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerButton} onPress={onBackPress}>
        <Text style={styles.headerButtonText}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity style={styles.headerButton} onPress={onMenuPress}>
        <Text style={styles.headerButtonText}>{'≡'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: '5%',
    backgroundColor: 'rgba(255,255,255,0.95)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerButton: {
    padding: 8,
  },
  headerButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
});

export default Header; 