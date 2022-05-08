import React,{useState, useEffect} from "react";
import axios from "axios";

import {
    View,
    Text,
    Image,
    ScrollView,
    ImageBackground,
    StyleSheet,
    Picker
} from "react-native";
import {
    TextInput,
    Button,
    TouchableRipple,
    IconButton,
} from "react-native-paper";
import Env from "../auth/Env";
import DropDownPicker from 'react-native-dropdown-picker';
import useAuth from "../auth/useAuth";

const Decision_Page = (props) => {

    const { user } = useAuth();

    const id = props.route.params.id;
    const IsApproved = props.route.params.IsApproved;
    const [school, SetSchool] = useState(0);
    const [personal, SetPersonal] = useState(0);
    const [social, SetSocial] = useState(0);

    const [professional, SetProfessional] = useState(0);
    const [family, SetFamily] = useState(0);

    const [venue, SetVenue] = useState("");
    const [loading, setloader] = useState(false);

    const [Dopen, setDOpen] = useState(false);
    const [Dvalue, setDValue] = useState(null);
    const [Ditems, setDItems] = useState([
        {label: "Approve", value: 4 },
        {label: "Reject", value: 2 }
    ]);

    const [events, setEvents] = useState([]);
    const [image, setimage] = useState("");

    const [Roles, SetRoles] = useState([]);
    const [Famil,SetFamil] = useState([]);
    const [sub,setSub] = useState("");

    const [Professions, SetProfessions] = useState([]);
    const [Country, SetCountry] = useState([]);
    const [States, SetStates] = useState([]);
    const [role, setRole] = useState("");

    const [approveStatus, IsApprovedStatus] = useState("");

    useEffect(() => {
        if(user){
        getProfile(id);
        getSmalDetails();
        if (IsApproved === 3){
            IsApprovedStatus("EC Member Rejected");
        } else if(IsApproved === 6){
            IsApprovedStatus("CR Rejected");
        } 
        }
  }, [props]);
  

    const getSmalDetails = async () => {
        try {
            setloader(true);

          var userD = {
            method: "get",
            url: `${Env.BASE_URL}/api/master/user/${user}/mysmalldetails`,
          };

          console.log(2);

          const response_uerD = await axios(userD);

          console.log(response_uerD.data.Data.Role);
          setRole(response_uerD.data.Data.Role);
          setloader(false);
        } catch (error) {
          // console.log(error);
        }
      };

    const getProfile = async (id) => {
        try {
          setloader(true);
    
          var config = {
            method: "get",
            url: `${Env.BASE_URL}/api/user/myprofile/${id}`,
          };
    
          console.log(config);
    
          const response = await axios(config);
          IsApprovedStatus(response.data.Data.ApprovedStatusText);
          setEvents(response.data.Data);
          SetCountry(response.data.Data.ClassSocialDetails);
          SetStates(response.data.Data.PersonalDetails);
          SetRoles(response.data.Data.ChildDetails);
          SetFamil(response.data.Data.FamilyDetails);
          setSub(response.data.Data.SubscriptionType);

        //   console.log(response.data.Data.ClassSocialDetails.ProfileImage);
        //   console.log("Child-->",response.data.Data.ChildDetails);
          SetProfessions(response.data.Data.ProfessionalDetails);
        //   console.log("Class--->",response.data.Data.ClassSocialDetails.ProfileImage);
          setimage(response.data.Data.ClassSocialDetails.ProfileImage);
          setloader(false);
        } catch (error) {
          // console.log(error);
        }
      };

      const Approval_Process = async () => {
          
        try {

            if(Dvalue === 2 && role === "EC Member")
                {

                    const Event_Values = {
                        Id: id,
                        StatusId: 3,
                        ApprovedRejectedBy: user,
                        Comments: null
                   }
                             
                    console.log("Event Details Details::::>",Event_Values);

                    var config2 = {
                        method: "POST",
                        url: `${Env.BASE_URL}/api/master/profile/approve`,
                        headers: {
                          Content_Type: "application/json",
                        },
                        data: Event_Values,
                      };
                      const response = await axios(config2);
            
                        if(response.data.Message === "Record has been updated successfully"){
                            props.navigation.navigate("My_Tasks");
                        } else {
                            alert(response.data.Message);
                        }


            } else if(Dvalue === 2 && role === "Class Representative"){
                const Event_Values = {
                    Id: id,
                    StatusId: 6,
                    ApprovedRejectedBy: user,
                    Comments: null
               }
                         
                console.log("Event Details Details::::>",Event_Values);

                var config2 = {
                    method: "POST",
                    url: `${Env.BASE_URL}/api/master/profile/approve`,
                    headers: {
                      Content_Type: "application/json",
                    },
                    data: Event_Values,
                  };
                  const response = await axios(config2);
        
                    if(response.data.Message === "Record has been updated successfully"){
                        props.navigation.navigate("My_Tasks");
                    } else {
                        alert(response.data.Message);
                    }

            } else if(Dvalue === 2 && role === "President"){
                const Event_Values = {
                    Id: id,
                    StatusId: 2,
                    ApprovedRejectedBy: user,
                    Comments: null
               }
                         
                console.log("Event Details Details::::>",Event_Values);

                var config2 = {
                    method: "POST",
                    url: `${Env.BASE_URL}/api/master/profile/approve`,
                    headers: {
                      Content_Type: "application/json",
                    },
                    data: Event_Values,
                  };
                  const response = await axios(config2);
        
                    if(response.data.Message === "Record has been updated successfully"){
                        props.navigation.navigate("My_Tasks");
                    } else {
                        alert(response.data.Message);
                    }
            } else if(Dvalue === 4){
                const Event_Values = {
                    Id: id,
                    StatusId: 4,
                    ApprovedRejectedBy: user,
                    Comments: null
               }
                         
                console.log("Event Details Details::::>",Event_Values);
                var config2 = {
                    method: "POST",
                    url: `${Env.BASE_URL}/api/master/profile/approve`,
                    headers: {
                      Content_Type: "application/json",
                    },
                    data: Event_Values,
                  };
                  const response = await axios(config2);
        
                    if(response.data.Message === "Record has been updated successfully"){
                        props.navigation.navigate("My_Tasks");
                    } else {
                        alert(response.data.Message);
                    }
            }
            
            setloader(false);

        } catch (e) {
          console.log(e);
        }
      };

    //   const Approval_Process = async () => {
    //     try {
    //         const Event_Values = 
            
    //             {
    //                 Id: id,
    //                 StatusId: Dvalue,
    //                 ApprovedRejectedBy: user,
    //                 Comments: null
    //             }
              
    //       console.log("Event Details Details::::>",Event_Values);
          
    //       var config2 = {
    //         method: "POST",
    //         url: `${Env.BASE_URL}/api/master/profile/approve`,
    //         headers: {
    //           Content_Type: "application/json",
    //         },
    //         data: Event_Values,
    //       };
    //       const response = await axios(config2);

    //         if(response.data.Message === "Record has been updated successfully"){
    //             props.navigation.navigate("My_Tasks");

    //         } else {
    //             alert(response.data.Message);
    //         }
    //         setloader(false);
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   };

    return (
        <ScrollView 
            style={{
                backgroundColor:"#F9FBFF",
                paddingTop:20,
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
                paddingBottom:20,               
            }}>
                <TouchableRipple
                onPress={() => {
                props.navigation.goBack();
                }}
                style={{
                    width:24,
                    marginTop:20,
                    marginBottom:15
                }}
            >
                    <Image
                        style={{
                            height:12,
                            width:24,
                            justifyContent:"flex-start",
                            // marginTop:20,
                            // marginBottom:15
                            }}
                        resizeMode="contain"
                        source={require("../../assets/back_arrow.png")}
                    />
                </TouchableRipple>
                <View
                    style={{
                        flexDirection:"row",
                        marginTop:10,
                        marginLeft:5
                    }}
                >
                    <Text
                        style={{
                            fontSize:14,
                            fontWeight:"bold",marginRight:10
                        }}
                    >
                        Status
                    </Text>
                    <Text
                        style={{
                            fontSize:14,
                            fontWeight:"bold",marginRight:10,color:"black"
                        }}
                    >
                        -
                    </Text>
                <Text 
                    style={{
                        color:"#ED7225",
                        fontSize:14,
                        fontWeight:"bold",
                        
                        marginLeft:0,
                    }}
                >
                     {approveStatus}
                </Text>
                </View>

                <Text 
                    style={{
                        color:"#ED7225",
                        fontSize:24,
                        fontWeight:"bold",
                        marginTop:20
                    }}
                >
                     {/* Sanjay Mishra */}
                     {States.FirstName}
                </Text>

                <ImageBackground
                            style={{
                                width:200,
                                height:200,
                                alignSelf:"center",
                                marginTop:10
                                }}
                            resizeMode="contain"
                            // source={require("../../assets/profile_pic.png")}
                            // source={{uri: Env.BASE_URL+Country.ProfileImage}}
                        >
                    </ImageBackground>
                    <View
                            style={{
                                backgroundColor:"#ED7225",
                                        width:58,
                                        top:-100,
                                        height:19,
                                        alignSelf:"flex-end",
                                        marginRight:0,
                                        borderRadius:4,
                                        marginRight:35,
                                        justifyContent:"center",
                                        display:"none"
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
                {/* <DropDownPicker
                    open={Schoolopen}
                    value={Schoolvalue}
                    items={Schoolitems}
                    setOpen={setSchoolOpen}
                    setValue={setSchoolValue}
                    setItems={setSchoolItems}
                    placeholder="School"
                    style={{
                        marginTop:30,
                        borderWidth:1,
                        borderRadius:4,
                        borderColor:"#282A8B",
                        height:56,
                        backgroundColor:"#282A8B"
                    }}
                    placeholderStyle={{
                        color:"#FFFFFF",
                        fontSize:16,
                        fontWeight:"600"
                    }}
                    onPress={()=>{
                        SetSchool(0);
                    }}
                /> */}
{/* 
                <TouchableRipple
                    style={{
                        backgroundColor:"#282A8B",
                        height:56,
                        justifyContent:"center"
                    }}
                >
                    <View
                        style={{
                            flexDirection:"row"
                        }}
                    >
                        <Text
                            style={{
                                fontSize:16,
                                fontWeight:"600",
                                color:"#FFFFFF"
                            }}
                        >
                            School
                        </Text>
            {school == 0 ? (
                      <View>
                        <View style={{ flexDirection: "row-reverse" }}>
                          <TouchableRipple
                          onPress={() => SetSchool(1)}>
                          <Image
                              style={{
                                height:7.5,
                                width:12
                              }}
                              resizeMode="center"
                              source={require("../../assets/arrow_down_white.png")}
                            />
                           </TouchableRipple>
                        </View>
                      </View>
                    ) : (
                      <View>
                        <View style={{ flexDirection: "row-reverse" }}>
                          <TouchableRipple onPress={() => SetSchool(0)}
                          >
                            <Image
                              style={{
                                height:7.5,
                                width:12
                              }}
                              resizeMode="cover"
                              source={require("../../assets/arrow_up_white.png")}
                            />
                          </TouchableRipple>
                        </View>
                      </View>
                    )}
                    </View>
                </TouchableRipple> */}

               

                    {school == 1 ? (
                        <TouchableRipple
                        style={{
                            backgroundColor:"#282A8B",
                            height:63,
                            marginTop:20,
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
                                            School
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
                                            School
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

              { school == 0 ?
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
                        height:"auto",
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16
                    }}
                    keyboardType="default"
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
                    : null }
                    </View>
                                :
                                null
                }

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
                            marginTop:50,
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

{ personal == 1 ?
<View>
    {States != null ?
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
                    label="FirstName *"
                    mode="outlined"
                    editable={false}
                    placeholderTextColor="#000000DE"
                    value={States.FirstName != null ? States.FirstName : ""}
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
                         backgroundColor:"#FFFF",
                         marginTop:5,
                         padding:5,
                         borderColor:"#282A8B",
                         overflow: "visible",
                         textAlignVertical: "top",
                         justifyContent: "flex-start",
                     }}
                     mode="outlined"
                     keyboardType="default"
                     outlineColor="#282A8B"
                     numberOfLines={10}
                     underlineColorAndroid="transparent"
                     placeholder="Address *"
                     value={States.Address}
                     placeholderTextColor="#000000DE"
                    //  value={reject}
                     multiline={true}
                     editable={false}
                     label="Address *"
                    //  onChangeText={(text) => {
                    //  setReject(text);
                    //  }}
                 />
                 <TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        height:100,
                        backgroundColor:"#F9FBFF",
                        padding:5,
                        marginTop:16,
                        display:"none"
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
                    </View>
                    : null}
                    </View>
                                :
                                null
                }

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

{ professional == 1 ?
    <View>
    {Professions != null ? 
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
                    </View>
                    : null }
                    </View>
                                :
                                null
                }

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
                    label="MaritalStatus *"
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
                            marginTop:50,
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

            {/* <DropDownPicker
                    open={Schoolopen}
                    value={Schoolvalue}
                    items={Schoolitems}
                    setOpen={setSchoolOpen}
                    setValue={setSchoolValue}
                    setItems={setSchoolItems}
                    placeholder="Personal Details"
                    style={{
                        marginTop:20,
                        borderWidth:1,
                        borderRadius:4,
                        borderColor:"#282A8B",
                        height:56,
                        backgroundColor:"#282A8B"
                    }}
                    placeholderStyle={{
                        color:"#FFFFFF",
                        fontSize:16,
                        fontWeight:"600"

                    }}
                />

            <DropDownPicker
                    open={Schoolopen}
                    value={Schoolvalue}
                    items={Schoolitems}
                    setOpen={setSchoolOpen}
                    setValue={setSchoolValue}
                    setItems={setSchoolItems}
                    placeholder="Professional Details"
                    style={{
                        marginTop:20,
                        borderWidth:1,
                        borderRadius:4,
                        borderColor:"#282A8B",
                        height:56,
                        backgroundColor:"#282A8B"
                    }}
                    placeholderStyle={{
                        color:"#FFFFFF",
                        fontSize:16,
                        fontWeight:"600"

                    }}
                />

            <DropDownPicker
                    open={Schoolopen}
                    value={Schoolvalue}
                    items={Schoolitems}
                    setOpen={setSchoolOpen}
                    setValue={setSchoolValue}
                    setItems={setSchoolItems}
                    placeholder="Family Details"
                    style={{
                        marginTop:20,
                        borderWidth:1,
                        borderRadius:4,
                        borderColor:"#282A8B",
                        height:56,
                        backgroundColor:"#282A8B"
                    }}
                    iconContainerStyle={{
                        color:"white"
                    }}
                    placeholderStyle={{
                        color:"#FFFFFF",
                        fontSize:16,
                        fontWeight:"600"
                    }}
                /> */}
                
                <DropDownPicker
                    open={Dopen}
                    value={Dvalue}
                    items={Ditems}
                    setOpen={setDOpen}
                    setValue={setDValue}
                    setItems={setDItems}
                    placeholder="Decision *"
                    style={{
                        marginTop:60,
                        borderWidth:1,
                        borderRadius:4,
                        borderColor:"#282A8B",
                        height:56,
                        backgroundColor:"#FFFFFF"
                    }}
                    placeholderStyle={{
                        color:"#282A8B",
                        fontSize:16,
                        fontWeight:"600"
                    }}
                    onChangeValue={(Dvalue)=>{
                        setDValue(Dvalue);
                    }}
                />
                
                <TouchableRipple
                        onPress={()=>
                            {
                                Approval_Process();
                            }
                        }
                        style={{
                            height:56,
                            alignItems:"center",
                            backgroundColor:"#282A8B",
                            justifyContent:"center",
                            borderRadius:4,
                            marginLeft:0,
                            marginTop:30
                        }}
                    >
                        <Text
                            style={{
                                fontWeight:"600",
                                fontSize:18,
                                color:"#FFFFFF",
                                textAlign:"center"
                            }}
                        >
                              Submit
                        </Text>
                    </TouchableRipple>
                <View
                    style={{
                        justifyContent:"center",
                        flexDirection:"row",
                        marginLeft:10,
                        marginRight:10,
                        marginTop:30,display:"none"
                    }}
                >
                    <TouchableRipple
                        // onPress={()=>alert("Cancel is Pressed")}
                        style={{
                            width:"50%",
                            height:56,
                            alignItems:"center",
                            backgroundColor:"#FFFFFF",
                            justifyContent:"center",
                            borderColor:"#282A8B",
                            borderWidth:1,
                            borderRadius:4,
                            marginRight:10
                        }}
                    >
                        <Text
                            style={{
                                fontWeight:"600",
                                fontSize:18,
                                color:"#282A8B",
                                textAlign:"center"
                            }}
                        >
                            Cancel
                        </Text>
                    </TouchableRipple>
                    <TouchableRipple
                        onPress={()=>
                            {
                                Approval_Process();
                            }
                        }
                        style={{
                            width:"50%",
                            height:56,
                            alignItems:"center",
                            backgroundColor:"#282A8B",
                            justifyContent:"center",
                            borderRadius:4,
                            marginLeft:10
                        }}
                    >
                        <Text
                            style={{
                                fontWeight:"600",
                                fontSize:18,
                                color:"#FFFFFF",
                                textAlign:"center"
                            }}
                        >
                              Submit
                        </Text>
                    </TouchableRipple>
                </View>
            </View>   
}
        </ScrollView>
    )
}

export default Decision_Page;
