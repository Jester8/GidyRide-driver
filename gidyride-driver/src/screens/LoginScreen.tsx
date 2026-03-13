import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Platform,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useFonts, Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold } from "@expo-google-fonts/manrope";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  if (!fontsLoaded) return null;

  const PAD = width * 0.055;
  const FONT_TITLE = Math.min(width * 0.072, 28);
  const BUTTON_HEIGHT = Math.max(height * 0.065, 52);
  const INPUT_HEIGHT = Math.max(height * 0.065, 52);
  const FONT_INPUT = Math.min(width * 0.038, 15);
  const FONT_SMALL = Math.min(width * 0.035, 13);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <LinearGradient
        colors={["#dbeafe", "#eff6ff", "#f5f6fa", "#ffffff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={["transparent", "#dbeafe"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
       
      />
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={[styles.scroll, { paddingHorizontal: PAD }]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={[styles.logoRow, { marginTop: 40 }]}>
              {/* <Image
                source={require("../../assets/logo.png")}
                style={[styles.logo, { width: width * 0.28, height: width * 0.28 }]}
                resizeMode="contain"
              /> */}
            </View>

            <Text style={[styles.title, { fontSize: FONT_TITLE }]}>Sign in to your Account</Text>
            <Text style={[styles.subtitle, { fontSize: Math.min(width * 0.036, 14) }]}>
              Enter your email and password to log in
            </Text>

            <View style={[styles.inputWrapper, { marginBottom: height * 0.018 }]}>
              <TextInput
                style={[styles.input, { height: INPUT_HEIGHT, paddingHorizontal: PAD, fontSize: FONT_INPUT }]}
                placeholder="Loisbecket@gmail.com"
                placeholderTextColor="#aab"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={[styles.inputWrapper, { marginBottom: height * 0.018 }]}>
              <TextInput
                style={[styles.input, { height: INPUT_HEIGHT, paddingHorizontal: PAD, paddingRight: 52, fontSize: FONT_INPUT }]}
                placeholder="••••••••"
                placeholderTextColor="#aab"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={Math.min(width * 0.055, 22)}
                  color="#94a3b8"
                />
              </TouchableOpacity>
            </View>

            <View style={[styles.rowBetween, { marginBottom: height * 0.028 }]}>
              <TouchableOpacity
                style={styles.rememberRow}
                onPress={() => setRememberMe(!rememberMe)}
                activeOpacity={0.7}
              >
                <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                  {rememberMe && <Ionicons name="checkmark" size={12} color="#fff" />}
                </View>
                <Text style={[styles.rememberText, { fontSize: FONT_SMALL }]}>Remember me</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPassword" as never)}
                activeOpacity={0.7}
              >
                <Text style={[styles.forgotText, { fontSize: FONT_SMALL }]}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.loginButton, { borderRadius: BUTTON_HEIGHT / 2, marginBottom: height * 0.022 }]}
           onPress={() => navigation.navigate("DriverHome" as never)}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={["#3b82f6", "#2563EB"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.loginGradient, { height: BUTTON_HEIGHT }]}
              >
                <Text style={[styles.loginButtonText, { fontSize: Math.min(width * 0.042, 17) }]}>Log In</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={[styles.orRow, { marginBottom: height * 0.022 }]}>
              <View style={styles.orLine} />
              <Text style={[styles.orText, { fontSize: FONT_SMALL }]}>Or</Text>
              <View style={styles.orLine} />
            </View>

            <TouchableOpacity
              style={[styles.googleButton, { height: BUTTON_HEIGHT, borderRadius: BUTTON_HEIGHT / 2, marginBottom: height * 0.03 }]}
              activeOpacity={0.85}
            >
              <Ionicons name="logo-google" size={Math.min(width * 0.05, 20)} color="#4285F4" />
              <Text style={[styles.googleText, { fontSize: Math.min(width * 0.04, 15) }]}>
                Continue with Google
              </Text>
            </TouchableOpacity>

            <View style={styles.signupRow}>
              <Text style={[styles.signupPrompt, { fontSize: FONT_SMALL }]}>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignUp" as never)}
                activeOpacity={0.7}
              >
                <Text style={[styles.signupLink, { fontSize: FONT_SMALL }]}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
  scroll: {
    paddingTop: height * 0.04,
    paddingBottom: height * 0.05,
  },
  logoRow: { alignItems: "center", marginBottom: height * 0.03 },
  logo: {},
  title: {
    fontFamily: "Manrope_800ExtraBold",
    color: "#0f172a",
    textAlign: "left",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Manrope_400Regular",
    color: "#64748b",
    textAlign: "left",
    marginBottom: height * 0.035,
  },
  inputWrapper: { position: "relative" },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    fontFamily: "Manrope_400Regular",
    color: "#0f172a",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#94a3b8",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  eyeButton: {
    position: "absolute",
    right: 14,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rememberRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#cbd5e1",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  checkboxActive: { backgroundColor: "#2563EB", borderColor: "#2563EB" },
  rememberText: { fontFamily: "Manrope_400Regular", color: "#64748b" },
  forgotText: { fontFamily: "Manrope_600SemiBold", color: "#2563EB" },
  loginButton: { overflow: "hidden" },
  loginGradient: { alignItems: "center", justifyContent: "center" },
  loginButtonText: {
    fontFamily: "Manrope_700Bold",
    color: "#fff",
    letterSpacing: 0.2,
  },
  orRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  orLine: { flex: 1, height: 1, backgroundColor: "#e2e8f0" },
  orText: { fontFamily: "Manrope_400Regular", color: "#94a3b8" },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    gap: 10,
    shadowColor: "#94a3b8",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  googleText: { fontFamily: "Manrope_600SemiBold", color: "#0f172a" },
  signupRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signupPrompt: { fontFamily: "Manrope_400Regular", color: "#64748b" },
  signupLink: { fontFamily: "Manrope_700Bold", color: "#2563EB" },
});