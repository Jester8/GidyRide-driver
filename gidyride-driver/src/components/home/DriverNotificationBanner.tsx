import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

interface Props {
  message: string;
  type?: "info" | "success" | "warning";
  onDismiss?: () => void;
}

export default function DriverNotificationBanner({ message, type = "info", onDismiss }: Props) {
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.spring(slideAnim, { toValue: 0, tension: 60, friction: 10, useNativeDriver: true }).start();
  }, []);

  const colors = { info: "#2563EB", success: "#16a34a", warning: "#d97706" };
  const icons = { info: "information-circle-outline", success: "checkmark-circle-outline", warning: "warning-outline" };

  return (
    <Animated.View style={[styles.banner, { backgroundColor: colors[type], transform: [{ translateY: slideAnim }] }]}>
      <Ionicons name={icons[type] as any} size={18} color="#fff" />
      <Text style={styles.text} numberOfLines={1}>{message}</Text>
      {onDismiss && (
        <TouchableOpacity onPress={onDismiss} activeOpacity={0.7}>
          <Ionicons name="close" size={18} color="#fff" />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: width * 0.04,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  text: { flex: 1, fontFamily: "Manrope_600SemiBold", fontSize: Math.min(width * 0.034, 13), color: "#fff" },
});