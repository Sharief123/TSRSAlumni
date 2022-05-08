import React,{useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    ImageBackground,
    // ToastAndroid,
    StyleSheet,
    BackHandler,
    Pressable
} from "react-native";
import {
    TextInput,
    Button,
    TouchableRipple,
    IconButton,
    Card,
    Modal,
    Portal,
    Provider
} from "react-native-paper";
import axios from "axios";
import Env from "../auth/Env";
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import MapView, { Marker, Callout } from 'react-native-maps';  
import * as Location from "expo-location";  
import Address_MapView from "./Address_Map_View";
import Toast from 'react-native-root-toast';
import DatePicker from 'react-native-datepicker';

const Personal_Details = (props) => {

     const userId = props.route.params.userId; 
     // = props.route.params.UserId;

    // console.log("StatusId::::>","userID:::>",userId);


    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [alternativePhoneNumber, setAlternativePhoneNumber] = useState("")
    const [emailId, setEmailId] = useState("");
    const address = props.route.params.map_address;
    
    const pc = props.route.params.pincode;
    const c = props.route.params.city;

    
    
    const [active , SetActive] = useState(0); 

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [cD, setCD] = useState(new Date());

    console.log(cD);

    const [locate, setLocation] = useState({});
    // var lat_long = locate;
    const [Address, SetAddress] = useState([]);
    const [name, SetName] = useState("");
    const [City, SetCitys] = useState("");
    const [dist, SetDist] = useState("");
    const [Pincode, SetPinCode]= useState("");
    const [state, SetState] = useState("");
    const [loading, setLoading] = useState(true);

    // console.log("getting --> ",address);

    // console.log("getting location --> ",locate);
    
    const [city, setCity] = useState(`${c}`);
    const [pincode, setPincode] = useState(`${pc}`);

    const getAddress = () => {
      alert("P");
    }

    useEffect(() => {
        (async () => {
          getLocation();
            // setCity(props.route.params.city);
            // setPincode(props.route.params.pincode);
          if(locate){
          setTimeout(() => {
            // Alert.alert('I am appearing...', 'After 5 seconds!');
            // Setvisble(0);
            setLoading(false);
          }, 1000);
        }
            //  getLocation();
            //  console.log("1");
        //  console.log("User::::>",login);

      })();
      }, []);

      useEffect(()=>{
        const back = BackHandler.addEventListener('hardwareBackPress', ()=>true)
        return () => back.remove()
    }, [])

      const states = {
        markerData: {
          latitude: locate.latitude,
          longitude: locate.longitude,
        },
        mapData: {
          latitude: locate.latitude,
          longitude: locate.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        },
      };
    
      const [s, setState] = useState({});
    
    //   console.log("ss->",s);

      const handleRegionChange = mapData => {
        setState({
          markerData: {latitude: mapData.latitude, longitude: mapData.longitude},
          mapData,
        });
      };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
      };

      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };

      const showTimepicker = () => {
        showMode('date');
      };

    // Gender Dropdown Values
    const [Sectionopen, setSectionOpen] = useState(false);
    const [Sectionvalue, setSectionValue] = useState(null);
    const [Sectionitems, setSectionItems] = useState([
        {label: "Male", value:"Male"},
        {label: "Female", value:"Female"},
    ]);

    // Blood Group Dropdown Values
    const [BloodGroupopen, setBloodGroupOpen] = useState(false);
    const [BloodGroupvalue, setBloodGroupValue] = useState(null);
    const [BloodGroupitems, setBloodGroupItems] = useState([
        {label: "A+", value:"A+"},
        {label: "B+", value:"B+"},
        {label: "AB+", value:"AB+"},
        {label: "O+", value:"O+"},
        {label: "A-", value:"A-"},
        {label: "B-", value:"B-"},
        {label: "AB-", value:"AB-"},
        {label: "O-", value:"O-"},
    ]);

    // function getAddressFromCoordinates( latitude, longitude ) {
    //     console.log("1");
    //     return new Promise((resolve) => {
    //         console.log("2");
    //       const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=D2eeUkValxrkrvSouATfxsv11Kf5GIbXHRv1NJmcOfA&mode=retrieveAddresses&prox=${latitude},${longitude}`
    //       fetch(url)
    //         .then(res => res.json())
    //         .then((resJson) => {
    //             // console.log("3-->",resJson);
    //           // the response had a deeply nested structure :/
    //           if (resJson
    //             && resJson.Response
    //             && resJson.Response.View
    //             && resJson.Response.View[0]
    //             && resJson.Response.View[0].Result
    //             && resJson.Response.View[0].Result[0]) {
    //             resolve(resJson.Response.View[0].Result[0].Location.Address.Label)
    //             // console.log("welcome",resJson.Response.View[0].Result[0].Location.Address);
    //             console.log(resJson.Response.View[0].Result[0].Location.Address.City,
    //                 resJson.Response.View[0].Result[0].Location.Address.County,
    //                 resJson.Response.View[0].Result[0].Location.Address.State,
    //                 resJson.Response.View[0].Result[0].Location.Address.Country,
    //                 resJson.Response.View[0].Result[0].Location.Address.PostalCode
    //                 )
    //           } else {
    //             resolve()
    //           }
    //         })
    //         .catch((e) => {
    //           console.log('Error in getAddressFromCoordinates', e)
    //           resolve()
    //         })
    //     })
    //   }

    const [isModalVisible, setModalVisible] = React.useState(true);
    // const [visble,Setvisble] = useState(0);
    // const toggleModal = () => {
    //   setModalVisible(!isModalVisible);
    //   // Setvisble(1);
    // };

    const [mapaddress, map_address] = useState("");
            function getAddressFromCoordinates( latitude, longitude ) {
                console.log("1");
                return new Promise((resolve) => {
                    console.log("2");
                  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyA69Xk8mgf-LWWW4-KvT82tvz4rIsJbMfU`
                  fetch(url)
                    .then(res => res.json())
                    .then((resJson) => {
                        if(resJson)
                        {
                           if(resJson.plus_code) 
                           {
                               if(resJson.plus_code.compound_code)
                               {
                                   //
                                //    alert(resJson.plus_code.compound_code);
                                   map_address(resJson.plus_code.compound_code);
                            
                               }
                           }
                        }
                        // console.log("3-->",resJson.plus_code.compound_code);
                      // the response had a deeply nested structure :/
                    //   if (resJson
                    //     && resJson.Response
                    //     && resJson.Response.View
                    //     && resJson.Response.View[0]
                    //     && resJson.Response.View[0].Result
                    //     && resJson.Response.View[0].Result[0]) {
                    //     resolve(resJson.Response.View[0].Result[0].Location.Address.Label)
                        // console.log("welcome",resJson.Response.View[0].Result[0].Location.Address);
                        // console.log(resJson.Response.View[0].Result[0].Location.Address.City,
                        //     resJson.Response.View[0].Result[0].Location.Address.County,
                        //     resJson.Response.View[0].Result[0].Location.Address.State,
                        //     resJson.Response.View[0].Result[0].Location.Address.Country,
                        //     resJson.Response.View[0].Result[0].Location.Address.PostalCode
                        //     )
                       else {
                        resolve()
                      }
                    })
                    .catch((e) => {
                      console.log('Error in getAddressFromCoordinates', e)
                      resolve()
                    })
                })
              }

    function getLocation(){
        try {
          // setLoading(true);
            (async () => {
              let { status } = await Location.requestPermissionsAsync();
              if (status !== "granted") {
                alert("Permission to access location was denied");
              }
              // alert(status);
             var location = await Location.getCurrentPositionAsync({});

             let { coords } = await Location.getCurrentPositionAsync();

             const { latitude, longitude } = coords;

             var address = await Location.reverseGeocodeAsync({
              latitude,
              longitude
             });
             if(location){
                 setLocation(location.coords); 
             }   
            //  var a = s;

             if(address){
               for (let item of address) { 
                let Address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
                SetAddress(address);
                console.log(Address);
                console.log(item.postalCode);
                SetName(item.name);
                // console.log(item.city);
                SetCitys(item.city);
                // console.log(item.subregion);
                SetDist(item.subregion);
                // console.log(item.postalCode);
                SetPinCode(item.postalCode);
                // console.log(item.region);
                SetState(item.region);
              }
             }        
            })();
            // setLoading(false);
        } catch(e) {
          console.log(e);
        }
      };

      const [visisble, setVisible] = useState(true);

      const [dates, setDates] = useState(new Date())
      const [open, setOpen] = useState(false)

    const Upload_Personal_Details = async () => {
        
        if(firstName && lastName && Sectionvalue && address && emailId){
          setLoading(true);
          setVisible(false);

        const PersonalDetails = {
            
                ApprovedStatus: null,
                ApprovedStatusText: null,
                PersonalDetails:  {
                  Address: address,
                  BloodGroup: null,
                  City: c,
                  Country: null,
                  CreatedBy: userId,
                  CreatedOn: null,
                  DateOfBirth: cD,
                  Email: emailId,
                  FirstName: firstName,
                  Gender: Sectionvalue,
                  Id: "",
                  ImageURL: null,
                  IsActive: true,
                  LastName: lastName,
                  Latitude: locate.latitude,
                  Longitude: locate.longitude,
                  MiddleName: middleName,
                  ModifiedBy: null,
                  ModifiedOn: null,
                  Phone: alternativePhoneNumber,
                  Pincode: pc,
                  State: null,
                  UserId: userId
                },
                RoleId: null,
                StatusId: 2,
                StatusText: null,
                UserId: userId
            }
        
        console.log("Personal Values:::>",PersonalDetails);

        var config = {
            method: "post",
            url: `${Env.BASE_URL}/api/user/profile`,
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(PersonalDetails),
            };
             
            const response =  await axios(config);

            console.log(response);

            if(response.data.Message==="Record has been saved successfully"){
              setLoading(false);
              setVisible(true);

                props.navigation.navigate("Family_Details",{
                                "userId":userId,
                            });

            } else {
              setLoading(false);
                alert(response.data.Message);
                setVisible(true);

            }

        } else {
          setLoading(false);

            // ToastAndroid.showWithGravityAndOffset(
            //     "All (*) Marked fields are mandatory",
            //     ToastAndroid.LONG,
            //     ToastAndroid.CENTER,
            //     25,
            //     50
            //   );
            //   setVisible(true);
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
      }

      const mapRef = useRef(null);

    const [region, setRegion] = useState({
        latitude: 51.5079145,
        longitude: -0.0899163,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });

     const maps = {
        region: {
          latitude: locate.latitude, 
          longitude: locate.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        },
        markers: []        // Here it is
      }

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
         <View>
         {locate != null ?
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
                     Personal Details
                </Text>

                

                <TextInput
                    style={{ width: "100%",
                        backgroundColor:"#FFFF",
                        height:"auto",justifyContent:"flex-start",
                        textAlignVertical:"auto" ,
                        marginTop:25,
                    }}
                    mode="outlined"
                    outlineColor="#282A8B"
                    keyboardType="numbers-and-punctuation"
                    underlineColorAndroid="transparent"
                    placeholder="First Name *"
                    label="First Name *"
                    placeholderTextColor="#000000DE"
                    value={firstName}
                    multiline={true}
                    onChangeText={(text) => {
                    setFirstName(text);
                    }}
                    theme={{ roundness: 4,color:"green" }}
                 />
                <TextInput
                    style={{ width: "100%",
                        backgroundColor:"#FFFF",
                        height:"auto",justifyContent:"flex-start",
                        textAlignVertical:"auto" ,
                        marginTop:16,
                        borderColor:"#282A8B"
                    }}
                    mode="outlined"
                    outlineColor="#282A8B"
                    keyboardType="numbers-and-punctuation"
                    underlineColorAndroid="transparent"
                    placeholder="Middle Name "
                    label="Middle Name"
                    placeholderTextColor="#000000DE"
                    value={middleName}
                    multiline={true}
                    onChangeText={(text) => {
                    setMiddleName(text);
                    }}
                    theme={{ roundness: 4,color:"green" }}
                 />
{/* <Button title="Open" onPress={() => setOpen(true)} >Open</Button> */}
{/* <DatePicker date={dates} onDateChange={setDates} /> */}
                <TextInput
                    style={{ width: "100%",
                        backgroundColor:"#FFFF",
                        height:"auto",justifyContent:"flex-start",
                        textAlignVertical:"auto" ,
                        marginTop:16,
                        borderColor:"#282A8B"
                    }}
                    mode="outlined"
                    outlineColor="#282A8B"
                    keyboardType="numbers-and-punctuation"
                    underlineColorAndroid="transparent"
                    placeholder="Last Name *"
                    label="Last Name *"
                    placeholderTextColor="#000000DE"
                    value={lastName}
                    multiline={true}
                    onChangeText={(text) => {
                    setLastName(text);
                    }}
                    theme={{ roundness: 4,color:"green" }}
                 />

                <TextInput
                    style={{ width: "100%",
                        backgroundColor:"#FFFF",
                        height:"auto",justifyContent:"flex-start",
                        textAlignVertical:"auto" ,
                        marginTop:16,
                        borderColor:"#282A8B"
                    }}
                    mode="outlined"
                    keyboardType="number-pad"
                    outlineColor="#282A8B"
                    underlineColorAndroid="transparent"
                    placeholder="Alternative Phone Number "
                    placeholderTextColor="#000000DE"
                    label="Alternative Phone Number "

                    value={alternativePhoneNumber}
                    maxLength={10}
                    onChangeText={(text) => {
                    setAlternativePhoneNumber(text);
                    }}
                    theme={{ roundness: 4,color:"green" }}
                 />

                <TextInput
                    style={{ width: "100%",
                        backgroundColor:"#FFFF",
                        height:"auto",justifyContent:"flex-start",
                        textAlignVertical:"auto" ,
                        marginTop:16,
                        borderColor:"#282A8B"
                    }}
                    mode="outlined"
                    outlineColor="#282A8B"
                    keyboardType="email-address"
                    underlineColorAndroid="transparent"
                    placeholder="Email Id *"
                    label="Email Id *"
                    placeholderTextColor="#000000DE"
                    value={emailId}
                    onChangeText={(text) => {
                    setEmailId(text);
                    }}
                    theme={{ roundness: 4,color:"green" }}
                 />

            <TouchableRipple
                    style={{ width: "100%",
                    backgroundColor:"#FFFF",
                    height:60,
                    textAlignVertical:"auto" ,
                    marginTop:16,
                    borderColor:"#282A8B",
                    borderWidth:1,
                    borderRadius:4
                }}
                onPress={()=>{
                    showTimepicker();
                }}
                >
                  <View>
                    <Text
                      style={{
                        marginTop:-10,
                        marginLeft:10,
                        backgroundColor:"#F9FBFF",
                        width:"28%"
                      }}
                    >
                      Date Of Birth
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
                              {show && (
                                <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                open={open}
                                mode={"date"}
                                is24Hour={false}
                                display="default"
                                onChange={onChange}
                                />
                            )}
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

                

                <DropDownPicker
                    open={Sectionopen}
                    value={Sectionvalue}
                    items={Sectionitems}
                    setOpen={setSectionOpen}
                    setValue={setSectionValue}
                    setItems={setSectionItems}
                    placeholder="Gender *"
                    label="Gender *"
                    style={{
                        marginTop:16,
                        borderWidth:1,
                        borderRadius:4,
                        borderColor:"#282A8B",
                        height:56,
                        overflow:"hidden"
                    }}
                    onChangeText ={(value)=>{
                        setSectionValue(value);
                        // console.log("value",value);
                      }}
                />

                <DropDownPicker
                    open={BloodGroupopen}
                    value={BloodGroupvalue}
                    items={BloodGroupitems}
                    setOpen={setBloodGroupOpen}
                    setValue={setBloodGroupValue}
                    setItems={setBloodGroupItems}
                    placeholder="Blood Group *"
                    label="Blood Group *"
                    style={{
                        marginTop:16,
                        borderWidth:1,
                        borderRadius:4,
                        borderColor:"#282A8B",
                        height:56,
                        display:"none"
                    }}
                    onChangeText ={(value)=>{
                        setSectionValue(value);
                        console.log("value",value);
                      }}
                />
                
                  {/* <TextInput
                    style={{ 
                      // height: "auto",
                      //   justifyContent: "flex-start",
                      //   textAlignVertical: "top",
                      //   padding:5,

                    width: "100%",
                    backgroundColor:"#FFFF",
                    justifyContent:"flex-start",
                    textAlignVertical:"top" ,
                    marginTop:0,
                    textAlign:"left",
                    }}
                    // onFocus={getAddress}
                    mode="outlined"
                    outlineColor="#282A8B"
                    underlineColorAndroid="#FFFFF"
                    placeholder="Address *"
                    label="Address *"
                    multiline={true}
                    numberOfLines={5}
                    placeholderTextColor="#000000DE"
                    value={address}
                    editable={true}
                    onChangeText={getAddress}
                    // onPress={()=>{
                    // //     SetActive(1);
                    // //     getLocation();
                    // // }}
                    // onChangeText={(text) => {
                    //     // SetActive(1);
                    //     // getLocation();
                    //     setAddress(text);
                    // }}
                    theme={{ roundness: 4,color:"green" }}
                 /> */}
                 
                <TouchableRipple
                        onPress={()=>{
                            // SetActive(1);
                            // getLocation();
                            try{
                            if(locate != null ){
                              // if(address != null){
                                try {
                              props.navigation.navigate("Map_View",{
                                "user": userId,
                                "personal":"Personal_Details",
                                "locate_latitude":locate.latitude,
                                "locate_longitude":locate.longitude
                              });
                            } catch(e){
                              alert(e);
                            }
                          } else {
                            alert("No values");
                          }
                        } catch(e){
                          alert(e);
                        }
                            // alert(`${locate.latitude}`+`${locate.longitude}`+"welcome");
                              // alert("Locate",locate);
                          // console.log("value",locate);
                            // alert("Pressed");
                        }}
                        style={{
                          marginTop:16,
                          height:"auto",
                        }}
                 >
                   <View
                      style={{ 
                        // height: "auto",
                        //   justifyContent: "flex-start",
                        //   textAlignVertical: "top",
                        //   padding:5,

                        width: "100%",
                        borderWidth:1,
                        backgroundColor:"#FFFF",
                        justifyContent:"flex-start",
                        textAlignVertical:"top" ,
                        marginTop:0,
                        textAlign:"left",
                        borderColor:"#282A8B",
                        padding:10,
                        borderRadius:4
                      }}
                   >
                      <Text
                          style={{
                              marginTop:-20,
                              backgroundColor:"#F9FBFF",
                              width:70,
                              marginLeft:5,
                              paddingLeft:2,
                              color:"grey",
                              backgroundColor:"#F9FBFF"
                            
                          }}
                      >
                          Address *
                      </Text>  
                        <Text
                          style={{
                            padding:10,
                            width: "100%",
                            backgroundColor:"#FFFF",
                            justifyContent:"flex-start",
                            textAlignVertical:"top" ,
                            marginTop:0,
                            textAlign:"left",
                            borderColor:"#282A8B",
                            height:75
                          }}
                          numberOfLines={5}
                          multiline={true}
                        >
                            {address}
                        </Text>
                     </View>
                {/* <TextInput
                    style={{ 
                      // height: "auto",
                      //   justifyContent: "flex-start",
                      //   textAlignVertical: "top",
                      //   padding:5,

                    width: "100%",
                    backgroundColor:"#FFFF",
                    justifyContent:"flex-start",
                    textAlignVertical:"top" ,
                    marginTop:0,
                    textAlign:"left",
                    }}
                    mode="outlined"
                    outlineColor="#282A8B"
                    underlineColorAndroid="#FFFFF"
                    placeholder="Address *"
                    label="Address *"
                    multiline={true}
                    numberOfLines={5}
                    placeholderTextColor="#000000DE"
                    value={address}
                    editable={false}
                    // onPress={()=>{
                    // //     SetActive(1);
                    // //     getLocation();
                    // // }}
                    // onChangeText={(text) => {
                    //     // SetActive(1);
                    //     // getLocation();
                    //     setAddress(text);
                    // }}
                    theme={{ roundness: 4,color:"green" }}
                 /> */}
                 </TouchableRipple>
                     {/* <TouchableRipple
                        onPress={()=>{
                            // SetActive(1);
                            // getLocation();
                            try{
                            if(locate != null ){
                              // if(address != null){
                                try {
                              props.navigation.navigate("Map_View",{
                                "user": userId,
                                "personal":"Personal_Details",
                                "locate_latitude":locate.latitude,
                                "locate_longitude":locate.longitude
                              });
                            } catch(e){
                              alert(e);
                            }
                          } else {
                            alert("No values");
                          }
                        } catch(e){
                          alert(e);
                        }
                            // alert(`${locate.latitude}`+`${locate.longitude}`+"welcome");
                              // alert("Locate",locate);
                          // console.log("value",locate);
                            // alert("Pressed");
                        }}
                        style={{
                          marginTop:16,
                          height:"auto",
                        }}
                 ></TouchableRipple> */}

                 {/* <View
                    style={{
                        borderColor:"#282A8B",
                        borderWidth:1,
                        borderRadius:6,
                        marginTop:16,
                        height:201,
                    }}
                > */}
                {/* <TextInput
                     style={{
                         height: "auto",
                        justifyContent: "flex-start",
                        textAlignVertical: "top",
                        padding:5
                     }}
                     mode="outlined"
                     keyboardType="default"
                     outlineColor="#282A8B"
                     multiline={true}
                     underlineColorAndroid="transparent"
                     placeholder="Comments"
                     value={"Lorem Ipsum is simply dummy text of the printing and typesetting industry"+
                      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"}
                     placeholderTextColor="#000000DE"
                    //  value={address}
                     label="Comments"
                    //  onChangeText={(text) => {
                    //  setReject(text);
                    //  }}
                 /> */}
             {/* </View> */}

                 <View style={{
                   height:400,
                   marginTop:20,display:"none"
                 }}>
                    <MapView
                      ref={mapRef}
                      style={styles.map}
                      initialRegion={{
                        latitude: 16.4880249,
                        longitude: 79.8628015,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}
                      showsUserLocation={true}
                      zoomEnabled={true}
                      followUserLocation = {true}
                      onRegionChangeComplete={(region) => 
                        {
                        setRegion(region);
                        getAddressFromCoordinates(region.latitude,region.longitude);
                        }
                    }
                    >
        {/* <Marker coordinate={region}/> */}
        </MapView>
        {/* AIzaSyDtMnVk7wPXMU5eZYRt9u-40tAt1vyPkPE */}
        {/* AIzaSyDtMnVk7wPXMU5eZYRt9u-40tAt1vyPkPE */}
        {/* AIzaSyDt4yop2vXFsZB-0Lx1ZFKnitAEEmkxazc */}
            {/* <View>
            <Text style={styles.text}>{mapaddress}</Text>
            <Button
                title="Ok"
                onPress={()=>{
                    //if()
                    // props.navigation.navigate(
                    //     "Personal_Details",
                    //     {
                    //         "map_address": mapaddress,
                    //         // "userId": user
                    //     }
                    // );
                    // toggleModal();
                    alert("Map->",`${mapaddress}`);
                }}
            >Ok</Button>
            </View> */}
      </View>
                 {/* <Address_MapView
                 navigation={props.navigation}y
                 screen={"Personal_Details"}
                 /> */}
                 {/* <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: locate.latitude,
            longitude: locate.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChangeComplete={(region) => 
            {
            setRegion(region);
            getAddressFromCoordinates(region.latitude,region.longitude);
            
            }
        }
        >
        <Marker coordinate={region}/>
        </MapView>
            <View>
            <Text style={styles.text}>{mapaddress}</Text>
            <Button
                title="Ok"
                onPress={()=>{
                    //if()
                    alert(mapaddress);
                    // props.navigation.navigate(
                    //     `${redirectTo}`,
                    //     {
                    //         "map_address": mapaddress,
                    //         "userId": user
                    //     }
                    // );
                }}
            >Ok</Button>
            </View>
      </View> */}
                <TextInput
                    style={{ width: "100%",
                        backgroundColor:"#FFFF",
                        height:"auto",justifyContent:"flex-start",
                        textAlignVertical:"auto" ,
                        marginTop:16,
                        borderColor:"#282A8B"
                    }}
                    mode="outlined"
                    outlineColor="#282A8B"
                    keyboardType="numbers-and-punctuation"
                    underlineColorAndroid="transparent"
                    placeholder="City *"
                    placeholderTextColor="#000000DE"
                    value={c}
                    label="City *"
                    editable={false}
                    // onChangeText={(text) => {
                    //   setCity(text);
                    // }}
                    theme={{ roundness: 4,color:"green" }}
                 />

                <TextInput
                    style={{ width: "100%",
                        backgroundColor:"#FFFF",
                        height:"auto",justifyContent:"flex-start",
                        textAlignVertical:"auto" ,
                        marginTop:16,
                        borderColor:"#282A8B"
                    }}
                    mode="outlined"
                    outlineColor="#282A8B"
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                    placeholder="Pincode *"
                    label="Pincode *"
                    placeholderTextColor="#000000DE"
                    editable={false}
                    value={pc}
                    // onChangeText={(text) => {
                    //   setPincode(text);
                    // }}
                    theme={{ roundness: 4,color:"green" }}
                 />

          {/* {active == 1 ? 

          <MapView
                  style={
                    {  
                      position: 'absolute',  
                      top: 20,  
                      left: 0,  
                      right: 0,  
                      bottom: 0,  
                      height:500,
                    } 
                  }
                    // initialRegion={{
                    //   latitude: 16.4880289,
                    //   longitude: 79.862807,
                    //   latitudeDelta: 0.0922,
                    //   longitudeDelta: 0.0421,
                    // }}
                    region={{
                            // city: "Piduguralla",
                            // country: "India",
                            // district: "",
                            // isoCountryCode: "IN",
                            // name: "FVQ7+64M",
                            // postalCode: "522413",
                            // region: "Andhra Pradesh",
                            // street: "",
                            // subregion: "Guntur",
                            // timezone: "",
                          
                          latitude: s.latitude == null ? locate.latitude : s.latitude,
                          longitude: s.longitude == null ? locate.longitude : s.longitude,
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421,
                        }}
                    showsUserLocation={false}  
                    zoomEnabled={true}  
                    moveOnMarkerPress ={true}
                    zoomControlEnabled={true}
                    // ref={result => {
                    //     // markerData = result
                    //     // console.log(result);
                    //     setState(result.nativeEvent.region);
                    //     // console.log("Map----=>",MapView.__lastRegion.latitude,MapView.__lastRegion.latitude);
                    //     // .MapView__lastRegion.latitude,result.__lastRegion.longitude);
                    // }}
                    onRegionChangeComplete={
                      (result)=> {
                        // setState(result.nativeEvent.region);
                        // setState({markerData: result}),
                        // console.log("welcome===->",result);
                        setState(result);
                        getAddressFromCoordinates(s.latitude,s.longitude);
                        // console.log("res-->",result)
                      }
                    }
                    // onPress={(result)=>{
                    //     // alert({markerData: locate.});
                    //     console.log({markerData: result});
                    // }}
                >
                   <Marker  
                      coordinate={{
                        latitude: s.latitude == null ? locate.latitude : s.latitude,
                        longitude: s.latitude == null ? locate.longitude : s.longitude,
                        //    latitude: locate.latitude,
                        //    longitude: locate.longitude,
                         }}

                    //   coordinate={states.markerData}
                      draggable={true}
                      onDragEnd={e => {
                        console.log("Location Datass::::>",e.nativeEvent.coordinate);
                      }}
                    >
                      <Callout tooltip>
                      <Card
                            style={{
                              height:100,
                              padding:0,
                              width:"100%"
                            }}
                          >
                        <View
                          style={{
                            height:120,
                            paddingLeft:10,
                            paddingRight:10,
                            paddingTop:20
                          }}
                        >
                          <Text>
                            {name} {City}  {Pincode} 
                          </Text>
                          <Text>
                            {dist} {state}
                          </Text>
                        </View>
                        </Card>
                      </Callout>
                    </Marker>
                </MapView> 
: null 
} */}
{/* {visble === 0 ?  */}
      <Portal>
          <Modal
                 visible={isModalVisible}
                 onDismiss={()=>{setModalVisible(false);}}
                 style={{
                     height:130,
                     backgroundColor:"#FF9248",
                     marginLeft:10,
                     marginRight:10,
                     marginTop:200,
                     alignSelf:"flex-end",
                     position:"absolute",
                     borderRadius:6,
                     zIndex:100,
                     justifyContent:"center"
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
                         We are accessing your background location to update address with current location.
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
                              marginRight:5,
                              display:"none"
                          }}
                          color="#FFFFFF"
                          uppercase={false}
                          onPress={()=>{
                            // appState.current = "unknown";
                            // toggleModal();
                        }}
                          >
                              Cancel
                          </Button>
                          <Button
                            onPress={()=>{
                                // props.navigation.navigate("notifications");
                                // appState.current = "unknown";
                                // toggleModal();
                                setModalVisible(false);
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
              </Portal>
              {/* : null } */}
                </View>
                : null}
                </View>
                }

                {loading == false ?
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
                            // props.navigation.navigate("Family_Details",{
                            //     "UserId":userId,
                            // });
                            Upload_Personal_Details();
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
                : null }

        </ScrollView>
    )
}

export default Personal_Details;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    padding:10,
    height:100,
    marginBottom:-40,
    marginLeft:20,
    marginRight:20,
    marginTop:10
  },
});