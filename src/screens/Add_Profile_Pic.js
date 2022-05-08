import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    Linking,
    ImageBackground,
    BackHandler
} from "react-native";
import {
    TextInput,
    Button,
    TouchableRipple,
    IconButton
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";


import axios from "axios";
import Env from "../auth/Env";

const Add_Profile_Pic = (props) => {

    const userId = props.route.params.userId;

    console.log(userId);

    const [Linkedin, SetLinkedin] = useState("");
    const [Instagram, SetInstagram] = useState("");
    const [Facebook, SetFacebook] = useState("");

    const [imageB, setImageB] = useState(null);
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.5,
          base64: true, 
        });
    
        if (!result.cancelled) {
          setImageB(result.base64);
          setImage(result.uri);
        }
      };

      useEffect(()=>{
        const back = BackHandler.addEventListener('hardwareBackPress', ()=>true)
        return () => back.remove()
    }, [])
      const [visisble, setVisible] = useState(true);


    const Upload_Class_Details = async () => {
        setVisible(false);


        const ClassDetails = {
            
                  UserId: userId,
                  RoleId: null,
                  StatusId: 5,
                  StatusText: null,
                  ApprovedStatus: null,
                  ApprovedStatusText: null,
                  ClassSocialDetails: {
                    Id: userId,
                    Batch: null,
                    Section: null,
                    Linkedin: Linkedin,
                    Instagram: Instagram,
                    Facebook: Facebook,
                    ProfileImage:imageB,
                    IsApproved: null,
                    ApprovedBy: null,
                    AdmissionNumber: null,
                    Status: null,
                    CreatedBy: userId,
                    CreatedOn: null,
                    IsActive: true,
                    ModifiedBy: null,
                    ModifiedOn: null,
                    NoOfTimesApplied: null,
                    RejectedBy: null,
                    RejectedReason: null
                  },
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
                setVisible(true);

                props.navigation.navigate("Select_MemberShip",{
                                "userId":userId,
                            });
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
                        marginTop:20
                    }}
                >
                     Add Your Profile Pic
                </Text>

                <View 
                    style={{
                        width:162,
                        alignSelf:"center",
                        height:162,
                        borderRadius:81,
                        borderWidth:4,
                        borderColor:"#282A8B",
                        marginTop:40,
                        justifyContent:"center",
                        marginBottom:20,
                    }}
                >
                <ImageBackground
                        style={{
                            // height:150,
                            // width:150,
                            // borderRadius:100,
                            // marginTop:0,
                            alignSelf:"center",
                            }}
                        // resizeMode="contain"
                        // source={{uri: `${Env.BASE_URL}/Images/DP/1065_2271.jpg`}}
                    >
                        {image === null ? 
                        <Image
                            style={{
                                height:150,
                                width:150,
                                borderRadius:150/2,
                                marginTop:14,
                                alignSelf:"center",
                                }}
                            resizeMode="cover"
                            source={{uri:`${Env.BASE_URL}/DefaultImages/default_profile.jfif`}}
                        />
                        :
                        <Image
                            style={{
                                height:150,
                                width:150,
                                borderRadius:150/2,
                                marginTop:14,
                                alignSelf:"center",
                                }}
                            resizeMode="cover"
                            source={{uri:image}}
                        />
                        }

                    <TouchableRipple
                                 onPress={()=>{
                                    // props.navigation.navigate("Class_Details");
                                    // alert("Pressed");
                                    pickImage();
                                }}
                                style={{
                                    alignSelf:"flex-end",
                                    height:14,
                                    width:20,
                                    top:-20,
                                }}
                            >
                        <ImageBackground
                            style={{
                                height:14,
                                width:20,
                                justifyContent:"center",
                                alignItems:"center"
                                }}
                            resizeMode="contain"
                            source={require("../../assets/camera.png")}
                        >
                            <Image
                                style={{
                                    height:6.4,
                                    width:6.4,
                                    marginTop:1.5
                                    }}
                                resizeMode="contain"
                                source={require("../../assets/camera_dot.png")}
                            />
                        </ImageBackground>
                    </TouchableRipple>
                  </ImageBackground>
                </View>

                <TouchableRipple
                        style={{ width: "100%",
                        backgroundColor:"#FFFF",
                        height:56,justifyContent:"center",
                        marginTop:20,
                        borderColor:"#282A8B",
                        paddingLeft:20,
                        borderWidth:1,
                        borderRadius:4,
                        display:"none"
                    }}
                    onPress={()=>{
                        Linking.openURL("http://www.linkedin.com");
                        // alert("Pressed");
                    }}
                >
                    <Text>
                         Linkedin Profile
                    </Text>
                </TouchableRipple>

                <TextInput
                    style={{ width: "100%",
                        backgroundColor:"#FFFF",
                        height:"auto",justifyContent:"flex-start",
                        textAlignVertical:"auto" ,
                        marginTop:20,                        
                    }}
                    mode="outlined"
                    label="Linkedin Profile"
                    underlineColorAndroid="transparent"
                    outlineColor="#282A8B"
                    keyboardType="numbers-and-punctuation"
                    placeholder="Linkedin Profile"
                    placeholderTextColor="#000000DE"
                    value={Linkedin}
                    multiline={true}
                    onChangeText={(text) => {
                    SetLinkedin(text);
                    }}
                    theme={{ roundness: 4, }}
            />

                <TextInput
                    style={{ width: "100%",
                        backgroundColor:"#FFFF",
                        height:"auto",justifyContent:"flex-start",
                        textAlignVertical:"auto" ,
                        marginTop:16,                        
                    }}
                    mode="outlined"
                    label="Instagram Profile"
                    underlineColorAndroid="transparent"
                    outlineColor="#282A8B"
                    multiline={true}
                    keyboardType="numbers-and-punctuation"
                    placeholder="Instagram Profile"
                    placeholderTextColor="#000000DE"
                    value={Instagram}
                    onChangeText={(text) => {
                    SetInstagram(text);
                    }}
                    theme={{ roundness: 4, }}
            />

                <TextInput
                    style={{ width: "100%",
                        backgroundColor:"#FFFF",
                        height:"auto",justifyContent:"flex-start",
                        textAlignVertical:"auto" ,
                        marginTop:16,                        
                    }}
                    mode="outlined"
                    multiline={true}
                    label="Facebook Profile"
                    underlineColorAndroid="transparent"
                    outlineColor="#282A8B"
                    keyboardType="numbers-and-punctuation"
                    placeholder="Facebook Profile"
                    placeholderTextColor="#000000DE"
                    value={Facebook}
                    onChangeText={(text) => {
                    SetFacebook(text);
                    }}
                    theme={{ roundness: 4, }}
            />

                <TouchableRipple
                        style={{ width: "100%",
                        backgroundColor:"#FFFF",
                        height:56,justifyContent:"center",
                        marginTop:16,
                        borderColor:"#282A8B",
                        paddingLeft:20,
                        borderWidth:1,
                        borderRadius:4,
                        display:"none"
                    }}
                    onPress={()=>{
                        Linking.openURL("http://www.instagram.com");
                        // alert("Pressed");
                    }}
                >
                    <Text>
                          Instagram Profile
                    </Text>
                </TouchableRipple>

                <TouchableRipple
                        style={{ width: "100%",
                        backgroundColor:"#FFFF",
                        height:56,justifyContent:"center",
                        marginTop:16,
                        borderColor:"#282A8B",
                        paddingLeft:20,
                        borderWidth:1,
                        borderRadius:4,
                        display:"none"
                    }}
                    onPress={()=>{
                        Linking.openURL("http://www.fb.com");
                        // alert("Pressed");
                    }}
                >
                    <Text>
                         Facebook Profile
                    </Text>
                </TouchableRipple>

                </View>
                <View
                    style={{
                        justifyContent:"center",
                        marginTop:10,
                        padding:20,
                        marginBottom:20
                    }}
                >
                <Button 
                        uppercase={false}
                        color="white"
                        onPress={()=>{
                            // props.navigation.navigate("Select_MemberShip");
                            Upload_Class_Details();
                            // props.navigation.navigate("Select_MemberShip",{
                            //     "UserId":userId,
                            // });
                        }}
                        style={{
                            height:56,
                            width:"100%",
                            backgroundColor:"#282A8B",
                            alignSelf:"center",
                            justifyContent:"center",
                            display: visisble === false ? "none" : "flex"
                        }}>
                         Continue
                    </Button>
                </View>
        </ScrollView>
    )
}

export default Add_Profile_Pic;