import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

interface Props {
  onLocationUpdate?: (coords: { latitude: number; longitude: number }) => void;
}

export default function DriverMapView({ onLocationUpdate }: Props) {
  const mapRef = useRef<MapView>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") { setPermissionDenied(true); return; }

      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const coords = { latitude: loc.coords.latitude, longitude: loc.coords.longitude };
      setLocation(coords);
      onLocationUpdate?.(coords);

      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 10 },
        (newLoc) => {
          const newCoords = { latitude: newLoc.coords.latitude, longitude: newLoc.coords.longitude };
          setLocation(newCoords);
          onLocationUpdate?.(newCoords);
          mapRef.current?.animateToRegion({ ...newCoords, latitudeDelta: 0.01, longitudeDelta: 0.01 }, 500);
        }
      );
    })();
  }, []);

  if (permissionDenied) {
    return (
      <View style={styles.errorWrap}>
        <Ionicons name="location-outline" size={40} color="#94a3b8" />
        <Text style={styles.errorText}>Location permission denied</Text>
      </View>
    );
  }

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      showsMyLocationButton={false}
      initialRegion={
        location
          ? { ...location, latitudeDelta: 0.01, longitudeDelta: 0.01 }
          : { latitude: 6.5244, longitude: 3.3792, latitudeDelta: 0.05, longitudeDelta: 0.05 }
      }
    >
      {location && (
        <Marker coordinate={location}>
          <View style={styles.driverMarker}>
            <Ionicons name="car" size={18} color="#fff" />
          </View>
        </Marker>
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { width, height },
  driverMarker: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: "#2563EB",
    alignItems: "center", justifyContent: "center",
    borderWidth: 2, borderColor: "#fff",
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, shadowRadius: 4, elevation: 4,
  },
  errorWrap: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  errorText: { fontFamily: "Manrope_600SemiBold", fontSize: 14, color: "#94a3b8" },
});