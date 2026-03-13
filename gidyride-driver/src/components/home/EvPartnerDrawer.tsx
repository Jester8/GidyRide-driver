import React, { useRef, useEffect } from "react";
import {
  View, Text, StyleSheet, Animated, TouchableOpacity,
  Dimensions, ScrollView, Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export interface EvCompany {
  id: string;
  name: string;
  country: string;
  fleetSize: string;
  color: string;
}

export const EV_COMPANIES: EvCompany[] = [
  { id: "all", name: "All Companies", country: "Africa", fleetSize: "All vehicles", color: "#2563EB" },
  { id: "1", name: "Jet Motor Company", country: "Nigeria", fleetSize: "12 Fleet Cars", color: "#16a34a" },
  { id: "2", name: "Innoson Vehicle Manufacturing", country: "Nigeria", fleetSize: "28 Fleet Cars", color: "#0891b2" },
  { id: "3", name: "Saglev EV", country: "Nigeria", fleetSize: "8 Fleet Cars", color: "#7c3aed" },
  { id: "4", name: "African Motor Works", country: "Nigeria", fleetSize: "15 Fleet Cars", color: "#d97706" },
  { id: "5", name: "Qoray Mobility", country: "Nigeria", fleetSize: "20 Fleet Cars", color: "#db2777" },
  { id: "6", name: "Spiro Mobility", country: "Pan-African", fleetSize: "40 Fleet Cars", color: "#0f172a" },
  { id: "7", name: "Mechsaka Electric Mobility", country: "Nigeria", fleetSize: "6 Fleet Cars", color: "#ea580c" },
];

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelectCompany: (company: EvCompany) => void;
  selectedCompanyId?: string;
}

export default function EvPartnerDrawer({ visible, onClose, onSelectCompany, selectedCompanyId }: Props) {
  const slideAnim = useRef(new Animated.Value(-width * 0.8)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slideAnim, { toValue: visible ? 0 : -width * 0.8, tension: 65, friction: 12, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: visible ? 1 : 0, duration: 250, useNativeDriver: true }),
    ]).start();
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Animated.View style={[StyleSheet.absoluteFill, styles.backdrop, { opacity: fadeAnim }]}>
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onClose} activeOpacity={1} />
      </Animated.View>

      <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}>
        <LinearGradient colors={["#0f172a", "#1e293b"]} style={styles.drawerGradient}>
          <View style={styles.drawerTop}>
            <View style={styles.drawerLogoRow}>
              <View style={styles.drawerLogo}>
                <Ionicons name="flash" size={20} color="#2563EB" />
              </View>
              <View>
                <Text style={styles.drawerBrand}>GidyRide EV</Text>
                <Text style={styles.drawerBrandSub}>Partner Network</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.drawerClose} onPress={onClose} activeOpacity={0.7}>
              <Ionicons name="close" size={20} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          <Text style={styles.drawerSectionLabel}>EV PARTNER COMPANIES</Text>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
            {EV_COMPANIES.map((company) => {
              const isSelected = company.id === selectedCompanyId;
              return (
                <TouchableOpacity
                  key={company.id}
                  style={[styles.companyItem, isSelected && styles.companyItemActive]}
                  onPress={() => { onSelectCompany(company); onClose(); }}
                  activeOpacity={0.8}
                >
                  <View style={[styles.companyIcon, { backgroundColor: company.color + "25" }]}>
                    <Ionicons name="flash-outline" size={18} color={company.color} />
                  </View>
                  <View style={styles.companyText}>
                    <Text style={styles.companyName}>{company.name}</Text>
                    <Text style={styles.companyCountry}>{company.country} · {company.fleetSize}</Text>
                  </View>
                  {isSelected && <Ionicons name="checkmark-circle" size={18} color="#2563EB" />}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          
        </LinearGradient>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { backgroundColor: "rgba(0,0,0,0.5)" },
  drawer: {
    position: "absolute", top: 0, left: 0, bottom: 0,
    width: width * 0.78,
    shadowColor: "#000", shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.3, shadowRadius: 20, elevation: 20,
  },
  drawerGradient: { flex: 1, paddingTop: height * 0.07, paddingHorizontal: width * 0.05 },
  drawerTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 28 },
  drawerLogoRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  drawerLogo: { width: 42, height: 42, borderRadius: 12, backgroundColor: "#1e40af22", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#2563EB44" },
  drawerBrand: { fontFamily: "Manrope_800ExtraBold", fontSize: Math.min(width * 0.045, 18), color: "#fff" },
  drawerBrandSub: { fontFamily: "Manrope_400Regular", fontSize: Math.min(width * 0.028, 11), color: "#64748b", marginTop: 1 },
  drawerClose: { width: 34, height: 34, borderRadius: 17, backgroundColor: "#ffffff12", alignItems: "center", justifyContent: "center" },
  drawerSectionLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 10, color: "#475569", letterSpacing: 1.2, marginBottom: 14 },
  companyItem: {
    flexDirection: "row", alignItems: "center", gap: 12,
    paddingVertical: 14, paddingHorizontal: 12,
    borderRadius: 14, marginBottom: 6,
  },
  companyItemActive: { backgroundColor: "#1e40af22", borderWidth: 1, borderColor: "#2563EB44" },
  companyIcon: { width: 40, height: 40, borderRadius: 11, alignItems: "center", justifyContent: "center" },
  companyText: { flex: 1 },
  companyName: { fontFamily: "Manrope_600SemiBold", fontSize: Math.min(width * 0.036, 14), color: "#f1f5f9" },
  companyCountry: { fontFamily: "Manrope_400Regular", fontSize: Math.min(width * 0.028, 11), color: "#64748b", marginTop: 2 },
  drawerFooter: { flexDirection: "row", alignItems: "center", gap: 6, paddingVertical: 16, borderTopWidth: 1, borderTopColor: "#1e293b" },
  drawerFooterText: { fontFamily: "Manrope_400Regular", fontSize: 11, color: "#475569" },
});