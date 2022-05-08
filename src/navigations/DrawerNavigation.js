import React, { useState, useEffect } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, Text, ImageBackground, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import {
  About_Alumni,
  Financial_Reports,
  My_Approvals,
  my_events,
  My_Events,
  My_Messages,
  Nav_screens,
  nav_screens,
 profile,
 Upload_Financial_Reports
} from "./navigation.js";

import { TouchableOpacity } from "react-native-gesture-handler";
import BottomNavigation from "./BottomNavigation.js";
import { Divider, TouchableRipple } from "react-native-paper";
import useAuth from "../auth/useAuth.js";
import Env from "../auth/Env";
 
const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ setUser, ...props }) => {

  const [events, setEvents] = useState([]);
  const [loader, setloader] = useState(false);

  useEffect(() => {
    if(user){
        getEvents();
    } 
  }, []); 

  const logout = async (cb) => {
    try {
      AsyncStorage.clear()
        .then(() => {
          cb();
        })
        .catch(() => {
          cb();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const { user } = useAuth();

  console.log(user);

  const getEvents = async () => {
    try {
      setloader(true);
      var config = {
        method: "get",
        url: `${Env.BASE_URL}/api/master/user/${user}/mysmalldetails`,
      };

      // console.log(config);

      const response = await axios(config);
      setEvents(response.data.Data);
      setloader(false);
    } catch (error) {
      console.log(error); 
    }
  };

  // var curYear = new Date().getFullYear();

  return (
    <>
      <DrawerContentScrollView {...props}>
        <View style={{
          // backgroundColor:"#B8B8B833",
          backgroundColor:"#282A8B",
        }}>

        {/* <TouchableOpacity
              //   onPress={() => {
              //     props.navigation.navigate("editprofile");
              //   }
              // }
              style={{
                elevation:0,
                borderRadius:10,
                height:272
              }}
              > */}
                <TouchableRipple
                    onPress={()=> 
                      { 
                      props.navigation.closeDrawer();
                     }
                    //  alert("Pressed")
                    }
                    // onPress={BottomNavigation}
                    style={{
                      alignSelf:"flex-end",
                      marginTop:30,
                      marginRight:25,
                    }}
                >
                  <Image
                      style={{
                        width:14,
                        height:14,
                        justifyContent:"flex-end",
                        alignSelf:"flex-end"
                      }}
                      source={require("../../assets/white_x.png")}
                  />
                </TouchableRipple>
                <View 
                    style={{
                        width:162,
                        alignSelf:"center",
                        height:162,
                        borderColor:"#282A8B",
                        marginTop:15,
                        marginBottom:0,
                        justifyContent:"center",
                        backgroundColor:"#282A8B",
                        width:"100%"
                    }}
                >
                <ImageBackground 
                        style={{
                            height:80,
                            width:80,
                            borderRadius:100,
                            marginTop:0,
                            alignSelf:"center",
                            }}
                            imageStyle={{
                              borderRadius:40
                            }}
                        resizeMode="contain"
                        // source={require("../../assets/profile_pic.png")}
                        // source={{uri: `${Env.BASE_URL}${events.ProfileImage}`}}
                    >
                        <Image
                                style={{
                                    height:80,
                                    width:80,
                                    alignSelf:"center",
                                    marginBottom:10,
                                    marginTop:0,
                                    borderRadius:80/2
                                    }}
                                    source={{uri: `${Env.BASE_URL}${events.ProfileImage}`}}
                            />
                      <View
                                style={{
                                    justifyContent:"center",
                                        alignSelf:"flex-end",
                                        marginRight:-45,
                                        borderRadius:4,
                                        display:"none"
                                }}
                            >
                         <View
                            style={{
                                backgroundColor:"#ED7225",
                                        width:58,
                                        top:-60,
                                        height:19,
                                        justifyContent:"center",
                                        alignSelf:"flex-end",
                                        marginRight:0,
                                        borderRadius:4,
                                  }}
                             >
                                <Text
                                        style={{
                                            color:"white",
                                            fontSize:12,
                                            fontWeight:"700",
                                            alignSelf:"center",
                                            display:"none"
                                        }}
                                    >
                                        {events.SubscriptionType}
                                </Text>
                               
                         </View>
                         <Text
                                        style={{
                                            color:"white",
                                            fontSize:12,
                                            fontWeight:"700",
                                            alignSelf:"flex-end",
                                            marginRight:-50,
                                            marginTop:50,
                                            display:"none"
                                        }}
                                    >
                                        Upgrade to Platinum
                                </Text>
                                </View>
                  </ImageBackground>
                  <Text
                    style={{
                      marginTop:20,
                      alignSelf:"center",
                      textAlign:"center",
                      color:"white"
                    }}
                  >
                    {/* Sharief is the Forent - end Developer for Agriitex office */}
                    {events.Name}
                  </Text>
                  <View
                    style={{
                      flexDirection:"row",
                      marginTop:10,
                      alignSelf:"center",
                      marginBottom:10
                    }}
                  >
                  <Text
                    style={{
                      alignSelf:"center",
                      color:"#",
                      fontSize:12,
                      fontWeight:"400",
                      color:"white"
                    }}
                  >
                    {/* 2014 */}
                    {events.Batch} ({events.Section})
                  </Text>
                  <Text
                    style={{
                      alignSelf:"center",
                      color:"#000000",
                      fontSize:12,
                      fontWeight:"400",
                      marginLeft:20,
                      display:"none"
                    }}
                  >
                    {events.Section}
                  </Text>
                  <Text
                    style={{
                      alignSelf:"center",
                      color:"#000000",
                      fontSize:12,
                      fontWeight:"400",
                      marginLeft:20,
                      color:"white"
                    }}
                  >
                    {events.Role}
                  </Text>
                  </View>
                  
                </View>
            
        {/* </TouchableOpacity> */}
          
</View>
          {/* {user && ( */}
            <DrawerItemList {...props} />

<View>
            {/* <DrawerItem
              label="Signout"
              options={{
                headerShown:false,
              }}   
              labelStyle={{
                fontSize:18,
                // color:"rgb(255,255,255)"
                color: "#282A8B",
              }}
              // component={Financial_Reports}
              onPress={() => {
              //   alert("Sign Out is Pressed");
                logout(() => {
                  setUser(undefined);
                });
              }}
            /> */}
          {/* )} */}
          {user && (
            <DrawerItem
              label="Signout"
              labelStyle={{
                fontSize:16,
                color:"rgb(34,34,34)",
                marginLeft:5
                // color: "rgb(34,34,34)"
              }}
              onPress={() => {
                logout(() => {
                  setUser(undefined);
                });
              }}
            />
          )}
          <View
            style={{
              flex:1,
              padding:5,
              justifyContent:"flex-end",
              marginTop:100
            }}
          >
            <Text
              style={{
                alignSelf:"center",
                color:"#000000",
                fontSize:12,
                fontWeight:"400"
              }}
            >
               Version 1.1.0.3
            </Text>
            <Text
              style={{
                alignSelf:"center",
                color:"#000000",
                textAlign:"center",
                fontSize:12,
                fontWeight:"400",
                margin:5
              }}
            >
               Copyright © {new Date().getFullYear()}  TSRSE Society.  All rights reserved. 
            </Text>
          </View>
        </View>

      </DrawerContentScrollView>
    </>
  );
};

function DrawerNavigator() {
  const { setUser } = useAuth();

  const [events, setEvents] = useState([]);
  const [loader, setloader] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if(user){
        getEvents();
    } 
  }, []); 

  const getEvents = async () => {
    try {
      setloader(true);
      var config = {
        method: "get",
        url: `${Env.BASE_URL}/api/master/user/${user}/mysmalldetails`,
      };

      // console.log(config);

      const response = await axios(config);
      setEvents(response.data.Data);
      // console.log("eve::>",response.data.Data);
      setloader(false);
    } catch (error) {
      console.log(error); 
    }
  };

  return (
    <>
      <Drawer.Navigator
        drawerContent={(props) => (
          <CustomDrawerContent {...props} setUser={setUser}  />
        )}
        style={{
          fontSize:16,
          color:"rgb(255,255,255)",
          borderColor:"rgb(34,34,34)"
        }}

      >
        <Drawer.Screen
          name="welcome"
          component={BottomNavigation}
          options={{
            // title: "Home",
            headerShown:false,
            // title:false,
            borderColor:"black",
            drawerLabel:"Home",
          //   drawerShowLabel:false,
          //   drawerIcon: ({ focused }) => {
          //     return (
          //       <View
          //         style={{
          //           flexDirection:"row",
          //           justifyContent:"space-between",
          //           alignContent:"center",
          //           width:"100%",
          //           marginLeft:5,
          //           marginRight:5
          //         }}
          //       >
          //         <Text
          //           style={{
          //             fontSize:18,
          //             fontWeight:"600",
          //             color:"#282A8B"
          //           }}
          //         >
          //           Home
          //         </Text>
          //           <Image
          //             style={{
          //               width:7,
          //               height:12,
          //               alignSelf:"center",
          //               justifyContent:"flex-end",
          //               marginLeft:0,
          //               marginTop:5,
          //               marginRight:10
          //             }}
          //             resizeMode="cover"
          //             source={require("../../assets/see_more.png")}
          //           />
          //        </View>
          //   )}
           }}
        />
        <Drawer.Screen
              name="Financial Reports"
              options={{
                headerShown:false,
                title:"Financial Reports"
              }}
              component={Financial_Reports}
         />

        <Drawer.Screen
              name=" Members"
              options={{
                headerShown:false,
                title:" Members"
              }}
              component={Upload_Financial_Reports}
         />

         {events.Role != "Member" ? 
          <Drawer.Screen
                name="My Approvals"
                component={My_Approvals}
                options={{
                  headerShown:false,
                  title:"My Approvals",
                }}
              />
              : null }
            
            <Drawer.Screen
              name="My Events"
              options={{
                headerShown:false,
                title:"My Events"
              }}
              component={my_events}
            />
           
            <Drawer.Screen
              name="My Messages"
              options={{
                headerShown:false,
                title:"My Messages"
              }}
              component={My_Messages}
            />
             
            <Drawer.Screen
              name="About TSRSE Alumni"
              options={{
                headerShown:false,
                title:"About TSRSE Alumni"
              }}
              component={About_Alumni}
            />
    
        {/* <Drawer.Screen
          name="jobs"
          component={nav_screens}
          options={{
            title: "Jobs",
          }}
        /> */}
      </Drawer.Navigator>
    </>
  );
}
export default DrawerNavigator;
