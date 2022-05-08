import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    Linking,
    ImageBackground
} from "react-native";
import {
    TextInput,
    Button,
    TouchableRipple,
    IconButton,
    Divider,
    Appbar
} from "react-native-paper";
import axios from "axios";
import Env from "../auth/Env";
import useAuth from "../auth/useAuth";
import MarqueeText from 'react-native-marquee';

export function ProfileAppBar(props) {

  const { user } = useAuth();

  const [events, setEvents] = useState([]);

  const [loader, setloader] = useState(false);

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
      } catch (error) {
        console.log(error);
      }
    };

    return (
    <Appbar.Header
        style={{
            backgroundColor:"white",
            justifyContent:"space-between"
        }}
    >
        {/* <Appbar.Header title="Hello"> */}
        <TouchableRipple
            onPress={() => {
                props.navigation.toggleDrawer();
            }}
            style={{ marginLeft: 20, marginTop:20,marginBottom:18}}
          >
                  <Image
                      style={{
                          height:12,
                          width:18,
                          justifyContent:"flex-start"
                          }}
                      resizeMode="stretch"
                      source={require("../../assets/menu.png")}
                  />
            </TouchableRipple>

            <Text
              style={{
                color:"#282A8B",
                fontWeight:"bold",
                
              }}
            >
              TSRS(Enkoor) Alumni
            </Text>
            <View style={{ flexDirection: "row" }}>
              {/* {NoOfTasks != "0" ?
              <View
                          style={{
                            width:"78%",
                            marginLeft:10
                          }}
              >
            <MarqueeText
              style={{ fontSize: 14,backgroundColor:"#ED7225",marginTop:5,
              height:30,fontWeight:"bold",
              marginRight:0,
              color:"#FFFFFF",padding:1,}}
              duration={3000}
              marqueeOnStart
              loop
              marqueeDelay={1000}
              marqueeResetDelay={1000}
              onPress={() => 
                // alert("Notification's Pressed")
                {
                  if(NoOfTasks != "0"){
                    props.navigation.navigate("notifications");
                  }
                }
              }
            >
              {NoOfTasks} New requests are waiting for you to approve or reject. Click here to proceed
            </MarqueeText>
            </View>
            : null } */}
            <View style={{ paddingLeft: 10,display:"none" }}>
             <TouchableRipple style={{marginTop:10, marginRight:15}} 
              // onPress={()=>alert("Search Pressed")}
            >
              <ImageBackground
                  style={{
                      height:19,
                      width:17,
                      marginTop:2
                      }}
                  resizeMode="stretch"
                  // source={require("../../assets/search.png")}
              />
            </TouchableRipple>
            </View>

            <View style={{ paddingRight: 10,marginLeft:10 }}>
            <TouchableRipple style={{marginTop:5, marginRight:15}}

                  onPress={() => 
                    // alert("Notification's Pressed")
                    {
                      if(NoOfTasks != "0"){
                        props.navigation.navigate("notifications");
                      }
                    }
                  }
            >
              <ImageBackground
                  style={{
                      height:20,
                      width:16,
                      }}
                    imageStyle={{ borderRadius: 5 }}
                  resizeMode="stretch"
                  source={require("../../assets/notification.png")}
              >
              <Text
                style={{
                  color:"#FFFFFF",
                  fontSize:7,
                  backgroundColor:"#ED7225",
                  borderRadius:20,
                  height:12,
                  width:14,
                  paddingLeft:1,
                  marginLeft:1,
                  justifyContent:"center",
                  alignContent:"center",
                  marginLeft:-9,
                  textAlignVertical:"center",
                  alignSelf:"center",
                  alignItems:"center",
                  alignContent:"center",
                  textAlign:"center"
                }}
              >
                {NoOfTasks}
              </Text>
              </ImageBackground>
              
            </TouchableRipple>
            </View>
          </View>
        {/* </Appbar.Header> */}
      {/* <Appbar.Content title="My awesome app" /> */}
    </Appbar.Header>
  );
}

//  props.navigation.setOptions({
        
//         headerLeft: () => {
//           return (
//             <TouchableRipple
//             onPress={() => {
//                alert("Pressed");
//             }}
//             style={{ marginLeft: 20, marginTop:20,marginBottom:18}}
//           >
//                   <Image
//                       style={{
//                           height:12,
//                           width:18,
//                           justifyContent:"flex-start"
//                           }}
//                       resizeMode="stretch"
//                       source={require("../../assets/menu.png")}
//                   />
//             </TouchableRipple>
//           );
//         },
//         headerTitle: ()=>{
//           return(
//             <View style={{
//               flexDirection:"column"
//             }}>
//             </View>
            
//           )
//         },
//         headerRight: () => {
//           return (
//             <View style={{ flexDirection: "row" }}>
//             <View style={{ paddingLeft: 10 }}>
//             <TouchableRipple style={{marginTop:10, marginRight:15}} 
//               onPress={()=>alert("Pressed")}
//             >
//               <ImageBackground
//                   style={{
//                       height:19,
//                       width:17,
//                       marginTop:2
//                       }}
//                   resizeMode="stretch"
//                   source={require("../../assets/search.png")}
//               />
//             </TouchableRipple>
//             </View>

//             <View style={{ paddingRight: 10 }}>
//             <TouchableRipple style={{marginTop:10, marginRight:15}}
//                 //   onPress={() => props.navigation.navigate("notification")}
//             >
//               <ImageBackground
//                   style={{
//                       height:20,
//                       width:16,
//                       }}
//                     imageStyle={{ borderRadius: 5 }}
//                   resizeMode="stretch"
//                   source={require("../../assets/notification.png")}
//               />
//             </TouchableRipple>
//             </View>
//           </View>
//           );
//         },
//       },
//       );