import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Platform, StatusBar } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold } from "@expo-google-fonts/manrope";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function NavigateToPickupScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({ Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold });
  if (!fontsLoaded) return null;

  const PAD = width * 0.045;
  const BTN_HEIGHT = Math.max(height * 0.065, 52);
  const bottomPadding = 0;

  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={{ latitude: 6.5244, longitude: 3.3792, latitudeDelta: 0.05, longitudeDelta: 0.05 }}
      >
        <Marker coordinate={{ latitude: 6.5355, longitude: 3.3087 }}>
          <View style={styles.pickupMarker}>
            <Ionicons name="person" size={16} color="#fff" />
          </View>
        </Marker>
      </MapView>

      <SafeAreaView style={styles.overlay} pointerEvents="box-none">
        <View style={[styles.topBar, { paddingHorizontal: PAD, paddingTop: Platform.OS === "android" ? height * 0.04 : 0 }]}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.8}>
            <Ionicons name="arrow-back" size={20} color="#0f172a" />
          </TouchableOpacity>
          <View style={styles.etaChip}>
            <Ionicons name="time-outline" size={14} color="#2563EB" />
            <Text style={styles.etaText}>ETA: 8 min</Text>
          </View>
        </View>

        <View style={[styles.bottomCard, { paddingHorizontal: PAD, paddingBottom: bottomPadding }]}>
          <View style={styles.cardInner}>
            <Text style={styles.cardLabel}>Navigating to Pickup</Text>
            <Text style={styles.cardAddress} numberOfLines={2}>12 Admiralty Way, Lekki Phase 1, Lagos</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Ionicons name="navigate-outline" size={16} color="#2563EB" />
                <Text style={styles.statText}>2.4 km away</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Ionicons name="time-outline" size={16} color="#2563EB" />
                <Text style={styles.statText}>~8 min</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.arrivedBtn, { borderRadius: BTN_HEIGHT / 2 }]}
              onPress={() => navigation.navigate("ActiveTrip" as never)}
              activeOpacity={0.85}
            >
              <LinearGradient colors={["#3b82f6", "#2563EB"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.btnGradient, { height: BTN_HEIGHT }]}>
                <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
                <Text style={styles.btnText}>Arrived at Pickup</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} activeOpacity={0.7} onPress={() => navigation.goBack()}>
              <Text style={styles.cancelText}>Cancel Ride</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, justifyContent: "space-between" },
  topBar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  backBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 },
  etaChip: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#fff", paddingHorizontal: 14, paddingVertical: 8, borderRadius: 50, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 3 },
  etaText: { fontFamily: "Manrope_700Bold", fontSize: Math.min(width * 0.034, 13), color: "#2563EB" },
  bottomCard: { },
  cardInner: { backgroundColor: "#fff", borderRadius: 24, padding: width * 0.05, shadowColor: "#000", shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 8 },
  cardLabel: { fontFamily: "Manrope_600SemiBold", fontSize: Math.min(width * 0.03, 12), color: "#94a3b8", marginBottom: 4 },
  cardAddress: { fontFamily: "Manrope_700Bold", fontSize: Math.min(width * 0.042, 16), color: "#0f172a", marginBottom: 14 },
  statsRow: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  statItem: { flex: 1, flexDirection: "row", alignItems: "center", gap: 6 },
  statText: { fontFamily: "Manrope_600SemiBold", fontSize: Math.min(width * 0.034, 13), color: "#334155" },
  statDivider: { width: 1, height: 20, backgroundColor: "#e2e8f0", marginHorizontal: 12 },
  arrivedBtn: { overflow: "hidden", marginBottom: 10 },
  btnGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  btnText: { fontFamily: "Manrope_700Bold", fontSize: Math.min(width * 0.042, 17), color: "#fff" },
  cancelBtn: { alignItems: "center", paddingVertical: 10 },
  cancelText: { fontFamily: "Manrope_600SemiBold", fontSize: Math.min(width * 0.036, 14), color: "#ef4444" },
  pickupMarker: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#22c55e", alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "#fff" },
});