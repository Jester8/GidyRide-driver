import React, { useState } from "react";
import {
  View, Text, StyleSheet, Dimensions, TouchableOpacity,
  TextInput, StatusBar, Platform, SafeAreaView, KeyboardAvoidingView, ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useFonts, Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold } from "@expo-google-fonts/manrope";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold,
  });

  if (!fontsLoaded) return null;

  const PAD = width * 0.055;
  const BUTTON_HEIGHT = Math.max(height * 0.065, 52);
  const INPUT_HEIGHT = Math.max(height * 0.065, 52);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <LinearGradient colors={["#dbeafe", "#eff6ff", "#f5f6fa", "#ffffff"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
      <LinearGradient colors={["transparent", "#dbeafe"]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}  />
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <ScrollView contentContainerStyle={[styles.scroll, { paddingHorizontal: PAD }]} keyboardShouldPersistTaps="handled">

            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
              <Ionicons name="arrow-back" size={22} color="#0f172a" />
            </TouchableOpacity>

            <View style={styles.iconCircle}>
              <Ionicons name="lock-open-outline" size={36} color="#2563EB" />
            </View>

            <Text style={[styles.title, { fontSize: Math.min(width * 0.07, 26) }]}>Forgot Password?</Text>
            <Text style={[styles.subtitle, { fontSize: Math.min(width * 0.036, 14) }]}>
              No worries! Enter your email and we'll send you a reset link.
            </Text>

            <Text style={[styles.label, { fontSize: Math.min(width * 0.036, 14) }]}>Email Address</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={18} color="#94a3b8" style={{ marginRight: 10 }} />
              <TextInput
                style={[styles.input, { height: INPUT_HEIGHT, fontSize: Math.min(width * 0.038, 15) }]}
                placeholder="johndoe@email.com"
                placeholderTextColor="#bbc"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              style={[styles.button, { borderRadius: BUTTON_HEIGHT / 2, marginTop: height * 0.035 }]}
              onPress={() => navigation.navigate("ResetPassword" as never)}
              activeOpacity={0.85}
            >
              <LinearGradient colors={["#3b82f6", "#2563EB"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.buttonGradient, { height: BUTTON_HEIGHT }]}>
                <Text style={[styles.buttonText, { fontSize: Math.min(width * 0.042, 17) }]}>Send Reset Link</Text>
                <Ionicons name="send-outline" size={17} color="#fff" style={{ marginLeft: 8 }} />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backToLogin} onPress={() => navigation.navigate("Login" as never)} activeOpacity={0.7}>
              <Text style={[styles.backToLoginText, { fontSize: Math.min(width * 0.035, 13) }]}>Back to Sign In</Text>
            </TouchableOpacity>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
  scroll: { paddingTop: height * 0.02, paddingBottom: height * 0.05 },
  backBtn: { 
    marginTop: height * 0.03,
    marginBottom: height * 0.03, 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: "#fff", 
    alignItems: "center", 
    justifyContent: "center", 
    shadowColor: "#94a3b8", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 6, 
    elevation: 2 
  },
  iconCircle: { 
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    backgroundColor: "#eff6ff", 
    borderWidth: 2, 
    borderColor: "#bfdbfe", 
    alignItems: "center", 
    justifyContent: "center", 
    marginBottom: height * 0.025,
    alignSelf: "center" // This centers the icon horizontally
  },
  title: { 
    fontFamily: "Manrope_800ExtraBold", 
    color: "#0f172a", 
    marginBottom: 8,
    textAlign: "center" // Optional: center the title text as well
  },
  subtitle: { 
    fontFamily: "Manrope_400Regular", 
    color: "#64748b", 
    lineHeight: 22, 
    marginBottom: height * 0.035,
    textAlign: "center" // Optional: center the subtitle text as well
  },
  label: { fontFamily: "Manrope_600SemiBold", color: "#334155", marginBottom: 8 },
  inputWrapper: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 12, borderWidth: 1, borderColor: "#e2e8f0", paddingHorizontal: 14, shadowColor: "#94a3b8", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 },
  input: { flex: 1, fontFamily: "Manrope_400Regular", color: "#0f172a" },
  button: { overflow: "hidden" },
  buttonGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
  buttonText: { fontFamily: "Manrope_700Bold", color: "#fff", letterSpacing: 0.2 },
  backToLogin: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, marginTop: height * 0.025 },
  backToLoginText: { fontFamily: "Manrope_600SemiBold", color: "#2563EB" },
});