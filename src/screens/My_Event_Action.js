import React,{useState, useEffect} from "react";
import axios from "axios";

import {
    View,
    Text,
    Image,
    ScrollView,
    TextInput
} from "react-native";
import {
    Button,
    TouchableRipple,
} from "react-native-paper";
import DropDownPicker from 'react-native-dropdown-picker';
// import { Dropdown } from "react-native-material-dropdown";

import useAuth from "../auth/useAuth";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import Env from "../auth/Env";

const My_Event_Action = (props) => {

    const { user } = useAuth(); 

    const id = props.route.params.id;
    const dec = props.route.params.dec;
    const sub = props.route.params.sub;
    const text = props.route.params.text;
    const image = props.route.params.image;
    const section = props.route.params.section;
    const EventUrl = props.route.params.url;
    const EventDate = props.route.params.date;
    const IsApproved = props.route.params.IsApproved;
    const venue = props.route.params.venue;
    const Status = props.route.params.Status;

    console.log(Status);
    console.log(id,dec,sub,text);

    const [desc, setDesc] = useState("");
    const [reject, setReject] = useState("");

    const [Dopen, setDOpen] = useState(false);
    const [Dvalue, setDValue] = useState(4);
    const [Ditems, setDItems] = useState([
        {label: "Approve", value: 4},
        {label: "Reject", value: 2}
    ]);

    const [infoMore, SetInfoMore] = useState(1);

    const [loading, setIsLoading] = useState(false);

    const [role, setRole] = useState("");
    const [approveStatus, IsApprovedStatus] = useState("Pending");

    useEffect(() => {
        (async () => {
          if (user) {
            getEvents();
            if (IsApproved === 3){
                IsApprovedStatus("EC Member Rejected");
            } else if(IsApproved === 6){
                IsApprovedStatus("CR Rejected");
            } 
          }
        })();
      }, []); 

    const getEvents = async () => {
        try {
            setIsLoading(true);

          var userD = {
            method: "get",
            url: `${Env.BASE_URL}/api/master/user/${user}/mysmalldetails`,
          };

          console.log(2);

          const response_uerD = await axios(userD);

          console.log(response_uerD.data.Data.Role);
          setRole(response_uerD.data.Data.Role);
          setIsLoading(false);
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
                        Comments: reject
                   }
                             
                    console.log("Event Details Details::::>",Event_Values);

                    var config2 = {
                        method: "POST",
                        url: `${Env.BASE_URL}/api/master/events/approve`,
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
                    Comments: reject
               }
                         
                console.log("Event Details Details::::>",Event_Values);

                var config2 = {
                    method: "POST",
                    url: `${Env.BASE_URL}/api/master/events/approve`,
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
                    Comments: reject
               }
                         
                console.log("Event Details Details::::>",Event_Values);

                var config2 = {
                    method: "POST",
                    url: `${Env.BASE_URL}/api/master/events/approve`,
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
                    Comments: reject
               }
                         
                console.log("Event Details Details::::>",Event_Values);
                var config2 = {
                    method: "POST",
                    url: `${Env.BASE_URL}/api/master/events/approve`,
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
            
          setIsLoading(false);

        } catch (e) {
          console.log(e);
        }
      };


    return (
         <ScrollView 
         style={{
             backgroundColor:"#F9FBFF",
             paddingTop:20,
             height:"100%"
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
                     {Status}
                </Text>
                </View>
                {image != null ?

                <Image
                    style={{
                        height:200,
                        marginLeft:5,
                        marginRight:5,
                        marginTop:10
                    }}
                    source={{uri: Env.BASE_URL+image}}
                />
                : null}

                <View
            style={{
                borderWidth:1,
                borderColor:"#282A8B",
                borderRadius:6,
                height:54,
                padding:10,
                marginTop:26
            }}
        >
            <Text
                style={{
                    marginTop:-20,
                    backgroundColor:"#F9FBFF",
                    width:48,
                    marginLeft:5,
                    paddingLeft:2,
                    color:"#282A8B"
                }}
            >
                Type *
            </Text>   
            <TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        backgroundColor:"#F9FBFF",
                        color:"rgb(34,34,34)",
                        marginTop:5
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    editable={false}
                    underlineColorAndroid="transparent"
                    multiline={true}
                    placeholderTextColor="#000000DE"
                    value={dec}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />
            </View>
            <View
            style={{
                borderWidth:1,
                borderColor:"#282A8B",
                borderRadius:6,
                height:"auto",
                padding:10,
                marginTop:16
            }}
        >
            <Text
                style={{
                    marginTop:-20,
                    backgroundColor:"#F9FBFF",
                    width:60,
                    marginLeft:5,
                    paddingLeft:2,
                    color:"#282A8B"
                }}
            >
                Subject *
            </Text>  
            <TextInput
                    style={{ width: "100%",
                        backgroundColor:"#F9FBFF",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        marginTop:7,
                        color:"rgb(34,34,34)",
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    underlineColorAndroid="transparent"
                    multiline={true}
                    editable={false}
                    placeholder="Subject *"
                    placeholderTextColor="#000000DE"
                    value={sub}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />
            </View>
        <View
            style={{
                borderWidth:1,
                borderColor:"#282A8B",
                borderRadius:6,
                height:"auto",
                padding:10,
                marginTop:16
            }}
        >
            <Text
                style={{
                    marginTop:-20,
                    backgroundColor:"#F9FBFF",
                    width:85,
                    marginLeft:5,
                    paddingLeft:2,
                    color:"#282A8B"
                }}
            >
                 Description *
            </Text>  
            <TextInput
                    style={{ width: "100%",
                        backgroundColor:"#F9FBFF",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        marginTop:7,
                        color:"rgb(34,34,34)"
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    underlineColorAndroid="transparent"
                    multiline={true}
                    label="Description *"
                    editable={false}
                    placeholder="Description *"
                    placeholderTextColor="#000000DE"
                    value={text}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />
            </View>

            <View
            style={{
                borderWidth:1,
                borderColor:"#282A8B",
                borderRadius:6,
                height:54,
                padding:10,
                marginTop:16
            }}
        >
            
            <Text
                style={{
                    marginTop:-20,
                    backgroundColor:"#F9FBFF",
                    width:95,
                    marginLeft:5,
                    paddingLeft:2,
                    color:"#282A8B"
                }}
            >
                BroadcastTo *
            </Text>   
            <TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        marginTop:5,
                        color:"black"
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    underlineColorAndroid="transparent"
                    multiline={true}
                    placeholder="BroadcastTo *"
                    editable={false}
                    placeholderTextColor="#000000DE"
                    value={section}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />
            </View>

            <View
            style={{
                borderWidth:1,
                borderColor:"#282A8B",
                borderRadius:6,
                height:54,
                padding:10,
                marginTop:16
            }}
        >
            
            <Text
                style={{
                    marginTop:-20,
                    backgroundColor:"#F9FBFF",
                    width:77,
                    marginLeft:5,
                    paddingLeft:2,
                    color:"#282A8B"
                }}
            >
                EventDate *
            </Text>   
            <TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        marginTop:5,
                        color:"black"
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    underlineColorAndroid="transparent"
                    multiline={true}
                    placeholder="Event Date *"
                    editable={false}
                    placeholderTextColor="#000000DE"
                    value={EventDate}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />
            </View>

            <View
            style={{
                borderWidth:1,
                borderColor:"#282A8B",
                borderRadius:6,
                height:54,
                padding:10,
                marginTop:16
            }}
        >
            
            <Text
                style={{
                    marginTop:-20,
                    backgroundColor:"#F9FBFF",
                    width:110,
                    marginLeft:5,
                    paddingLeft:2,
                    color:"#282A8B"
                }}
            >
                Event Details Url 
            </Text>   
            <TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        marginTop:5,
                        color:"black"
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    underlineColorAndroid="transparent"
                    multiline={true}
                    placeholder="Event Details Url "
                    editable={false}
                    placeholderTextColor="#000000DE"
                    value={EventUrl}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />
            </View>

            <View
            style={{
                borderWidth:1,
                borderColor:"#282A8B",
                borderRadius:6,
                height:54,
                padding:10,
                marginTop:16
            }}
        >
            
            <Text
                style={{
                    marginTop:-20,
                    backgroundColor:"#F9FBFF",
                    width:45,
                    marginLeft:5,
                    paddingLeft:2,
                    color:"#282A8B"
                }}
            >
                Venue 
            </Text>   
            <TextInput
                    style={{ width: "100%",
                        borderColor:"#282A8B",
                        overflow: "visible",
                        textAlignVertical: "top",
                        justifyContent: "flex-start",
                        marginTop:5,
                        color:"black"
                    }}
                    keyboardType="default"
                    numberOfLines={5}
                    underlineColorAndroid="transparent"
                    multiline={true}
                    placeholder="Venue"
                    editable={false}
                    placeholderTextColor="#000000DE"
                    value={venue}
                    // onChangeText={(text) => {
                    // setDesc(text);
                    // }}
                 />
            </View>

                <DropDownPicker
                    open={Dopen}
                    value={Dvalue}
                    items={Ditems}
                    setOpen={setDOpen}
                    setValue={setDValue}
                    setItems={setDItems}
                    placeholder="Decision *"
                    style={{
                        marginTop:20,
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
                        // approve(Dvalue);
                        // if(Dvalue == "Approve")
                        //      {
                        //         SetInfoMore(1);
                        //      }
                        // else {
                        //      SetInfoMore(0);
                        // }
                        setDValue(Dvalue);

                    }}
                />

        {Dvalue == 2 ? 
                <View
                    style={{
                        borderColor:"#282A8B",
                        borderWidth:1,
                        borderRadius:6,
                        marginTop:16,
                        height:201,
                    }}
                >
                <TextInput
                     style={{
                         height: 500,
                        justifyContent: "flex-start",
                        overflow: "visible",
                        textAlignVertical: "top",
                        padding:5
                     }}
                     mode="outlined"
                     keyboardType="default"
                     outlineColor="#282A8B"
                     numberOfLines={10}
                     multiline={true}
                     underlineColorAndroid="transparent"
                     placeholder="Comments"
                    //  value={"Lorem Ipsum is simply dummy text of the printing and typesetting industry"+
                    //   "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"}
                     placeholderTextColor="#000000DE"
                     value={reject}
                     label="Comments"
                     onChangeText={(text) => {
                     setReject(text);
                     }}
                 />
             </View>
                 : null}
            {Dvalue == 4 ? 
                    <View
                        style={{
                            height:190
                        }}
                    >
                 </View>
                     : null}
            
                    {/* <View>
                       <TextInput
                            style={{ width: "100%",
                                backgroundColor:"#FFFF",
                                height:201,
                                marginTop:16,
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
                            placeholder="Comments"
                            value={"Lorem Ipsum is simply dummy text of the printing and typesetting industry"+
                             "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"}
                            placeholderTextColor="#000000DE"
                            // value={desc}
                            // onChangeText={(text) => {
                            // setDesc(text);
                            // }}
                        />
                    </View> */}

                <TouchableRipple
                        onPress={()=>{
                            Approval_Process();
                        }}
                        style={{
                            height:56,
                            alignItems:"center",
                            backgroundColor:"#282A8B",
                            justifyContent:"center",
                            borderRadius:4,
                            marginLeft:0,
                            marginBottom:20,
                            marginTop:20
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
                     marginTop:20,
                     marginBottom:20,
                     display:"none"
                 }}
             >
                 <TouchableRipple
                        // onPress={()=>{alert("Cancel is Pressed");}}
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
                        onPress={()=>{
                            Approval_Process();
                        }}
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
     </ScrollView>
    )
}

export default My_Event_Action;
