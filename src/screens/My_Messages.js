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
import useAuth from "../auth/useAuth";
import Env from "../auth/Env";

const My_messages = (props) => {

    const [events, setEvents] = useState([]);
    const [loader, setloader] = useState(false);

    const { user } = useAuth();
    
    // console.log("Name:::>",events.EventText);

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
            url: `${Env.BASE_URL}/api/message/user/${user}/top/10`,
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

                <ImageBackground
                    style={{
                        height:219,display:"none"
                    }}
                    source={require("../../assets/friend_ship.png")}
                />
                <View
                    style={{
                        height:95,
                        padding:10,display:"none"
                    }}
                >
                    <Text
                        style={{
                            fontSize:14,
                            fontWeight:"400"
                        }}
                    >
                         “Each friend represents a world in us, a world possibly not born until they arrive,
                         and it is only by this meeting that a new world is born.”
                         {"\n"}
                    </Text>
                    <Text
                        style={{
                            fontWeight:"600",
                            fontSize:14,
                            color:"#000000"
                        }}
                    >
                        – Anais Nin
                    </Text>
                </View>
                <TouchableRipple
                    style={{
                        backgroundColor:"#ED7225",
                        height:54,
                        marginTop:15
                    }}
                    onPress={()=>{
                        // alert("Pressed");
                        props.navigation.navigate("Insert_Post");
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
                             Post whats on your mind
                        </Text>
                    </View>
                </TouchableRipple>

                {/**
                 * For List of Data in Home Page
                 */}
                 <ScrollView
                 >
                     {events.map((mes,i)=>{
                         return(
                             <View
                                key={i}
                                style={{
                                    marginTop:15,
                                    borderRadius:4,
                                    borderWidth:1,
                                    borderColor:"white",
                                }}
                             >
                                 <View
                                        style={{
                                            height:68,
                                            backgroundColor:"white",
                                            flexDirection:"row",
                                        }}
                                    >
                                        <ImageBackground
                                            style={{
                                                height:44,
                                                width:44,
                                                marginLeft:0,
                                                marginTop:0
                                            }}
                                            // source={require("../../assets/profile_pic.png")}
                                            // source={{uri: Env.BASE_URL+mes.UserProfileImage}}
                                        >
                                             <Image
                                                    style={{
                                                        height:44,
                                                        width:44,
                                                        borderRadius:22,
                                                        marginLeft:16,
                                                        marginTop:16
                                                    }}
                                                        source={{uri: Env.BASE_URL+mes.UserProfileImage}}
                                                    />
                                        </ImageBackground>
                                        <View
                                            style={{
                                                marginTop:16,
                                                marginLeft:16
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flexDirection:"row",
                                                    marginLeft:16

                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color:"#282A8B",
                                                        fontWeight:"700",
                                                        fontSize:14
                                                    }} 
                                                >
                                                    {mes.UserName}
                                                </Text>
                                                <Text
                                                    style={{
                                                        color:"#282A8B",
                                                        fontWeight:"700",
                                                        fontSize:10,
                                                        marginLeft:10,
                                                        backgroundColor:"#ED7225",
                                                        height:17,
                                                        padding:2,
                                                        width:63,
                                                        textAlign:"center",
                                                        borderRadius:3,
                                                        display:"none"
                                                    }} 
                                                >
                                                    {mes.UserSubscriptionType}
                                                </Text>
                                            </View>
                                                <Text
                                                    style={{
                                                        color:"#000000",
                                                        fontWeight:"400",
                                                        fontSize:10.5,
                                                        marginTop:5,
                                                        marginLeft:16

                                                    }} 
                                                >
                                                    {mes.UserRole} - {mes.UserBatch} ({mes.UserSection}) 
                                                </Text>
                                               
                                            </View>

                                            </View>
                                            <View
                            style={{
                                backgroundColor: mes.Status == "Pending" ? "#ED7225" : (mes.Status == "Approved" ? "green":"red"),
                                        width:58,
                                        top:5,
                                        height:19,
                                        justifyContent:"center",
                                        marginRight:0,
                                        borderRadius:4,
                                        marginLeft:70,
                                        marginTop:-10,
                                        marginBottom:10
                                  }}
                             >
                                <Text
                                        style={{
                                            color:"white",
                                            fontSize:12,
                                            fontWeight:"700",
                                            alignSelf:"center",
                                        }}
                                    >
                                        {mes.Status}
                                </Text>
                               
                         </View>

                                        {mes.ImageURL != null ? 
                                        <ImageBackground
                                                style={{
                                                    height:184
                                                }}
                                                // source={require("../../assets/event_one.png")}
                                                source={{uri: Env.BASE_URL+mes.ImageURL}}
                                        ></ImageBackground>
                                        : null }

                                        <Text
                                            style={{
                                                fontSize:16,
                                                fontWeight:"600",
                                                padding:10,
                                                marginLeft:20
                                            }}
                                        >
                                            {mes.MessageText}
                                        </Text>
                                        {mes.Status === "Rejected" ? 
                                        <View
                                            style={{
                                                flex:1,
                                                flexDirection:"row",
                                                marginLeft:20
                                            }}
                                        >
                                         <Text
                                            style={{
                                                color:"rgb(34,34,34)",
                                                fontSize:12,
                                                fontWeight:"700",
                                                alignSelf:"flex-start",
                                                marginLeft:10
                                            }}
                                        >
                                            Rejected Reason : 
                                        </Text> 
                                        <Text
                                            style={{
                                                color:"rgb(34,34,34)",
                                                fontSize:12,
                                                fontWeight:"200",
                                                alignSelf:"flex-start",
                                                marginLeft:10,
                                                marginRight:10
                                            }}
                                        >
                                            {mes.RejectedReason}
                                        </Text> 
                                        </View>  
                                        : null} 
                                        <Divider
                                            style={{
                                                height:1,
                                                backgroundColor:"#D8D8D8",
                                                marginTop:20
                                            }}
                                        />
                             </View>
                                 )
                            })}
                 </ScrollView>
            </View>
}
        </ScrollView>
    )
}

export default My_messages;