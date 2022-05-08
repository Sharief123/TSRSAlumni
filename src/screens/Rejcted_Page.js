import React,{useEffect, useState} from "react";
import axios from "axios";

import {
    View,
    Image,
    Text,
    ImageBackground,
    ScrollView, 
    BackHandler
} from "react-native";
import { 
    TextInput,
    Button,
    Card
 } from "react-native-paper";

 import * as Location from "expo-location"; 
 import Env from "../auth/Env";
 import MapView, { Marker, Callout } from 'react-native-maps';  
 import useAuth from "../auth/useAuth";

const Rejected_Page = (props) => {

  // console.log(s);
  useEffect(()=>{
    const back = BackHandler.addEventListener('hardwareBackPress', ()=>true)
    return () => back.remove()
}, [])

    return (
            <View style={{
                padding:20,
                backgroundColor:"#F9FBFF",
                height:"100%"
            }}>
                <View style={{
                    justifyContent:"center"
                }}>
                <ImageBackground
                    style={{
                        width:"99%",
                        height:250,     
                        alignSelf:"center",
                        marginTop:30,
                    }}
                    imageStyle={{ borderRadius: 5 }}
                    resizeMode="contain"
                    source={require("../../assets/processing.png")}
                >
                </ImageBackground>
                <Text style={{
                    color:"#ED7225",
                    fontSize:24,
                    alignSelf:"center",
                    margin:20,
                    fontStyle:"italic",
                    paddingTop:20
                }}>
                    Your application is Rejected. Please contact your Alumni Rep
                </Text>
                <Text
                    onPress={()=>{
                        BackHandler.exitApp();
                    }}
                    style={{
                        alignSelf:"flex-end",
                        color:"#282A8B",
                        fontSize:16,
                        marginRight:20
                    }}
                >
                    Close 
                </Text>
            </View>
            </View>
    )
}

export default Rejected_Page;