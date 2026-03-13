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

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold,
  });

  if (!fontsLoaded) return null;

  const PAD = width * 0.055;
  const BUTTON_HEIGHT = Math.max(height * 0.065, 52);
  const INPUT_HEIGHT = Math.max(height * 0.065, 52);
  const FONT_INPUT = Math.min(width * 0.038, 15);
  const FONT_LABEL = Math.min(width * 0.036, 14);

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthLabel = ["", "Weak", "Medium", "Strong"][strength];
  const strengthColor = ["#e2e8f0", "#ef4444", "#f59e0b", "#22c55e"][strength];

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
              <Ionicons name="shield-checkmark-outline" size={36} color="#2563EB" />
            </View>

            <Text style={[styles.title, { fontSize: Math.min(width * 0.07, 26) }]}>Reset Password</Text>
            <Text style={[styles.subtitle, { fontSize: Math.min(width * 0.036, 14) }]}>
              Create a new strong password for your account.
            </Text>

            <Text style={[styles.label, { fontSize: FONT_LABEL }]}>New Password</Text>
            <View style={[styles.inputWrapper, { marginBottom: 8 }]}>
              <Ionicons name="lock-closed-outline" size={18} color="#94a3b8" style={{ marginRight: 10 }} />
              <TextInput
                style={[styles.input, { height: INPUT_HEIGHT, fontSize: FONT_INPUT }]}
                placeholder="Min. 8 characters"
                placeholderTextColor="#bbc"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} activeOpacity={0.7}>
                <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#94a3b8" />
              </TouchableOpacity>
            </View>

            {password.length > 0 && (
              <View style={[styles.strengthRow, { marginBottom: height * 0.02 }]}>
                {[1, 2, 3].map((s) => (
                  <View key={s} style={[styles.strengthBar, { backgroundColor: s <= strength ? strengthColor : "#e2e8f0" }]} />
                ))}
                <Text style={[styles.strengthText, { color: strengthColor }]}>{strengthLabel}</Text>
              </View>
            )}

            <Text style={[styles.label, { fontSize: FONT_LABEL, marginTop: password.length > 0 ? 0 : height * 0.02 }]}>Confirm Password</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={18} color="#94a3b8" style={{ marginRight: 10 }} />
              <TextInput
                style={[styles.input, { height: INPUT_HEIGHT, fontSize: FONT_INPUT }]}
                placeholder="Re-enter your password"
                placeholderTextColor="#bbc"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirm}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} activeOpacity={0.7}>
                <Ionicons name={showConfirm ? "eye-outline" : "eye-off-outline"} size={20} color="#94a3b8" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.button, { borderRadius: BUTTON_HEIGHT / 2, marginTop: height * 0.035 }]}
              onPress={() => navigation.navigate("Login" as never)}
              activeOpacity={0.85}
            >
              <LinearGradient colors={["#3b82f6", "#2563EB"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.buttonGradient, { height: BUTTON_HEIGHT }]}>
                <Text style={[styles.buttonText, { fontSize: Math.min(width * 0.042, 17) }]}>Reset Password</Text>
                <Ionicons name="checkmark-circle-outline" size={18} color="#fff" style={{ marginLeft: 8 }} />
              </LinearGradient>
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
    textAlign: "center" 
  },
  subtitle: { 
    fontFamily: "Manrope_400Regular", 
    color: "#64748b", 
    lineHeight: 22, 
    marginBottom: height * 0.035,
    textAlign: "center" 
  },
  label: { fontFamily: "Manrope_600SemiBold", color: "#334155", marginBottom: 8 },
  inputWrapper: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 12, borderWidth: 1, borderColor: "#e2e8f0", paddingHorizontal: 14, marginBottom: height * 0.02, shadowColor: "#94a3b8", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 },
  input: { flex: 1, fontFamily: "Manrope_400Regular", color: "#0f172a" },
  strengthRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  strengthBar: { flex: 1, height: 4, borderRadius: 2 },
  strengthText: { fontFamily: "Manrope_600SemiBold", fontSize: 12, width: 50 },
  button: { overflow: "hidden" },
  buttonGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
  buttonText: { fontFamily: "Manrope_700Bold", color: "#fff", letterSpacing: 0.2 },
});