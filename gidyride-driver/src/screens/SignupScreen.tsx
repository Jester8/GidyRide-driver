import React, { useState } from "react";
import {
  View, Text, StyleSheet, Dimensions, TouchableOpacity,
  TextInput, StatusBar, Platform, SafeAreaView,
  ScrollView, Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFonts, Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold } from "@expo-google-fonts/manrope";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const EXPERIENCE_LEVELS = ["Less than 1 year", "1 - 3 years", "3 - 5 years", "5+ years"];

export default function SignUpScreen() {
  const [step, setStep] = useState(1);
  const navigation = useNavigation();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseExpiry, setLicenseExpiry] = useState("");
  const [vehiclePermit, setVehiclePermit] = useState("");
  const [operatingPermit, setOperatingPermit] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const [fontsLoaded] = useFonts({
    Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold,
  });

  if (!fontsLoaded) return null;

  const PAD = width * 0.055;
  const BUTTON_HEIGHT = Math.max(height * 0.065, 52);
  const INPUT_HEIGHT = Math.max(height * 0.065, 52);
  const FONT_INPUT = Math.min(width * 0.038, 15);
  const FONT_LABEL = Math.min(width * 0.036, 14);
  const FONT_TITLE = Math.min(width * 0.07, 26);

  const formatDate = (date: Date) => {
    const d = date.getDate().toString().padStart(2, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const y = date.getFullYear();
    return `${d} / ${m} / ${y}`;
  };

  const InputField = ({
    label, value, onChange, placeholder, keyboardType = "default",
    icon, secure = false, toggleSecure, autoCapitalize = "none",
  }: any) => (
    <View style={{ marginBottom: height * 0.02 }}>
      <Text style={[styles.label, { fontSize: FONT_LABEL }]}>{label}</Text>
      <View style={styles.inputWrapper}>
        <Ionicons name={icon} size={18} color="#94a3b8" style={styles.inputIcon} />
        <TextInput
          style={[styles.input, { height: INPUT_HEIGHT, fontSize: FONT_INPUT }]}
          placeholder={placeholder}
          placeholderTextColor="#bbc"
          value={value}
          onChangeText={onChange}
          keyboardType={keyboardType}
          secureTextEntry={secure}
          autoCapitalize={autoCapitalize}
        />
        {toggleSecure && (
          <TouchableOpacity onPress={toggleSecure} activeOpacity={0.7} style={styles.eyeBtn}>
            <Ionicons name={secure ? "eye-off-outline" : "eye-outline"} size={20} color="#94a3b8" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderStep1 = () => (
    <>
      <InputField label="Full Name" value={fullName} onChange={setFullName} placeholder="John Doe" icon="person-outline" autoCapitalize="words" />
      <InputField label="Phone Number" value={phone} onChange={setPhone} placeholder="+234 800 000 0000" keyboardType="phone-pad" icon="call-outline" />
      <InputField label="Email Address" value={email} onChange={setEmail} placeholder="johndoe@email.com" keyboardType="email-address" icon="mail-outline" />

      <View style={{ marginBottom: height * 0.02 }}>
        <Text style={[styles.label, { fontSize: FONT_LABEL }]}>Date of Birth</Text>
        <TouchableOpacity
          style={[styles.inputWrapper, { height: INPUT_HEIGHT }]}
          onPress={() => setShowDatePicker(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="calendar-outline" size={18} color="#94a3b8" style={styles.inputIcon} />
          <Text style={[styles.dobText, { fontSize: FONT_INPUT }, !dob && styles.dobPlaceholder]}>
            {dob ? formatDate(dob) : "DD / MM / YYYY"}
          </Text>
          <Ionicons name="chevron-down-outline" size={18} color="#94a3b8" />
        </TouchableOpacity>
      </View>

      {Platform.OS === "android" && showDatePicker && (
        <DateTimePicker
          value={dob || new Date(2000, 0, 1)}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) setDob(date);
          }}
        />
      )}

      {Platform.OS === "ios" && (
        <Modal visible={showDatePicker} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Date of Birth</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(false)} activeOpacity={0.7}>
                  <Ionicons name="checkmark-circle" size={28} color="#2563EB" />
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={dob || new Date(2000, 0, 1)}
                mode="date"
                display="spinner"
                maximumDate={new Date()}
                textColor="#0f172a"
                onChange={(event, date) => { if (date) setDob(date); }}
                style={{ width: "100%" }}
              />
            </View>
          </View>
        </Modal>
      )}
    </>
  );

  const renderStep2 = () => (
    <>
      <InputField label="Driver's License Number" value={licenseNumber} onChange={setLicenseNumber} placeholder="e.g. Abc1q5mlw63yd2u2cn0hs6jnzf2gljhr486u3dkgm2y" icon="card-outline" autoCapitalize="characters" />
      <InputField label="License Expiry Date" value={licenseExpiry} onChange={setLicenseExpiry} placeholder="MM / YYYY" icon="calendar-outline" />
      <InputField label="Vehicle Permit Number" value={vehiclePermit} onChange={setVehiclePermit} placeholder="e.g. VP-2024-XXXXX" icon="document-outline" autoCapitalize="characters" />
      <InputField label="Operating Permit Number" value={operatingPermit} onChange={setOperatingPermit} placeholder="e.g. OP-2024-XXXXX" icon="shield-outline" autoCapitalize="characters" />

      <Text style={[styles.label, { fontSize: FONT_LABEL, marginBottom: 10 }]}>Years of Driving Experience</Text>
      <View style={styles.chipGrid}>
        {EXPERIENCE_LEVELS.map((level) => (
          <TouchableOpacity
            key={level}
            style={[styles.chip, selectedExperience === level && styles.chipActive]}
            onPress={() => setSelectedExperience(level)}
            activeOpacity={0.7}
          >
            <Text style={[styles.chipText, selectedExperience === level && styles.chipTextActive]}>
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );

  const renderStep3 = () => (
    <>
      <InputField
        label="Password" value={password} onChange={setPassword}
        placeholder="Min. 8 characters" icon="lock-closed-outline"
        secure={!showPassword} toggleSecure={() => setShowPassword(!showPassword)}
      />
      <InputField
        label="Confirm Password" value={confirmPassword} onChange={setConfirmPassword}
        placeholder="Re-enter your password" icon="lock-closed-outline"
        secure={!showConfirm} toggleSecure={() => setShowConfirm(!showConfirm)}
      />
      <TouchableOpacity style={styles.agreeRow} onPress={() => setAgreed(!agreed)} activeOpacity={0.7}>
        <View style={[styles.checkbox, agreed && styles.checkboxActive]}>
          {agreed && <Ionicons name="checkmark" size={12} color="#fff" />}
        </View>
        <Text style={[styles.agreeText, { fontSize: Math.min(width * 0.033, 13) }]}>
          I agree to the <Text style={styles.agreeLink}>Terms of Service</Text> and <Text style={styles.agreeLink}>Privacy Policy</Text>
        </Text>
      </TouchableOpacity>
    </>
  );

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <LinearGradient
        colors={["#dbeafe", "#eff6ff", "#f5f6fa", "#ffffff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safe}>

        <View style={[styles.fixedTop, { paddingHorizontal: PAD }]}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => step > 1 ? setStep(step - 1) : navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={22} color="#0f172a" />
          </TouchableOpacity>

          <View style={styles.stepRow}>
            {[1, 2, 3].map((s) => (
              <View key={s} style={[styles.stepDot, s === step && styles.stepDotActive, s < step && styles.stepDotDone]} />
            ))}
          </View>
          <Text style={styles.stepLabel}>Step {step} of 3</Text>

          <Text style={[styles.title, { fontSize: FONT_TITLE }]}>
            {step === 1 ? "Personal Details" : step === 2 ? "Driver Credentials" : "Secure Your Account"}
          </Text>
          <Text style={[styles.subtitle, { fontSize: Math.min(width * 0.036, 14) }]}>
            {step === 1
              ? "Tell us a little about yourself to get started."
              : step === 2
              ? "Provide your license, permits and driving experience."
              : "Create a strong password to protect your account."}
          </Text>
        </View>

        <ScrollView
          style={styles.formScroll}
          contentContainerStyle={[
            styles.formContent,
            { paddingHorizontal: PAD, paddingBottom: step === 1 ? height * 0.02 : height * 0.005 },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </ScrollView>

        <View style={[
          styles.fixedBottom,
          { paddingHorizontal: PAD, paddingTop: step === 1 ? height * 0.008 : height * 0.001 },
        ]}>
          <TouchableOpacity
            style={[styles.button, { borderRadius: BUTTON_HEIGHT / 2 }]}
            onPress={() => step < 3 ? setStep(step + 1) : navigation.navigate("Congratulations" as never)}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={["#3b82f6", "#2563EB"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.buttonGradient, { height: BUTTON_HEIGHT }]}
            >
              <Text style={[styles.buttonText, { fontSize: Math.min(width * 0.042, 17) }]}>
                {step === 3 ? "Create Account" : "Continue"}
              </Text>
              <Ionicons
                name={step === 3 ? "checkmark-circle-outline" : "arrow-forward"}
                size={18} color="#fff" style={{ marginLeft: 8 }}
              />
            </LinearGradient>
          </TouchableOpacity>

          <View style={[styles.loginRow, { marginTop: height * 0.008 }]}>
            <Text style={[styles.loginPrompt, { fontSize: Math.min(width * 0.035, 13) }]}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login" as never)} activeOpacity={0.7}>
              <Text style={[styles.loginLink, { fontSize: Math.min(width * 0.035, 13) }]}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
  fixedTop: {
    paddingTop: Platform.OS === "android" ? height * 0.04 : height * 0.01,
    paddingBottom: height * 0.015,
  },
  formScroll: { flex: 1 },
  formContent: {
    paddingTop: height * 0.01,
  },
  fixedBottom: {
    paddingBottom: Platform.OS === "android" ? height * 0.06 : height * 0.03,
    backgroundColor: "transparent",
  },
  backBtn: {
    marginBottom: height * 0.022, width: 40, height: 40, borderRadius: 20,
    backgroundColor: "#fff", alignItems: "center", justifyContent: "center",
    shadowColor: "#94a3b8", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 6, elevation: 2,
  },
  stepRow: { flexDirection: "row", gap: 6, marginBottom: 6 },
  stepDot: { flex: 1, height: 4, borderRadius: 2, backgroundColor: "#e2e8f0" },
  stepDotActive: { backgroundColor: "#2563EB" },
  stepDotDone: { backgroundColor: "#93c5fd" },
  stepLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 12, color: "#2563EB", marginBottom: height * 0.012 },
  title: { fontFamily: "Manrope_800ExtraBold", color: "#0f172a", marginBottom: 4 },
  subtitle: { fontFamily: "Manrope_400Regular", color: "#64748b", lineHeight: 20 },
  label: { fontFamily: "Manrope_600SemiBold", color: "#334155", marginBottom: 8 },
  inputWrapper: {
    flexDirection: "row", alignItems: "center", backgroundColor: "#fff",
    borderRadius: 12, borderWidth: 1, borderColor: "#e2e8f0", paddingHorizontal: 14,
    shadowColor: "#94a3b8", shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 1,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontFamily: "Manrope_400Regular", color: "#0f172a" },
  eyeBtn: { paddingLeft: 8 },
  dobText: { flex: 1, fontFamily: "Manrope_400Regular", color: "#0f172a" },
  dobPlaceholder: { color: "#bbc" },
  chipGrid: {
    flexDirection: "row", flexWrap: "wrap", gap: 10,
    marginBottom: height * 0.02, width: "100%",
  },
  chip: {
    paddingHorizontal: width * 0.04, paddingVertical: height * 0.013,
    borderRadius: 50, borderWidth: 1.5, borderColor: "#e2e8f0",
    backgroundColor: "#fff", minWidth: width * 0.35, flexGrow: 1, alignItems: "center",
  },
  chipActive: { backgroundColor: "#2563EB", borderColor: "#2563EB" },
  chipText: { fontFamily: "Manrope_600SemiBold", fontSize: 13, color: "#64748b" },
  chipTextActive: { color: "#fff" },
  agreeRow: { flexDirection: "row", alignItems: "flex-start", gap: 10, marginTop: height * 0.01 },
  checkbox: {
    width: 18, height: 18, borderRadius: 4, borderWidth: 1.5, borderColor: "#cbd5e1",
    alignItems: "center", justifyContent: "center", backgroundColor: "#fff", marginTop: 2,
  },
  checkboxActive: { backgroundColor: "#2563EB", borderColor: "#2563EB" },
  agreeText: { flex: 1, fontFamily: "Manrope_400Regular", color: "#64748b", lineHeight: 20 },
  agreeLink: { fontFamily: "Manrope_600SemiBold", color: "#2563EB" },
  button: { overflow: "hidden" },
  buttonGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
  buttonText: { fontFamily: "Manrope_700Bold", color: "#fff", letterSpacing: 0.2 },
  loginRow: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
  loginPrompt: { fontFamily: "Manrope_400Regular", color: "#64748b" },
  loginLink: { fontFamily: "Manrope_700Bold", color: "#2563EB" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
  modalCard: { backgroundColor: "#fff", borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 },
  modalHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  modalTitle: { fontFamily: "Manrope_700Bold", fontSize: 16, color: "#0f172a" },
});