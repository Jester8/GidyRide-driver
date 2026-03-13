import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/splashScreen";
import OnboardingSlides from "../screens/slideScreen";
import LanguageScreen from "../screens/Language";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignupScreen";
import ForgotPassword from "../screens/ForgotPassword";
import ResetPassword from "../screens/ResetPassword";
import Congratulations from "../screens/Congratulations";
import DriverHomeScreen from "../screens/home/DriverHomeScreen";
import NavigateToPickupScreen from "../screens/home/trip/NavigateToPickupScreen";
import ActiveTripScreen from "../screens/home/trip/ActiveTripScreen";
import TripCompleteScreen from "../screens/home/trip/TripCompleteScreen";
import DriverProfileScreen from "../screens/profile/DriverProfileScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {showSplash ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : (
          <>
            <Stack.Screen name="Slides" component={OnboardingSlides} />
            <Stack.Screen name="Language" component={LanguageScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="Congratulations" component={Congratulations} />
            <Stack.Screen name="DriverHome" component={DriverHomeScreen} />
            <Stack.Screen name="NavigateToPickup" component={NavigateToPickupScreen} />
            <Stack.Screen name="ActiveTrip" component={ActiveTripScreen} />
            <Stack.Screen name="TripComplete" component={TripCompleteScreen} />
            <Stack.Screen name="DriverProfile" component={DriverProfileScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}