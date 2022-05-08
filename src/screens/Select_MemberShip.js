import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    ImageBackground,
    BackHandler
} from "react-native";
import {
    TextInput,
    Button,
    TouchableRipple,
    IconButton,
    Card,
    Divider
} from "react-native-paper";
import { color } from "react-native-reanimated";
import axios from "axios";
import Env from "../auth/Env";

const Select_MemberShip = (props) => {

    const userId = props.route.params.userId;

    const [visisble, setVisible] = useState(true);

    useEffect(()=>{
        const back = BackHandler.addEventListener('hardwareBackPress', ()=>true)
        return () => back.remove()
    }, [])

    const Upload_Class_Details = async () => {
        setVisible(false);

        const ClassDetails = {
            
                  UserId: userId,
                  RoleId: null,
                  StatusId: 6,
                  StatusText: null,
                  ApprovedStatus: null,
                  ApprovedStatusText: null,
                  UserSubscriptions: {
                    UserSubscriptionId: "",
                    UserId: userId,
                    SubscriptionId: 1,
                    FromDate: null,
                    ToDate: null,
                    CreatedBy: userId,
                    CreatedOn: null,
                    IsActive: true,
                    ModifiedBy: null,
                    ModifiedOn: null
                  }
        }

        var config = {
            method: "post",
            url: `${Env.BASE_URL}//api/user/profile`,
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(ClassDetails),
            };
             
            const response =  await axios(config);

            if(response.data.Message==="Record has been saved successfully"){
                // props.navigation.navigate("Select_MemberShip",{
                //                 "userId":userId,
                //             });
                // alert("Wait for the approve of ur profile.!");
                setVisible(true);

                props.navigation.navigate("Profile_pending");

            } else {
                alert(response.data.Message);
                setVisible(true);

            }
      }

    return (
        <ScrollView 
            style={{
                backgroundColor:"#F9FBFF",
                paddingTop:20,
            }}
        >
            <View style={{
                margin:20,
                backgroundColor:"#F9FBFF",                
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
                        marginTop:20,
                        marginBottom:20
                    }}
                >
                    Select Membership
                </Text>

                {/**
                * Free MemberShip
                */}
                <Card
                    style={{
                        backgroundColor:"#282A8B",
                        width:"100%",
                        height:234,
                        borderRadius:10,
                        marginTop:80,
                    }}
                >
                    <TouchableRipple
                        // onPress={()=>alert("Pressed")}
                    >
                     <View
                        style={{
                            top:-40,
                            marginTop:0
                        }}
                    >
                        <ImageBackground
                            style={{
                                // height:80,
                                // width:80,
                                // alignSelf:"center",
                                // marginBottom:10,
                                // borderRadius:100,
                                }}
                            // resizeMode="contain"
                            // source={{uri:`${Env.BASE_URL}/DefaultImages/default_profile.jfif`}}
                        >
                            <Image
                             style={{
                                height:80,
                                width:80,
                                alignSelf:"center",
                                marginBottom:10,
                                borderRadius:80/2,
                                }}
                            resizeMode="contain"
                            source={{uri:`${Env.BASE_URL}/DefaultImages/default_profile.jfif`}}
                            />
                         <View
                            style={{
                                backgroundColor:"#ED7225",
                                        width:65,
                                        top:-58,
                                        height:19,
                                        justifyContent:"center",
                                        alignSelf:"flex-end",
                                        marginRight:80,
                                        borderRadius:4,padding:2
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
                                        {/* Silver */}
                                        Freemium
                                </Text>
                         </View>
                         
                    </ImageBackground>
                        
                 <View>
                    
                        <Text 
                            style={{
                                fontSize:22,
                                alignSelf:"center",
                                color:"white",
                                fontWeight:"700"
                            }}
                        >
                            Freemium
                        </Text>
                    </View>

                    <View
                            style={{
                                flexDirection:"row",
                                justifyContent:"space-around",
                                marginTop:20,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize:16,
                                    fontWeight:"400",
                                    color:"white",
                                    
                                }}
                            >
                                Access to Portal
                            </Text>
                            <Image
                            style={{
                                height:14,
                                width:18,
                                borderRadius:100,
                                marginRight:-5
                                }}
                            resizeMode="cover"
                            source={require("../../assets/white_tick.png")}
                        />
                        </View>

                        <View
                            style={{
                                flexDirection:"row",
                                width:"100%",
                                marginTop:16,
                                justifyContent:"space-around"
                            }}
                        >
                            <Text
                                style={{
                                    fontSize:16,
                                    fontWeight:"400",
                                    color:"white",
                                    marginLeft:5
                                }}
                            >
                                Discounts in Events
                            </Text>
                            <Image
                            style={{
                                height:14,
                                width:14,                                
                                }}
                            resizeMode="cover"
                            source={require("../../assets/white_x.png")}
                        />
                        </View>

                        <View
                            style={{
                                flexDirection:"row",
                                justifyContent:"space-around",
                                marginTop:16,
                                marginLeft:-8
                            }}
                        >
                            <Text
                                style={{
                                    fontSize:16,
                                    fontWeight:"400",
                                    color:"white",
                                }}
                            >
                                Other Benifits
                            </Text>
                            <Image
                            style={{
                                height:14,
                                width:14,
                                marginRight:-15
                                }}
                            resizeMode="cover"
                            source={require("../../assets/white_x.png")}
                        />
                        </View>
                    </View>
                    </TouchableRipple>
                </Card>
               
               {/**
                * Rs. 500/Year MemberShip
                */}
                <Card
                    style={{
                        backgroundColor:"#D8D8D84D",
                        width:"100%",
                        height:293,
                        borderRadius:10,
                        marginTop:80,
                        display:"none"
                    }}
                >
                    <View
                        style={{
                            top:-40,
                            marginTop:0
                        }}
                    >
                        <ImageBackground
                            style={{
                                height:80,
                                width:80,
                                alignSelf:"center",
                                marginBottom:10,
                                borderRadius:100,
                                }}
                            resizeMode="contain"
                            source={require("../../assets/profile_pic.png")}
                        >
                         <View
                            style={{
                                backgroundColor:"#ED7225",
                                        width:58,
                                        top:30,
                                        height:19,
                                        justifyContent:"center",
                                        alignSelf:"flex-end",
                                        marginRight:-45,
                                        borderRadius:4
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
                                        Gold
                                </Text>
                         </View>
                         
                    </ImageBackground>
                        
                    <View>

                        <Text 
                            style={{
                                fontSize:20,
                                alignSelf:"center",
                                color:"#ED7225",
                                fontWeight:"700"
                            }}
                        >
                            ₹ 500/ Year
                        </Text>

                    </View>
                    <View
                            style={{
                                flexDirection:"row",
                                justifyContent:"space-around",
                                marginTop:20,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize:16,
                                    fontWeight:"400",
                                    color:"#282A8B",
                                    
                                }}
                            >
                                Access to Portal
                            </Text>
                            <Image
                            style={{
                                height:14,
                                width:18,
                                borderRadius:100,
                                marginRight:-5
                                }}
                            resizeMode="cover"
                            source={require("../../assets/blue_tick.png")}
                        />
                        </View>

                        <View
                            style={{
                                flexDirection:"row",
                                width:"100%",
                                marginTop:16,
                                justifyContent:"space-around"
                            }}
                        >
                            <Text
                                style={{
                                    fontSize:16,
                                    fontWeight:"400",
                                    color:"#282A8B",
                                    marginLeft:5
                                }}
                            >
                                Discounts in Events
                            </Text>
                            <Image
                            style={{
                                height:14,
                                width:14,                                
                                }}
                            resizeMode="cover"
                            source={require("../../assets/blue_x.png")}
                        />
                        </View>

                        <View
                            style={{
                                flexDirection:"row",
                                justifyContent:"space-around",
                                marginTop:16,
                                marginLeft:-8
                            }}
                        >
                            <Text
                                style={{
                                    fontSize:16,
                                    fontWeight:"400",
                                    color:"#282A8B",
                                }}
                            >
                                Other Benifits
                            </Text>
                            <Image
                            style={{
                                height:14,
                                width:14,
                                marginRight:-15
                                }}
                            resizeMode="cover"
                            source={require("../../assets/blue_x.png")}
                        />
                        </View>
                        <Divider
                         style={{
                             height:1,
                             backgroundColor:"#D8D8D8",
                             marginTop:20
                         }}
                        />
                        <Text
                            style={{
                                alignSelf:"center",
                                fontSize:16,
                                fontWeight:"400",
                                marginTop:12,
                                marginLeft:20,
                                marginRight:20,
                                justifyContent:"center",
                                color:"#282A8B"

                            }}
                        >
                           For more details, Please contact
                        </Text>
                        <Text
                            style={{
                                alignSelf:"center",
                                fontSize:16,
                                fontWeight:"400",
                                marginTop:5,
                                marginLeft:20,
                                marginRight:20,
                                justifyContent:"center",
                                color:"#282A8B"
                            }}
                        >
                           +91 6303411794
                        </Text>
                    </View>
                </Card>
               
                {/**
                * Rs. 5000/Year MemberShip
                */}

                <Card
                    style={{
                        backgroundColor:"#D8D8D84D",
                        width:"100%",
                        height:293,
                        borderRadius:10,
                        marginTop:80,
                        display:"none"
                    }}
                >
                    <View
                        style={{
                            top:-40,
                            marginTop:0
                        }}
                    >
                        <ImageBackground
                            style={{
                                height:80,
                                width:80,
                                alignSelf:"center",
                                marginBottom:10,
                                borderRadius:100,
                                }}
                            resizeMode="contain"
                            source={require("../../assets/profile_pic.png")}
                        >
                         <View
                            style={{
                                backgroundColor:"#ED7225",
                                        width:58,
                                        top:30,
                                        height:19,
                                        justifyContent:"center",
                                        alignSelf:"flex-end",
                                        marginRight:-45,
                                        borderRadius:4
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
                                        Platinum
                                </Text>
                         </View>
                         
                    </ImageBackground>
                    <View>
                        <Text 
                            style={{
                                fontSize:22,
                                alignSelf:"center",
                                color:"#ED7225",
                                fontWeight:"700"
                            }}
                        >
                            ₹ 5000/ Lifetime
                        </Text>

                    </View>
                    <View
                            style={{
                                flexDirection:"row",
                                justifyContent:"space-around",
                                marginTop:20,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize:16,
                                    fontWeight:"400",
                                    color:"#282A8B",
                                    
                                }}
                            >
                                Access to Portal
                            </Text>
                            <Image
                            style={{
                                height:14,
                                width:18,
                                borderRadius:100,
                                marginRight:-5
                                }}
                            resizeMode="cover"
                            source={require("../../assets/blue_tick.png")}
                        />
                        </View>

                        <View
                            style={{
                                flexDirection:"row",
                                width:"100%",
                                marginTop:16,
                                justifyContent:"space-around"
                            }}
                        >
                            <Text
                                style={{
                                    fontSize:16,
                                    fontWeight:"400",
                                    color:"#282A8B",
                                    marginLeft:5
                                }}
                            >
                                Discounts in Events
                            </Text>
                            <Image
                            style={{
                                height:14,
                                width:14,                                
                                }}
                            resizeMode="cover"
                            source={require("../../assets/blue_x.png")}
                        />
                        </View>

                        <View
                            style={{
                                flexDirection:"row",
                                justifyContent:"space-around",
                                marginTop:16,
                                marginLeft:-8
                            }}
                        >
                            <Text
                                style={{
                                    fontSize:16,
                                    fontWeight:"400",
                                    color:"#282A8B",
                                }}
                            >
                                Other Benifits
                            </Text>
                            <Image
                            style={{
                                height:14,
                                width:14,
                                marginRight:-15
                                }}
                            resizeMode="cover"
                            source={require("../../assets/blue_x.png")}
                        />
                        </View>
                        <Divider
                         style={{
                             height:1,
                             backgroundColor:"#D8D8D8",
                             marginTop:20
                         }}
                        />
                        <Text
                            style={{
                                alignSelf:"center",
                                fontSize:16,
                                fontWeight:"400",
                                marginTop:12,
                                marginLeft:20,
                                marginRight:20,
                                justifyContent:"center",
                                color:"#282A8B"

                            }}
                        >
                           For more details, Please contact
                        </Text>
                        <Text
                            style={{
                                alignSelf:"center",
                                fontSize:16,
                                fontWeight:"400",
                                marginTop:5,
                                marginLeft:20,
                                marginRight:20,
                                justifyContent:"center",
                                color:"#282A8B"
                            }}
                        >
                           +91 6303411794
                        </Text>
                    </View>
                </Card>
               
                </View>
                <View
                    style={{
                        justifyContent:"center",
                        margin:20,
                        paddingTop:20,
                        paddingBottom:20
                    }}
                >
                <Button 
                        uppercase={false}
                        color="white"
                        onPress={()=>{
                            // props.navigation.navigate("Profile");
                            // alert("Pressed");
                            Upload_Class_Details();
                        }}
                        style={{
                            height:56,
                            width:"100%",
                            backgroundColor:"#282A8B",
                            alignSelf:"center",
                            justifyContent:"center",
                            marginBottom:20,
                            display: visisble === false ? "none" : "flex"
                        }}>
                            Continue
                    </Button>
                </View>
        </ScrollView>
    )
}

export default Select_MemberShip;