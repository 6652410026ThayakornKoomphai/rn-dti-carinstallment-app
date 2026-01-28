import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

const carlogo = require("@/assets/images/car-logo.png");

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/input");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={carlogo} style={styles.carlogo} />
      <Text style={styles.appnameth}>Smart Auto Loan</Text>
      <Text style={styles.appnameen}>วางแผนการออกแบบฉบับมือโปร</Text>
      <ActivityIndicator size="large" color="white" style={{ marginTop: 40 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  appnameen: {
    fontFamily: "Kanit_400Regular",
    fontSize: 20,
    color: "white",
  },
  appnameth: {
    fontFamily: "Kanit_700Bold",
    fontSize: 60,
    fontWeight: "bold",
    color: "white",
  },
  carlogo: {
    width: 200,
    height: 200,
  },
  container: {
    flex: 1,
    backgroundColor: "#070f5a",
    alignItems: "center",
    justifyContent: "center",
  },
});
