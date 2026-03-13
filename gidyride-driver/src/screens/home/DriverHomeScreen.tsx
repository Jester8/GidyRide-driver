import React, { useState } from "react";
import {
  View, StyleSheet, Dimensions, Platform,
  StatusBar, SafeAreaView, Text, TouchableOpacity,
  Modal, TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold } from "@expo-google-fonts/manrope";

import DriverMapView from "../../components/home/DriverMapView";
import DriverStatusToggle from "../../components/home/DriverStatusToggle";
import EarningsSummaryCard from "../../components/home/EarningsSummaryCard";
import RideRequestModal from "../../components/home/RideRequestModal";
import DriverNotificationBanner from "../../components/home/DriverNotificationBanner";
import EmergencySupportButton from "../../components/home/EmergencySupportButton";
import EvCarSelectorModal, { EvCar } from "../../components/home/EvCarSelectorModal";
import EvPartnerDrawer, { EvCompany, EV_COMPANIES } from "../../components/home/EvPartnerDrawer";

const { width, height } = Dimensions.get("window");

const MOCK_REQUEST = {
  riderName: "Adaeze Okonkwo",
  pickupLocation: "12 Admiralty Way, Lekki Phase 1",
  dropoffLocation: "Murtala Muhammed Airport, Lagos",
  estimatedDistance: "18.4 km",
  estimatedFare: 4200,
};

export default function DriverHomeScreen() {
  const navigation = useNavigation();
  const [isOnline, setIsOnline] = useState(false);
  const [showRideRequest, setShowRideRequest] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: "info" | "success" | "warning" } | null>(null);
  const [earnings] = useState({ today: 12500, trips: 7 });

  const [selectedEvCar, setSelectedEvCar] = useState<EvCar | null>(null);
  const [showEvSelector, setShowEvSelector] = useState(false);
  const [selectedEvCompany, setSelectedEvCompany] = useState<EvCompany>(EV_COMPANIES[0]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showAiBot, setShowAiBot] = useState(false);

  const [fontsLoaded] = useFonts({
    Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold,
  });

  if (!fontsLoaded) return null;

  const PAD = width * 0.045;

  const handleStatusChange = (online: boolean) => {
    setIsOnline(online);
    setNotification({
      message: online ? "You're now online. Waiting for ride requests..." : "You've gone offline.",
      type: online ? "success" : "info",
    });
    setTimeout(() => setNotification(null), 3000);
    if (online) setTimeout(() => setShowRideRequest(true), 2000);
  };

  const handleAccept = () => {
    setShowRideRequest(false);
    setNotification({ message: "Ride accepted! Navigating to pickup...", type: "success" });
    setTimeout(() => setNotification(null), 3000);
    navigation.navigate("NavigateToPickup" as never);
  };

  const handleDecline = () => {
    setShowRideRequest(false);
    setNotification({ message: "Ride declined.", type: "warning" });
    setTimeout(() => setNotification(null), 2000);
  };

  const handleSelectCompany = (company: EvCompany) => {
    setSelectedEvCompany(company);
    setNotification({ message: `Showing vehicles from ${company.name}`, type: "info" });
    setTimeout(() => setNotification(null), 2500);
  };

  const filterCompany = selectedEvCompany.id === "all" ? undefined : selectedEvCompany.name;

  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <DriverMapView onLocationUpdate={() => {}} />

      <SafeAreaView style={styles.overlay} pointerEvents="box-none">

        {/* TOP SECTION */}
        <View
          style={[styles.topSection, { paddingHorizontal: PAD, paddingTop: Platform.OS === "android" ? height * 0.04 : height * 0.01 }]}
          pointerEvents="box-none"
        >
          {notification && (
            <DriverNotificationBanner
              message={notification.message}
              type={notification.type}
              onDismiss={() => setNotification(null)}
            />
          )}

          <View style={[styles.headerRow, { marginTop: notification ? 10 : 0 }]}>
            <TouchableOpacity
              style={styles.greetCard}
              onPress={() => navigation.navigate("DriverProfile" as never)}
              activeOpacity={0.8}
            >
              <View style={styles.avatarCircle}>
                <Ionicons name="person" size={18} color="#2563EB" />
              </View>
              <View>
                <Text style={styles.greetText}>Good morning,</Text>
                <Text style={styles.driverName}>John Driver 👋</Text>
              </View>
              <Ionicons name="chevron-forward" size={14} color="#94a3b8" style={{ marginLeft: 2 }} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuBtn} onPress={() => setShowDrawer(true)} activeOpacity={0.8}>
              <Ionicons name="menu-outline" size={22} color="#0f172a" />
            </TouchableOpacity>
          </View>
        </View>

        {/* BOTTOM SECTION */}
        <View style={[styles.bottomSection, { paddingHorizontal: PAD }]} pointerEvents="box-none">

          <TouchableOpacity
            style={styles.evSelectBtn}
            onPress={() => setShowEvSelector(true)}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={["#0f172a", "#1e293b"]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.evSelectGradient}
            >
              <View style={styles.evSelectLeft}>
                <View style={styles.evSelectIcon}>
                  <Ionicons name="flash" size={14} color="#2563EB" />
                </View>
                {selectedEvCar ? (
                  <View>
                    <Text style={styles.evSelectActiveLabel}>Active EV Vehicle</Text>
                    <Text style={styles.evSelectActiveName}>{selectedEvCar.name}</Text>
                  </View>
                ) : (
                  <Text style={styles.evSelectText}>Select EV Vehicle</Text>
                )}
              </View>
              {selectedEvCar ? (
                <View style={styles.evRangePill}>
                  <Ionicons name="battery-charging-outline" size={12} color="#22c55e" />
                  <Text style={styles.evRangeText}>{selectedEvCar.range}</Text>
                </View>
              ) : (
                <Ionicons name="chevron-up" size={16} color="#64748b" />
              )}
            </LinearGradient>
          </TouchableOpacity>

          {selectedEvCar && (
            <View style={styles.evActiveCard}>
              <View style={styles.evActiveRow}>
                <Ionicons name="car-sport-outline" size={18} color="#2563EB" />
                <View style={styles.evActiveInfo}>
                  <Text style={styles.evActiveName}>{selectedEvCar.name}</Text>
                  <Text style={styles.evActiveMfr}>{selectedEvCar.manufacturer} · {selectedEvCar.type}</Text>
                </View>
                <TouchableOpacity onPress={() => setSelectedEvCar(null)} activeOpacity={0.7}>
                  <Ionicons name="close-circle" size={18} color="#cbd5e1" />
                </TouchableOpacity>
              </View>
            </View>
          )}

          <EarningsSummaryCard todayEarnings={earnings.today} completedTrips={earnings.trips} />
          <View style={{ height: 12 }} />
          <DriverStatusToggle onStatusChange={handleStatusChange} />

          {isOnline && !showRideRequest && (
            <View style={styles.waitingPill}>
              <View style={styles.pulseDot} />
              <Text style={styles.waitingText}>Waiting for ride requests...</Text>
            </View>
          )}
        </View>

        {/* EMERGENCY BUTTON */}
        <EmergencySupportButton
          onPress={() => setNotification({ message: "Connecting to emergency support...", type: "warning" })}
        />

        {/* AI BOT BUTTON — robot icon */}
        <TouchableOpacity
          style={styles.aiBotBtn}
          onPress={() => setShowAiBot(true)}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={["#2563EB", "#1e40af"]}
            style={styles.aiBotGradient}
          >
            <Ionicons name="chatbubble-ellipses-outline" size={Math.min(width * 0.06, 24)} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

        <RideRequestModal
          visible={showRideRequest}
          request={MOCK_REQUEST}
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      </SafeAreaView>

      {/* EV Car Selector Modal */}
      <EvCarSelectorModal
        visible={showEvSelector}
        onClose={() => setShowEvSelector(false)}
        onSelect={(car) => {
          setSelectedEvCar(car);
          setNotification({ message: `${car.name} selected as your active EV`, type: "success" });
          setTimeout(() => setNotification(null), 2500);
        }}
        selectedId={selectedEvCar?.id}
        filterCompany={filterCompany}
      />

      {/* EV Partner Drawer */}
      <EvPartnerDrawer
        visible={showDrawer}
        onClose={() => setShowDrawer(false)}
        onSelectCompany={handleSelectCompany}
        selectedCompanyId={selectedEvCompany.id}
      />

      {/* AI Bot Modal */}
      <Modal visible={showAiBot} transparent animationType="slide" onRequestClose={() => setShowAiBot(false)}>
        <TouchableOpacity style={styles.botOverlay} activeOpacity={1} onPress={() => setShowAiBot(false)} />
        <View style={styles.botSheet}>
          <View style={styles.handle} />
          <View style={styles.botHeader}>
            <LinearGradient colors={["#2563EB", "#1e40af"]} style={styles.botAvatarCircle}>
              <Ionicons name="chatbubble-ellipses-outline" size={22} color="#fff" />
            </LinearGradient>
            <View style={{ flex: 1 }}>
              <Text style={styles.botTitle}>GidyAI Assistant</Text>
              <Text style={styles.botSubtitle}>Ask me anything about your trips</Text>
            </View>
            <TouchableOpacity onPress={() => setShowAiBot(false)} activeOpacity={0.7}>
              <Ionicons name="close" size={20} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          <View style={styles.botSuggestions}>
            {["How do I increase my earnings?", "What's my best route today?", "Show my trip stats", "Contact support"].map((q, i) => (
              <TouchableOpacity key={i} style={styles.botChip} activeOpacity={0.7}>
                <Ionicons name="chatbubble-outline" size={13} color="#2563EB" />
                <Text style={styles.botChipText}>{q}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.botInputRow}>
            <TextInput
              style={styles.botInput}
              placeholder="Ask GidyAI..."
              placeholderTextColor="#94a3b8"
            />
            <TouchableOpacity style={styles.botSendBtn} activeOpacity={0.8}>
              <LinearGradient colors={["#3b82f6", "#2563EB"]} style={styles.botSendGradient}>
                <Ionicons name="send" size={16} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, justifyContent: "space-between" },
  topSection: { gap: 10 },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  greetCard: {
    flexDirection: "row", alignItems: "center", gap: 10,
    backgroundColor: "#fff", borderRadius: 50,
    paddingVertical: 8, paddingHorizontal: 14,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  avatarCircle: { width: 34, height: 34, borderRadius: 17, backgroundColor: "#eff6ff", alignItems: "center", justifyContent: "center" },
  greetText: { fontFamily: "Manrope_400Regular", fontSize: Math.min(width * 0.028, 11), color: "#94a3b8" },
  driverName: { fontFamily: "Manrope_700Bold", fontSize: Math.min(width * 0.036, 14), color: "#0f172a" },
  menuBtn: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: "#fff", alignItems: "center", justifyContent: "center",
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  bottomSection: { paddingBottom: height * 0.07, gap: 5 },
  evSelectBtn: { borderRadius: 16, overflow: "hidden" },
  evSelectGradient: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 14, paddingVertical: 12 },
  evSelectLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  evSelectIcon: { width: 30, height: 30, borderRadius: 8, backgroundColor: "#1e40af33", alignItems: "center", justifyContent: "center" },
  evSelectText: { fontFamily: "Manrope_600SemiBold", fontSize: Math.min(width * 0.036, 14), color: "#f1f5f9" },
  evSelectActiveLabel: { fontFamily: "Manrope_400Regular", fontSize: 10, color: "#64748b" },
  evSelectActiveName: { fontFamily: "Manrope_700Bold", fontSize: Math.min(width * 0.034, 13), color: "#f1f5f9" },
  evRangePill: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "#14532d33", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 50 },
  evRangeText: { fontFamily: "Manrope_600SemiBold", fontSize: 11, color: "#22c55e" },
  evActiveCard: {
    backgroundColor: "#fff", borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10,
    borderWidth: 1, borderColor: "#dbeafe",
  },
  evActiveRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  evActiveInfo: { flex: 1 },
  evActiveName: { fontFamily: "Manrope_700Bold", fontSize: Math.min(width * 0.036, 14), color: "#0f172a" },
  evActiveMfr: { fontFamily: "Manrope_400Regular", fontSize: Math.min(width * 0.028, 11), color: "#94a3b8", marginTop: 1 },
  waitingPill: {
    flexDirection: "row", alignItems: "center", gap: 8,
    backgroundColor: "#fff", borderRadius: 50,
    paddingVertical: 10, paddingHorizontal: 16,
    alignSelf: "center",
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },
  pulseDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#22c55e" },
  waitingText: { fontFamily: "Manrope_600SemiBold", fontSize: Math.min(width * 0.032, 13), color: "#64748b" },
  aiBotBtn: {
    position: "absolute",
    bottom: height * 0.38,
    left: width * 0.05,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  aiBotGradient: {
    width: Math.min(width * 0.13, 52),
    height: Math.min(width * 0.13, 52),
    borderRadius: Math.min(width * 0.065, 26),
    alignItems: "center",
    justifyContent: "center",
  },
  botOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.45)" },
  botSheet: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    backgroundColor: "#fff", borderTopLeftRadius: 28, borderTopRightRadius: 28,
    paddingHorizontal: width * 0.05, paddingTop: 12,
    paddingBottom: height * 0.07,           // ← pushed input up
    shadowColor: "#000", shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12, shadowRadius: 16, elevation: 14,
  },
  handle: { width: 40, height: 4, borderRadius: 2, backgroundColor: "#e2e8f0", alignSelf: "center", marginBottom: 16 },
  botHeader: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 20 },
  botAvatarCircle: { width: 46, height: 46, borderRadius: 23, alignItems: "center", justifyContent: "center" },
  botTitle: { fontFamily: "Manrope_700Bold", fontSize: Math.min(width * 0.042, 16), color: "#0f172a" },
  botSubtitle: { fontFamily: "Manrope_400Regular", fontSize: Math.min(width * 0.03, 12), color: "#94a3b8", marginTop: 1 },
  botSuggestions: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 20 },
  botChip: {
    flexDirection: "row", alignItems: "center", gap: 6,
    backgroundColor: "#eff6ff", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 50,
  },
  botChipText: { fontFamily: "Manrope_600SemiBold", fontSize: Math.min(width * 0.03, 12), color: "#2563EB" },
  botInputRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  botInput: {
    flex: 1, backgroundColor: "#f8fafc", borderRadius: 50,
    paddingHorizontal: 16, paddingVertical: 12,
    fontFamily: "Manrope_400Regular", fontSize: Math.min(width * 0.036, 14), color: "#0f172a",
    borderWidth: 1, borderColor: "#e2e8f0",
  },
  botSendBtn: { borderRadius: 50, overflow: "hidden" },
  botSendGradient: { width: 44, height: 44, alignItems: "center", justifyContent: "center" },
});