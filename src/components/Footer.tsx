import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface FooterProps {
  children?: React.ReactNode;
}

const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <View style={styles.footer}>
      {children ? (
        <View style={styles.floatingMenuContainer}>
          {children}
        </View>
      ) : (
        <Text style={styles.footerText}>Footer Menu (contextual options)</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  floatingMenuContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  footerText: {
    fontSize: 16,
    color: '#444',
  },
});

export default Footer;
