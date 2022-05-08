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

const Profile = (props) => {

    const { user } = useAuth();
    const [school, SetSchool] = useState(0);
    const [social, SetSocial] = useState(0);

    const [personal, SetPersonal] = useState(0);
    const [professional, SetProfessional] = useState(0);
    const [family, SetFamily] = useState(0);


    const [events, setEvents] = useState([]);
    const [Professions, SetProfessions] = useState([]);
    const [Famil,SetFamil] = useState([]);
    const [Roles, SetRoles] = useState([]);

    const [image, setimage] = useState("");
    const [sub, setSub] = useState("");

    const [loading, setloader] = useState(false);
    const [States, SetStates] = useState([]);
    const [Country, SetCountry] = useState([]);


    // console.log(Famil.NumberOfChildren);
    
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
        url: `${Env.BASE_URL}/api/user/myprofile/${user}`,
      };

    //   console.log(config);

      const response = await axios(config);
    //   console.log("",response.data.Data);
      setEvents(response.data.Data);
      SetStates(response.data.Data.PersonalDetails);

    //   console.log("Class--->",response.data.Data.ClassSocialDetails.ProfileImage);
      setimage(response.data.Data.ClassSocialDetails.ProfileImage);
      SetProfessions(response.data.Data.ProfessionalDetails);
      SetRoles(response.data.Data.ChildDetails);
      SetCountry(response.data.Data.ClassSocialDetails);

      SetFamil(response.data.Data.FamilyDetails);

      setSub(response.data.Data.SubscriptionType);
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
            {loading ? 
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
                margin:20,
                backgroundColor:"#F9FBFF",                
            }}>

        <ImageBackground
                            style={{
                                height:80,
                                width:80,
                                alignSelf:"center",
                                marginBottom:10,
                                marginTop:30,
                                borderRadius:80/2
                                }}
                                imageStyle={{
                                    borderRadius:80/2
                                }}
                            resizeMode="contain"
                            // source={require("../../assets/profile_pic.png")}
                            // source={{uri: Env.BASE_URL+image}}
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
                                source={{uri: Env.BASE_URL+image}}
                            
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
                                        {sub}
                                </Text>
                               
                         </View>
                         <Text
                                        style={{
                                            color:"black",
                                            fontSize:12,
                                            fontWeight:"700",
                                            alignSelf:"flex-end",
                                            marginRight:-60,
                                            marginTop:40,
                                            display:"none"
                                        }}
                                    >
                                        Upgrade to Platinum
                                </Text>
                             </View>
                    </ImageBackground>

                    {school == 0 ? (
                        <TouchableRipple
                        style={{
                            backgroundColor:"#282A8B",
                            height:63,
                            marginTop:50,
                            borderRadius:4,
                            justifyContent:"center"
                                }}
                          onPress={() => SetSchool(1)}>
                              <View
                                style={{
                                    flexDirection:"row",
                                    justifyContent:"space-between",
                                }}
                              >
                                  <Text 
                                        style={{
                                            fontSize:16,
                                            fontWeight:"600",
                                            color:"#FFFFFF",
                                            alignSelf:"center",
                                            justifyContent:"center",
                                            alignContent:"center",
                                            marginLeft:15
                                        }}>
                                            School Details
                                    </Text> 
                                    <TouchableRipple
                                            style={{
                                            alignSelf:"flex-end",
                                            marginRight:25,
                                            }}
                                        >
                                        <Image
                                            style={{
                                                height:7.5,
                                                width:12,
                                                marginBottom:7,
                                                justifyContent:"flex-end",
                                            }}
                                            source={require("../../assets/arrow_down_white.png")}
                                        />
                                        </TouchableRipple>
                                </View>
                    </TouchableRipple>
                    ) : (
                        <TouchableRipple
                        style={{
                            backgroundColor:"#282A8B",
                            height:63,
                            marginTop:50,
                            borderRadius:4,
                            justifyContent:"center"
                                }}
                                onPress={() => SetSchool(0)}>
                              <View
                                style={{
                                    flexDirection:"row",
                                    justifyContent:"space-between",
                                }}
                              >
                                  <Text 
                                        style={{
                                            fontSize:16,
                                            fontWeight:"600",
                                            color:"#FFFFFF",
                                            alignSelf:"center",
                                            justifyContent:"center",
                                            alignContent:"center",
                                            marginLeft:15
                                        }}>
                                            School Details
                                    </Text> 
                                    <TouchableRipple
                                            style={{
                                            alignSelf:"flex-end",
                                            marginRight:25,
                                            }}
                                        >
                                        <Image
                                            style={{
                                                height:7.5,
                                                width:12,
                                                marginBottom:7,
                                                justifyContent:"flex-end",
                                            }}
                                            source={require("../../assets/arrow_up_white.png")}
                                        />
                                        </TouchableRipple>
                                </View>
                            </TouchableRipple>
                    )}

{ school == 1 ?
                    <View>

    {Country != null ? 
    <View>
            <TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:56,
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    label="Batch *"
                    mode="outlined"
                    editable={false}
                    placeholderTextColor="#000000DE"
                    value={Country.Batch}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />

<TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:56,
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16,
                        
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    editable={false}
                    label="Section *"
                    mode="outlined"
                    placeholderTextColor="#000000DE"
                    value={Country.Section}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />

<TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:56,
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    editable={false}
                    label="AdmissionNumber *"
                    mode="outlined"
                    placeholderTextColor="#000000DE"
                    value={Country.AdmissionNumber}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />
                
                    </View>
                    : null
                } 
                </View>
                                :
                                null
                }

                 <Divider
                    style={{
                        height:1,
                        backgroundColor:"#D8D8D8",
                        marginTop:20
                    }}
                />

{social == 0 ? (
                        <TouchableRipple
                        style={{
                            backgroundColor:"#282A8B",
                            height:63,
                            marginTop:20,
                            borderRadius:4,
                            justifyContent:"center",
                            display:"none"
                                }}
                          onPress={() => SetSocial(1)}>
                              <View
                                style={{
                                    flexDirection:"row",
                                    justifyContent:"space-between",
                                }}
                              >
                                  <Text 
                                        style={{
                                            fontSize:16,
                                            fontWeight:"600",
                                            color:"#FFFFFF",
                                            alignSelf:"center",
                                            justifyContent:"center",
                                            alignContent:"center",
                                            marginLeft:15
                                        }}>
                                            Social Details
                                    </Text> 
                                    <TouchableRipple
                                            style={{
                                            alignSelf:"flex-end",
                                            marginRight:25,
                                            }}
                                        >
                                        <Image
                                            style={{
                                                height:7.5,
                                                width:12,
                                                marginBottom:7,
                                                justifyContent:"flex-end",
                                            }}
                                            source={require("../../assets/arrow_down_white.png")}
                                        />
                                        </TouchableRipple>
                                </View>
                    </TouchableRipple>
                    ) : (
                        <TouchableRipple
                        style={{
                            backgroundColor:"#282A8B",
                            height:63,
                            marginTop:20,
                            borderRadius:4,
                            justifyContent:"center",
                            display:"none"
                                }}
                                onPress={() => SetSocial(0)}>
                              <View
                                style={{
                                    flexDirection:"row",
                                    justifyContent:"space-between",
                                }}
                              >
                                  <Text 
                                        style={{
                                            fontSize:16,
                                            fontWeight:"600",
                                            color:"#FFFFFF",
                                            alignSelf:"center",
                                            justifyContent:"center",
                                            alignContent:"center",
                                            marginLeft:15
                                        }}>
                                            Social Details
                                    </Text> 
                                    <TouchableRipple
                                            style={{
                                            alignSelf:"flex-end",
                                            marginRight:25,
                                            }}
                                        >
                                        <Image
                                            style={{
                                                height:7.5,
                                                width:12,
                                                marginBottom:7,
                                                justifyContent:"flex-end",
                                            }}
                                            source={require("../../assets/arrow_up_white.png")}
                                        />
                                        </TouchableRipple>
                                </View>
                            </TouchableRipple>
                    )}

{ social == 1 ?
                    <View
                        style={{
                            display:"none"
                        }}
                    >

            <TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:"auto",
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    label="Linkedin "
                    mode="outlined"
                    editable={false}
                    placeholderTextColor="#000000DE"
                    value={Country.Linkedin}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />

<TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:"auto",
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16,
                        
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    editable={false}
                    label="Instagram "
                    mode="outlined"
                    placeholderTextColor="#000000DE"
                    value={Country.Instagram}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />

<TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:"auto",
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    editable={false}
                    label="Facebook "
                    mode="outlined"
                    placeholderTextColor="#000000DE"
                    value={Country.Facebook}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />
                    </View>
                                :
                                null
                }
                <TouchableRipple
                        style={{ 
                        height:56,justifyContent:"center",
                        marginTop:50,
                        paddingLeft:20,
                        paddingRight:20,
                        display:"none"
                    }}
                    onPress={()=>{SetPersonal(1);}}
                    // onPress={()=>{
                    //     // Linking.openURL("http://www.linkedin.com");
                    //     // alert("Pressed");BN
                    //     props.navigation.navigate("EHP");
                    // }}
                >
                    <View
                        style={{
                            justifyContent:"space-between",
                            flexDirection:"row",
                        }}
                    >
                        <Text
                            style={{
                                fontSize:18,
                                fontWeight:"600",
                                color:"#282A8B"
                            }}
                        >
                             My Personal Details
                        </Text>
                        <Image
                            style={{
                                width:8,
                                height:12,
                                marginTop:7
                            }}
                            resizeMode="cover"
                            source={require("../../assets/see_more.png")}
                            />
                        </View>
                </TouchableRipple>

                <Divider
                    style={{
                        height:1,
                        backgroundColor:"#D8D8D8",
                        marginTop:20,
                        display:"none"
                    }}
                />
                {personal == 0 ? (
                        <TouchableRipple
                        style={{
                            backgroundColor:"#282A8B",
                            height:63,
                            marginTop:20,
                            borderRadius:4,
                            justifyContent:"center"
                                }}
                          onPress={() => SetPersonal(1)}>
                              <View
                                style={{
                                    flexDirection:"row",
                                    justifyContent:"space-between",
                                }}
                              >
                                  <Text 
                                        style={{
                                            fontSize:16,
                                            fontWeight:"600",
                                            color:"#FFFFFF",
                                            alignSelf:"center",
                                            justifyContent:"center",
                                            alignContent:"center",
                                            marginLeft:15
                                        }}>
                                            Personal Details
                                    </Text> 
                                    <TouchableRipple
                                            style={{
                                            alignSelf:"flex-end",
                                            marginRight:25,
                                            }}
                                        >
                                        <Image
                                            style={{
                                                height:7.5,
                                                width:12,
                                                marginBottom:7,
                                                justifyContent:"flex-end",
                                            }}
                                            source={require("../../assets/arrow_down_white.png")}
                                        />
                                        </TouchableRipple>
                                </View>
                    </TouchableRipple>
                    ) : (
                        <TouchableRipple
                        style={{
                            backgroundColor:"#282A8B",
                            height:63,
                            marginTop:20,
                            borderRadius:4,
                            justifyContent:"center"
                                }}
                                onPress={() => SetPersonal(0)}>
                              <View
                                style={{
                                    flexDirection:"row",
                                    justifyContent:"space-between",
                                }}
                              >
                                  <Text 
                                        style={{
                                            fontSize:16,
                                            fontWeight:"600",
                                            color:"#FFFFFF",
                                            alignSelf:"center",
                                            justifyContent:"center",
                                            alignContent:"center",
                                            marginLeft:15
                                        }}>
                                            Personal Details
                                    </Text> 
                                    <TouchableRipple
                                            style={{
                                            alignSelf:"flex-end",
                                            marginRight:25,
                                            }}
                                        >
                                        <Image
                                            style={{
                                                height:7.5,
                                                width:12,
                                                marginBottom:7,
                                                justifyContent:"flex-end",
                                            }}
                                            source={require("../../assets/arrow_up_white.png")}
                                        />
                                        </TouchableRipple>
                                </View>
                            </TouchableRipple>
                    )}

                {personal == 1 ? 
                    <View>
                        {States != null ?
                    <ScrollView>
                        <TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:"auto",
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    label="FirstName *"
                    mode="outlined"
                    editable={false}
                    placeholderTextColor="#000000DE"
                    value={States.FirstName}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />

<TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:"auto",
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    editable={false}
                    label="MiddleName"
                    mode="outlined"
                    placeholderTextColor="#000000DE"
                    value={States.MiddleName}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />

<TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:"auto",
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    editable={false}
                    label="LastName *"
                    mode="outlined"
                    placeholderTextColor="#000000DE"
                    value={States.LastName}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />
                 <TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:"auto",
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    label="Alternative Phone Number"
                    mode="outlined"
                    editable={false}
                    placeholderTextColor="#000000DE"
                    value={States.Phone}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />

<TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:"auto",
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    label="Email *"
                    editable={false}
                    mode="outlined"
                    placeholderTextColor="#000000DE"
                    value={States.Email}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />

<TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:"auto",
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    label="Gender *"
                    mode="outlined"
                    editable={false}
                    placeholderTextColor="#000000DE"
                    value={States.Gender}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />
                 <TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    label="Address *"
                    editable={false}
                    mode="outlined"
                    placeholderTextColor="#000000DE"
                    value={States.Address}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />

<TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:"auto",
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    editable={false}
                    label="City *"
                    mode="outlined"
                    placeholderTextColor="#000000DE"
                    value={States.City}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />

<TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:"auto",
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    label="Pincode *"
                    mode="outlined"
                    editable={false}
                    placeholderTextColor="#000000DE"
                    value={States.Pincode}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />
                    </ScrollView>
                    : null }
                    </View>
                    : null}

                <Divider
                    style={{
                        height:1,
                        backgroundColor:"#D8D8D8",
                        marginTop:20
                    }}
                />

            <TouchableRipple
                        style={{ 
                        height:56,justifyContent:"center",
                        marginTop:19,
                        paddingLeft:20,
                        paddingRight:20,
                        display:"none"
                    }}
                    // onPress={()=>alert("Professional details pressed")}
                    // onPress={()=>{setProfessional(1);}}

                    // onPress={()=>{
                    //     // Linking.openURL("http://www.linkedin.com");
                    //     props.navigation.navigate("home_page");
                    // }}
                >
                    <View
                        style={{
                            justifyContent:"space-between",
                            flexDirection:"row",
                        }}
                    >
                        <Text
                            style={{
                                fontSize:18,
                                fontWeight:"600",
                                color:"#282A8B"
                            }}
                        >
                                My Professional Details
                        </Text>
                        <Image
                            style={{
                                width:8,
                                height:12,
                                marginTop:7
                            }}
                            resizeMode="cover"
                            source={require("../../assets/see_more.png")}
                            />
                        </View>
                </TouchableRipple>

                {professional == 0 ? (
                        <TouchableRipple
                        style={{
                            backgroundColor:"#282A8B",
                            height:63,
                            marginTop:20,
                            borderRadius:4,
                            justifyContent:"center"
                                }}
                          onPress={() => SetProfessional(1)}>
                              <View
                                style={{
                                    flexDirection:"row",
                                    justifyContent:"space-between",
                                }}
                              >
                                  <Text 
                                        style={{
                                            fontSize:16,
                                            fontWeight:"600",
                                            color:"#FFFFFF",
                                            alignSelf:"center",
                                            justifyContent:"center",
                                            alignContent:"center",
                                            marginLeft:15
                                        }}>
                                            Professional Details
                                    </Text> 
                                    <TouchableRipple
                                            style={{
                                            alignSelf:"flex-end",
                                            marginRight:25,
                                            }}
                                        >
                                        <Image
                                            style={{
                                                height:7.5,
                                                width:12,
                                                marginBottom:7,
                                                justifyContent:"flex-end",
                                            }}
                                            source={require("../../assets/arrow_down_white.png")}
                                        />
                                        </TouchableRipple>
                                </View>
                    </TouchableRipple>
                    ) : (
                        <TouchableRipple
                        style={{
                            backgroundColor:"#282A8B",
                            height:63,
                            marginTop:20,
                            borderRadius:4,
                            justifyContent:"center"
                                }}
                                onPress={() => SetProfessional(0)}>
                              <View
                                style={{
                                    flexDirection:"row",
                                    justifyContent:"space-between",
                                }}
                              >
                                  <Text 
                                        style={{
                                            fontSize:16,
                                            fontWeight:"600",
                                            color:"#FFFFFF",
                                            alignSelf:"center",
                                            justifyContent:"center",
                                            alignContent:"center",
                                            marginLeft:15
                                        }}>
                                            Professional Details
                                    </Text> 
                                    <TouchableRipple
                                            style={{
                                            alignSelf:"flex-end",
                                            marginRight:25,
                                            }}
                                        >
                                        <Image
                                            style={{
                                                height:7.5,
                                                width:12,
                                                marginBottom:7,
                                                justifyContent:"flex-end",
                                            }}
                                            source={require("../../assets/arrow_up_white.png")}
                                        />
                                        </TouchableRipple>
                                </View>
                            </TouchableRipple>
                    )}

        {professional == 1 ?
            <View>
            {Professions != null ?
                <ScrollView>
                    <TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:"auto",
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    label="Category *"
                    mode="outlined"
                    editable={false}
                    placeholderTextColor="#000000DE"
                    value={events.Category}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />

<TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:"auto",
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    editable={false}
                    label="Profession *"
                    mode="outlined"
                    placeholderTextColor="#000000DE"
                    value={events.Profession}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />
                 <TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:"auto",
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    editable={false}
                    label="Role *"
                    mode="outlined"
                    placeholderTextColor="#000000DE"
                    value={events.RoleName}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />

<TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:"auto",
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    editable={false}
                    label="CompanyName"
                    mode="outlined"
                    placeholderTextColor="#000000DE"
                    value={Professions.CompanyName}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />

<TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:"auto",
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    editable={false}
                    label="BusinessEmailId"
                    mode="outlined"
                    placeholderTextColor="#000000DE"
                    value={Professions.BusinessEmailId}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />
                 <TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:"auto",
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    editable={false}
                    label="Country *"
                    mode="outlined"
                    placeholderTextColor="#000000DE"
                    value={Professions.Country}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />

<TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:"auto",
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    label="State *"
                    editable={false}
                    mode="outlined"
                    placeholderTextColor="#000000DE"
                    value={Professions.State.toString()}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />

<TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        // height:"auto",
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    label="City *"
                    editable={false}
                    mode="outlined"
                    placeholderTextColor="#000000DE"
                    value={Professions.City}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />
             </ScrollView>
             : null }
             </View>
             :
              null 
            }
             <Divider
                    style={{
                        height:1,
                        backgroundColor:"#D8D8D8",
                        marginTop:20
                    }}
                />

{family == 0 ? (
                        <TouchableRipple
                        style={{
                            backgroundColor:"#282A8B",
                            height:63,
                            marginTop:20,
                            borderRadius:4,
                            justifyContent:"center"
                                }}
                          onPress={() => SetFamily(1)}>
                              <View
                                style={{
                                    flexDirection:"row",
                                    justifyContent:"space-between",
                                }}
                              >
                                  <Text 
                                        style={{
                                            fontSize:16,
                                            fontWeight:"600",
                                            color:"#FFFFFF",
                                            alignSelf:"center",
                                            justifyContent:"center",
                                            alignContent:"center",
                                            marginLeft:15
                                        }}>
                                            Family Details
                                    </Text> 
                                    <TouchableRipple
                                            style={{
                                            alignSelf:"flex-end",
                                            marginRight:25,
                                            }}
                                        >
                                        <Image
                                            style={{
                                                height:7.5,
                                                width:12,
                                                marginBottom:7,
                                                justifyContent:"flex-end",
                                            }}
                                            source={require("../../assets/arrow_down_white.png")}
                                        />
                                        </TouchableRipple>
                                </View>
                    </TouchableRipple>
                    ) : (
                        <TouchableRipple
                        style={{
                            backgroundColor:"#282A8B",
                            height:63,
                            marginTop:20,
                            borderRadius:4,
                            justifyContent:"center"
                                }}
                                onPress={() => SetFamily(0)}>
                              <View
                                style={{
                                    flexDirection:"row",
                                    justifyContent:"space-between",
                                }}
                              >
                                  <Text 
                                        style={{
                                            fontSize:16,
                                            fontWeight:"600",
                                            color:"#FFFFFF",
                                            alignSelf:"center",
                                            justifyContent:"center",
                                            alignContent:"center",
                                            marginLeft:15
                                        }}>
                                            Family Details
                                    </Text> 
                                    <TouchableRipple
                                            style={{
                                            alignSelf:"flex-end",
                                            marginRight:25,
                                            }}
                                        >
                                        <Image
                                            style={{
                                                height:7.5,
                                                width:12,
                                                marginBottom:7,
                                                justifyContent:"flex-end",
                                            }}
                                            source={require("../../assets/arrow_up_white.png")}
                                        />
                                        </TouchableRipple>
                                </View>
                            </TouchableRipple>
                    )}

<View>
{ family == 1 & Famil != null ?
                    <View>

<TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:56,
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    label="Marital Status *"
                    editable={false}
                    mode="outlined"
                    placeholderTextColor="#000000DE"
                    value={Famil.MaritalStatus}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />

{Famil.MaritalStatus == "Married" ?
<View>
<TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:"auto",
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    editable={false}
                    label="SpouseName"
                    mode="outlined"
                    placeholderTextColor="#000000DE"
                    value={Famil.SpouseName}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />

<TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:56,
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    label="NumberOfChildren"
                    mode="outlined"
                    editable={false}
                    placeholderTextColor="#000000DE"
                    placeholder={Famil.NumberOfChildren}
                    // value={Famil.NumberOfChildren.toString()}
                    value={`${Famil.NumberOfChildren}` === `null` ? `0` : `${Famil.NumberOfChildren.toString()}`}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />
                 </View>
                 : null }

                 {Roles != null ?
                 <View>
                 {Roles.slice(0,Famil.NumberOfChildren).map((rol,i)=>{
                     return(
                        <View
                            key={i}
                        >
                            <Text
                                style={{
                                    marginTop:10,
                                    marginLeft:10,
                                    backgroundColor:"#ED7225",
                                    width:60,
                                    color:"#FFFFFF",
                                    paddingLeft:5,
                                    borderRadius:2
                                }}
                            >
                                Child {i+1}
                            </Text>
                        <TextInput
                        style={{ width: "100%",
                            borderColor:"#282A8B",
                            overflow: "visible",
                            textAlignVertical: "top",
                            justifyContent: "flex-start",
                            height:"auto",
                            backgroundColor:"#F9FBFF",
                            padding:5,
                            marginTop:16
                        }}
                        keyboardType="default"
                        numberOfLines={5}
                        outlineColor="#282A8B"
                        underlineColorAndroid="transparent"
                        multiline={true}
                        label="Name *"
                        editable={false}
                        mode="outlined"
                        placeholderTextColor="#000000DE"
                        value={rol.Name}
                        // onChangeText={(text) => {
                        // setDesc(text);
                        // }}
                     />
                     <TextInput
                           style={{ width: "100%",
                               borderColor:"#282A8B",
                               overflow: "visible",
                               textAlignVertical: "top",
                               justifyContent: "flex-start",
                               height:"auto",
                               backgroundColor:"#F9FBFF",
                               padding:5,
                               marginTop:16
                           }}
                           keyboardType="default"
                           numberOfLines={5}
                           outlineColor="#282A8B"
                           underlineColorAndroid="transparent"
                           multiline={true}
                           editable={false}
                           label="Education *"
                           mode="outlined"
                           placeholderTextColor="#000000DE"
                           value={rol.Education}
                           // onChangeText={(text) => {
                           // setDesc(text);
                           // }}
                        />
                        </View>
                     );
                 })}
                 </View>
                 : null}

                 {Famil.NumberOfChildren == 1 ? 
                 
                 <View
                    style={{
                        display:"none"
                    }}
                 >
                 <TextInput
                 style={{ width: "100%",
                     borderColor:"#282A8B",
                     overflow: "visible",
                     textAlignVertical: "top",
                     justifyContent: "flex-start",
                     height:56,
                     backgroundColor:"#F9FBFF",
                     padding:5,
                     marginTop:16
                 }}
                 keyboardType="default"
                 numberOfLines={5}
                 outlineColor="#282A8B"
                 underlineColorAndroid="transparent"
                 multiline={true}
                 label="NumberOfChildren"
                 mode="outlined"
                 placeholderTextColor="#000000DE"
                 value={Famil.NumberOfChildren}
                 // onChangeText={(text) => {
                 // setDesc(text);
                 // }}
              />
              <TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:56,
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    label="NumberOfChildren"
                    mode="outlined"
                    placeholderTextColor="#000000DE"
                    value={Famil.NumberOfChildren}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />
                 </View>
                 :null
                }

{Famil.NumberOfChildren == 2 ? 
                 
                 <View
                    style={{
                        display:"none"
                    }}
                 >
                 <TextInput
                 style={{ width: "100%",
                     borderColor:"#282A8B",
                     overflow: "visible",
                     textAlignVertical: "top",
                     justifyContent: "flex-start",
                     height:56,
                     backgroundColor:"#F9FBFF",
                     padding:5,
                     marginTop:16
                 }}
                 keyboardType="default"
                 numberOfLines={5}
                 outlineColor="#282A8B"
                 underlineColorAndroid="transparent"
                 multiline={true}
                 label="Child One Name *"
                 mode="outlined"
                 placeholderTextColor="#000000DE"
                 value={Roles.Name}
                 // onChangeText={(text) => {
                 // setDesc(text);
                 // }}
              />
              <TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:56,
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    label="Child One Education *"
                    mode="outlined"
                    placeholderTextColor="#000000DE"
                    value={Roles.Education}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />
                 <TextInput
                 style={{ width: "100%",
                     borderColor:"#282A8B",
                     overflow: "visible",
                     textAlignVertical: "top",
                     justifyContent: "flex-start",
                     height:56,
                     backgroundColor:"#F9FBFF",
                     padding:5,
                     marginTop:16
                 }}
                 keyboardType="default"
                 numberOfLines={5}
                 outlineColor="#282A8B"
                 underlineColorAndroid="transparent"
                 multiline={true}
                 label="Child Two Name *"
                 mode="outlined"
                 placeholderTextColor="#000000DE"
                 value={Roles.Name}
                 // onChangeText={(text) => {
                 // setDesc(text);
                 // }}
              />
              <TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:56,
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    label="Child Two Education *"
                    mode="outlined"
                    placeholderTextColor="#000000DE"
                    value={Roles.Education}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />
                 </View>:null
                }

{Famil.NumberOfChildren == 3 ? 
                 
                 <View
                    style={{
                        display:"none"
                    }}
                 >
                 <TextInput
                 style={{ width: "100%",
                     borderColor:"#282A8B",
                     overflow: "visible",
                     textAlignVertical: "top",
                     justifyContent: "flex-start",
                     height:56,
                     backgroundColor:"#F9FBFF",
                     padding:5,
                     marginTop:16
                 }}
                 keyboardType="default"
                 numberOfLines={5}
                 outlineColor="#282A8B"
                 underlineColorAndroid="transparent"
                 multiline={true}
                 label="NumberOfChildren"
                 mode="outlined"
                 placeholderTextColor="#000000DE"
                 value={Famil.NumberOfChildren}
                 // onChangeText={(text) => {
                 // setDesc(text);
                 // }}
              />
              <TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:56,
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    label="NumberOfChildren"
                    mode="outlined"
                    placeholderTextColor="#000000DE"
                    value={Famil.NumberOfChildren}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />
                 <TextInput
                 style={{ width: "100%",
                     borderColor:"#282A8B",
                     overflow: "visible",
                     textAlignVertical: "top",
                     justifyContent: "flex-start",
                     height:56,
                     backgroundColor:"#F9FBFF",
                     padding:5,
                     marginTop:16
                 }}
                 keyboardType="default"
                 numberOfLines={5}
                 outlineColor="#282A8B"
                 underlineColorAndroid="transparent"
                 multiline={true}
                 label="NumberOfChildren"
                 mode="outlined"
                 placeholderTextColor="#000000DE"
                 value={Famil.NumberOfChildren}
                 // onChangeText={(text) => {
                 // setDesc(text);
                 // }}
              />
              <TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:56,
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    label="NumberOfChildren"
                    mode="outlined"
                    placeholderTextColor="#000000DE"
                    value={Famil.NumberOfChildren}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />
                 <TextInput
                 style={{ width: "100%",
                     borderColor:"#282A8B",
                     overflow: "visible",
                     textAlignVertical: "top",
                     justifyContent: "flex-start",
                     height:56,
                     backgroundColor:"#F9FBFF",
                     padding:5,
                     marginTop:16
                 }}
                 keyboardType="default"
                 numberOfLines={5}
                 outlineColor="#282A8B"
                 underlineColorAndroid="transparent"
                 multiline={true}
                 label="NumberOfChildren"
                 mode="outlined"
                 placeholderTextColor="#000000DE"
                 value={Famil.NumberOfChildren}
                 // onChangeText={(text) => {
                 // setDesc(text);
                 // }}
              />
              <TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:56,
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    label="NumberOfChildren"
                    mode="outlined"
                    placeholderTextColor="#000000DE"
                    value={Famil.NumberOfChildren}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />
                 </View>:null
                }
                    </View>
                                :null

                }
                 <Divider
                    style={{
                        height:1,
                        backgroundColor:"#D8D8D8",
                        marginTop:20
                    }}
                />
                </View>
                {social == 0 ? (
                        <TouchableRipple
                        style={{
                            backgroundColor:"#282A8B",
                            height:63,
                            marginTop:20,
                            borderRadius:4,
                            justifyContent:"center"
                                }}
                          onPress={() => SetSocial(1)}>
                              <View
                                style={{
                                    flexDirection:"row",
                                    justifyContent:"space-between",
                                }}
                              >
                                  <Text 
                                        style={{
                                            fontSize:16,
                                            fontWeight:"600",
                                            color:"#FFFFFF",
                                            alignSelf:"center",
                                            justifyContent:"center",
                                            alignContent:"center",
                                            marginLeft:15
                                        }}>
                                            Social Details
                                    </Text> 
                                    <TouchableRipple
                                            style={{
                                            alignSelf:"flex-end",
                                            marginRight:25,
                                            }}
                                        >
                                        <Image
                                            style={{
                                                height:7.5,
                                                width:12,
                                                marginBottom:7,
                                                justifyContent:"flex-end",
                                            }}
                                            source={require("../../assets/arrow_down_white.png")}
                                        />
                                        </TouchableRipple>
                                </View>
                    </TouchableRipple>
                    ) : (
                        <TouchableRipple
                        style={{
                            backgroundColor:"#282A8B",
                            height:63,
                            marginTop:20,
                            borderRadius:4,
                            justifyContent:"center"
                                }}
                                onPress={() => SetSocial(0)}>
                              <View
                                style={{
                                    flexDirection:"row",
                                    justifyContent:"space-between",
                                }}
                              >
                                  <Text 
                                        style={{
                                            fontSize:16,
                                            fontWeight:"600",
                                            color:"#FFFFFF",
                                            alignSelf:"center",
                                            justifyContent:"center",
                                            alignContent:"center",
                                            marginLeft:15
                                        }}>
                                            Social Details
                                    </Text> 
                                    <TouchableRipple
                                            style={{
                                            alignSelf:"flex-end",
                                            marginRight:25,
                                            }}
                                        >
                                        <Image
                                            style={{
                                                height:7.5,
                                                width:12,
                                                marginBottom:7,
                                                justifyContent:"flex-end",
                                            }}
                                            source={require("../../assets/arrow_up_white.png")}
                                        />
                                        </TouchableRipple>
                                </View>
                            </TouchableRipple>
                    )}

{ social == 1 ?
                    <View>

            <TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:"auto",
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    label="Linkedin "
                    mode="outlined"
                    editable={false}
                    placeholderTextColor="#000000DE"
                    value={Country.Linkedin}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />

<TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:"auto",
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16,
                        
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    editable={false}
                    label="Instagram "
                    mode="outlined"
                    placeholderTextColor="#000000DE"
                    value={Country.Instagram}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />

<TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:"auto",
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    editable={false}
                    label="Facebook "
                    mode="outlined"
                    placeholderTextColor="#000000DE"
                    value={Country.Facebook}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />
                    </View>
                                :
                                null
                }
                <TouchableRipple
                        style={{ 
                        height:56,justifyContent:"center",
                        marginTop:50,
                        paddingLeft:20,
                        paddingRight:20,
                        display:"none"
                    }}
                    onPress={()=>{SetPersonal(1);}}
                    // onPress={()=>{
                    //     // Linking.openURL("http://www.linkedin.com");
                    //     // alert("Pressed");BN
                    //     props.navigation.navigate("EHP");
                    // }}
                >
                    <View
                        style={{
                            justifyContent:"space-between",
                            flexDirection:"row",
                        }}
                    >
                        <Text
                            style={{
                                fontSize:18,
                                fontWeight:"600",
                                color:"#282A8B"
                            }}
                        >
                             My Personal Details
                        </Text>
                        <Image
                            style={{
                                width:8,
                                height:12,
                                marginTop:7
                            }}
                            resizeMode="cover"
                            source={require("../../assets/see_more.png")}
                            />
                        </View>
                </TouchableRipple>

                <Divider
                    style={{
                        height:1,
                        backgroundColor:"#D8D8D8",
                        marginTop:20
                    }}
                />
                </View>
}
        </ScrollView>
    )
}

export default Profile;