import { NavigationContainer }        from "@react-navigation/native";

import React, { useEffect, useState } from "react";

import {
  View,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

import { GestureHandlerRootView }     from "react-native-gesture-handler";

import AppNavigator                   from "./src/Navigation/navigator";
import { CategoryProvider }           from "./src/components/CategoryContext";

const { width, height } = Dimensions.get("window");

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.loadingContainer}>
          <Image
            source={require("./assets/loading.png")}
            style={styles.loadingImage}
            resizeMode="cover"
          />
        </View>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CategoryProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </CategoryProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingImage: {
    width: 300,
    height: 300,
  },
});