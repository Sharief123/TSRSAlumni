import React,{useState, useEffect} from "react";
import axios from "axios";

import {
    View,
    Text,
    Image,
    ScrollView,
    ImageBackground,
    StyleSheet,
    ToastAndroid
} from "react-native";
import {
    Button,
    TouchableRipple,
    IconButton,
    TextInput,
} from "react-native-paper";
import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from "react-native-material-dropdown-v2";
import Env from "../auth/Env";
import * as ImagePicker from "expo-image-picker";
import useAuth from "../auth/useAuth";
import Toast from 'react-native-root-toast';


const Insert_Post = (props) => {

    const { user } = useAuth();
    const [venue, SetVenue] = useState("");
    const [loading, setIsLoading] = useState(false);
    const [section, SetSection] = useState("");
    const [withWhom, SetWithWhom] = useState("");
    const [post, setPost] = useState("");
    const [messageDetails, SetMessageDetails] = useState("");

    const [imageB, setImageB] = useState(null);
    const [image, setImage] = useState(null);

    const [Section] = useState([
        {label:"All",value:"All"},
        {label:"A", value:"A"},
        {label:"B", value:"B"},
        {label:"C", value:"C"},
    ]);

    useEffect(() => {

        var curYear = new Date().getFullYear();
      //   console.log("C Year:::>",curYear);
        var startYear=1983;
        let arrBatchYear=[];
        arrBatchYear.push("All");
        for(var i = startYear; i <= curYear ; i++) {
         setYears(arrBatchYear.push(i));
          //   arrBatchYear.push(i);
          // setYears(i);
        }
      //   setSchoolItems(arrBatchYear);
        SetLOY(arrBatchYear);
  }, [])

  const [Years, setYears] = useState([{}]);

  let [ListOfYears, SetLOY ]= useState([{}]);

  const schoolyears = ListOfYears.map((year)=>{
    return {
        title: year,
        value: year,
}
});

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

    const CreateEvent = async () => {
        if(withWhom && section && post){
        try {
          // setIsLoading(true);
          const value = {
                MessageId: "",
                UserId: user,
                Subject: null,
                MessageText: post,
                ImageURL: imageB,
                CreatedBy: user,
                CreatedOn: null,
                IsActive: true,
                ModifiedBy: null,
                ModifiedOn: null,
                IsApproved: null,
                BroadcastTo: withWhom+','+section,
                MessageDetailsUrl: messageDetails,
                RejectedReason: null,
                RejectedBy: null            
          };
    
          console.log("Event Details Details::::>",value);
          
          var config2 = {
            method: "post",
            url: `${Env.BASE_URL}/api/message`,
            headers: {
              Content_Type: "application/json",
            },
            data: value,
          };

          console.log("Message-->",config2);
          const response = await axios(config2);
           
          console.log("Response::::>",config2.data);

        const index = response.data.Message;

        console.log(response.data);

        if(index === "Record has been saved successfully"){
            // alert("Your Record Saved successfully");
            props.navigation.navigate("my_message");
        } else {
            alert("Error");
        }
        
          setIsLoading(false);
        } catch (e) {
          console.log(e);
        }
    } else {
        // ToastAndroid.showWithGravityAndOffset(
        //     "All (*) Marked fields are mandatory",
        //     ToastAndroid.LONG,
        //     ToastAndroid.CENTER,
        //     25,
        //     50
        //   );
        let toast = Toast.show('All (*) Marked fields are mandatory"', {
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
    }
      };

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
                style={{
                    width:24,
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
                     New Post 
                </Text>

                <Dropdown
                                  placeholder="With Whom *"
                                  dropdownPosition={0}
                                  underlineColor="transparent"
                                  // pickerStyle={styles.gender}
                                  flexDirection="row"
                                  style={{
                                    backgroundColor: "transparent",
                                    height:56,
                                    borderWidth:1,
                                    borderColor:"#282A8B",
                                    marginTop:30
                                  }}
                                  data={schoolyears}
                                  onChangeText ={(value)=>{
                                    SetWithWhom(value);
                                  }}
                            />

                            <Dropdown
                                  placeholder="Section *"
                                  dropdownPosition={0}
                                  underlineColor="transparent"
                                  // pickerStyle={styles.gender}
                                  flexDirection="row"
                                  style={{
                                    backgroundColor: "transparent",
                                    height:56,
                                    borderWidth:1,
                                    borderColor:"#282A8B",
                                    marginTop:16
                                  }}
                                  data={Section}
                                  onChangeText ={(value)=>{
                                    SetSection(value);
                                  }}
                            />
                <View
                    style={{
                        height:"auto",
                        marginTop:25,
                        justifyContent:"flex-start"
                    }}
                >
                <TextInput
                    style={{ width: "100%",
                        backgroundColor:"#FFFF",
                        fontSize:16,
                        justifyContent: "flex-start",
                        overflow: "visible",
                    }}
                    keyboardType="numbers-and-punctuation"
                    underlineColorAndroid="transparent"
                    placeholder="Start writing your post... *"
                    label="Start writing your post..... *"
                    placeholderTextColor="#B8B8B8"
                    value={post}
                    multiline={true}
                    numberOfLines={10}
                    outlineColor="#282A8B"
                    mode="outlined"
                    onChangeText={(text) => {
                    setPost(text);
                    }}
                    theme={{ roundness: 10,color:"green" }}
                 />
                 </View>

                 <View
                    style={{
                        marginTop:16,
                        height:56
                    }}
                 >
                <TextInput
                    style={{ width: "100%",
                        backgroundColor:"#FFFF",
                        justifyContent:"flex-start",
                        textAlignVertical:"auto" ,
                        marginTop:0,
                        paddingLeft:0,
                    }}
                    mode="outlined"
                    outlineColor="#282A8B"
                    keyboardType="numbers-and-punctuation"
                    underlineColorAndroid="transparent"
                    label="Message Details Link "
                    placeholder="Message Details Link "
                    placeholderTextColor="#000000DE"
                    value={messageDetails}
                    multiline={true}
                    onChangeText={(text) => {
                         SetMessageDetails(text);
                    }}
                    theme={{ roundness: 4,color:"green" }}
                 />
                 </View>
                </View>

                <Button
                    style={{
                        borderStyle:"dashed",
                        height:82,
                        borderWidth:1,
                        alignItems:"center",
                        alignItems:"center",
                        justifyContent:"center",
                        borderColor:"#282A8B",
                        marginLeft:20,
                        marginRight:20,
                    }}
                    mode="outlined"
                    uppercase={false}
                    icon="cloud-upload"
                    onPress={()=>pickImage()}
                >
                    Upload Image
                </Button>

                <View
                    style={{
                        justifyContent:"center",
                        flexDirection:"row",
                        marginBottom:20,
                        justifyContent:"space-evenly"
                    }}
                >
                    <TouchableRipple
                            onPress={()=>{
                                props.navigation.goBack();
                            }}
                        style={{
                            height:56,
                            // backgroundColor:"#E5E5E5",
                            justifyContent:"center",
                            margin:20,
                            borderColor:"#282A8B",
                            borderWidth:1,
                            width:"40%",
                            backgroundColor:"#FFFF"
                        }}
                    >
                        <Text
                            style={{
                                alignSelf:"center",
                                fontSize:18,
                                color:"#282A8B"
                            }}
                        >
                            Cancel
                        </Text>
                    </TouchableRipple>
                    <TouchableRipple
                        style={{
                            height:56,
                            backgroundColor:"#282A8B",
                            justifyContent:"center",
                            margin:20,
                            width:"40%"
                        }}
                        onPress={()=>{
                            CreateEvent();
                        }}
                    >
                        <Text
                            style={{
                                alignSelf:"center",
                                color:"white",
                                fontSize:18
                            }}
                        >
                            Post
                        </Text>

                    </TouchableRipple>
                </View>
                <View
                    style={{
                        justifyContent:"center",
                        margin:20,
                        paddingTop:20,
                        paddingBottom:20,
                        flexDirection:"row",
                        display:"none"
                    }}
                >
                <Button 
                        uppercase={false}
                        color="white"
                        onPress={()=>{
                            props.navigation.goBack();
                        }}
                        style={{
                            height:56,
                            width:162,
                            backgroundColor:"#E5E5E5",
                            alignSelf:"center",
                            justifyContent:"center",
                            marginBottom:20,
                            borderColor:"#282A8B",
                            borderWidth:1,
                        }}>
                            Cancel
                    </Button>
                    <Button 
                        uppercase={false}
                        color="white"
                        onPress={()=>{
                            CreateEvent();
                        }}
                        style={{
                            height:56,
                            width:162,
                            backgroundColor:"#282A8B",
                            alignSelf:"center",
                            justifyContent:"center",
                            marginBottom:20,
                            marginLeft:20
                        }}>
                            Post
                    </Button>
                </View>
        </ScrollView>
    )
}

export default Insert_Post;
