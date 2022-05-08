import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    ImageBackground
} from "react-native";
import {
    TextInput,
    Button,
    TouchableRipple,
    IconButton,
    Card,
    Divider
} from "react-native-paper";
import { color, set } from "react-native-reanimated";
import axios from "axios";
import Env from "../auth/Env";
import useAuth from "../auth/useAuth";


const Events_Home_Page = (props) => {

    const [events, setEvents] = useState([]);
    const [loader, setloader] = useState(false);

    const { user } = useAuth();

    useEffect(() => {
        if(user){
            getEvents();
        } 
      }, []); 
      
      useEffect(() => {
        const unsubscribe = props.navigation.addListener("focus", () => {
            getEvents(user);
          console.log("agian");
        });
    
        return unsubscribe;
      }, [props]);

    const getEvents = async () => {
        try {
          setloader(true);
          var config = {
            method: "get",
            url: `${Env.BASE_URL}/api/master/user/${user}/events`,
          };
    
          console.log(config);

          const response = await axios(config);

          setEvents(response.data.Data);
          setloader(false);
        } catch (error) {
          // console.log(error);
        }
      };

    return (
        <ScrollView 
            style={{
                backgroundColor:"#F9FBFF",
            }}
        >
            {loader ? 
                <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop:200
                }}
              >
                <Image
                  style={{ height: 50, width: 50, justifyContent:"center" }}
                  source={require("../../assets/a_load.gif")}
                />
              </View> 
                :     
            <View style={{
                margin:10,
                backgroundColor:"#F9FBFF",                
            }}>

                <TouchableRipple
                    style={{
                        backgroundColor:"#ED7225",
                        height:54
                    }}
                    onPress={()=>{
                        // alert("Pressed");
                        props.navigation.navigate("Insert_Event");
                    }}
                >
                    <View
                        style={{
                            flexDirection:"row",
                        }}
                    >
                        <Image
                            style={{
                                width:14,
                                height:14,
                                marginLeft:15,
                                marginTop:20
                            }}
                            source={require("../../assets/plus.png")}
                        />

                        <Text
                            style={{
                                fontWeight:"400",
                                color:"#FFFFFF",
                                fontSize:16,
                                marginLeft:15,
                                marginTop:17
                            }}
                        >
                             Create New Event
                        </Text>
                    </View>
                </TouchableRipple>

                {events.map((event,i)=>{
                    return(
                        <View
                        key={i}
                    style={{
                        height:242,
                        marginTop:16
                    }}
               >
                   <TouchableRipple
                    onPress={()=>{
                        props.navigation.navigate("full_event",{
                            "e_id":event.EventId
                        })
                        // alert(event.EventId);
                    }}
                   >
                   <ImageBackground
                    style={{
                        height:242,
                    }}
                    // source={require("../../assets/event_one.png")}
                    source={{uri: Env.BASE_URL+event.ImageURL}}
                    >
                    <View>
                        <ImageBackground
                            style={{
                                height:242,
                            }}
                            source={require("../../assets/events_bg.png")}
                        >
                    <View
                        style={{
                            flexDirection:"row",
                            marginTop:170,
                            justifyContent:"space-evenly",
                            alignContent:"center"
                        }}
                    >
                        <Text
                            style={{
                                fontWeight:"700",
                                fontSize:20,
                                color:"#FFFFFF"
                            }}
                        >
                                {/* 1985 SSC Bike Ride to Araku Valley  */}
                                {event.Subject}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection:"row",
                            justifyContent:"space-evenly",
                            alignContent:"center",
                            marginTop:5
                        }}
                    >
                        <View
                            style={{
                                flexDirection:"row"
                            }}
                        >
                            <Image
                                style={{
                                    height: 14,
                                    width: 12.6,
                                }}
                                source={require("../../assets/calendar.png")}
                            />
                        <Text
                             style={{
                                fontSize:12,
                                marginLeft:5,
                                fontWeight:"600",
                                color:"#FFFFFF",
                                marginTop:-1
                            }}
                        >
                              {/* 30/07/2020 - 10:30 AM */}
                              {event.EventDate}
                        </Text>
                        </View>
                        <View
                            style={{
                                flexDirection:"row",
                                alignContent:"center"
                            }}
                        >
                            <Image
                                style={{
                                    height: 14,
                                    width: 10,
                                    marginTop:0
                                }}
                                source={require("../../assets/location.png")}
                            />
                        <Text
                            style={{
                                fontSize:12,
                                fontWeight:"600",
                                color:"#FFFFFF",
                                marginLeft:5,
                                marginTop:-2
                            }}
                    >
                         {event.Location}
                     </Text>
                     </View>
                    </View>
                     </ImageBackground>
                    </View>
                   </ImageBackground>
                   </TouchableRipple>
                </View>
                    )
                })}
            </View>
}
        </ScrollView>
    )
}

export default Events_Home_Page;