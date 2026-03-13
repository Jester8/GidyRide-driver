import React, { useRef, useEffect } from "react";
import {
  View, Text, StyleSheet, Animated, TouchableOpacity,
  Dimensions, ScrollView, Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export interface EvCar {
  id: string;
  name: string;
  manufacturer: string;
  range: string;
  type: "Sedan" | "SUV" | "Fleet Car" | "Taxi" | "Tricycle";
  company: string;
}

export const EV_CARS: EvCar[] = [
  { id: "1", name: "JET EV Sedan", manufacturer: "Jet Motor Company", range: "320 km", type: "Sedan", company: "Jet Motor Company" },
  { id: "2", name: "IVM EX02", manufacturer: "Innoson Vehicle Manufacturing", range: "330–400 km", type: "SUV", company: "Innoson Vehicle Manufacturing" },
  { id: "3", name: "IVM EX01", manufacturer: "Innoson Vehicle Manufacturing", range: "300 km", type: "Sedan", company: "Innoson Vehicle Manufacturing" },
  { id: "4", name: "Saglev Electric SUV", manufacturer: "Saglev EV", range: "350 km", type: "SUV", company: "Saglev EV" },
  { id: "5", name: "Qoray Electric Tricycle", manufacturer: "Qoray Mobility", range: "120 km", type: "Tricycle", company: "Qoray Mobility" },
  { id: "6", name: "Mechsaka Electric Sedan", manufacturer: "Mechsaka Electric Mobility", range: "280 km", type: "Sedan", company: "Mechsaka Electric Mobility" },
  { id: "7", name: "AMW EV SUV", manufacturer: "African Motor Works", range: "370 km", type: "SUV", company: "African Motor Works" },
  { id: "8", name: "Spiro City Taxi", manufacturer: "Spiro Mobility", range: "200 km", type: "Taxi", company: "Spiro Mobility" },
];

const TYPE_COLORS: Record<string, string> = {
  Sedan: "#2563EB", SUV: "#7c3aed", "Fleet Car": "#0891b2", Taxi: "#d97706", Tricycle: "#16a34a",
};

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (car: EvCar) => void;
  selectedId?: string;
  filterCompany?: string;
}

export default function EvCarSelectorModal({ visible, onClose, onSelect, selectedId, filterCompany }: Props) {
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: visible ? 0 : height,
      tension: 65, friction: 12, useNativeDriver: true,
    }).start();
  }, [visible]);

  const cars = filterCompany ? EV_CARS.filter(c => c.company === filterCompany) : EV_CARS;

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose} />
      <Animated.View style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.handle} />
        <View style={styles.sheetHeader}>
          <View>
            <Text style={styles.sheetTitle}>Select EV Vehicle</Text>
            <Text style={styles.sheetSubtitle}>
              {filterCompany ? `Showing ${filterCompany} vehicles` : `${cars.length} African EVs available`}
            </Text>
          </View>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.7}>
            <Ionicons name="close" size={20} color="#64748b" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
          {cars.map((car) => {
            const isSelected = car.id === selectedId;
            return (
              <TouchableOpacity
                key={car.id}
                style={[styles.carCard, isSelected && styles.carCardActive]}
                onPress={() => { onSelect(car); onClose(); }}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={isSelected ? ["#eff6ff", "#dbeafe"] : ["#f8fafc", "#f8fafc"]}
                  style={styles.carCardInner}
                >
                  <View style={[styles.evIconWrap, { backgroundColor: TYPE_COLORS[car.type] + "18" }]}>
                    <Ionicons name="car-sport-outline" size={24} color={TYPE_COLORS[car.type]} />
                  </View>
                  <View style={styles.carInfo}>
                    <View style={styles.carNameRow}>
                      <Text style={styles.carName}>{car.name}</Text>
                      <View style={[styles.typeBadge, { backgroundColor: TYPE_COLORS[car.type] + "18" }]}>
                        <Text style={[styles.typeBadgeText, { color: TYPE_COLORS[car.type] }]}>{car.type}</Text>
                      </View>
                    </View>
                    <Text style={styles.carMfr}>{car.manufacturer}</Text>
                    <View style={styles.rangeRow}>
                      <Ionicons name="flash-outline" size={12} color="#22c55e" />
                      <Text style={styles.rangeText}>Range: {car.range}</Text>
                    </View>
                  </View>
                  {isSelected && (
                    <View style={styles.selectedCheck}>
                      <Ionicons name="checkmark-circle" size={22} color="#2563EB" />
                    </View>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.45)" },
  sheet: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    backgroundColor: "#fff", borderTopLeftRadius: 28, borderTopRightRadius: 28,
    paddingHorizontal: width * 0.05, paddingTop: 12,
    maxHeight: height * 0.75,
    shadowColor: "#000", shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12, shadowRadius: 16, elevation: 14,
  },
  handle: { width: 40, height: 4, borderRadius: 2, backgroundColor: "#e2e8f0", alignSelf: "center", marginBottom: 16 },
  sheetHeader: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 },
  sheetTitle: { fontFamily: "Manrope_800ExtraBold", fontSize: Math.min(width * 0.05, 20), color: "#0f172a" },
  sheetSubtitle: { fontFamily: "Manrope_400Regular", fontSize: Math.min(width * 0.032, 13), color: "#94a3b8", marginTop: 2 },
  closeBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#f1f5f9", alignItems: "center", justifyContent: "center" },
  carCard: { marginBottom: 10, borderRadius: 16, overflow: "hidden", borderWidth: 1.5, borderColor: "transparent" },
  carCardActive: { borderColor: "#2563EB" },
  carCardInner: { flexDirection: "row", alignItems: "center", padding: 14, gap: 12 },
  evIconWrap: { width: 48, height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  carInfo: { flex: 1 },
  carNameRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 3 },
  carName: { fontFamily: "Manrope_700Bold", fontSize: Math.min(width * 0.038, 15), color: "#0f172a", flex: 1 },
  typeBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 50 },
  typeBadgeText: { fontFamily: "Manrope_600SemiBold", fontSize: 10 },
  carMfr: { fontFamily: "Manrope_400Regular", fontSize: Math.min(width * 0.03, 12), color: "#64748b", marginBottom: 4 },
  rangeRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  rangeText: { fontFamily: "Manrope_600SemiBold", fontSize: Math.min(width * 0.03, 12), color: "#22c55e" },
  selectedCheck: { marginLeft: 4 },
});