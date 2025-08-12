import React, { useState } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { FAB, Text, useTheme } from "react-native-paper";

interface FloatingMenuProps {
  onCreateHike?: () => void;
  onViewStats?: () => void;
  onSettings?: () => void;
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({
  onCreateHike,
  onViewStats,
  onSettings,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const theme = useTheme();

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
          outputRange: [0.5, 1],
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
          outputRange: ["0deg", "45deg"],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      {/* Settings */}
      <Animated.View style={[styles.menuItem, menuItemStyle(2)]}>
        <FAB
          icon="cog"
          color="#fff"
          style={{ backgroundColor: theme.colors.secondary }}
          onPress={onSettings}
        />
        <Text style={[styles.menuLabel, { color: theme.colors.secondary }]}>
          Settings
        </Text>
      </Animated.View>

      {/* Stats */}
      <Animated.View style={[styles.menuItem, menuItemStyle(1)]}>
        <FAB
          icon="chart-bar"
          color="#fff"
          style={{ backgroundColor: theme.colors.primary }}
          onPress={onViewStats}
        />
        <Text style={[styles.menuLabel, { color: theme.colors.primary }]}>
          Stats
        </Text>
      </Animated.View>

      {/* New Hike */}
      <Animated.View style={[styles.menuItem, menuItemStyle(0)]}>
        <FAB
          icon="hiking"
          color="#fff"
          style={{ backgroundColor: theme.colors.tertiary }}
          onPress={onCreateHike}
        />
        <Text style={[styles.menuLabel, { color: theme.colors.tertiary }]}>
          New Hike
        </Text>
      </Animated.View>

      {/* Main Toggle */}
      <Animated.View style={mainButtonRotation}>
        <FAB
          icon={isExpanded ? "close" : "plus"}
          color="#fff"
          style={{ backgroundColor: theme.colors.primary }}
          onPress={toggleMenu}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 30,
    right: 30,
    alignItems: "center",
  },
  menuItem: {
    position: "absolute",
    alignItems: "center",
  },
  menuLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default FloatingMenu;
