import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

interface Props {
  todayEarnings?: number;
  completedTrips?: number;
}

export default function EarningsSummaryCard({ todayEarnings = 0, completedTrips = 0 }: Props) {
  return (
    <LinearGradient colors={["#1e40af", "#2563EB"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
      <View style={styles.item}>
        <View style={styles.iconWrap}>
          <Ionicons name="cash-outline" size={18} color="#93c5fd" />
        </View>
        <View>
          <Text style={styles.label}>Today's Earnings</Text>
          <Text style={styles.value}>₦{todayEarnings.toLocaleString()}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.item}>
        <View style={styles.iconWrap}>
          <Ionicons name="car-outline" size={18} color="#93c5fd" />
        </View>
        <View>
          <Text style={styles.label}>Trips Done</Text>
          <Text style={styles.value}>{completedTrips}</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 16,
    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.04,
    alignItems: "center",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  item: { flex: 1, flexDirection: "row", alignItems: "center", gap: 10 },
  iconWrap: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center", justifyContent: "center",
  },
  label: { fontFamily: "Manrope_400Regular", fontSize: Math.min(width * 0.028, 11), color: "#93c5fd" },
  value: { fontFamily: "Manrope_800ExtraBold", fontSize: Math.min(width * 0.045, 18), color: "#fff", marginTop: 2 },
  divider: { width: 1, height: 36, backgroundColor: "rgba(255,255,255,0.2)", marginHorizontal: 12 },
});