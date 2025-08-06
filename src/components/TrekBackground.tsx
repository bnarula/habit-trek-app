// components/TrekBackground.jsx
import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SVG_WIDTH = 600;
const SVG_HEIGHT = 900;
const scaleX = screenWidth / SVG_WIDTH;
const scaleY = screenHeight / SVG_HEIGHT;

const milestones = [
  { id: "m0",  cx: 10,  cy: 800 },
  { id: "m1",  cx: 150,  cy: 765 },
  { id: "m2",  cx: 250,  cy: 675 },
  { id: "m3",  cx: 375,  cy: 650 },
  { id: "m4",  cx: 475,  cy: 600 },
  { id: "m5",  cx: 400,  cy: 525 },
  { id: "m6",  cx: 275,  cy: 500 },
  { id: "m7",  cx: 300,  cy: 425 },
  { id: "m8",  cx: 360,  cy: 367 },
  { id: "m9",  cx: 301,  cy: 302 },
  { id: "m10", cx: 325,  cy: 260 }
];

const pathSegments = [
  { id: "path0001", d: "M10 800L150 765" },
  { id: "path0102", d: "M150 765L250 675" },
  { id: "path0203", d: "M250 675L375 650" },
  { id: "path0304", d: "M375 650L475 600" },
  { id: "path0405", d: "M475 600L400 525" },
  { id: "path0506", d: "M400 525L275 500" },
  { id: "path0607", d: "M275 500L300 425" },
  { id: "path0708", d: "M300 425L360 367" },
  { id: "path0809", d: "M360 367L301 302" },
  { id: "path0910", d: "M301 302L325 260" }
];

const scaledMilestones = milestones.map(m => ({
  ...m,
  cx: m.cx * scaleX,
  cy: m.cy * scaleY,
}));

function scalePathD(d) {
  // Only works for simple M x y L x y paths
  return d.replace(/([ML])\s*(\d+)\s*(\d+)/g, (match, cmd, x, y) => {
    return `${cmd} ${parseFloat(x) * scaleX} ${parseFloat(y) * scaleY}`;
  });
}

const scaledPathSegments = pathSegments.map(p => ({
  ...p,
  d: scalePathD(p.d),
}));

const TrekBackground = ({
  score = 300,
  targetScore = 300,
}) => {
  const milestonesCount = scaledMilestones.length;
  const currentMilestone = Math.min(
    Math.floor((score / targetScore) * milestonesCount),
    milestonesCount - 1
  );

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      <Image
        source={require('../../assets/bg-trek-light.png')}
        style={{ width: screenWidth, height: screenHeight, position: 'absolute', top: 0, left: 0 }}
        resizeMode="stretch"
      />
      <Svg
        width={screenWidth}
        height={screenHeight}
        viewBox={`0 0 ${screenWidth} ${screenHeight}`}
        preserveAspectRatio="xMidYMid meet"
        style={StyleSheet.absoluteFillObject}
      >
        {/* Paths */}
        {scaledPathSegments.map((path, idx) => (
          <Path
            key={path.id}
            d={path.d}
            stroke={idx < currentMilestone ? "#2a9d8f" : "#aaaaaaff "}
            strokeWidth={4}
            strokeDasharray="5 5"
            opacity={idx < currentMilestone ? 1 : 0.3}
          />
        ))}
        {/* Milestones */}
        {scaledMilestones.map((milestone, idx) => (
          <Circle
            key={milestone.id}
            cx={milestone.cx || 0}
            cy={milestone.cy || 0}
            r={6}
            fill={idx <= currentMilestone ? "#2a9d8f" : "#aaa"}
          />
        ))}
        {/* Man marker */}
        <Circle
          cx={scaledMilestones[currentMilestone]?.cx || 0}
          cy={scaledMilestones[currentMilestone]?.cy || 0}
          r={10}
          fill="#f77f00"
          stroke="#000"
          strokeWidth={2}
        />
      </Svg>
    </View>
  );
};

export default TrekBackground;