import { Ionicons } from "@expo/vector-icons";

import React        from "react";

import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

export default function CustomTabBar({
  state,
  navigation,
}: any) {
  const tabs = [
    {
      name: "Home",
      icon: "home",
      iconOutline: "home-outline",
    },
  
    {
      name: "Insights",
      icon: "bar-chart",
      iconOutline: "bar-chart-outline",
    },
  {
    name: "Profile",
    icon: "person",
    iconOutline: "person-outline",
  },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>

        {tabs.map((tab, index) => {
          const isFocused = state.index === index;

          const handlePress = () => {
            const route = state.routes[index];

            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={tab.name}
              activeOpacity={0.8}
              onPress={handlePress}
              style={[
                styles.tabItem,
                isFocused && styles.activeTab,
              ]}
            >
              <Ionicons
                name={
                  isFocused
                    ? (tab.icon as any)
                    : (tab.iconOutline as any)
                }
                size={30}
                color={isFocused ? "#ffffff" : "#B8B8BC"}
              />
            </TouchableOpacity>
          );
        })}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 30,
    alignItems: "center",
  },

  tabBar: {
    width: width - 50,
    height: 85,
    backgroundColor: "#29292B",
    borderRadius: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 10,
  },
  tabItem: {
    width: 70,
    height: 70,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },


  activeTab: {
    backgroundColor: "#414143",
  },
});