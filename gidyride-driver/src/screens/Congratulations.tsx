import React, { useEffect, useRef } from "react";
import {
  View, Text, StyleSheet, Dimensions, TouchableOpacity,
  StatusBar, SafeAreaView, Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useFonts, Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold } from "@expo-google-fonts/manrope";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function Congratulations() {
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  const [fontsLoaded] = useFonts({
    Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold,
  });

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  if (!fontsLoaded) return null;

  const PAD = width * 0.055;
  const BUTTON_HEIGHT = Math.max(height * 0.065, 52);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <LinearGradient colors={["#dbeafe", "#eff6ff", "#f0fdf4", "#ffffff"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
      <LinearGradient colors={["transparent", "#dcfce7"]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}  />

      <SafeAreaView style={styles.safe}>
        <View style={[styles.container, { paddingHorizontal: PAD }]}>

          <Animated.View style={[styles.iconWrap, { transform: [{ scale: scaleAnim }] }]}>
            <LinearGradient colors={["#34d399", "#22c55e"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.iconCircle}>
              <Ionicons name="checkmark" size={52} color="#fff" />
            </LinearGradient>
            
          </Animated.View>

          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <Text style={[styles.congrats, { fontSize: Math.min(width * 0.06, 22) }]}>
              🎉 Welcome Aboard!
            </Text>
            <Text style={[styles.title, { fontSize: Math.min(width * 0.075, 30) }]}>
              Account Created{"\n"}Successfully!
            </Text>
            <Text style={[styles.subtitle, { fontSize: Math.min(width * 0.038, 15) }]}>
              Your driver account has been set up. You're all set to start accepting rides and earning on your schedule.
            </Text>

            <View style={styles.infoCard}>
              {[
                { icon: "car-outline", text: "Accept ride requests anytime" },
                { icon: "cash-outline", text: "Earn on your own schedule" },
                { icon: "shield-checkmark-outline", text: "Verified & secure account" },
              ].map((item, i) => (
                <View key={i} style={[styles.infoRow, i < 2 && styles.infoRowBorder]}>
                  <View style={styles.infoIconWrap}>
                    <Ionicons name={item.icon as any} size={18} color="#2563EB" />
                  </View>
                  <Text style={[styles.infoText, { fontSize: Math.min(width * 0.036, 14) }]}>{item.text}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.button, { borderRadius: BUTTON_HEIGHT / 2, marginTop: height * 0.03 }]}
              onPress={() => navigation.navigate("Login" as never)}
              activeOpacity={0.85}
            >
              <LinearGradient colors={["#3b82f6", "#2563EB"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.buttonGradient, { height: BUTTON_HEIGHT }]}>
                <Text style={[styles.buttonText, { fontSize: Math.min(width * 0.042, 17) }]}>Start Driving</Text>
                <Ionicons name="arrow-forward" size={18} color="#fff" style={{ marginLeft: 8 }} />
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
 
  container: { flex: 1, justifyContent: "center" },
  iconWrap: { alignItems: "center", marginBottom: height * 0.04 },
  iconCircle: { width: 110, height: 110, borderRadius: 55, alignItems: "center", justifyContent: "center" },

  congrats: { fontFamily: "Manrope_700Bold", color: "#16a34a", textAlign: "center", marginBottom: 8 },
  title: { fontFamily: "Manrope_800ExtraBold", color: "#0f172a", textAlign: "center", lineHeight: 38, marginBottom: 14 },
  subtitle: { fontFamily: "Manrope_400Regular", color: "#64748b", textAlign: "center", lineHeight: 24, marginBottom: height * 0.035 },
  infoCard: { backgroundColor: "#fff", borderRadius: 16, borderWidth: 1, borderColor: "#e2e8f0", overflow: "hidden", shadowColor: "#94a3b8", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 2 },
  infoRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 18, paddingVertical: 16, gap: 14 },
  infoRowBorder: { borderBottomWidth: 1, borderBottomColor: "#f1f5f9" },
  infoIconWrap: { width: 36, height: 36, borderRadius: 10, backgroundColor: "#eff6ff", alignItems: "center", justifyContent: "center" },
  infoText: { fontFamily: "Manrope_600SemiBold", color: "#334155", flex: 1 },
  button: { overflow: "hidden" },
  buttonGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
  buttonText: { fontFamily: "Manrope_700Bold", color: "#fff", letterSpacing: 0.2 },
});