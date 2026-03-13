import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

interface RideRequest {
  riderName: string;
  pickupLocation: string;
  dropoffLocation: string;
  estimatedDistance: string;
  estimatedFare: number;
}

interface Props {
  visible: boolean;
  request: RideRequest | null;
  onAccept: () => void;
  onDecline: () => void;
}

export default function RideRequestModal({ visible, request, onAccept, onDecline }: Props) {
  const slideAnim = useRef(new Animated.Value(400)).current;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: visible ? 0 : 400,
      tension: 65,
      friction: 11,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!request) return null;

  const BTN_HEIGHT = Math.max(height * 0.054, 20);
  // Use safe area bottom inset + extra padding to clear Android nav bar
  const bottomPadding = Math.max(insets.bottom, Platform.OS === "android" ? 24 : 16) + 16;

  return (
    <Animated.View style={[styles.sheet, { transform: [{ translateY: slideAnim }], paddingBottom: bottomPadding }]}>
      <View style={styles.handle} />

      <View style={styles.headerRow}>
        <View style={styles.avatarCircle}>
          <Ionicons name="person" size={22} color="#2563EB" />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.riderName}>{request.riderName}</Text>
          <View style={styles.starsRow}>
            {[1,2,3,4,5].map(s => <Ionicons key={s} name="star" size={12} color="#f59e0b" />)}
          </View>
        </View>
        <View style={styles.fareTag}>
          <Text style={styles.fareLabel}>Fare</Text>
          <Text style={styles.fareValue}>₦{request.estimatedFare.toLocaleString()}</Text>
        </View>
      </View>

      <View style={styles.routeCard}>
        <View style={styles.routeRow}>
          <View style={[styles.routeDot, { backgroundColor: "#22c55e" }]} />
          <View style={styles.routeTextWrap}>
            <Text style={styles.routeLabel}>Pickup</Text>
            <Text style={styles.routeAddress} numberOfLines={1}>{request.pickupLocation}</Text>
          </View>
        </View>
        <View style={styles.routeLine} />
        <View style={styles.routeRow}>
          <View style={[styles.routeDot, { backgroundColor: "#2563EB" }]} />
          <View style={styles.routeTextWrap}>
            <Text style={styles.routeLabel}>Drop-off</Text>
            <Text style={styles.routeAddress} numberOfLines={1}>{request.dropoffLocation}</Text>
          </View>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoChip}>
          <Ionicons name="navigate-outline" size={14} color="#2563EB" />
          <Text style={styles.infoChipText}>{request.estimatedDistance}</Text>
        </View>
        <View style={styles.infoChip}>
          <Ionicons name="time-outline" size={14} color="#2563EB" />
          <Text style={styles.infoChipText}>~8 min away</Text>
        </View>
      </View>

      <View style={styles.btnRow}>
        <TouchableOpacity style={[styles.declineBtn, { height: BTN_HEIGHT }]} onPress={onDecline} activeOpacity={0.85}>
          <Ionicons name="close" size={20} color="#ef4444" />
          <Text style={styles.declineText}>Decline</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.acceptBtn, { height: BTN_HEIGHT, flex: 2 }]} onPress={onAccept} activeOpacity={0.85}>
          <LinearGradient colors={["#22c55e", "#16a34a"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.acceptGradient}>
            <Ionicons name="checkmark" size={20} color="#fff" />
            <Text style={styles.acceptText}>Accept Ride</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingHorizontal: width * 0.05,
    paddingTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 12,
  },
  handle: { width: 40, height: 4, borderRadius: 2, backgroundColor: "#e2e8f0", alignSelf: "center", marginBottom: 16 },
  headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 16, gap: 12 },
  avatarCircle: { width: 46, height: 46, borderRadius: 23, backgroundColor: "#eff6ff", alignItems: "center", justifyContent: "center" },
  headerText: { flex: 1 },
  riderName: { fontFamily: "Manrope_700Bold", fontSize: Math.min(width * 0.042, 16), color: "#0f172a" },
  starsRow: { flexDirection: "row", gap: 2, marginTop: 3 },
  fareTag: { alignItems: "flex-end" },
  fareLabel: { fontFamily: "Manrope_400Regular", fontSize: 11, color: "#94a3b8" },
  fareValue: { fontFamily: "Manrope_800ExtraBold", fontSize: Math.min(width * 0.05, 20), color: "#2563EB" },
  routeCard: { backgroundColor: "#f8fafc", borderRadius: 14, padding: 14, marginBottom: 12 },
  routeRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  routeDot: { width: 10, height: 10, borderRadius: 5 },
  routeTextWrap: { flex: 1 },
  routeLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 11, color: "#94a3b8" },
  routeAddress: { fontFamily: "Manrope_600SemiBold", fontSize: Math.min(width * 0.034, 13), color: "#0f172a", marginTop: 2 },
  routeLine: { width: 1, height: 16, backgroundColor: "#e2e8f0", marginLeft: 4, marginVertical: 4 },
  infoRow: { flexDirection: "row", gap: 10, marginBottom: 16 },
  infoChip: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#eff6ff", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 50 },
  infoChipText: { fontFamily: "Manrope_600SemiBold", fontSize: Math.min(width * 0.03, 12), color: "#2563EB" },
  btnRow: { flexDirection: "row", gap: 10 },
  declineBtn: { flex: 1, borderRadius: 50, borderWidth: 1.5, borderColor: "#fecaca", backgroundColor: "#fff5f5", alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 6 },
  declineText: { fontFamily: "Manrope_700Bold", fontSize: Math.min(width * 0.038, 15), color: "#ef4444" },
  acceptBtn: { borderRadius: 50, overflow: "hidden" },
  acceptGradient: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  acceptText: { fontFamily: "Manrope_700Bold", fontSize: Math.min(width * 0.038, 15), color: "#fff" },
});