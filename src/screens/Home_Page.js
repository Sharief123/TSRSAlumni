import React, { useEffect, useState, useRef } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    ImageBackground,
    Alert,
    AppState,
    Animated,
    Dimensions
} from "react-native";
import {
    TextInput,
    Button,
    TouchableRipple,
    IconButton,
    Card,
    Divider,
    Modal,
} from "react-native-paper";
import { color, set } from "react-native-reanimated";
import axios from "axios";
import useAuth from "../auth/useAuth";
import Env from "../auth/Env";
import Example from "./ex";
import Carousel from 'react-native-snap-carousel';
import { SliderBox } from "react-native-image-slider-box";


const Home_Page = (props) => {
    const appState = useRef(AppState.currentState);
    const [events, setEvents] = useState([]);
    const [homeBanners, setHomeBanners] = useState([]);

    const [no, setno] = useState([]);

    const { width } = Dimensions.get("window");

    const [isModalVisible, setModalVisible] = useState(false);

    const NoOfTasks = no.ProfileCount+no.MessageCount+no.EventCount;

    const [loader, setloader] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
      };

    const { user } = useAuth();
    
    // console.log("Name:::>",events.EventText);
    useEffect(() => {
        const subscription = AppState.addEventListener("change", nextAppState => {
          appState.current = nextAppState;
        });
        console.log(subscription);
        if(user){
            getEvents();
        } 
        // return () => {
        //   subscription.remove();
        // };
      }, []);
      
      useEffect(() => {
        const unsubscribe = props.navigation.addListener("focus", () => {
            getEvents(user);
          console.log("agian");
        });
    
        return unsubscribe;
      }, [props]);

    //   const arrImages = [];
      const [image, setImages] = useState([]);
      const [homeMessage,homePage_Message]=useState("");
      const [homeAuthor,homePage_Author]=useState("");


      console.log("Imagesss--->",image);
    const getEvents = async () => {
        try {
          setloader(true);
          var config = {
            method: "get",
            url: `${Env.BASE_URL}/api/master/user/${user}/messagesonhome`,
          };
    
          var userD = {
            method: "get",
            url: `${Env.BASE_URL}/api/master/user/${user}/mysmalldetails`,
          };

          var image = {
              method: "get",
              url: `${Env.BASE_URL}/api/master/HomePageCarousel`,
          };
          const responer_image = await axios(image);

          console.log(1);
          console.log(1);
          var arrImages=[];
          responer_image.data.Data.HomePageCarousel.map((item,i)=>{
              console.log(i+ ":"+item.ImagePath);
              arrImages.push(Env.BASE_URL+item.ImagePath);
          })
          setImages(arrImages);
        //   for(i=0;i<responer_image.data.Data.length;i++)
        //   {
            
        //   }
          console.log(2);

          setHomeBanners(responer_image.data.Data.HomePageCarousel);
          homePage_Message(responer_image.data.Data.homePageMessage);
          homePage_Author(responer_image.data.Data.homePageMessageAuthor);

          const response_uerD = await axios(userD);

          console.log(response_uerD.data.Data.Role);

          if(response_uerD.data.Data.Role != "Member"){
          var config1 = {
            method: "get",
            url: `${Env.BASE_URL}/api/master/user/${user}/data/approve`,
          };
          const response1 = await axios(config1);
          setno(response1.data.Data);
        } 
        //   console.log(config);

          const response = await axios(config);

          setEvents(response.data.Data);

          setloader(false);
        } catch (error) {
          // console.log(error);
        }
      };

     const  _renderItem = ({item, index}) => {
        return (
            <View style={{paddingBottom:0,width:"100%"}}>
                <ImageBackground
                    style={{
                        height:219,
                    }}
                    // source={require("../../assets/friend_ship.png")}
                    source={{uri: Env.BASE_URL+item.ImagePath}}

                />
                <View
                    style={{
                        height:115,
                        paddingBottom:10,marginTop:5
                    }}
                >
                    <Text
                        style={{
                            fontSize:14,
                            fontWeight:"bold",
                            fontStyle:"italic"
                        }}
                    >
                         “ {item.DisplayText} ”
                         {"\n"}
                    </Text>
                    <Text
                        style={{
                            fontWeight:"bold",
                            fontStyle:"italic",
                            fontSize:14,
                            color:"#000000"
                        }}
                    >
                        – {item.Author}
                    </Text>
                </View>
                {/* <Text style={{}}></Text> */}
            </View>
        );
    }

   const  scrollX = new Animated.Value(0);

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
            // NoOfTasks > 0 && appState.current === "active" ?
            // Alert.alert(
            //     "",
            //     NoOfTasks+" New requests are waiting for you to approve or reject",
            //     [
            //       {
            //         text: "Cancel",
            //         onPress: () => appState.current = "unknown",
            //         style: "cancel"
            //       },
            //       { text: "OK", 
            //       onPress: () => 
            //       {
            //           props.navigation.navigate("notifications");
            //           appState.current = "unknown";
            //       }
            //     //   console.log("OK Pressed") 
            //     }
            //     ]
            //   )
            // <View>

            //   <Modal
            //      visible={true}
            //      style={{
            //          height:200
            //      }}
            //   >
            //       <View
            //         style={{
            //             height:200
            //         }}
            //       >
            //           <Text>
            //              ${NoOfTasks} New requests are waiting for you to approve or reject
            //           </Text>

            //           <View
            //             style={{
            //                 backgroundColor:"red"
            //             }}
            //           >
            //               <Button
            //                 onPress={()=>{
            //                     appState.current = "unknown";
            //                 }}
            //                 color="white"
            //               >
            //                   Cancel
            //               </Button>
            //               <Button>
            //                   Ok
            //               </Button>
            //           </View>
            //       </View>
            //   </Modal>
            //   </View>
            //   : null,
            <View>
            {/* {NoOfTasks > 0 ?  */}
            
                {/* : */}
                {/* { NoOfTasks > 0 && appState.current === "active" ?
                <Modal
                 visible={true}
                 style={{
                     height:200
                 }}
              >
                  <View
                    style={{
                        height:200
                    }}
                  >
                      <Text>
                         ${NoOfTasks} New requests are waiting for you to approve or reject
                      </Text>

                      <View>
                          <Button
                          style={{
                              backgroundColor:"red"
                          }}
                          onPress={()=>{
                            appState.current = "unknown";
                        }}
                          >
                              Cancel
                          </Button>
                          <Button>
                              Ok
                          </Button>
                      </View>
                  </View>
              </Modal>
              : null
} */}
            <View style={{
                margin:10,
                backgroundColor:"#F9FBFF",                
            }}>

            {/* <View style={{ marginTop: 0,height:200,}}> */}
                       {/* <Example photos={homeBanners} /> */}
                       <SliderBox
                        images={image}
                        sliderBoxHeight={219}
                        parentWidth={width-20}
                        // onCurrentImagePressed={index =>
                        //     console.warn(`image ${index} pressed`)
                        // }
                        // parentWidth={this.state.width}
                    />

             {/* </View> */}
      
             {/* <Carousel
                //   ref={ref => carousel = ref}
              data={homeBanners}
              renderItem={_renderItem}
              sliderWidth={100}
              itemWidth={100}
              layout={"default"}
               //   sliderWidth={sliderWidth}
            //   itemWidth={itemWidth}
            /> */}
            {/* <Animated.ScrollView
                horizontal={true}
                style={{
                    width:345
                }}
                onScroll={Animated.event(
                    // Animated.event returns a function that takes an array where the first element...
                    [
                      {
                        nativeEvent: {
                          contentOffset: { x: scrollX },
                        },
                      },
                    ],
                    { useNativeDriver: true } // ... is an object that maps any nativeEvent prop to a variable
                  )}
            >
                {homeBanners.map((item,index)=>{
                    return (
                        <View 
                            key={index}
                            style={{paddingBottom:0,width:345}}>
                            <ImageBackground
                                style={{
                                    height:219,
                                    width:"100%"
                                }}
                                // source={require("../../assets/friend_ship.png")}
                                source={{uri: Env.BASE_URL+item.ImagePath}}
            
                            />
                            <View
                                style={{
                                    height:115,
                                    paddingBottom:10,marginTop:5
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize:14,
                                        fontWeight:"bold",
                                        fontStyle:"italic"
                                    }}
                                >
                                     “ {item.DisplayText} ”
                                     {"\n"}
                                </Text>
                                <Text
                                    style={{
                                        fontWeight:"bold",
                                        fontStyle:"italic",
                                        fontSize:14,
                                        color:"#000000"
                                    }}
                                >
                                    – {item.Author}
                                </Text>
                            </View>
                            {/* <Text style={{}}></Text> 
                        </View>
                    );
                })}
                
            </Animated.ScrollView> */}

             
                <View
                    style={{
                        height:95,
                        padding:10
                    }}
                >
                    <Text
                        style={{
                            fontSize:14,
                            fontWeight:"bold",
                            fontStyle:"italic"
                        }}
                    >
                         “ {homeMessage} ”
                         {"\n"}
                    </Text>
                    <Text
                        style={{
                            fontWeight:"bold",
                            fontSize:14,
                            color:"#000000",
                            fontStyle:"italic"
                        }}
                    >
                        – {homeAuthor}
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
                                            // marginTop:16
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
                                            paddingLeft:16
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
                                                onPress={()=>{
                                                    props.navigation.navigate("F_P",{
                                                        "id":mes.UserId,
                                                    })
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
                                    <Divider
                                        style={{
                                            height:1,
                                            backgroundColor:"#D8D8D8",
                                            marginTop:20
                                        }}
                                    />
                         </View>
                            //  <View
                            //     key={i}
                            //     style={{
                            //         height:252,
                            //         marginTop:15,
                            //         borderRadius:4,
                            //         borderWidth:1,
                            //         borderColor:"white"
                            //     }}
                            //  >
                            //      <View
                            //             style={{
                            //                 height:68,
                            //                 backgroundColor:"white",
                            //                 flexDirection:"row",
                            //             }}
                            //         >
                            //             <ImageBackground
                            //                 style={{
                            //                     height:44,
                            //                     width:44,
                            //                     marginLeft:16,
                            //                     marginTop:16
                            //                 }}
                            //                 // source={require("../../assets/profile_pic.png")}
                            //                 source={{uri: Env.BASE_URL+mes.UserProfileImage}}
                            //             >
                            //             </ImageBackground>
                            //             <View
                            //                 style={{
                            //                     marginTop:16,
                            //                     marginLeft:16
                            //                 }}
                            //             >
                            //                 <View
                            //                     style={{
                            //                         flexDirection:"row",
                            //                     }}
                            //                 >
                            //                     <Text
                            //                         style={{
                            //                             color:"#282A8B",
                            //                             fontWeight:"700",
                            //                             fontSize:14
                            //                         }} 
                            //                     >
                            //                         {mes.UserName}
                            //                     </Text>
                            //                     <Text
                            //                         style={{
                            //                             color:"#282A8B",
                            //                             fontWeight:"700",
                            //                             fontSize:10,
                            //                             marginLeft:10,
                            //                             backgroundColor:"#ED7225",
                            //                             height:17,
                            //                             padding:2,
                            //                             width:63,
                            //                             textAlign:"center",
                            //                             borderRadius:3
                            //                         }} 
                            //                     >
                            //                         {mes.UserSubscriptionType}
                            //                     </Text>
                            //                 </View>
                            //                     <Text
                            //                         style={{
                            //                             color:"#000000",
                            //                             fontWeight:"400",
                            //                             fontSize:10.5,
                            //                             marginTop:5
                            //                         }} 
                            //                     >
                            //                         {mes.UserRole} - {mes.UserBatch} ({mes.UserSection})
                            //                     </Text>
                            //                 </View>
                            //             </View>
                            //             {mes.ImageURL != null ? 
                            //             <ImageBackground
                            //                     style={{
                            //                         height:184
                            //                     }}
                            //                     // source={require("../../assets/event_one.png")}
                            //                     source={{uri: Env.BASE_URL+mes.ImageURL}}
                            //             ></ImageBackground>
                            //             : null }

                            //             <Text
                            //                 style={{
                            //                     fontSize:16,
                            //                     fontWeight:"600",
                            //                     padding:10,
                            //                     marginLeft:20
                            //                 }}
                            //             >
                            //                 {mes.MessageText}
                            //             </Text>
                            //             {/* <ImageBackground
                            //                     style={{
                            //                         height:184
                            //                     }}
                            //                     // source={require("../../assets/event_one.png")}
                            //                     source={{uri: Env.BASE_URL+mes.ImageURL}}
                            //             /> */}
                            //  </View>
                                 )
                            })}
                 </ScrollView>
            
         { NoOfTasks > 0 && appState.current === "active" ?
                <Modal
                 visible={true}
                 style={{
                     height:130,
                     backgroundColor:"#FF9248",
                     marginLeft:10,
                     marginRight:10,
                     marginTop:150,
                     borderRadius:6,
                     zIndex:100
                    //  flex:1
                 }}
              >
                  <View
                    style={{
                        margin:0,
                        // justifyContent:"center"
                    }}
                  >
                      <Text
                        style={{
                            color:"white",
                            padding:10,
                            lineHeight:18
                        }}
                      >
                         {NoOfTasks} New requests are waiting for you to approve or reject, click ok to proceed
                      </Text>

                      <View
                        style={{
                            flexDirection:"row",
                            justifyContent:"flex-end",
                            marginRight:15,
                            marginTop:15
                        }}
                      >
                          <Button
                          style={{
                              width:"30%",
                              backgroundColor:"#282A8B",
                              marginRight:5
                          }}
                          color="#FFFFFF"
                          uppercase={false}
                          onPress={()=>{
                            appState.current = "unknown";
                            toggleModal();
                        }}
                          >
                              Cancel
                          </Button>
                          <Button
                            onPress={()=>{
                                props.navigation.navigate("notifications");
                                appState.current = "unknown";
                                toggleModal();
                            }}
                            uppercase={false}
                            style={{
                                width:"30%",
                                color:"white",
                                backgroundColor:"#282A8B"
                            }}
                            color="#FFFFFF"
                          >
                              Ok
                          </Button>
                      </View>
                  </View>
              </Modal>
              : null
} 
            </View>
            </View>
            
}
        </ScrollView>
    )
}

export default Home_Page;