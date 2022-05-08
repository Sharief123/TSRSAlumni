import React,{useEffect,useState} from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    ToastAndroid,
    Alert,
    
} from "react-native";
import {
    TextInput,
    Button,
    TouchableRipple,
    IconButton
} from "react-native-paper";
import useAuth from "../auth/useAuth";
import axios from "axios";
import Env from "../auth/Env";
import Toast from 'react-native-root-toast';


const Otp_Page = (props) => {


    const { login } = useAuth();

    // console.log(login);

    const [loading, setLoading] = useState(true);

    const { user } = useAuth();
    const [otp, SetOTP] = useState("");
    const [seconds, setSeconds] = React. useState(50);
    const [active, SetActive] = useState(0);
    const [v, setVisible] = useState(0);

    const [visisble, setvisible] = useState(true);

    useEffect(()=>{
        // if(pN != null){
        //     setLoading(false);
        // }
        setTimeout(() => {
            // Alert.alert('I am appearing...', 'After 5 seconds!');
            setLoading(false);
          }, 1000);
    })

        useEffect(() => {
            if (seconds > 0) {
              setTimeout(() => setSeconds(seconds - 1), 1000);
            } else {
            //   setSeconds('BOOOOM!');
            SetActive(1);
            }
          });

    const pN = props.route.params.phoneNumber;

            const OTP_Confirmation = async () => {
                try {

                const phoneNumber = props.route.params.phoneNumber;
                  setLoading(true);
                  setvisible(false);
                  // const token = utils.randomNumberGenerate(10000000, 99999999).toString();
        
                  const config = {
                    method: "get",
                    url: `${Env.BASE_URL}/api/user/checkotp/${phoneNumber}/${otp}`,
                  };
          
                  console.log("Otp Confirmation APi::::>",config);
                  setVisible(true);
                  const response = await axios(config);
        
                //   console.log("Res-->",response.data);

                //   const user = response.data.Data.UserId;

                  if(response.data.Message === "Records Found")
                  
                    {
                        setVisible(true);

                        const user = response.data.Data.UserId;
                        console.log(user);
                        // if (response.data.Data.ApprovedStatus == "1")
                        //     {
                            if(response.data.Data.StatusId == "0")
                            {
                                //class details
                                setvisible(true);

                                props.navigation.navigate("Class_Details",{
                                    "userId":response.data.Data.UserId,
                                });
                                // alert("Personal");
                            }
                                else if(response.data.Data.StatusId == "1")
                                {
                                    //class details
                                    setvisible(true);

                                    props.navigation.navigate("Personal_Details",{
                                        "userId":response.data.Data.UserId,
                                    });
                                    // alert("Personal");
                                }

                                if(response.data.Data.StatusId == "2")
                                {
                                    //personal details
                                    setvisible(true);

                                    props.navigation.navigate("Family_Details",{
                                        "userId":user,
                                    });
                                    console.log("user--->",user);
                                    // alert("Family",response.data.Data.UserId);
                                }
                                else if(response.data.Data.StatusId == "3")
                                {
                                    //family details
                                    setvisible(true);

                                    props.navigation.navigate("Professional_Details",{
                                        "userId":response.data.Data.UserId,
                                    })
                                    // alert("Professional");
                                }
                                else if(response.data.Data.StatusId == "4")
                                {
                                    //Proffessional details
                                    setvisible(true);

                                    props.navigation.navigate("Add_Profile_Pic",{
                                        "userId":response.data.Data.UserId,
                                    })
                                    // alert("Social");
                                }
                                else if(response.data.Data.StatusId == "5")
                                {
                                    //Social media details
                                    setvisible(true);

                                    props.navigation.navigate("Select_MemberShip",{
                                        "userId":response.data.Data.UserId,
                                    });
                                    // alert("Subsc");
                                }
                                else if (response.data.Data.StatusId == "6")
                                {
                        //if(response.data.Data.StatusId==="6")
                         if(response.data.Data.ApprovedStatus == "4")
                            {
                                //navigate to home page
                                setvisible(true);

                                login({ user: response.data.Data.UserId }); 
                                // alert("Home Screen");
                            } 

                            else if(response.data.Data.ApprovedStatus == "3" || response.data.Data.ApprovedStatus == "2")
                            {
                                // rejected page
                                // alert("Reject Screen");
                                props.navigation.navigate("Reject_Page");
                                setvisible(true);


                            }
                            else if (response.data.Data.ApprovedStatus == "1")
                            {
                                //class details
                                // props.navigation.navigate("Class_Details",{
                                //     "userId":response.data.Data.UserId,
                                // });
                                // alert("Profile in Pending");
                                props.navigation.navigate("Profile_pending");
                                setvisible(true);


                            } else {
                                // alert(" Error ");
                                alert("Invaild OTP. Please try again!");
                                setvisible(true);
                            }
                        }
                        } 
                    // props.navigation.navigate
                   else {
                    // console.log();
                    alert("Invaild OTP. Please try again!");
                    setvisible(true);
                  }
                  setLoading(false);
                } catch (e) {
                  console.log(e);
                  setvisible(true);
                }
              }

        const Resend_OTP = async () => {
                  try {
                    setLoading(true);
          
                    const config = {
                      method: "get",
                      url: `${Env.BASE_URL}/api/user/signin/${pN}`,
                    };
            
                    console.log("Enter Your Phone Number APi::::>",config);
              
                    const response = await axios(config);
          
                    if(response.data.Message === "SMS sent successfully"){
                        // ToastAndroid.showWithGravityAndOffset(
                        //     "OTP sent to your mobile number.!",
                        //     ToastAndroid.LONG,
                        //     ToastAndroid.CENTER,
                        //     25,
                        //     50
                        //   );
                        let toast = Toast.show('OTP sent to your mobile number.!', {
                            duration: Toast.durations.LONG,
                            position: Toast.positions.CENTER,
                            shadow: true,
                            animation: true,
                            hideOnPress: true,
                            delay: 0,
                            onShow: () => {
                                // calls on toast\`s appear animation start
                            },
                            onShown: () => {
                                // calls on toast\`s appear animation end.
                            },
                            onHide: () => {
                                // calls on toast\`s hide animation start.
                            },
                            onHidden: () => {
                                // calls on toast\`s hide animation end.
                            }
                        });
                        
                        // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
                        setTimeout(function () {
                            Toast.hide(toast);
                        }, 1000);
                         } else {
                      console.log("Error");
                    }
          
                    setLoading(false);
                  } catch (e) {
                    console.log(e);
                  }
                } 

    return (
        <View 
            style={{
                backgroundColor:"#F9FBFF",
                paddingTop:20,
            }}
        >
            {loading ? 
            (   <View
                 style={{
                   justifyContent: "center",
                   alignItems: "center",
                   height:"100%"
                 }}
               >
                 <Image
                   style={{ height: 50, width: 50, justifyContent:"center" }}
                   source={require("../../assets/a_load.gif")}
                 />
               </View> )   : ( 
         <View>
            <ScrollView 
            scrollEnabled={false}
            style={{
                paddingHorizontal:20,
                backgroundColor:"#F9FBFF",
                height:"78%",
            }}>
                <View
                    style={{
                        marginVertical:20
                    }}
                >
                <TouchableRipple
                onPress={() => {
                props.navigation.goBack();
                // alert("P");
                }}
                style={{
                    height:12,
                    width:24,
                    marginBottom:15,
                    marginTop:20,
                }}
            >
                    <Image
                        style={{
                            height:12,
                            width:24,
                            justifyContent:"flex-start",
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
                     Register to Proceed
                </Text>
                <Text
                    style={{
                        alignSelf:"center",
                        marginTop:20,
                        color: "#282A8B",
                        fontWeight:"600",
                        fontSize:16
                    }}
                >
                     OTP has been sent to +91 {pN}
                </Text>
                
                <TextInput
                    style={{ width: "100%",
                        backgroundColor:"#FFFF",
                        height:56,justifyContent:"flex-start",
                        textAlignVertical:"auto" ,
                        marginTop:25,
                    }}
                    mode="outlined"
                    outlineColor="#282A8B"
                    keyboardType="number-pad"
                    underlineColorAndroid="transparent"
                    placeholder="Enter OTP"
                    label="Enter OTP *"
                    placeholderTextColor="#000000DE"
                    value={otp}
                    maxLength={4}
                    onChangeText={(text) => {
                    SetOTP(text);
                    }}
                    theme={{ roundness: 4,color:"green" }}
                 />
                
                    {active == 0 ? 
                    <Text
                        style={{
                            alignSelf:"center",
                            marginTop:15,
                            color: "#282A8B",
                            fontWeight:"600",
                        }}
                    >
                        Resend OTP in 00:{seconds} to {pN}
                    </Text>
                    :
                    <TouchableRipple
                        onPress={()=>{
                            Resend_OTP();
                        }}
                        style={{
                            alignSelf:"flex-end",
                            marginTop:20,
                        }}
                    >
                    <Text
                        style={{
                            alignSelf:"flex-end",
                            color: "#282A8B",
                            fontWeight:"600",
                            fontSize:16
                        }}
                    >
                        Resend OTP 
                    </Text>
                    </TouchableRipple>
}
</View>
                </ScrollView>
                <View
                    style={{
                        height:"30%",
                        paddingLeft:20,
                        paddingRight:20
                    }}
                >
                <Button 
                        uppercase={false}
                        color="white"
                        onPress={()=>{
                            // props.navigation.navigate("Profile_pending",{
                            //     "userId":1065
                            // });
                            // alert("Pressed");
                            OTP_Confirmation();
                            // props.navigation.navigate("Class_Details",{
                            //     "UserId":response.data.Data.UserId,
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
                        Sign in
                    </Button>
                </View>
                </View> 
                ) }
        </View>
    )
}

export default Otp_Page;