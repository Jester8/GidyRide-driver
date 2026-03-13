import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

interface Props {
  onStatusChange?: (online: boolean) => void;
}

export default function DriverStatusToggle({ onStatusChange }: Props) {
  const [isOnline, setIsOnline] = useState(false);
  const animVal = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    const next = !isOnline;
    setIsOnline(next);
    Animated.spring(animVal, {
      toValue: next ? 1 : 0,
      tension: 60,
      friction: 8,
      useNativeDriver: true,
    }).start();
    onStatusChange?.(next);
  };

  const translateX = animVal.interpolate({ inputRange: [0, 1], outputRange: [2, width * 0.08] });

  return (
    <View style={styles.wrapper}>
      <View style={[styles.indicator, { backgroundColor: isOnline ? "#22c55e" : "#ef4444" }]} />
      <View style={styles.textWrap}>
        <Text style={styles.statusText}>{isOnline ? "You're Online" : "You're Offline"}</Text>
        <Text style={styles.subText}>{isOnline ? "Receiving ride requests" : "Not receiving requests"}</Text>
      </View>
      <TouchableOpacity
        style={[styles.track, { backgroundColor: isOnline ? "#22c55e" : "#cbd5e1" }]}
        onPress={toggle}
        activeOpacity={0.9}
      >
        <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]}>
          <Ionicons name={isOnline ? "checkmark" : "close"} size={12} color={isOnline ? "#22c55e" : "#94a3b8"} />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: width * 0.04,
    paddingVertical: width * 0.03,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    gap: 10,
  },
  indicator: { width: 10, height: 10, borderRadius: 5 },
  textWrap: { flex: 1 },
  statusText: { fontFamily: "Manrope_700Bold", fontSize: Math.min(width * 0.038, 15), color: "#0f172a" },
  subText: { fontFamily: "Manrope_400Regular", fontSize: Math.min(width * 0.03, 12), color: "#94a3b8", marginTop: 1 },
  track: {
    width: width * 0.14,
    height: width * 0.075,
    borderRadius: width * 0.04,
    justifyContent: "center",
  },
  thumb: {
    width: width * 0.065,
    height: width * 0.065,
    borderRadius: width * 0.033,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
});