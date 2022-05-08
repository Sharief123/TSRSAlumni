import React,{useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    ToastAndroid,
    BackHandler
} from "react-native";
import {
    TextInput,
    Button,
    TouchableRipple,
    IconButton,
    Modal,
    Portal
} from "react-native-paper";
import axios from "axios";
import Env from "../auth/Env";
import { LogBox } from 'react-native';
import * as Location from "expo-location";  

import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from "react-native-material-dropdown-v2";
import Toast from 'react-native-root-toast';


const Professional_Details = (props) => {

    const userId = props.route.params.userId;
    

//     useEffect(() => {
//         if(props.route.params.UserId){
//             getData(); 
//         }
//   }, []);  

    useEffect(() => {

        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

    }, []);

    useEffect(()=>{
      const back = BackHandler.addEventListener('hardwareBackPress', ()=>true)
      return () => back.remove()
  }, [])
    // props.route.params.UserId;

    const [Categoryopen, setCategoryOpen] = useState(false);
    const [Categoryvalue, setCategoryValue] = useState(null);
    const [Categoryitems, setCategoryItems] = useState([
        {label: 'DPS', value: 'dps'},
        {label: 'CBSE', value: 'cbse'},
        {label: 'ICSE', value: 'icse'},
        {label: 'STATE', value: 'state'}
    ]);

    const [Professionopen, setProfessionOpen] = useState(false);
    const [Professionvalue, setProfessionValue] = useState(null);
    const [Professionitems, setProfessionItems] = useState([
        {label: 'HR', value: 'dps'},
        {label: 'Assocaite Trainee', value: 'cbse'},
        {label: 'Admin', value: 'icse'},
        {label: 'Trainee', value: 'state'}
    ]);

    const [Roleopen, setRoleOpen] = useState(false);
    const [Rolevalue, setRoleValue] = useState(null);
    const [Roleitems, setRoleItems] = useState([
        {label: 'Project Manager', value: 'dps'},
        {label: 'HR', value: 'cbse'},
        {label: 'Poject Lead', value: 'icse'},
    ]);

    const [WLCopen, setWLCOpen] = useState(false);
    const [WLCvalue, setWLCValue] = useState(null);
    const [WLCitems, setWLCItems] = useState([
        {label: 'India', value: 'dps'},
        {label: 'USA', value: 'cbse'},
        {label: 'UK', value: 'icse'},
        {label: 'Germany', value: 'state'}
    ]);

    const [WLSopen, setWLSOpen] = useState(false);
    const [WLSvalue, setWLSValue] = useState(null);
    const [WLSitems, setWLSItems] = useState([
        {label: 'AP', value: 'dps'},
        {label: 'Telanga', value: 'cbse'},
        {label: 'Tamil Naidu', value: 'icse'},
        {label: 'MH', value: 'state'}
    ]);

    const [WLCityopen, setWLCityOpen] = useState(false);
    const [WLCityvalue, setWLCityValue] = useState(null);
    const [WLCityitems, setWLCityItems] = useState([
        {label: 'Hyderabad', value: 'dps'},
        {label: 'Chennai', value: 'cbse'},
        {label: 'Mumbai', value: 'icse'},
        {label: 'Pune', value: 'state'}
    ]);

    const [companyName, setCompanyName] = useState("");
    const [businessMailId, setBusinessMailId] = useState("");

    const WLCity = props.route.params.map_address;

    // console.log(WLCity);

    const [Roles, SetRoles] = useState([]);
    const [Professions, SetProfessions] = useState([]);
    const [Categories, SetCategories] = useState([]);
    const [Country, SetCountry] = useState([]);
    const [States, SetStates] = useState([]);

    const [role, setrole] = useState("");
    const [profe, setprofession] = useState("");
    const [categories, setcategories] = useState("");
    const [cont, setcountry] = useState("");
    const [state, setstates] = useState("");

    const [response, setResponse] = useState([]);

    const [selectedCountryId, SetSelectedCountryId] = useState("");

    // console.log("Selected Country----->",selectedCountryId);

    const [loader, setloader] = useState(false);
    const [isModalVisible, setModalVisible] = React.useState(true);


  useEffect(() => {
    (async () => {
      if (props.route.params.userId) {
        //   console.log("1");
        getEvents();
      }
    })();
  }, []); 

const getEvents = async () => {
    try {
      setloader(true);
      var config = {
        method: "get",
        url: `${Env.BASE_URL}/api/master/data`,
      };

      console.log(config);

      const response = await axios(config);

      setResponse(response);
      SetCountry(response.data.Data.Countries);
      SetStates(response.data.Data.States);
      SetRoles(response.data.Data.Roles);
      SetProfessions(response.data.Data.Professions);
      SetCategories(response.data.Data.Categories);
      getLocation();

    //   console.log(response.data.Data.Countries)
    //   console.log("Events",events);
    //   console.log("Event Name::::>",events.EventText);
      setloader(false);
    } catch (error) {
      // console.log(error);
    }
  };

  const [locate, setLocation] = useState({});

    // const getData = async () => {

    //     try {

    //       const config = {
    //         method: "get",
    //         url: `${Env.BASE_URL}/api/master/data`,
    //       };

    //       console.log(config);

    //       const response = await axios(config);

    //       setResponse(response);

    //     //   SetRoles(response.data.Data.Roles);
    //     //   SetProfessions(response.data.Data.Professions);
    //     //   SetCategories(response.data.Data.Categories);
    //     //   SetCountry(response.data.Data.Countries);
    //     //   SetStates(response.data.Data.States);

    //     // setCat(country);

    //     // console.log(cat);

    //     } catch (e) {
    //       console.log(e);
    //     }
    //   };

      const roles = Roles.map((rol)=>{
        return {
            title:rol.Id,
            value:rol.Role1
        }
    });

    const profession = Professions.map((rol)=>{
      return {
          title:rol.ProfessionId,
          value:rol.Profession1
      }
  });
  
  const category = Categories.map((rol)=>{
      return {
          title:rol.CategoryId,
          value:rol.Category1
      }
  });

  const country = Country.map((rol)=>{
      return {
          title:rol.Id,
          value:rol.Name
      }
  });

//   const value = selectedCountryId+1;


  const states = States.map((rol)=>{
      if(selectedCountryId == rol.CountryId)
      {
        return {
            title:rol.Id,
            value:rol.Name
        }
    }
});

const [visisble, setVisible] = useState(true);


const getLocation = () => {
    try {
        setloader(true);

        (async () => {
          let { status } = await Location.requestPermissionsAsync();
          if (status !== "granted") {
            alert("Permission to access location was denied");
          }
         var location = await Location.getCurrentPositionAsync({});

         let { coords } = await Location.getCurrentPositionAsync();

         const { latitude, longitude } = coords;

         var address = await Location.reverseGeocodeAsync({
          latitude,
          longitude
         });

         if(location){
             setLocation(location.coords); 
            //  console.log(location.coords);
            //  lat(location.coords.latitude);
            //  lon(location.coords.longitude);
         }   
         if(address){
           for (let item of address) { 
            let Address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
            // console.log(Address);
            // SetAddress(address);
            // // console.log(Address.name);
            // // console.log(item.name);
            // SetName(item.name);
            // // console.log(item.city);
            // SetCity(item.city);
            // // console.log(item.subregion);
            // SetDist(item.subregion);
            // // console.log(item.postalCode);
            // SetPincode(item.postalCode);
            // // console.log(item.region);
            // SetState(item.region);
          }
         }        
        })();
        setloader(false);

    } catch(e) {
      console.log(e);
    }
  };

console.log("user-->",userId);

const Upload_Personal_Details = async () => {

    if(categories && profe && role && selectedCountryId && state && WLCity){
      setVisible(false);

    const PersonalDetails = {
        
            ApprovedStatus: null,
            ApprovedStatusText: null,
            ProfessionalDetails: {
                Id: "",
                UserId: userId,
                Category: categories,
                Profession: profe,
                Role: role,
                CompanyName: companyName,
                BusinessEmailId: businessMailId,
                Address: null,
                City: WLCity,
                Country: selectedCountryId,
                State:state,
                PinCode: null,
                CreatedBy: userId,
                CreatedOn: null,
                IsActive: true,
                ModifiedBy: null,
                ModifiedOn: null,
                Longitude: null,
                Latitude: null
              },
            RoleId: null,
            StatusId: 4,
            StatusText: null,
            UserId: userId
        }
    //7075759526
    console.log("Class Values:::>",PersonalDetails);

    var config = {
        method: "post",
        url: `${Env.BASE_URL}/api/user/profile`,
        headers: {
            "Content-Type": "application/json",
        },
        data: JSON.stringify(PersonalDetails),
        };
         
        const response =  await axios(config);

        // console.log(response);

        if(response.data.Message==="Record has been saved successfully"){
          setVisible(true);

            props.navigation.navigate("Add_Profile_Pic",{
                            "userId":userId,
                        });
            // alert("Done");
        } else {
            alert(response.data.Message);
            setVisible(true);
        }
    }else {
        // ToastAndroid.showWithGravityAndOffset(
        //     "All (*) Marked fields are mandatory",
        //     ToastAndroid.LONG,
        //     ToastAndroid.CENTER,
        //     25,
        //     50
        //   );
        setVisible(true);
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
          setVisible(true);
    }
  }

    return (
      // <View>
      //   {loader ? 
      //           <View
      //               style={{
      //               justifyContent: "center",
      //               alignItems: "center",
      //               marginTop:200
      //               }}
      //               >
      //           <Image
      //           style={{ height: 50, width: 50, justifyContent:"center" }}
      //           source={require("../../assets/a_load.gif")}
      //           />
      //           </View> 
      //       : 
      
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
                     Professional Details
                </Text>

                <Dropdown
                                  placeholder="Category *"
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
                                  data={category}
                                  onChangeText ={(value,index)=>{
                                    setcategories(category[index].title);
                                    // alert(category[index].title);
                                  }}
                            />

                            <Dropdown
                                 placeholder="Profession *"
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
                                  data={profession}
                                  onChangeText ={(value,index)=>{
                                    setprofession(profession[index].title);
                                  }}
                            />

                            <Dropdown
                                  placeholder="Role *"
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
                                  data={roles}
                                  onChangeText ={(value,index)=>{
                                    setrole(roles[index].title);
                                  }}
                            />

                <TextInput
                    style={{ width: "100%",
                        backgroundColor:"#FFFF",
                        height:"auto",justifyContent:"flex-start",
                        textAlignVertical:"auto" ,
                        marginTop:16,                        
                    }}
                    mode="outlined"
                    underlineColorAndroid="transparent"
                    outlineColor="#282A8B"
                    keyboardType="numbers-and-punctuation"
                    placeholder="Company Name"
                    label="Company Name"
                    multiline={true}
                    placeholderTextColor="#000000DE"
                    value={companyName}
                    onChangeText={(text) => {
                    setCompanyName(text);
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
                    underlineColorAndroid="transparent"
                    outlineColor="#282A8B"
                    keyboardType="numbers-and-punctuation"
                    placeholder="Business Email ID"
                    label="Business Email ID"
                    placeholderTextColor="#000000DE"
                    value={businessMailId}
                    onChangeText={(text) => {
                    setBusinessMailId(text);
                    }}
                    theme={{ roundness: 4, }}
            />

                        <Dropdown
                                  placeholder="Work Location Country *"
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
                                  data={country}
                                  onChangeText ={(title,index)=>{
                                    //   console.log("va--->",value);
                                    SetSelectedCountryId(country[index].title);
                                    getEvents();
                                  }}
                            />

                            <Dropdown
                                  placeholder="Work Location State *"
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
                                  data={states}
                                  onChangeText = {(value,index)=>{
                                    // SetSelectedCountryId(country[index].title);
                                    setstates(states[index].title);
                                  }}
                            />

                {/* <DropDownPicker
                    open={WLCopen}
                    value={WLCvalue}
                    items={WLCitems}
                    setOpen={setWLCOpen}
                    setValue={setWLCValue}
                    setItems={setWLCItems}
                    placeholder="Work Location Country *"
                    style={{
                        marginTop:16,
                        borderWidth:1,
                        borderRadius:4,
                        borderColor:"#282A8B",
                        height:56,
                    }}
                    onChangeText ={(Value)=>{
                        SetSelectedCountryId(Value);
                    }}
                /> */}

                {/* <DropDownPicker
                    open={WLSopen}
                    value={WLSvalue}
                    items={WLSitems}
                    setOpen={setWLSOpen}
                    setValue={setWLSValue}
                    setItems={setWLSItems}
                    placeholder="Work Location State *"
                    style={{
                        marginTop:16,
                        borderWidth:1,
                        borderRadius:4,
                        borderColor:"#282A8B",
                        height:56,

                    }}
                /> */}
                {/* <TouchableRipple
                    onPress={()=>{
                        // if(locate!=null){
                          // try {
                        props.navigation.navigate("Map_View",{
                            "user": userId,
                            "personal":"Professional_Details",
                            "locate_latitude":locate.latitude,
                            "locate_longitude":locate.longitude
                          });
                        
                        // catch (e){
                        //   alert("error",e);
                        // }
                        // }
                        // console.log(locate);
                    }}
                >
                  <View
                    style={{
                      flexDirection:"row"
                    }}
                  >
                    {/* <TextInput
                            style={{  width: "100%",
                            backgroundColor:"#FFFF",
                            justifyContent:"flex-start",
                            textAlignVertical:"top" ,
                            marginTop:16,
                            textAlign:"left", 
                            }}
                            mode="outlined"
                            label="Working Location City *"
                            underlineColorAndroid="transparent"
                            outlineColor="#282A8B"
                            multiline={true}
                            keyboardType="numbers-and-punctuation"
                            placeholder="Working Location City *"
                            placeholderTextColor="#000000DE"
                            value={WLCity}
                            maxLength={5}
                            editable={false}
                            // onChangeText={(text) => {
                            // setWLCity(text);
                            // }}
                            
                            theme={{ roundness: 4, }}
                    /> 
                    <TextInput
                    style={{ 
                      // height: "auto",
                      //   justifyContent: "flex-start",
                      //   textAlignVertical: "top",
                      //   padding:5,

                    width: "100%",
                    backgroundColor:"#FFFF",
                    justifyContent:"flex-start",
                    textAlignVertical:"top" ,
                    marginTop:16,
                    textAlign:"left",
                    }}
                    mode="outlined"
                    outlineColor="#282A8B"
                    underlineColorAndroid="#FFFFF"
                    placeholder="Working Location City *"
                    label="Working Location City *"
                    multiline={true}
                    editable={false}
                    numberOfLines={5}
                    placeholderTextColor="#000000DE"
                    value={WLCity}
                    // editable={false}
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
                 /> 
                    
                    </View>
            </TouchableRipple> */}

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
                                "personal":"Professional_Details",
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
                              marginLeft:5,
                              width:145,
                              paddingLeft:2,
                              color:"grey",
                              backgroundColor:"#F9FBFF"
                            
                          }}
                      >
                          Work Location City *
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
                            {WLCity}
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
                </View>
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
                         We are accessing your background location to update work location city with current location.
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
                            // props.navigation.navigate("Add_Profile_Pic",{
                            //     "UserId":userId,
                            // });
                            // alert("Pressed");
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
        </ScrollView>
// }
//         </View>
    )
}

export default Professional_Details;