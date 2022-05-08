import React,{useEffect, useState, useRef} from "react";
import axios from "axios";

import {
    View,
    Image,
    Text,
    ImageBackground,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    
} from "react-native";
import { 
    TextInput,
    Button,
    Card,
    Divider
 } from "react-native-paper";

 import Env from "../auth/Env";
 import useAuth from "../auth/useAuth";
 import PhoneInput from 'react-native-phone-number-input';

const Welcome_Page = (props) => {

    const { login } = useAuth;
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [active, setactive] = useState(0);
    const [address, SetAddress] = useState([]);
    const [name, SetName] = useState("");
    const [city, SetCity] = useState("");
    const [dist, SetDist] = useState("");
    const [pincode, SetPincode]= useState("");
    const [state, SetState] = useState("");

  const [l, setL] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const phoneInput = useRef(null);

  const [s, setState] = useState({});


  // console.log(s);

  const [visisble, setVisible] = useState(true);

    const Login = async () => {
      if(phoneNumber){
        try {
          setLoading(true);
          setVisible(false);

          const config = {
            method: "get",
            url: `${Env.BASE_URL}/api/user/signin/${phoneNumber}`,
          };
  
          console.log("Enter Your Phone Number APi::::>",config);
    
          const response = await axios(config);

          if(response.data.Message === "SMS sent successfully")
          {
            setVisible(true);
            props.navigation.navigate("Otp_Page",{
              "phoneNumber":phoneNumber,
            });
          } else {
            console.log("Error");
            setVisible(true);
          }

          setLoading(false);
        } catch (e) {
          console.log(e);
          setVisible(true);
        }
      } else {
        alert("Please Enter Mobile Number");
        setVisible(true);
      }
      };

      const keyboardVerticalOffset = Platform.OS === "ios" ? 0 : 100;

    return (
      // <KeyboardAvoidingView
      // // behavior={Platform.OS === "ios" ? "padding" : "height"}
      // // keyboardVerticalOffset={keyboardVerticalOffset}
      // backgroundColor="#F9FBFF"
      // >
      // <View
      //   style={{
      //     backgroundColor:"#F9FBFF",
      //   }}
      // >
      //       <ScrollView style={{
      //           padding:20,
      //           backgroundColor:"#F9FBFF",
      //       }}>
      //           {/* <WelcomePage/> */}
      //           <View style={{
      //               justifyContent:"center"
      //           }}>
      //           <ImageBackground
      //               style={{
      //                   width:"99%",
      //                   height:250,     
      //                   alignSelf:"center",
      //                   marginTop:30,
      //               }}

      //               imageStyle={{ borderRadius: 5 }}
      //               resizeMode="contain"
      //               source={require("../../assets/Hero_Image.png")}
      //           >
      //           </ImageBackground>
      //           <Text style={{
      //               color:"#ED7225",
      //               fontSize:24,
      //               alignSelf:"flex-start",
      //               textAlignVertical:"top",
      //               marginTop:20
      //           }}>
      //               Welcome to Alumni !
      //           </Text>

      //           <View
      //             style={{
      //               marginLeft:3,
      //               marginRight:5,
      //               width:"98%",
      //               backgroundColor:"#FFFF",
      //               marginTop:25,
      //               borderColor:"#282A8B",borderWidth:1,
      //               borderRadius:1,
      //               display:"none"
      //             }}
      //           >
      //           <PhoneInput
      //             ref={phoneInput}
      //             defaultValue={phoneNumber}
      //             defaultCode="IN"
      //             layout="first"
      //             autoFocus
      //             containerStyle={styles.phoneContainer}
      //             textContainerStyle={styles.textInput}
      //             onChangeFormattedText={text => {
      //               setPhoneNumber(text);
      //             }}
      //           />
      //         </View>
      //           <TextInput
      //               style={{ width: "100%",
      //                   backgroundColor:"#FFFF",
      //                   height:64,justifyContent:"flex-start",
      //                   textAlignVertical:"auto",
      //                   marginTop:25,
      //                   borderColor:"#282A8B",
      //                   marginBottom:0
      //               }}
      //               mode="outlined"
      //               keyboardType="number-pad"
      //               underlineColorAndroid="transparent"
      //               placeholder="Enter Mobile Number *"
      //               label="Mobile Number *"
      //               placeholderTextColor="grey"
      //               maxLength={10}
      //               value={phoneNumber}
      //               onChangeText={(text) => {
      //               setPhoneNumber(text);
      //               if(text.length < 10){
      //                 // err("Noo")
      //                 setactive(1);
      //               } else if(text.length <= 10){
      //                 setactive(0);
      //               }
      //               }}      
      //       />   
      //       {active === 1 ?   
      //       <Text
      //       style={{
      //         color:"red",marginBottom:40
      //       }}
      //       >
      //         Invalid phone number 
      //       </Text>
      //       : <Text
      //       style={{
      //         marginBottom:30
      //       }}
      //       >
      //         </Text>}
      //       </View>
      //       <View style={{
      //               marginTop:10,
      //               justifyContent:"center",
      //               marginBottom:0,
      //               // display: 
      //               padding:0,
      //               backgroundColor:"#F9FBFF",
      //           }}>
      //               <Button 
      //                   uppercase={false}
      //                   color="white"
      //                   onPress={()=>{
      //                       Login();
      //                       // props.navigation.navigate("Otp_Page",{
      //                       //   "phoneNumber":phoneNumber,
      //                       // });
      //                   }}
      //                   style={{
      //                       height:56,
      //                       width:"100%",
      //                       backgroundColor:"#282A8B",
      //                       alignSelf:"center",
      //                       justifyContent:"center",
      //                       marginTop:0,
                            
      //                       display: visisble === false ? "none" : "flex"
      //                   }}>
      //                   Continue
      //                 </Button>
      //           </View> 
      //       </ScrollView>
      //           <View style={{
      //               marginTop:10,
      //               justifyContent:"center",
      //               marginBottom:0,
      //               // display: 
      //               padding:20,
      //               backgroundColor:"#F9FBFF",
      //           }}>
      //               <Button 
      //                   uppercase={false}
      //                   color="white"
      //                   onPress={()=>{
      //                       Login();
      //                       // props.navigation.navigate("Otp_Page",{
      //                       //   "phoneNumber":phoneNumber,
      //                       // });
      //                   }}
      //                   style={{
      //                       height:56,
      //                       width:"100%",
      //                       backgroundColor:"#282A8B",
      //                       alignSelf:"center",
      //                       justifyContent:"center",
      //                       marginTop:0,
                            
      //                       display: visisble === false ? "none" : "flex"
      //                   }}>
      //                   Continue
      //                 </Button>
      //           </View> 
      // </View>
      // </KeyboardAvoidingView>
      <View style={{
        backgroundColor:"#F9FBFF",
      }}>
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
         <View>
        <ScrollView 
        horizontal={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        style={{
          paddingHorizontal:15,
          height:"80%",
        }}>
          <View
              style={{
                marginVertical: 10,
              }}
            >
              <ImageBackground
                    style={{
                        width:"99%",
                        height:250,     
                        alignSelf:"center",
                        marginTop:30,
                    }}

                    imageStyle={{ borderRadius: 5 }}
                    resizeMode="contain"
                    source={require("../../assets/Hero_Image.png")}
                >
                </ImageBackground>
               <Text style={{
                    color:"#ED7225",
                    fontSize:24,
                    alignSelf:"flex-start",
                    textAlignVertical:"top",
                    marginTop:20
                }}>
                    Welcome to Alumni !
                </Text>
          <TextInput
                    style={{ width: "100%",
                        backgroundColor:"#FFFF",
                        height:64,justifyContent:"flex-start",
                        textAlignVertical:"auto",
                        marginTop:25,
                        borderColor:"#282A8B",
                        marginBottom:0
                    }}
                    mode="outlined"
                    keyboardType="number-pad"
                    underlineColorAndroid="transparent"
                    placeholder="Enter Mobile Number *"
                    label="Mobile Number *"
                    placeholderTextColor="grey"
                    maxLength={10}
                    value={phoneNumber}
                    onChangeText={(text) => {
                    setPhoneNumber(text);
                    if(text.length < 10){
                      // err("Noo")
                      setactive(1);
                    } else if(text.length <= 10){
                      setactive(0);
                    }
                    }}      
            /> 
         {active === 1 ?   
            <Text
            style={{
              color:"red",marginBottom:40
            }}
            >
              Invalid phone number 
            </Text>
            : <Text
            style={{
              marginBottom:30
            }}
            >
              </Text>}  
        </View>
        </ScrollView>
        <View style={{
            height:"20%",
            marginTop:0,
            padding:15,
            justifyContent:"center"
          }}>
             <View style={{
                    justifyContent:"center",
                    marginBottom:0,
                    // display: 
                    backgroundColor:"#F9FBFF",
                }}>
                    <Button 
                        uppercase={false}
                        color="white"
                        onPress={()=>{
                            Login();
                            // Personal_Details
                          //   props.navigation.navigate("Professional_Details",{
                          //     "userId":1162
                          // });
                        }}
                        style={{
                            height:56,
                            width:"100%",
                            backgroundColor:"#282A8B",
                            alignSelf:"center",
                            justifyContent:"center",
                            marginTop:0,
                            display: visisble === false ? "none" : "flex"
                        }}>
                        Continue
                      </Button>
                </View> 
                </View>
                </View>
}
      </View>
    )
}

export default Welcome_Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneContainer: {
    width: '100%',
    height: 65,
    justifyContent:"flex-start",
    textAlignVertical:"auto",
    borderColor:"#282A8B",
    margin:0
  },
  button: {
    marginTop: 30,
    width: '75%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  textInput: {
    paddingVertical: 0,
    
  },
});