import React, { useRef, useEffect } from "react";
import {
  View, Text, StyleSheet, Dimensions, TouchableOpacity,
  Platform, StatusBar, ScrollView, Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold } from "@expo-google-fonts/manrope";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const TRIP_HISTORY = [
  { id: "1", pickup: "Lekki Phase 1", destination: "Victoria Island", fare: "₦2,800", date: "Today, 10:24 AM" },
  { id: "2", pickup: "Ikeja GRA", destination: "Murtala Airport", fare: "₦4,200", date: "Today, 8:05 AM" },
  { id: "3", pickup: "Yaba Tech", destination: "Surulere", fare: "₦1,500", date: "Yesterday, 6:40 PM" },
  { id: "4", pickup: "Onikan Stadium", destination: "Ikoyi", fare: "₦1,900", date: "Yesterday, 3:15 PM" },
  { id: "5", pickup: "Ajah Market", destination: "Lekki Toll", fare: "₦2,100", date: "Mon, 11:30 AM" },
];

const ACCOUNT_OPTIONS = [
  { icon: "person-outline", label: "Edit Profile", color: "#2563EB" },
  { icon: "card-outline", label: "Payment Settings", color: "#16a34a" },
  { icon: "log-out-outline", label: "Logout", color: "#ef4444" },
];

export default function DriverProfileScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  const [fontsLoaded] = useFonts({
    Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold,
  });

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 350, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 60, friction: 10, useNativeDriver: true }),
    ]).start();
  }, []);

  if (!fontsLoaded) return null;

  const PAD = width * 0.05;
  const bottomPadding = Math.max(insets.bottom, Platform.OS === "android" ? 16 : 8) + 8;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Fixed gradient header background */}
      <LinearGradient
        colors={["#0f172a", "#1e3a8a", "#2563EB"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerBg}
      />

      <SafeAreaView style={styles.safe}>
        <Animated.View style={{ flex: 1, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>

          {/* FIXED: Top bar + Profile card — not in ScrollView */}
          <View style={[styles.fixedTop, { paddingHorizontal: PAD, paddingTop: Platform.OS === "android" ? height * 0.04 : 0 }]}>
            {/* Top bar */}
            <View style={styles.topBar}>
              <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.8}>
                <Ionicons name="arrow-back" size={20} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.topBarTitle}>My Profile</Text>
              <View style={{ width: 40 }} />
            </View>

            {/* Profile Card — fixed */}
            <View style={styles.profileCard}>
              <View style={styles.avatarWrap}>
                <LinearGradient colors={["#3b82f6", "#2563EB"]} style={styles.avatar}>
                  <Ionicons name="person" size={40} color="#fff" />
                </LinearGradient>
                <View style={styles.onlineBadge} />
              </View>
              <Text style={styles.driverName}>John Adeyemi</Text>
              <View style={styles.ratingRow}>
                {[1,2,3,4,5].map(s => <Ionicons key={s} name="star" size={14} color="#f59e0b" />)}
                <Text style={styles.ratingText}>4.9 · Top Driver</Text>
              </View>
              <View style={styles.statusPill}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Online · Receiving Requests</Text>
              </View>
            </View>

            {/* Stats row — fixed */}
            <View style={styles.statsCard}>
              {[
                { label: "Total Trips", value: "284", icon: "car-outline", color: "#2563EB" },
                { label: "Total Earned", value: "₦842K", icon: "cash-outline", color: "#16a34a" },
                { label: "This Week", value: "₦42,500", icon: "trending-up-outline", color: "#f59e0b" },
              ].map((stat, i) => (
                <View key={i} style={[styles.statItem, i < 2 && styles.statBorder]}>
                  <View style={[styles.statIcon, { backgroundColor: stat.color + "15" }]}>
                    <Ionicons name={stat.icon as any} size={16} color={stat.color} />
                  </View>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* SCROLLABLE content below */}
          <View style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: PAD, paddingBottom: bottomPadding + 16, paddingTop: 0 }}
          >
            {/* Weekly Performance */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Weekly Performance</Text>
              <View style={styles.weekRow}>
                {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => {
                  const heights = [60, 80, 45, 90, 70, 55, 30];
                  const isToday = i === 3;
                  return (
                    <View key={i} style={styles.barWrap}>
                      <View style={[styles.bar, { height: heights[i], backgroundColor: isToday ? "#2563EB" : "#dbeafe" }]} />
                      <Text style={[styles.barLabel, isToday && { color: "#2563EB" }]}>{day}</Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Trip History */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Recent Trips</Text>
              {TRIP_HISTORY.map((trip) => (
                <View key={trip.id} style={styles.tripItem}>
                  <View style={styles.tripIconWrap}>
                    <Ionicons name="navigate-outline" size={16} color="#2563EB" />
                  </View>
                  <View style={styles.tripInfo}>
                    <Text style={styles.tripRoute} numberOfLines={1}>{trip.pickup} → {trip.destination}</Text>
                    <Text style={styles.tripDate}>{trip.date}</Text>
                  </View>
                  <Text style={styles.tripFare}>{trip.fare}</Text>
                </View>
              ))}
            </View>

            {/* Assigned EVs */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Assigned EV Vehicles</Text>
              {[
                { name: "JET EV Sedan", range: "320 km", status: "Active" },
                { name: "IVM EX02", range: "330–400 km", status: "Standby" },
              ].map((ev, i) => (
                <View key={i} style={styles.evItem}>
                  <View style={styles.evIconWrap}>
                    <Ionicons name="car-sport-outline" size={18} color="#2563EB" />
                  </View>
                  <View style={styles.evInfo}>
                    <Text style={styles.evName}>{ev.name}</Text>
                    <View style={styles.evRangeRow}>
                      <Ionicons name="flash-outline" size={11} color="#22c55e" />
                      <Text style={styles.evRange}>{ev.range}</Text>
                    </View>
                  </View>
                  <View style={[styles.evStatusBadge, { backgroundColor: ev.status === "Active" ? "#dcfce7" : "#f1f5f9" }]}>
                    <Text style={[styles.evStatusText, { color: ev.status === "Active" ? "#16a34a" : "#64748b" }]}>{ev.status}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Account Options */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Account</Text>
              {ACCOUNT_OPTIONS.map((opt, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.optionRow, i < ACCOUNT_OPTIONS.length - 1 && styles.optionBorder]}
                  activeOpacity={0.7}
                  onPress={opt.label === "Logout" ? () => navigation.navigate("Login" as never) : undefined}
                >
                  <View style={[styles.optionIcon, { backgroundColor: opt.color + "15" }]}>
                    <Ionicons name={opt.icon as any} size={18} color={opt.color} />
                  </View>
                  <Text style={[styles.optionLabel, opt.label === "Logout" && { color: "#ef4444" }]}>{opt.label}</Text>
                  <Ionicons name="chevron-forward" size={16} color="#cbd5e1" />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          </View>

        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#f8fafc" },
  safe: { flex: 1 },
  headerBg: { position: "absolute", top: 0, left: 0, right: 0, height: height * 0.32 },

  fixedTop: { paddingBottom: 16 },

  topBar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.15)", alignItems: "center", justifyContent: "center" },
  topBarTitle: { fontFamily: "Manrope_700Bold", fontSize: Math.min(width * 0.042, 17), color: "#fff" },

  profileCard: {
    backgroundColor: "#fff", borderRadius: 20, padding: width * 0.05,
    alignItems: "center", marginBottom: 12,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2,
  },
  avatarWrap: { position: "relative", marginBottom: 10 },
  avatar: { width: 80, height: 80, borderRadius: 40, alignItems: "center", justifyContent: "center" },
  onlineBadge: { position: "absolute", bottom: 3, right: 3, width: 14, height: 14, borderRadius: 7, backgroundColor: "#22c55e", borderWidth: 2, borderColor: "#fff" },
  driverName: { fontFamily: "Manrope_800ExtraBold", fontSize: Math.min(width * 0.05, 20), color: "#0f172a", marginBottom: 5 },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 3, marginBottom: 8 },
  ratingText: { fontFamily: "Manrope_600SemiBold", fontSize: Math.min(width * 0.03, 12), color: "#64748b", marginLeft: 4 },
  statusPill: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#f0fdf4", paddingHorizontal: 12, paddingVertical: 5, borderRadius: 50 },
  statusDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: "#22c55e" },
  statusText: { fontFamily: "Manrope_600SemiBold", fontSize: Math.min(width * 0.028, 11), color: "#16a34a" },

  statsCard: {
    backgroundColor: "#fff", borderRadius: 16, flexDirection: "row",
    marginBottom: 0, overflow: "hidden",
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
  },
  statItem: { flex: 1, alignItems: "center", paddingVertical: 14 },
  statBorder: { borderRightWidth: 1, borderRightColor: "#f1f5f9" },
  statIcon: { width: 30, height: 30, borderRadius: 9, alignItems: "center", justifyContent: "center", marginBottom: 5 },
  statValue: { fontFamily: "Manrope_800ExtraBold", fontSize: Math.min(width * 0.038, 15), color: "#0f172a" },
  statLabel: { fontFamily: "Manrope_400Regular", fontSize: Math.min(width * 0.026, 10), color: "#94a3b8", marginTop: 1 },

  sectionCard: {
    backgroundColor: "#fff", borderRadius: 16, padding: width * 0.04,
    marginBottom: 12,
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
  },
  sectionTitle: { fontFamily: "Manrope_700Bold", fontSize: Math.min(width * 0.036, 14), color: "#0f172a", marginBottom: 12 },

  weekRow: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", height: 96 },
  barWrap: { alignItems: "center", gap: 5, flex: 1 },
  bar: { width: "55%", borderRadius: 5, minHeight: 4 },
  barLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 10, color: "#94a3b8" },

  tripItem: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#f8fafc" },
  tripIconWrap: { width: 34, height: 34, borderRadius: 9, backgroundColor: "#eff6ff", alignItems: "center", justifyContent: "center" },
  tripInfo: { flex: 1 },
  tripRoute: { fontFamily: "Manrope_600SemiBold", fontSize: Math.min(width * 0.032, 13), color: "#0f172a" },
  tripDate: { fontFamily: "Manrope_400Regular", fontSize: Math.min(width * 0.026, 10), color: "#94a3b8", marginTop: 2 },
  tripFare: { fontFamily: "Manrope_700Bold", fontSize: Math.min(width * 0.034, 13), color: "#16a34a" },

  evItem: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 9, borderBottomWidth: 1, borderBottomColor: "#f8fafc" },
  evIconWrap: { width: 38, height: 38, borderRadius: 11, backgroundColor: "#eff6ff", alignItems: "center", justifyContent: "center" },
  evInfo: { flex: 1 },
  evName: { fontFamily: "Manrope_700Bold", fontSize: Math.min(width * 0.034, 13), color: "#0f172a" },
  evRangeRow: { flexDirection: "row", alignItems: "center", gap: 3, marginTop: 2 },
  evRange: { fontFamily: "Manrope_600SemiBold", fontSize: 11, color: "#22c55e" },
  evStatusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 50 },
  evStatusText: { fontFamily: "Manrope_600SemiBold", fontSize: 11 },

  optionRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 13 },
  optionBorder: { borderBottomWidth: 1, borderBottomColor: "#f8fafc" },
  optionIcon: { width: 36, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  optionLabel: { flex: 1, fontFamily: "Manrope_600SemiBold", fontSize: Math.min(width * 0.036, 14), color: "#0f172a" },
});