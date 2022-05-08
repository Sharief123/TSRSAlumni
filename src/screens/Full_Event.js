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

const Full_Event = (props) => {

    const [events, setEvents] = useState([]);
    const [loader, setloader] = useState(false);

    const e_Id = props.route.params.e_id;

    // const year = events.BroadcastTo;

    // for( var i = 0 ; i <= year ; i++){
    //     console.log("__>",i);
    // }

    const { user } = useAuth();

    console.log(e_Id);

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
            // url: `${Env.BASE_URL}/api/master/user/${user}/events`,
            url: `${Env.BASE_URL}/api/event?eventId=${e_Id}`
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
                backgroundColor:"#FFFFFF",
                paddingBottom:20
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
            <ScrollView 
            horizontal={false}
            style={{
                paddingTop:50,
                paddingLeft:20,
                paddingRight:20,
                height:"100%",
                backgroundColor:"#F9FBFF",  
                marginBottom:0              
            }}>

        <TouchableRipple
                onPress={() => {
                props.navigation.goBack();
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

                <Text 
                    style={{
                        color:"#ED7225",
                        fontSize:24,
                        fontWeight:"bold",
                        marginTop:10
                    }}
                >
                     Event Details
                </Text>
                <Card
                    style={{
                        padding:20,
                        marginTop:10,
                        marginLeft:10,
                        marginRight:10,
                        marginBottom:10
                    }}
                >
                    <Image
                        style={{
                            height:200,
                            width:250,
                            justifyContent:"center",
                            alignSelf:"center"
                        }}
                        // source={require("../../assets/friend_ship.png")}
                        source={{uri: Env.BASE_URL+events.ImageURL}}
                        />
                    <Text
                        style={{
                            fontSize:14,
                            color:"#000000",
                            fontWeight:"600",
                            marginTop:20
                        }}
                    >
                        Event name :
                    </Text> 
                    <Text
                        style={{
                            marginTop:20,
                            fontSize:14,
                            color:"#282A8B",
                            fontWeight:"600"
                        }}
                    >
                        {events.EventText}
                    </Text>
                    <Text
                        style={{
                            marginTop:20,
                            fontSize:14,
                            color:"#000000",
                            fontWeight:"600"
                        }}
                    >
                        Event subject :
                    </Text>
                    <Text
                        style={{
                            marginTop:20,
                            fontSize:14,
                            color:"#282A8B",
                            fontWeight:"600"
                        }}
                    >
                        {events.Subject}
                    </Text>
                    <Text
                        style={{
                            marginTop:20,
                            fontSize:14,
                            color:"#000000",
                            fontWeight:"600"
                        }}
                    >
                        Event date {"&"} time :
                    </Text>
                    <Text
                        style={{
                            marginTop:20,
                            fontSize:14,
                            color:"#282A8B",
                            fontWeight:"600"
                        }}
                    >
                        {events.EventDate}
                    </Text>
                    <Text
                        style={{
                            marginTop:20,
                            fontSize:14,
                            color:"#000000",
                            fontWeight:"600"
                        }}
                    >
                        Venue :
                    </Text>
                    <Text
                        style={{
                            marginTop:20,
                            fontSize:14,
                            color:"#282A8B",
                            fontWeight:"600"
                        }}
                    >
                        {events.Location}
                    </Text>
                    <Text
                        style={{
                            marginTop:20,
                            fontSize:14,
                            color:"#000000",
                            fontWeight:"600"
                        }}
                    >
                        Event details link :
                    </Text>
                    <Text
                        style={{
                            marginTop:20,
                            fontSize:14,
                            color:"#282A8B",
                            fontWeight:"600"
                        }}
                    >
                        {events.EventDetailsUrl}
                    </Text>

                    <View
                        style={{
                            flexDirection:"row",
                            justifyContent:"space-between"
                        }}
                    >
                        <View
                            style={{
                                flexDirection:"row",
                                justifyContent:"flex-start"
                            }}
                        >
                         <Text
                            style={{
                                marginTop:20,
                                fontSize:14,
                                color:"#000000",
                                fontWeight:"600"
                            }}
                         >
                              Batch : 
                         </Text>
                         <Text
                            style={{
                                marginTop:20,
                                fontSize:14,
                                color:"#282A8B",
                                fontWeight:"600"
                            }}
                        >
                            {" "}{events.Batch}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection:"row",
                            justifyContent:"flex-end"
                        }}
                    >
                         <Text
                            style={{
                                marginTop:20,
                                fontSize:14,
                                color:"#000000",
                                fontWeight:"600"
                            }}
                         >
                              Section :
                         </Text>
                         <Text
                        style={{
                            marginTop:20,
                            fontSize:14,
                            color:"#282A8B",
                            fontWeight:"600"
                        }}
                    >
                            {" "}{events.Section}
                    </Text>
                    </View>
                    
                    </View>
                    <View
                        style={{
                            flexDirection:"row",
                            justifyContent:"space-between"
                        }}
                    >
                    <Text
                        style={{
                            marginTop:20,
                            fontSize:14,
                            color:"#000000",
                            fontWeight:"600"
                        }}
                    >
                        Status :
                    </Text>

                    <View
                            style={{
                                backgroundColor: events.Status == "Pending" ? "#ED7225" : (events.Status == "Approved" ? "green":"red"),
                                        width:70,
                                        top:5,
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
                                        }}
                                    >
                                        {events.Status}
                                </Text>
                               
                         </View>
                         </View>
                         {events.Status === "Rejected" ? 
                         <View>
                                <Text
                                    style={{
                                        marginTop:20,
                                        fontSize:14,
                                        color:"#000000",
                                        fontWeight:"600"
                                    }}
                                >
                                    Rejected Reason :
                                </Text>
                                <Text
                                    style={{
                                        marginTop:10,
                                        fontSize:14,
                                        color:"#282A8B",
                                        fontWeight:"600",
                                        marginLeft:0
                                    }}
                                >
                                    {events.RejectedReason}
                                </Text>
                         </View>
                         : null}
                         <View
                            style={{
                                justifyContent:"space-between",
                                flexDirection:"row"
                            }}
                         >

                         <Text
                        style={{
                            marginTop:20,
                            fontSize:14,
                            color:"#000000",
                            fontWeight:"600"
                        }}
                        >
                        Event posted by :
                    </Text>
                    <Text
                        style={{
                            marginTop:20,
                            fontSize:14,
                            color:"#282A8B",
                            fontWeight:"600"
                        }}
                        onPress={()=>{
                            props.navigation.navigate("F_P",{
                                "id":events.UserId,
                            })
                        }}
                    >
                        {events.UserName}
                    </Text>
                    </View>

                         <View>

                    {/* <Text
                        style={{
                            marginTop:16,
                            fontSize:14,
                            color: "orange",
                            fontWeight:"600"
                        }}
                    >
                         {" "}
                    </Text> */}
                    <Text>
                        
                    </Text>
                    </View>                    
                   
                </Card>
            </ScrollView>
}
</ScrollView>
    )
}

export default Full_Event;