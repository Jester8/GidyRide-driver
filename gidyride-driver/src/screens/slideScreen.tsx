import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  FlatList,
  ImageBackground,
  StatusBar,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold } from "@expo-google-fonts/manrope";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    image: require("../../assets/slide1.png"),
    title: "Welcome to GidyRide",
    description: "Join a growing community of drivers helping people move around the city safely and comfortably.",
    buttonText: "Get Started",
  },
  {
    id: "2",
    image: require("../../assets/slide2.png"),
    title: "Drive and Earn ",
    description: "Accept ride requests, complete trips, and earn income while driving across the city.",
    buttonText: "Continue",
  },
  {
    id: "3",
    image: require("../../assets/slide3.png"),
    title: "Help People Move Around ",
    description: "Provide safe and reliable rides while serving people in your community.",
    buttonText: "Start Driving",
  },
];

export default function OnboardingSlides() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  const animateTransition = (callback: () => void) => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
    callback();
  };

 const handleNext = () => {
  if (currentIndex < slides.length - 1) {
    const next = currentIndex + 1;
    animateTransition(() => {
      flatListRef.current?.scrollToIndex({ index: next, animated: true });
      setCurrentIndex(next);
    });
  } else {
    navigation.navigate("Language" as never);
  }
};

const handleSkip = () => {
  navigation.navigate("Language" as never);
};

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  if (!fontsLoaded) return null;

  const renderSlide = ({ item }: { item: typeof slides[0] }) => (
    <ImageBackground
      source={item.image}
      style={styles.slide}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
    </ImageBackground>
  );

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        style={StyleSheet.absoluteFill}
      />

      <TouchableOpacity style={styles.skipButton} onPress={handleSkip} activeOpacity={0.7}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <Animated.View style={[styles.bottomCard, { opacity: fadeAnim }]}>
        <LinearGradient
          colors={["rgba(10,10,10,0.6)", "rgba(10,10,10,0.95)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.cardContent}>
          <View style={styles.dotsRow}>
            {slides.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i === currentIndex ? styles.dotActive : styles.dotInactive,
                ]}
              />
            ))}
          </View>

          <Text style={styles.title}>{slides[currentIndex].title}</Text>
          <Text style={styles.description}>{slides[currentIndex].description}</Text>

          <TouchableOpacity style={styles.button} onPress={handleNext} activeOpacity={0.85}>
            <Text style={styles.buttonText}>{slides[currentIndex].buttonText}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const CARD_PADDING = width * 0.06;
const BUTTON_HEIGHT = Math.max(height * 0.068, 52);
const FONT_TITLE = Math.min(width * 0.062, 26);
const FONT_DESC = Math.min(width * 0.038, 15);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  slide: {
    width,
    height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  skipButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? height * 0.065 : height * 0.045,
    right: CARD_PADDING,
    zIndex: 10,
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  skipText: {
    color: "#fff",
    fontFamily: "Manrope_600SemiBold",
    fontSize: Math.min(width * 0.04, 16),
    opacity: 0.9,
  },
  bottomCard: {
    position: "absolute",
    bottom: height * 0.06,
    left: CARD_PADDING,
    right: CARD_PADDING,
    borderRadius: 24,
    overflow: "hidden",
  },
  cardContent: {
    paddingHorizontal: CARD_PADDING,
    paddingTop: height * 0.03,
    paddingBottom: Platform.OS === "ios" ? height * 0.04 : height * 0.035,
  },
  dotsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: height * 0.022,
    gap: 6,
  },
  dot: {
    height: 4,
    borderRadius: 2,
  },
  dotActive: {
    width: 24,
    backgroundColor: "#ffffff",
  },
  dotInactive: {
    width: 8,
    backgroundColor: "rgba(255,255,255,0.35)",
  },
  title: {
    fontFamily: "Manrope_800ExtraBold",
    fontSize: FONT_TITLE,
    color: "#ffffff",
    marginBottom: height * 0.012,
    lineHeight: FONT_TITLE * 1.25,
    textAlign: "center",
  },
  description: {
    fontFamily: "Manrope_400Regular",
    fontSize: FONT_DESC,
    color: "rgba(255,255,255,0.75)",
    lineHeight: FONT_DESC * 1.65,
    marginBottom: height * 0.032,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2563EB",
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_HEIGHT / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Manrope_700Bold",
    fontSize: Math.min(width * 0.042, 17),
    color: "#ffffff",
    letterSpacing: 0.2,
  },
});