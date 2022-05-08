import React, { useState, useEffect } from "react";
import { Image, Text, Animated, View, ImageBackground, Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entypo from "react-native-vector-icons/Entypo";
import { Card } from "react-native-paper";

import {
    Events,
    HomeScreen,
    profile
} from "./navigation";

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    height:72,
                    borderTopLeftRadius:30,
                    borderTopRightRadius:30
                 },
            }}
    >
        <Tab.Screen
         
         options={{
        tabBarLabel: "H",
        headerShown:false,
        tabBarShowLabel:false,
        tabBarIcon: ({ focused }) => {
            return (
            <View style={{
                justifyContent:"center",
                height:40,
                backgroundColor: focused ? "#282A8B" : "#FFFF",
                width:111,
                borderRadius:20,
                marginBottom:0
            }}>
                <Text
                    style={{
                        alignSelf:"center",
                        fontSize:16,
                        color: focused ? "#FFFFFF" : "#282A8B",
                    }}
                >
                    Home
                </Text>
                </View>
               );
             },
        }}
        name="Home" 
        component={HomeScreen} 
   />

    <Tab.Screen   
         options={{
        tabBarLabel: "Home",
        headerShown:false,
        tabBarShowLabel:false,
        tabBarIcon: ({ focused }) => {
            return (
            <View style={{
                justifyContent:"center",
                height:40,
                backgroundColor: focused ? "#282A8B" : "#FFFF",
                width:111,
                borderRadius:20
            }}>
                <Text
                    style={{
                        alignSelf:"center",
                        fontSize:16,
                        color: focused ? "#FFFFFF" : "#282A8B",
                    }}
                >
                    Events
                </Text>
                </View>
               );
             },
        }}
        name="Events" 
        component={Events}
   />
    <Tab.Screen
         
         options={{
        tabBarLabel: "Home",
        headerShown:false,
        tabBarShowLabel:false,
        tabBarIcon: ({ focused }) => {
            return (
            <View style={{
                justifyContent:"center",
                height:40,
                backgroundColor: focused ? "#282A8B" : "#FFFF",
                width:111,
                borderRadius:20
            }}>
                <Text
                    style={{
                        alignSelf:"center",
                        fontSize:16,
                        color: focused ? "#FFFFFF" : "#282A8B",
                    }}
                >
                    Profile
                </Text>
                </View>
               );
             },
        }}
        name="Profile" 
        component={profile} 
   />
        {/* <Tab.Screen 
            name="Events" 
            component={Events}
            options={{
                headerShown:false
            }}
         /> */}
        {/* <Tab.Screen 
            name="Profile" 
            component={Profile}
            options={{
                headerShown:false
            }}
         /> */}
    </Tab.Navigator>
  );
};

export default BottomNavigation;
