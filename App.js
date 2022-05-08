import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import AuthStorage from "./src/auth/storage";
import AuthContext from "./src/auth/context";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import DrawerNavigator from './src/navigations/DrawerNavigation';
import { Nav_screens } from './src/navigations/navigation';

enableScreens();
export default function App() {
  const [user, setUser] = useState(undefined);
  const restoreToken = async () => {
    try {
      let user = await AuthStorage._retrieveData('authUser');
      if (!user) return;
      setUser(user);
    } catch (error) {}
  };
  useEffect(() => {
    restoreToken();
  }, []);
  return (
    <>
      <PaperProvider>
        <StatusBar backgroundColor="#FFFF" barStyle="dark-content" />
        <AuthContext.Provider value={{ user, setUser }}>
          <SafeAreaProvider>
            <NavigationContainer>
                {/* <Nav_screens /> */}
                {/* <DrawerNavigator /> */}
                
                {user ? <DrawerNavigator /> : <Nav_screens />}

              {/* {user ? <BottomNavigation /> : <Nav_screens />} */}

            </NavigationContainer>
          </SafeAreaProvider>
        </AuthContext.Provider>
      </PaperProvider>
    </>
  );
  // return (
  //   <View>
  //     <StatusBar style="auto" />
  //     <NavigationContainer>

  //       <Nav_screens />

  //     </NavigationContainer>

  //   </View>
  // );
}
