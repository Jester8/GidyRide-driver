import React, { useRef } from "react";
import { TouchableOpacity, StyleSheet, Animated, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

interface Props {
  onPress?: () => void;
}

export default function EmergencySupportButton({ onPress }: Props) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.88, duration: 100, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 60, friction: 6, useNativeDriver: true }),
    ]).start();
    onPress?.();
  };

  return (
    <Animated.View style={[styles.wrap, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity style={styles.btn} onPress={handlePress} activeOpacity={0.85}>
        <Ionicons name="shield-half-outline" size={Math.min(width * 0.06, 24)} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    bottom: height * 0.38,
    right: width * 0.05,
    shadowColor: "#ef4444",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  btn: {
    width: Math.min(width * 0.13, 52),
    height: Math.min(width * 0.13, 52),
    borderRadius: Math.min(width * 0.065, 26),
    backgroundColor: "#ef4444",
    alignItems: "center",
    justifyContent: "center",
  },
});