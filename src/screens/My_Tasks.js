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

const My_Tasks = (props) => {

    const [events, setEvents] = useState([]);
    const [profiles, setprofile] = useState([]);
    const [messages, setmessages] = useState([]);
    const [Events, setevents] = useState([]);

    const [school, SetSchool] = useState(0);
    const [Message, SetMessage] = useState(0);
    const [Profiles, SetProfiles] = useState(0);

    const [loader, setloader] = useState(false);
    const [infoMore, SetInfoMore] = useState(1);

    const { user } = useAuth();

    const NoOfTasks = events.ProfileCount+events.MessageCount+events.EventCount;

    // console.log("no Tasks:::>",NoOfTasks);

    useEffect(() => {
        if(user){
            getEvents(user); 
        }
      }, [props]);   

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
            url: `${Env.BASE_URL}/api/master/user/${user}/data/approve`,
          };
    
          console.log(config);

          const response = await axios(config);
          setEvents(response.data.Data);

          var config2 = {
              method: "get",
              url: `${Env.BASE_URL}/api/master/user/${user}/profileslist/approve`,
          };

          console.log(config2);

          const profiles_response = await axios(config2);
          setprofile(profiles_response.data.Data);

          var config3 = {
            method: "get",
            url: `${Env.BASE_URL}/api/master/user/${user}/messages/approve`,
        };

        console.log(config3);

        const messages_response = await axios(config3);
        setmessages(messages_response.data.Data);

        // console.log("1->",messages_response.data.Data.BroadcastTo);

        // console.log("2->",messages_response.data.Data.UserId);

        var config4 = {
            method: "get",
            url: `${Env.BASE_URL}/api/master/user/${user}/events/approve`,
        };

        console.log(config4);

        const events_response = await axios(config4);
        setevents(events_response.data.Data);

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
                paddingBottom:5
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
            <View>
                <TouchableRipple
                onPress={() => {
                props.navigation.goBack();
                }}
                style={{
                    width:24,
                    marginTop:20,
                    marginLeft:20
                }}
            >
                    <Image
                        style={{
                            height:12,
                            width:24,
                            justifyContent:"flex-start",
                            marginTop:20,
                            marginBottom:15,
                            marginLeft:0
                            }}
                        resizeMode="contain"
                        source={require("../../assets/back_arrow.png")}
                    />
                </TouchableRipple>

                <View
                    style={{
                        flexDirection:"row",
                        marginTop:20,
                        marginLeft:15
                    }}
                >
                    <Text 
                        style={{
                            color:"#ED7225",
                            fontSize:24,
                            fontWeight:"bold",
                        }}
                    >
                        My pending tasks 
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
                            {NoOfTasks}
                        </Text>
                    </TouchableRipple>
                </View>
                <ScrollView
                    style={{
                        marginBottom:20,
                    }}
                >
                    <Card
                        style={{
                            paddingBottom:10
                        }}
                    >
                    {Profiles === 0 ? (
                        <TouchableRipple
                        style={{
                            backgroundColor: "#FFFFFF",
                            height:33,
                            marginTop:20,
                            borderRadius:4,
                            justifyContent:"center",
                            marginLeft:15,
                            marginRight:20
                                }}
                          >
                              <View
                                style={{
                                    flexDirection:"row",
                                    justifyContent:"center",
                                    height:40,
                                    backgroundColor:"#ED7225",
                                    marginBottom:5
                                }}
                              >
                                  <Text 
                                        style={{
                                            fontSize:16,
                                            fontWeight:"600",
                                            color:"white",
                                            alignSelf:"center",
                                            justifyContent:"center",
                                            alignContent:"center",
                                            marginLeft:5
                                        }}>
                                            New profile requests
                                    </Text> 
                                    <TouchableRipple
                                            style={{
                                            alignSelf:"flex-end",
                                            marginRight:25,
                                            display:"none"
                                            }}
                                        >
                                        <Image
                                            style={{
                                                height:7.5,
                                                width:12,
                                                marginBottom:7,
                                                justifyContent:"flex-end",
                                            }}
                                            resizeMode="cover"
                                            source={require("../../assets/arrow_down.png")}
                                        />
                                        </TouchableRipple>
                                </View>
                    </TouchableRipple>
                    ) : ( null
                    )}
                {Profiles === 0 ? 
                <View>
                {profiles.map((profile,i)=>{
                    return(
               <View
                    style={{
                        height:80,
                        backgroundColor:"#FFFFFF",
                        borderRadius:6,
                        marginTop:10,
                        marginLeft:-7,
                        elevation:6,
                        marginLeft:15,
                        marginRight:15
                    }}
                    key={i}
               >
                   <TouchableRipple
                        onPress={()=>{
                            props.navigation.navigate("My_Descision_Page",{
                                "id":profile.Id,
                                "IsApproved":profile.IsApproved
                            });
                        }}
                   >
                       <View>
                       
                   <Text
                        style={{
                            fontWeight:"700",
                            fontSize:16,
                            color:"#282A8B",
                            paddingTop:16,
                            marginLeft:17,
                            display:"none"
                        }}
                   >
                         New Request
                   </Text>

                   <Divider
                    style={{
                        height:1,
                        margin:8,
                        display:"none"
                    }}
                   />
                   <View
                        style={{
                            flexDirection:"row",
                            justifyContent:"space-between",
                            marginLeft:20,
                            marginTop:10
                        }}
                   >
                       <View
                            style={{
                                flexDirection:"row"
                            }}
                       >
                           <Image
                                style={{
                                    height:44,
                                    width:44
                                }}
                                // source={require("../../assets/task_one.png")}
                                source={{uri: Env.BASE_URL+profile.ProfileImage}}
                           />
                           <View
                                style={{
                                    marginLeft:20
                                }}
                           >
                                <View
                                        style={{
                                            flexDirection:"row",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color:"#282A8B",
                                                fontWeight:"700",
                                                fontSize:14
                                            }} 
                                        >
                                            {/* Sweety Singh */}
                                            {profile.Name}
                                            
                                        </Text>
                                        <Text
                                            style={{
                                                color:"#FFFFFF",
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
                                            Platinum
                                        </Text>
                                    </View>

                                <Text
                                    style={{
                                        color:"#000000",
                                        fontWeight:"400",
                                        fontSize:10.5,
                                        marginTop:5
                                    }} 
                                >
                                    {/* Member - 1985 (A) */}
                                    {profile.Role} - {profile.Batch} ({profile.Section})
                                </Text>
                            </View>
                       </View>
                       <TouchableRipple
                            style={{
                                justifyContent:"center",
                                marginRight:20
                            }}
                       >
                            <Image
                                        style={{
                                            height:12,
                                            width:7,
                                            justifyContent:"center"
                                        }}
                                        source={require("../../assets/black_seemore.png")}
                                />
                       </TouchableRipple>
                   </View>
                   </View>
                   </TouchableRipple>
               </View>
               );
            })}
       </View>
            : null
            }
            </Card>

<Card
    style={{
        paddingBottom:10
    }}
>

{school == 0 ? (
                        <TouchableRipple
                        style={{
                            backgroundColor:"#FFFFFF",
                            height:33,
                            marginTop:20,
                            borderRadius:4,
                            justifyContent:"center",
                            marginLeft:15,
                            marginRight:20
                                }}
                          >
                              <View
                                style={{
                                    flexDirection:"row",
                                    justifyContent:"center",
                                    height:40,
                                    backgroundColor:"#ED7225"
                                }}
                              >
                                  <Text 
                                        style={{
                                            fontSize:16,
                                            fontWeight:"600",
                                            color:"white",
                                            alignSelf:"center",
                                            justifyContent:"center",
                                            alignContent:"center",
                                            marginLeft:0
                                        }}>
                                            New event requests
                                    </Text> 
                                    <TouchableRipple
                                            style={{
                                            alignSelf:"flex-end",
                                            marginRight:25,
                                            display:"none"
                                            }}
                                        >
                                        <Image
                                            style={{
                                                height:7.5,
                                                width:12,
                                                marginBottom:7,
                                                justifyContent:"flex-end",
                                            }}
                                            resizeMode="cover"
                                            source={require("../../assets/arrow_down.png")}
                                        />
                                        </TouchableRipple>
                                </View>
                    </TouchableRipple>
                    ) : null
                    }

            {/* {Events != null ?
                <View>
                    <Text
                        style={{
                            marginLeft:20
                        }}
                    >
                        Events
                    </Text> */}
                    {school === 0 ? 
                    <View>
            {Events.map((mes,i)=>{
                    return(
               <View
                    style={{
                        height:80,
                        backgroundColor:"#FFFFFF",
                        borderRadius:6,
                        marginTop:16,
                        marginLeft:-7,
                        elevation:6,
                        marginLeft:20,
                        marginRight:20
                    }}
                    key={i}
               >
                   <TouchableRipple
                            onPress={()=>{
                                // alert(mes.MessageId);
                                props.navigation.navigate("My_Event_Action",{
                                    "id":mes.EventId,
                                    "dec":mes.EventType,
                                    "sub":mes.Subject,
                                    "text":mes.EventText,
                                    "image":mes.ImageURL,
                                    "section":mes.BroadcastTo,
                                    "url":mes.EventDetailsUrl,
                                    "date":mes.EventDate,
                                    "IsApproved":mes.IsApproved,
                                    "venue":mes.Location,
                                    "Status":mes.Status
                                })
                            }}
                        >
                    <View>
                   <Text
                        style={{
                            fontWeight:"700",
                            fontSize:16,
                            color:"#282A8B",
                            paddingTop:16,
                            marginLeft:17,
                            display:"none"
                        }}
                   >
                         Event Content Approval
                   </Text>

                   <Divider
                    style={{
                        height:1,
                        margin:8,
                        display:"none"
                    }}
                   />
                   <View
                        style={{
                            flexDirection:"row",
                            justifyContent:"space-between",
                            marginLeft:20,
                            marginTop:10
                        }}
                   >
                       <View
                            style={{
                                flexDirection:"row"
                            }}
                       >
                           <Image
                                style={{
                                    height:44,
                                    width:44
                                }}
                                // source={require("../../assets/task_one.png")}
                                source={{uri: Env.BASE_URL+mes.UserProfileImage}}
                                />
                           <View
                                style={{
                                    marginLeft:20
                                }}
                           >
                                <View
                                        style={{
                                            flexDirection:"row",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color:"#282A8B",
                                                fontWeight:"700",
                                                fontSize:14
                                            }} 
                                        >
                                            {/* Sweety Singh */}
                                            {mes.UserName}
                                        </Text>
                                        <Text
                                            style={{
                                                color:"#FFFFFF",
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
                                        marginTop:5
                                    }} 
                                >
                                    {mes.UserRole} - {mes.Batch} ({mes.Section})
                                </Text>
                            </View>
                       </View>
                       <TouchableRipple
                            style={{
                                justifyContent:"center",
                                marginRight:20
                            }}
                       >
                            <Image
                                        style={{
                                            height:12,
                                            width:7,
                                            justifyContent:"center"
                                        }}
                                        source={require("../../assets/black_seemore.png")}
                                />
                       </TouchableRipple>
                   </View>
                   </View>
                   </TouchableRipple>
               </View>
               );
            })}
            </View>
            : null }
            </Card>

            {/* </View> 
            :
            <Text
                style={{
                    alignSelf:"center"
                }}
            >
                No Events
            </Text>   
        } */}
        <Card
    style={{
        paddingBottom:10
    }}
>
        {Message === 0 ? (
                        <TouchableRipple
                        style={{
                            backgroundColor:"#FFFFFF",
                            height:33,
                            marginTop:20,
                            marginLeft:15,
                            marginRight:20,
                            borderRadius:4,
                            justifyContent:"center",
                                }}
                          >
                              <View
                                style={{
                                    flexDirection:"row",
                                    justifyContent:"center",
                                    height:40,
                                    backgroundColor:"#ED7225"
                                }}
                              >
                                  <Text 
                                        style={{
                                            fontSize:16,
                                            fontWeight:"600",
                                            color:"white",
                                            alignSelf:"center",
                                            justifyContent:"center",
                                            alignContent:"center",
                                            marginLeft:0
                                        }}>
                                            New message requests
                                    </Text> 
                                    <TouchableRipple
                                            style={{
                                            alignSelf:"flex-end",
                                            marginRight:25,
                                            display:"none"
                                            }}
                                        >
                                        <Image
                                            style={{
                                                height:7.5,
                                                width:12,
                                                marginBottom:7,
                                                justifyContent:"flex-end",
                                            }}
                                            resizeMode="cover"
                                            source={require("../../assets/arrow_down.png")}
                                        />
                                        </TouchableRipple>
                                </View>
                    </TouchableRipple>
                    ) : (
                        null
                    )
                    }
        {Message === 0 ? 
            <View>
                {messages.map((mes,i)=>{
                    return(
               <View
                    style={{
                        height:80,
                        backgroundColor:"#FFFFFF",
                        borderRadius:6,
                        marginTop:16,
                        marginLeft:-7,
                        elevation:6,
                        marginLeft:15,
                        marginRight:15
                    }}
                    key={i}
               >
                   <TouchableRipple
                            onPress={()=>{
                                // alert(mes.MessageId);
                                props.navigation.navigate("My_Message_Action",{
                                    "id":mes.MessageId,
                                    "dec":mes.MessageText,
                                    "image":mes.ImageURL,
                                    "section":mes.BroadcastTo,
                                    "url":mes.MessageDetailsUrl,
                                    "IsApproved":mes.IsApproved,
                                    "Status":mes.Status
                                })
                            }}
                        >
                    <View>
                   <Text
                        style={{
                            fontWeight:"700",
                            fontSize:16,
                            color:"#282A8B",
                            paddingTop:16,
                            marginLeft:17,
                            display:"none"
                        }}
                   >
                         Message Content Approval
                   </Text>

                   <Divider
                    style={{
                        height:1,
                        margin:8,
                        display:'none'
                    }}
                   />
                   <View
                        style={{
                            flexDirection:"row",
                            justifyContent:"space-between",
                            marginLeft:20,
                            marginTop:10
                        }}
                   >
                       <View
                            style={{
                                flexDirection:"row"
                            }}
                       >
                           <Image
                                style={{
                                    height:44,
                                    width:44
                                }}
                                // source={require("../../assets/task_one.png")}
                                source={{uri: Env.BASE_URL+mes.UserProfileImage}}
                                />
                           <View
                                style={{
                                    marginLeft:20
                                }}
                           >
                                <View
                                        style={{
                                            flexDirection:"row",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color:"#282A8B",
                                                fontWeight:"700",
                                                fontSize:14
                                            }} 
                                        >
                                            {/* Sweety Singh */}
                                            {mes.UserName}
                                        </Text>
                                        <Text
                                            style={{
                                                color:"#FFFFFF",
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
                                        marginTop:5
                                    }} 
                                >
                                    {mes.UserRole} - {mes.UserBatch} ({mes.UserSection})
                                </Text>
                            </View>
                       </View>
                       <TouchableRipple
                            style={{
                                justifyContent:"center",
                                marginRight:20
                            }}
                       >
                            <Image
                                        style={{
                                            height:12,
                                            width:7,
                                            justifyContent:"center"
                                        }}
                                        source={require("../../assets/black_seemore.png")}
                                />
                       </TouchableRipple>
                   </View>
                   </View>
                   </TouchableRipple>
               </View>
               );
            })}
            </View>
            : null
    }
    </Card>
            </ScrollView>
            </View>
}
        </ScrollView>
    )
}

export default My_Tasks;