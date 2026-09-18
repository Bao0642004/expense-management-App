import {
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import {
  useState,
} from "react";

import {
  View,
} from "react-native";

import CustomTabBar   from "../components/CustomTabBar";
import SuccessMessage from "../components/SuccessMessage";
import Edit           from "../screens/Edit";
import Home           from "../screens/Home";
import Login          from "../screens/Login";
import Onboarding123  from "../screens/Onboarding";
import Register       from "../screens/Register";
import CategoryScreen from "../screens/category";
import Create         from "../screens/create";
import Insights       from "../screens/insghts";
import Profile        from "../screens/profile";

const Tab =  createBottomTabNavigator();
const Stack =  createNativeStackNavigator();


function MyTabs({
  route,
}: any) {  const [
    successMessage,
    setSuccessMessage,
  ] = useState<string>(
    route.params?.successMessage || ""
  );


  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Tab.Navigator
        tabBar={(props) => (
          <CustomTabBar
            {...props}
          />
        )}

        screenOptions={{
          headerShown: false,
        }}
      >

        <Tab.Screen
          name="Home"
          component={Home}
        />

        <Tab.Screen
          name="Insights"
          component={Insights}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
        />

      </Tab.Navigator>

      {successMessage !== "" && (
        <SuccessMessage
          message={
            successMessage
          }
          onHide={() => {
            setSuccessMessage("");
          }}
        />
      )}
    </View>
  );
}


export default function AppNavigator() {

  return (

    <Stack.Navigator
      initialRouteName="Onboarding123"
      screenOptions={{
        headerShown: false,
      }}
    >

      <Stack.Screen
        name="Onboarding123"
        component={
          Onboarding123
        }
      />


      <Stack.Screen
        name="login"
        component={Login}
      />

      <Stack.Screen
        name="register"
        component={Register}
      />

      <Stack.Screen
        name="BottomTab"
        component={MyTabs}
      />

      <Stack.Screen
        name="Add"
        component={Create}
      />

      <Stack.Screen
        name="Edit"
        component={Edit}

        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="category"
        component={
          CategoryScreen
        }

        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}