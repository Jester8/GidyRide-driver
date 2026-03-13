import React, { useState } from "react";
import {
  View, Text, StyleSheet, Dimensions, TouchableOpacity,
  TextInput, StatusBar, Platform, SafeAreaView, ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useFonts, Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold } from "@expo-google-fonts/manrope";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "yo", name: "Yoruba", flag: "🇳🇬" },
  { code: "ig", name: "Igbo", flag: "🇳🇬" },
  { code: "ha", name: "Hausa", flag: "🇳🇬" },
  { code: "pc", name: "Pidgin", flag: "🇳🇬" },
];

export default function LanguageScreen() {
  const [selected, setSelected] = useState(LANGUAGES[0]);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold,
  });

  if (!fontsLoaded) return null;

  const PAD = width * 0.055;
  const FONT_TITLE = Math.min(width * 0.07, 28);
  const BUTTON_HEIGHT = Math.max(height * 0.065, 52);
  const FLAG_SIZE = Math.min(width * 0.07, 28);
  const FONT_LANG = Math.min(width * 0.042, 16);

  const filtered = LANGUAGES.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase())
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
        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingHorizontal: PAD }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={[styles.title, { fontSize: FONT_TITLE }]}>Choose the language</Text>
            <Text style={[styles.subtitle, { fontSize: Math.min(width * 0.036, 14) }]}>
              Select your preferred language below. This helps us serve you better.
            </Text>
          </View>

          <Text style={[styles.sectionLabel, { fontSize: Math.min(width * 0.038, 15) }]}>You Selected</Text>
          <View style={[styles.selectedBox, { paddingHorizontal: PAD, paddingVertical: height * 0.018 }]}>
            <Text style={{ fontSize: FLAG_SIZE, marginRight: 12 }}>{selected.flag}</Text>
            <Text style={[styles.selectedName, { fontSize: FONT_LANG }]}>{selected.name}</Text>
            <View style={styles.checkCircle}>
              <Ionicons name="checkmark" size={14} color="#fff" />
            </View>
          </View>

          <Text style={[styles.sectionLabel, { fontSize: Math.min(width * 0.038, 15) }]}>All Languages</Text>

          <View style={[styles.searchBox, { paddingHorizontal: PAD, paddingVertical: height * 0.013 }]}>
            <Ionicons name="search-outline" size={18} color="#94a3b8" style={{ marginRight: 8 }} />
            <TextInput
              style={[styles.searchInput, { fontSize: Math.min(width * 0.038, 15) }]}
              placeholder="Search"
              placeholderTextColor="#aab"
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <View style={styles.langList}>
            {filtered.map((item) => {
              const isSelected = selected.code === item.code;
              return (
                <TouchableOpacity
                  key={item.code}
                  style={[
                    styles.langItem,
                    isSelected && styles.langItemActive,
                    { paddingHorizontal: PAD, paddingVertical: height * 0.018 },
                  ]}
                  onPress={() => setSelected(item)}
                  activeOpacity={0.7}
                >
                  <Text style={{ fontSize: FLAG_SIZE, marginRight: 12 }}>{item.flag}</Text>
                  <Text style={[styles.langName, { fontSize: FONT_LANG }, isSelected && styles.langNameActive]}>
                    {item.name}
                  </Text>
                  {isSelected && (
                    <View style={styles.checkCircle}>
                      <Ionicons name="checkmark" size={14} color="#fff" />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            style={[styles.button, { borderRadius: BUTTON_HEIGHT / 2 }]}
            onPress={() => navigation.navigate("Login" as never)}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={["#3b82f6", "#2563EB"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.buttonGradient, { height: BUTTON_HEIGHT }]}
            >
              <Text style={[styles.buttonText, { fontSize: Math.min(width * 0.042, 17) }]}>Continue</Text>
            </LinearGradient>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
  scroll: {
    paddingTop: Platform.OS === "android" ? height * 0.05 : height * 0.01,
    paddingBottom: height * 0.04,
  },
  header: { marginBottom: height * 0.025 },
  title: { fontFamily: "Manrope_800ExtraBold", color: "#0f172a", marginBottom: 6 },
  subtitle: { fontFamily: "Manrope_400Regular", color: "#64748b", lineHeight: 22 },
  sectionLabel: {
    fontFamily: "Manrope_700Bold", color: "#0f172a",
    marginBottom: height * 0.012, marginTop: height * 0.008,
  },
  selectedBox: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#fff", borderRadius: 14,
    borderWidth: 1.5, borderColor: "#2563EB",
    marginBottom: height * 0.022,
    shadowColor: "#2563EB", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 8, elevation: 2,
  },
  selectedName: { flex: 1, fontFamily: "Manrope_600SemiBold", color: "#0f172a" },
  checkCircle: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: "#2563EB", alignItems: "center", justifyContent: "center",
  },
  searchBox: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#fff", borderRadius: 12,
    marginBottom: height * 0.012,
    borderWidth: 1, borderColor: "#e2e8f0",
  },
  searchInput: {
    flex: 1, fontFamily: "Manrope_400Regular", color: "#0f172a", padding: 0,
  },
  langList: { marginBottom: height * 0.025 },
  langItem: {
    flexDirection: "row", alignItems: "center",
    borderRadius: 12, marginBottom: 4,
  },
  langItemActive: { backgroundColor: "#eff6ff" },
  langName: { flex: 1, fontFamily: "Manrope_400Regular", color: "#334155" },
  langNameActive: { color: "#2563EB", fontFamily: "Manrope_600SemiBold" },
  button: { overflow: "hidden" },
  buttonGradient: { alignItems: "center", justifyContent: "center" },
  buttonText: { fontFamily: "Manrope_700Bold", color: "#fff", letterSpacing: 0.2 },
});