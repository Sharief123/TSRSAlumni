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
    TextInput,
    Button,
    TouchableRipple,
    IconButton
} from "react-native-paper";
import Env from "../auth/Env";
import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from "react-native-material-dropdown-v2";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import useAuth from "../auth/useAuth";
import Toast from 'react-native-root-toast';
import DatePicker from 'react-native-datepicker';


const Insert_Event = (props) => {

    const { user } = useAuth(); 

    const [venue, SetVenue] = useState("");
    const [EventDetails, setEventDetails] = useState("");
    const [EventName, SetEventName] = useState("");
    const [Subject, SetSubject] = useState("");
    const [withWhom, SetWithWhom] = useState("");
    const [section, SetSection] = useState("");
    const [eventType, SetEventType] = useState("");

    const [time, setTime] = useState(new Date());
    const [loading, setIsLoading] = useState(false);

    const [imageB, setImageB] = useState(null);
    const [image, setImage] = useState(null);
    
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [Timemode, setTimeMode] = useState('time');

    const [show, setShow] = useState(false);
    const [showtime, setShowTime] = useState(false);

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

  useEffect(() => {
    (async () => {
      if (user) {
        getEvents();
      }
    })();
  }, []); 

  const [Years, setYears] = useState([{}]);

  let [ListOfYears, SetLOY ]= useState([{}]);

  const schoolyears = ListOfYears.map((year)=>{
    return {
        title: year,
        value: year,
}
});
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };

    const onChangeTime = (event, selectedDate) => {
        const currentDate = selectedDate || time;
        setShowTime(Platform.OS === 'ios');
        setTime(currentDate);
        console.log("Time:::>",time);
      };

    // const onChangeTime = () => {
    //     const currentMode = time;
    //     setTime(currentMode);
    // }a
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };

    const showTimerMode = (currentMode) => {
        setShowTime(true);
        setTimeMode(currentMode);
      };

    const showTimepicker = () => {
      showMode('date');
    };

    const showTimerpicker = () => {
        showTimerMode('time');
      };

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

      const [Section] = useState([
          {label:"All",value:"All"},
          {label:"A", value:"A"},
          {label:"B", value:"B"},
          {label:"C", value:"C"},
      ]);

      const [EventType] = useState([
          {label:"Bike Riding",value:"1"},
          {label:"Circket Tournment",value:"2"},
          {label:"Long Drive",value:"3"}
      ]);

      const [loader, setloader] = useState(false);

      const [Country, SetCountry] = useState([]);

      const getEvents = async () => {
        try {
          setloader(true);
          var config = {
            method: "get",
            url: `${Env.BASE_URL}/api/master/data`,
          };
    
          console.log(config);
    
          const response = await axios(config);
    
        //   setResponse(response);
          SetCountry(response.data.Data.EventTypes);
          console.log("1");
          console.log(response.data.Data.EventTypes);
          setloader(false);
        } catch (error) {
          // console.log(error);
        }
      };

      const events = Country.map((rol)=>{
        return {
            title:rol.EventTypeId,
            value:rol.Name
        }
    });

    console.log(events);

      // image ==> imageB
      // venue ==> venue
      // date ==> date
      // time ==> time
      // eventurl ==> EventDetails
      // event name ==> EventName
      // subject ==> Subject
      // withwhom ==> WithWhom
      // section ==> section
      // eventtype ==> eventType

    //   console.log("Event--->",eventType);

    const CreateEvent = async () => {
        if(withWhom && section && eventType && EventName && Subject && cD && cT && venue ){
        try {
            const Event_Values = 
            {
                AudienceId: null,
                BroadcastTo: withWhom+','+section,
                CreatedBy: user,
                CreatedOn: null,
                EventDate: cD+" "+cT,
                EventDetailsUrl: EventDetails,
                EventId: "",
                EventText: EventName,//2022-01-15 10:30 PM
                EventTypeId: eventType,
                ImageURL: imageB,
                IsActive: true,
                IsApproved: null,
                Latitude: null,
                Location: venue,
                Longitude: null,
                ModifiedBy: null,
                ModifiedOn: null,
                RejectedBy: null,
                RejectedReason:null,
                Subject: Subject,
                UserId: user
              }
    
          console.log("Event Details Details::::>",Event_Values,time.toDateString());
          
          var config2 = {
            method: "POST",
            url: `${Env.BASE_URL}/api/event`,
            headers: {
              Content_Type: "application/json",
            },
            data: Event_Values,
          };
          const response = await axios(config2);

            if(response.data.Message === "Record has been saved successfully"){
                props.navigation.navigate("My_events");
            } else {
                alert(response.data.Message);
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

      const [cD , setCD] = useState(new Date());
      const [cT, setCT] = useState(new Date());

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
                     New Event 
                </Text>

                        <View>
                            {/* <View>
                                <Button onPress={showDatepicker} title="Show date picker!" />
                            </View> */}
                            {show && (
                                <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={"date"}
                                is24Hour={false}
                                display="default"
                                onChange={onChange}
                                />
                            )}

                            {showtime && (
                                <DateTimePicker
                                testID="dateTimePicker1"
                                value={time}
                                mode={"time"}
                                is24Hour={false}
                                display="default"
                                onChange={onChangeTime}
                                />
                            )}

                            </View>

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

                            <Dropdown
                                  placeholder="Event Type *"
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
                                   data={events}
                                   onChangeText ={(value,index)=>{
                                    SetEventType(events[index].title);
                                  }}
                            />

                {/* <Dropdown
                    placeholder="With Whom *"
                    placeholderTextColor="rgb(34,34,34)"
                    // data={categories}
                    underlineColor="transparent"
                    pickerStyle={{
                        width: "100%",
                        left: 0,
                        right: 0,
                    }}
                    useNativeDriver="true"
                    style={{
                      backgroundColor: "white",
                      width: "100%",
                      height:56,
                      marginLeft:0,
                      fontSize:13,
                      marginTop:30,
                      borderRadius:4,
                      borderWidth:1,
                      borderColor:"#282A8B"
                      // borderBottomWidth:1
                      // baseColor:"
                    }}
                    // containerStyle={styles.overlayStyle}
                    // onChangeText={(value, index) => {
                    //   toggleFilters("category", categories[index].title);
                    // }}
                  /> */}

                {/* <Dropdown
                    placeholder="Event Type *"
                    // data={categories}
                    underlineColor="transparent"
                    // pickerStyle={styles.category}
                    placeholderTextColor="rgb(34,34,34)"
                    useNativeDriver="true"
                    style={{
                      backgroundColor: "white",
                      width: "100%",
                      height:56,
                      marginLeft:0,
                      fontSize:13,
                      marginTop:16,
                      borderRadius:4,
                      borderWidth:1,
                      borderColor:"#282A8B"
                      // borderBottomWidth:1
                      // baseColor:"
                    }}
                    // containerStyle={styles.overlayStyle}
                    // onChangeText={(value, index) => {
                    //   toggleFilters("category", categories[index].title);
                    // }}
                  /> */}

                {/* <DropDownPicker
                    open={Schoolopen}
                    value={Schoolvalue}
                    items={Schoolitems}
                    setOpen={setSchoolOpen}
                    setValue={setSchoolValue}
                    setItems={setSchoolItems}
                    placeholder="With Whom *"
                    style={{
                        marginTop:30,
                        borderWidth:1,
                        borderRadius:4,
                        borderColor:"#282A8B",
                        height:56,

                    }}
                />

                <DropDownPicker
                    open={Batchopen}
                    value={Batchvalue}
                    items={Batchitems}
                    setOpen={setBatchOpen}
                    setValue={setBatchValue}
                    setItems={setBatchItems}
                    placeholder="Event Type *"
                    style={{
                        marginTop:16,
                        borderWidth:1,
                        borderRadius:4,
                        borderColor:"#282A8B",
                        height:56,
                    }}
                /> */}
                <View
                    style={{
                        height:56,
                        marginTop:16
                    }}
                >
                <TextInput
                    style={{ width: "100%",
                        backgroundColor:"#FFFF",
                        justifyContent:"flex-start",
                        textAlignVertical:"auto" ,
                        marginTop:0,
                    }}
                    mode="outlined"
                    outlineColor="#282A8B"
                    keyboardType="numbers-and-punctuation"
                    underlineColorAndroid="transparent"
                    placeholder="Enter Event Name *"
                    label="Enter Event Name *"
                    placeholderTextColor="#000000DE"
                    value={EventName}
                    numberOfLines={5}
                    multiline={true}
                    onChangeText={(text) => { 
                    SetEventName(text);
                    }}
                    theme={{ roundness: 4,color:"green" }}
                 />
                 </View>

                 <View
                    style={{
                        height:56,
                        marginTop:16
                    }} 
                >
                 <TextInput
                    style={{ width: "100%",
                        backgroundColor:"#FFFF",
                        justifyContent:"flex-start",
                        textAlignVertical:"auto" ,
                        marginTop:0,
                    }}
                    mode="outlined"
                    outlineColor="#282A8B"
                    keyboardType="numbers-and-punctuation"
                    underlineColorAndroid="transparent"
                    placeholder="Enter Subject *"
                    label="Enter Subject *"
                    placeholderTextColor="#000000DE"
                    value={Subject}
                    multiline={true}
                    numberOfLines={5}
                    onChangeText={(text) => {
                    SetSubject(text);
                    }}
                    theme={{ roundness: 4,color:"green" }}
                 />
                 </View>
            <TouchableRipple
                    style={{ width: "100%",
                    backgroundColor:"#FFFF",
                    height:60,
                    textAlignVertical:"auto" ,
                    marginTop:20,
                    borderColor:"#282A8B",
                    borderWidth:1,
                    borderRadius:4
                }}
                // onPress={()=>{
                //     showTimepicker();
                // }}
                >
                    <View
                        style={{
                            marginTop:0
                        }}
                    >
                        <Text
                            style={{
                                marginTop:-10,
                                marginLeft:11,
                                backgroundColor:"#F9FBFF",
                                width:"28%",
                            }}
                        >
                            Event Date *
                        </Text>
                    {/* <View
                        style={{
                            flexDirection:"row",
                            justifyContent:"space-between",
                            height:56,
                        }}
                    >
                        {/* <TextInput
                            style={{
                                width:"90%",
                                backgroundColor:"#FFFF",
                                marginTop:0
                            }}
                            keyboardType="numbers-and-punctuation"
                            placeholder="Date *"
                            placeholderTextColor="#000000DE"
                            underlineColorAndroid="transparent"
                            underlineColor="transparent"
                            value={desc}
                            onChangeText={(text) => {
                                 setDesc(text);
                            }}
                            theme={{ roundness: 4,color:"green" }}
                        /> 
                        {date === " " ? 
                            <Text
                                style={{
                                        width:"80%",
                                        alignSelf:"center",
                                        marginLeft:10
                                    }}
                                >
                                    Date *
                            </Text>
                             : 
                             <Text
                                style={{
                                    width:"80%",
                                    alignSelf:"center",
                                    marginLeft:10
                                }}
                             >
                                {date.toDateString()}
                             </Text>
                              }
                        <ImageBackground
                            style={{
                                width:18.18,
                                height:20,
                                alignSelf:"center",
                                justifyContent:"center",
                                marginRight:15
                            }}
                            source={require("../../assets/date.png")}
                        >
                        </ImageBackground>
                    </View> */}
                    <DatePicker
                      style={{width: "100%", marginTop:5,borderColor:"#282A8B",height:46,borderWidth:0,marginLeft:5}}
                      date={cD === new Date() ? null : cD}
                      mode="date"
                      placeholder="Date of Birth"
                      // format="YYYY-MM-DD"
                      // format="DD-MM-YYYY"
                      // minDate="2016-05-01"
                      // maxDate="2016-06-01"
                      
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      // customStyles={{
                      //   dateIcon: {
                      //     position: 'absolute',
                      //     left: 0,
                      //     top: 4,
                      //     marginLeft: 0
                      //   },
                      //   dateInput: {
                      //     marginLeft: 36
                      //   }
                      //   // ... You can check the source to find the other keys.
                      // }}
                      onDateChange={(date) => {setCD(date)}}
                    />
                    </View>
                </TouchableRipple>

                <TouchableRipple
                    style={{ width: "100%",
                    backgroundColor:"#FFFF",
                    height:60,
                    textAlignVertical:"auto" ,
                    marginTop:20,
                    borderColor:"#282A8B",
                    borderWidth:1,
                    borderRadius:4
                }}
                // onPress={()=>{
                //     showTimerpicker();
                // }}
                >
                    <View>
                    <Text
                            style={{
                                marginTop:-10,
                                marginLeft:11,
                                backgroundColor:"#F9FBFF",
                                width:"28%",
                            }}
                        >
                            Event Time *
                        </Text>
                    
                    {/* <View
                        style={{
                            flexDirection:"row",
                            justifyContent:"space-between",
                            height:56,
                        }}
                    >
                        {/* <TextInput
                            style={{
                                width:"90%",
                                backgroundColor:"#FFFF",
                                marginTop:0
                            }}
                            keyboardType="numbers-and-punctuation"
                            placeholder="Time *"
                            placeholderTextColor="#000000DE"
                            underlineColorAndroid="transparent"
                            underlineColor="transparent"
                            value={time}
                            onChangeText={(text) => {
                                 setTime(text);
                            }}
                            theme={{ roundness: 4,color:"green" }}
                        /> 
                        <Text
                            style={{
                                width:"80%",
                                alignSelf:"center",
                                marginLeft:10
                            }}
                        >
                            {time.toTimeString()}
                        </Text>
                        <ImageBackground
                            style={{
                                width:20,
                                height:20,
                                alignSelf:"center",
                                justifyContent:"center",
                                marginRight:15
                            }}
                            source={require("../../assets/time_one.png")}
                        >
                            <Image
                                source={require("../../assets/time_two.png")}
                                style={{
                                    width:6,
                                    height:9,
                                    alignSelf:"center",
                                    justifyContent:"center"
                                }}
                            />
                        </ImageBackground>
                    </View> */}
                    <DatePicker
                      style={{width: "100%", marginTop:5,borderColor:"#282A8B",height:46,borderWidth:0,marginLeft:5}}
                      date={cT === new Date() ? null : cT}
                      mode="time"
                      placeholder="Date of Birth"
                      // format="YYYY-MM-DD"
                      // format="DD-MM-YYYY"
                      // minDate="2016-05-01"
                      // maxDate="2016-06-01"
                      
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      // customStyles={{
                      //   dateIcon: {
                      //     position: 'absolute',
                      //     left: 0,
                      //     top: 4,
                      //     marginLeft: 0
                      //   },
                      //   dateInput: {
                      //     marginLeft: 36
                      //   }
                      //   // ... You can check the source to find the other keys.
                      // }}
                      onDateChange={(date) => {setCT(date)}}
                    />
                    </View>
                </TouchableRipple>

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
                    }}
                    mode="outlined"
                    outlineColor="#282A8B"
                    keyboardType="numbers-and-punctuation"
                    underlineColorAndroid="transparent"
                    placeholder="Venue *"
                    label="Venue *"
                    multiline={true}
                    numberOfLines={5}
                    placeholderTextColor="#000000DE"
                    value={venue}
                    onChangeText={(text) => {
                    SetVenue(text);
                    }}
                    theme={{ roundness: 4,color:"green" }}
                 />
                 </View>
                 <View
                    style={{
                        height:56,
                        marginTop:16
                    }}
                 >
                <TextInput
                    style={{ width: "100%",
                        backgroundColor:"#FFFF",
                        justifyContent:"flex-start",
                        textAlignVertical:"auto" ,
                        marginTop:0,
                    }}
                    mode="outlined"
                    outlineColor="#282A8B"
                    keyboardType="numbers-and-punctuation"
                    underlineColorAndroid="transparent"
                    label="Event Details (URL)"
                    placeholder="Event Details (URL)"
                    placeholderTextColor="#000000DE"
                    multiline={true}
                    numberOfLines={5}
                    value={EventDetails}
                    onChangeText={(text) => {
                    setEventDetails(text);
                    }}
                    theme={{ roundness: 4,color:"green" }}
                 />
                 </View>
                </View>
                <TouchableRipple
                    style={{
                        borderWidth:1,
                        borderColor:"#282A8B",
                        height:82,
                        marginLeft:20,
                        marginRight:20,
                        borderRadius:6
                    }}
                    onPress={()=>pickImage()}
                >
                    <View
                        style={{
                            alignItems:"center"
                        }}
                    >
                    <Image
                        style={{
                            height:22,
                            width:35,
                            justifyContent:"center",
                            marginTop:10,
                            marginBottom:9
                            }}
                        resizeMode="contain"
                        source={require("../../assets/upload.png")}
                    />
                    <Text
                        style={{
                            alignSelf:"center",
                            color:"#282A8B"
                        }}
                    >
                        Upload Image
                    </Text>
                    </View>
                </TouchableRipple>
                {/* <Button
                    style={{
                        borderStyle:"dashed",
                        height:82,
                        borderWidth:1,
                        alignItems:"center",
                        alignItems:"center",
                        justifyContent:"center",
                        borderColor:"#282A8B",
                        marginLeft:20,
                        marginRight:20
                    }}
                    onPress={()=>pickImage()}
                    mode="outlined"
                    icon="cloud-upload"
                >
                    Upload Image
                </Button> */}
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
                            Create
                        </Text>

                    </TouchableRipple>
                </View>
        </ScrollView>
    )
}

export default Insert_Event;
