import { MD3LightTheme as DefaultTheme } from "react-native-paper";

export const HabitTrekTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2a9d8f",
    secondary: "#f77f00",
    surface: "#ffffff",
    background: "#f1f1f1",
    text: "#333333",
    outline: "#ccc",
    success: "#4caf50",
    warning: "#ff9800",
    error: "#f44336",
  },
  roundness: 8,
};
