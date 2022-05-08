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

const Notifications = (props) => {

    const [events, setEvents] = useState([]);
    const [loader, setloader] = useState(false);
    const [infoMore, SetInfoMore] = useState(1);

    console.log("Name:::>",events.EventText);

    useEffect(() => {
            getEvents(); 
      }, []);   

    const getEvents = async () => {
        try {
          setloader(true);
          var config = {
            method: "get",
            url: `${Env.BASE_URL}/api/event/user/1/top/5`,
          };
    
          console.log(config);

          const response = await axios(config);
    
        //   console.log("Response::::>",response);

        // console.log("Data::::>",response.data.Data);

        //   const allData = JSON.parse(response.data);
        //   console.log(allData);
          setEvents(response.data.Data);
          console.log("Events",events);
          console.log("Event Name::::>",events.EventText);
          setloader(false);
        } catch (error) {
          // console.log(error);
        }
      };

    return (
        <ScrollView 
            style={{
                backgroundColor:"#F9FBFF",
                paddingTop:20,
            }}
        >
            <View style={{
                backgroundColor:"#F9FBFF",    
                margin:20,            
            }}>
                <TouchableRipple
                onPress={() => {
                props.navigation.goBack();
                }}
                style={{
                    width:24,
                }}
            >
                    <Image
                        style={{
                            height:12,
                            width:24,
                            justifyContent:"flex-start",
                            marginTop:20,
                            marginBottom:15
                            }}
                        resizeMode="contain"
                        source={require("../../assets/back_arrow.png")}
                    />
                </TouchableRipple>

                <View
                    style={{
                        flexDirection:"row",
                        marginTop:20
                    }}
                >
                    <Text 
                        style={{
                            color:"#ED7225",
                            fontSize:24,
                            fontWeight:"bold",
                        }}
                    >
                        Notifications 
                    </Text>
                    <TouchableRipple
                        style={{
                            backgroundColor:"#ED7225",
                            height:24,
                            width:35,
                            marginTop:5,
                            borderRadius:10,
                            marginLeft:15,
                            justifyContent:"center",
                            alignItems:"center"
                        }}
                    >
                        <Text
                            style={{
                                fontSize:12,
                                fontWeight:"600",
                                color:"#FFFFFF"
                            }}
                        >
                            3
                        </Text>
                    </TouchableRipple>
                </View>

               <View
                    style={{
                        height:64,
                        backgroundColor:"#FFFFFF",
                        borderRadius:6,
                        marginTop:20,
                        marginLeft:-7,
                        justifyContent:"center",
                        paddingLeft:17,
                        elevation:6
                    }}
               >
                   <Text
                        style={{
                            fontWeight:"600",
                            fontSize:14,
                            color:"#282A8B",
                        }}
                   >
                         New Application Pending for Approval
                   </Text>
                  </View>

                  <View
                    style={{
                        height:64,
                        backgroundColor:"#FFFFFF",
                        borderRadius:6,
                        marginTop:20,
                        marginLeft:-7,
                        justifyContent:"center",
                        paddingLeft:17
                    }}
               >
                   <Text
                        style={{
                            fontWeight:"600",
                            fontSize:14,
                            color:"#282A8B",
                        }}
                   >
                         New Application Pending for Approval
                   </Text>
                  </View>

                  <View
                    style={{
                        height:64,
                        backgroundColor:"#FFFFFF",
                        borderRadius:6,
                        marginTop:20,
                        marginLeft:-7,
                        justifyContent:"center",
                        paddingLeft:17
                    }}
               >
                   <Text
                        style={{
                            fontWeight:"600",
                            fontSize:14,
                            color:"#282A8B",
                        }}
                   >
                         New Application Pending for Approval
                   </Text>
                  </View>
            </View>
                
        </ScrollView>
    )
}

export default Notifications;