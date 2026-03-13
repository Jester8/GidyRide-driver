import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, Platform, StatusBar, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold } from "@expo-google-fonts/manrope";

const { width, height } = Dimensions.get("window");

export default function TripCompleteScreen() {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [fontsLoaded] = useFonts({ Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold });

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  if (!fontsLoaded) return null;

  const PAD = width * 0.055;
  const BTN_HEIGHT = Math.max(height * 0.065, 52);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <LinearGradient colors={["#f0fdf4", "#dcfce7", "#ffffff"]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={StyleSheet.absoluteFill} />

      <SafeAreaView style={styles.safe}>
        <View style={[styles.container, { paddingHorizontal: PAD }]}>

          <Animated.View style={[styles.iconWrap, { transform: [{ scale: scaleAnim }] }]}>
            <LinearGradient colors={["#34d399", "#16a34a"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.iconCircle}>
              <Ionicons name="checkmark" size={48} color="#fff" />
            </LinearGradient>
            <View />
          </Animated.View>

          <Animated.View style={{ opacity: fadeAnim, width: "100%" }}>
            <Text style={styles.completeTitle}>Trip Complete!</Text>
            <Text style={styles.completeSubtitle}>You've successfully completed the ride with Adaeze.</Text>

            <View style={styles.summaryCard}>
              {[
                { icon: "cash-outline", label: "Fare Earned", value: "₦4,200", color: "#22c55e" },
                { icon: "navigate-outline", label: "Distance", value: "18.4 km", color: "#2563EB" },
                { icon: "time-outline", label: "Duration", value: "34 min", color: "#f59e0b" },
              ].map((item, i) => (
                <View key={i} style={[styles.summaryItem, i < 2 && styles.summaryBorder]}>
                  <View style={[styles.summaryIcon, { backgroundColor: item.color + "20" }]}>
                    <Ionicons name={item.icon as any} size={18} color={item.color} />
                  </View>
                  <Text style={styles.summaryLabel}>{item.label}</Text>
                  <Text style={[styles.summaryValue, { color: item.color }]}>{item.value}</Text>
                </View>
              ))}
            </View>

            <View style={styles.ratingCard}>
              <Text style={styles.ratingTitle}>Rate your passenger</Text>
              <Text style={styles.ratingSubtitle}>How was your experience with Adaeze?</Text>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity key={star} onPress={() => setRating(star)} activeOpacity={0.7}>
                    <Ionicons
                      name={star <= rating ? "star" : "star-outline"}
                      size={Math.min(width * 0.1, 40)}
                      color={star <= rating ? "#f59e0b" : "#e2e8f0"}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={[styles.homeBtn, { borderRadius: BTN_HEIGHT / 2 }]}
              onPress={() => navigation.navigate("DriverHome" as never)}
              activeOpacity={0.85}
            >
              <LinearGradient colors={["#3b82f6", "#2563EB"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.btnGradient, { height: BTN_HEIGHT }]}>
                <Ionicons name="home-outline" size={20} color="#fff" />
                <Text style={styles.btnText}>Back to Home</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  iconWrap: { alignItems: "center", marginBottom: height * 0.03 },
  iconCircle: { width: 100, height: 100, borderRadius: 50, alignItems: "center", justifyContent: "center" },
  completeTitle: { fontFamily: "Manrope_800ExtraBold", fontSize: Math.min(width * 0.075, 30), color: "#0f172a", textAlign: "center", marginBottom: 8 },
  completeSubtitle: { fontFamily: "Manrope_400Regular", fontSize: Math.min(width * 0.036, 14), color: "#64748b", textAlign: "center", marginBottom: height * 0.03, lineHeight: 22 },
  summaryCard: { backgroundColor: "#fff", borderRadius: 20, flexDirection: "row", marginBottom: height * 0.02, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 10, elevation: 3 },
  summaryItem: { flex: 1, alignItems: "center", paddingVertical: 18 },
  summaryBorder: { borderRightWidth: 1, borderRightColor: "#f1f5f9" },
  summaryIcon: { width: 36, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center", marginBottom: 8 },
  summaryLabel: { fontFamily: "Manrope_400Regular", fontSize: Math.min(width * 0.028, 11), color: "#94a3b8", marginBottom: 4 },
  summaryValue: { fontFamily: "Manrope_800ExtraBold", fontSize: Math.min(width * 0.04, 16) },
  ratingCard: { backgroundColor: "#fff", borderRadius: 20, padding: width * 0.05, alignItems: "center", marginBottom: height * 0.025, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 10, elevation: 3 },
  ratingTitle: { fontFamily: "Manrope_700Bold", fontSize: Math.min(width * 0.042, 16), color: "#0f172a", marginBottom: 4 },
  ratingSubtitle: { fontFamily: "Manrope_400Regular", fontSize: Math.min(width * 0.032, 13), color: "#94a3b8", marginBottom: 16 },
  starsRow: { flexDirection: "row", gap: 8 },
  homeBtn: { overflow: "hidden" },
  btnGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  btnText: { fontFamily: "Manrope_700Bold", fontSize: Math.min(width * 0.042, 17), color: "#fff" },
});