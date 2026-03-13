import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Platform, StatusBar } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold } from "@expo-google-fonts/manrope";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function ActiveTripScreen() {
  const navigation = useNavigation();
  const [tripStarted, setTripStarted] = useState(false);
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({ Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold });
  if (!fontsLoaded) return null;

  const PAD = width * 0.045;
  const BTN_HEIGHT = Math.max(height * 0.065, 52);
  const bottomPadding = -20;

  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={{ latitude: 6.5244, longitude: 3.3792, latitudeDelta: 0.08, longitudeDelta: 0.08 }}
      >
        <Marker coordinate={{ latitude: 6.4550, longitude: 3.3960 }}>
          <View style={styles.destMarker}>
            <Ionicons name="location" size={16} color="#fff" />
          </View>
        </Marker>
      </MapView>

      <SafeAreaView style={styles.overlay} pointerEvents="box-none">
        <View style={[styles.topBar, { paddingHorizontal: PAD, paddingTop: Platform.OS === "android" ? height * 0.04 : 0 }]}>
          <View style={styles.tripBadge}>
            <View style={[styles.liveDot, { backgroundColor: tripStarted ? "#22c55e" : "#f59e0b" }]} />
            <Text style={styles.tripBadgeText}>{tripStarted ? "Trip in Progress" : "Waiting to Start"}</Text>
          </View>
          <View style={styles.fareChip}>
            <Text style={styles.fareChipText}>₦4,200</Text>
          </View>
        </View>

        <View style={[styles.bottomCard, { paddingHorizontal: PAD, paddingBottom: bottomPadding }]}>
          <View style={styles.cardInner}>
            <View style={styles.riderRow}>
              <View style={styles.riderAvatar}>
                <Ionicons name="person" size={20} color="#2563EB" />
              </View>
              <View style={styles.riderInfo}>
                <Text style={styles.riderName}>Adaeze Okonkwo</Text>
                <View style={styles.starsRow}>
                  {[1,2,3,4,5].map(s => <Ionicons key={s} name="star" size={12} color="#f59e0b" />)}
                  <Text style={styles.ratingText}>5.0</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.callBtn} activeOpacity={0.8}>
                <Ionicons name="call-outline" size={18} color="#2563EB" />
              </TouchableOpacity>
            </View>

            <View style={styles.destRow}>
              <Ionicons name="location-outline" size={16} color="#2563EB" />
              <Text style={styles.destText} numberOfLines={1}>Murtala Muhammed Airport, Lagos</Text>
            </View>

            {!tripStarted ? (
              <TouchableOpacity
                style={[styles.actionBtn, { borderRadius: BTN_HEIGHT / 2 }]}
                onPress={() => setTripStarted(true)}
                activeOpacity={0.85}
              >
                <LinearGradient colors={["#f59e0b", "#d97706"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.btnGradient, { height: BTN_HEIGHT }]}>
                  <Ionicons name="play-circle-outline" size={20} color="#fff" />
                  <Text style={styles.btnText}>Start Trip</Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.actionBtn, { borderRadius: BTN_HEIGHT / 2 }]}
                onPress={() => navigation.navigate("TripComplete" as never)}
                activeOpacity={0.85}
              >
                <LinearGradient colors={["#22c55e", "#16a34a"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.btnGradient, { height: BTN_HEIGHT }]}>
                  <Ionicons name="flag-outline" size={20} color="#fff" />
                  <Text style={styles.btnText}>End Trip</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
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
  tripBadge: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#fff", paddingHorizontal: 14, paddingVertical: 8, borderRadius: 50, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 3 },
  liveDot: { width: 8, height: 8, borderRadius: 4 },
  tripBadgeText: { fontFamily: "Manrope_700Bold", fontSize: Math.min(width * 0.034, 13), color: "#0f172a" },
  fareChip: { backgroundColor: "#2563EB", paddingHorizontal: 14, paddingVertical: 8, borderRadius: 50 },
  fareChipText: { fontFamily: "Manrope_800ExtraBold", fontSize: Math.min(width * 0.038, 15), color: "#fff" },
  bottomCard: {},
  cardInner: { backgroundColor: "#fff", borderRadius: 24, padding: width * 0.05, shadowColor: "#000", shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 8 },
  riderRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 14 },
  riderAvatar: { width: 46, height: 46, borderRadius: 23, backgroundColor: "#eff6ff", alignItems: "center", justifyContent: "center" },
  riderInfo: { flex: 1 },
  riderName: { fontFamily: "Manrope_700Bold", fontSize: Math.min(width * 0.042, 16), color: "#0f172a" },
  starsRow: { flexDirection: "row", alignItems: "center", gap: 2, marginTop: 3 },
  ratingText: { fontFamily: "Manrope_600SemiBold", fontSize: 12, color: "#94a3b8", marginLeft: 4 },
  callBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#eff6ff", alignItems: "center", justifyContent: "center" },
  destRow: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#f8fafc", padding: 12, borderRadius: 12, marginBottom: 16 },
  destText: { flex: 1, fontFamily: "Manrope_600SemiBold", fontSize: Math.min(width * 0.034, 13), color: "#334155" },
  actionBtn: { overflow: "hidden" },
  btnGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  btnText: { fontFamily: "Manrope_700Bold", fontSize: Math.min(width * 0.042, 17), color: "#fff" },
  destMarker: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#2563EB", alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "#fff" },
});