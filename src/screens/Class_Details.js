import React,{useState, useEffect} from "react";
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
    List
} from "react-native-paper";
import axios from "axios";
import Env from "../auth/Env";
import { LogBox } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from "react-native-material-dropdown-v2";
import useAuth from "../auth/useAuth";
import Toast from 'react-native-root-toast';


const Class_Details = (props) => {

    // const statusId = props.route.params.StatusId;
    //  const { userId } = useAuth(); 
    //= props.route.params.UserId;
    // console.log("user--->",userId)
    // console.log("StatusId::::>","userID:::>",userId);


    const userId = props.route.params.userId;

    const [visisble, setVisible] = useState(true);

    const [Years, setYears] = useState([{}]);

    useEffect(() => {
          LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

          var curYear = new Date().getFullYear();
        //   console.log("C Year:::>",curYear);
          var startYear=1983;
          let arrBatchYear=[];
          for(var i = startYear; i <= curYear ; i++) {
           setYears(arrBatchYear.push(i));
            //   arrBatchYear.push(i);
            // setYears(i);
          }
        //   setSchoolItems(arrBatchYear);
          SetLOY(arrBatchYear);
    }, [])

    useEffect(()=>{
        const back = BackHandler.addEventListener('hardwareBackPress', ()=>true)
        return () => back.remove()
    }, [])

    let [ListOfYears, SetLOY ]= useState([{}]);
    //console.log("Years:::::>",arrBatchYear);
    // console.log("LOY ::::>",ListOfYears);

    // console.log("Yrs:::::>",Years);
    // console.log("va::>",Schoolitems);

    const [section, setSection] = useState("");

    
    const [Admission, setAdmissionNumber] = useState("");

    const [Schoolopen, setSchoolOpen] = useState(false);
    const [Schoolvalue, setSchoolValue] = useState(null);
    // const [Schoolitems, setSchoolItems] = useState([{}]);

    const schoolyears = ListOfYears.map((year)=>{
        return {
            title: year,
            value: year,
    }
    });

    // sety(schoolyears)
    // const [y, sety] = useState([{}]);

    // console.log(schoolyears);

    const [Sectionopen, setSectionOpen] = useState(false);
    const [Sectionvalue, setSectionValue] = useState(null);
    const [Sectionitems, setSectionItems] = useState([
        {label: "A", value:"A"},
        {label: "B", value:"B"},
        {label: "C", value:"C"},
    ]);

    const [year, SetYear] = useState("");

    // console.log("Value:::>",year);

          const Upload_Class_Details = async () => {

            if(year && Sectionvalue && Admission){
                setVisible(false);

            const ClassDetails = {
                
                      UserId: userId,
                      RoleId: null,
                      StatusId: 1,
                      StatusText: null,
                      ApprovedStatus: null,
                      ApprovedStatusText: null,
                      ClassSocialDetails: {
                        Id: userId,
                        Batch: year,
                        Section: Sectionvalue,
                        Linkedin: null,
                        Instagram: null,
                        Facebook: null,
                        IsApproved: null,
                        ApprovedBy: null,
                        AdmissionNumber: Admission,
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
                url: `${Env.BASE_URL}/api/user/profile`,
                headers: {
                    "Content-Type": "application/json",
                },
                data: JSON.stringify(ClassDetails),
                };
                 
                const response =  await axios(config);

                if(response.data.Message==="Record has been saved successfully"){
                    setVisible(true);

                    props.navigation.navigate("Personal_Details",{
                                    "userId":userId,
                                });
                } else {
                    alert(response.data.Message);
                    setVisible(true);

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
                // onPress={() => {
                // props.navigation.goBack();
                // }}
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
                     Class Details
                </Text>

                            <Dropdown
                                  placeholder="Batch *"
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
                                  data={schoolyears}
                                  onChangeText ={(value)=>{
                                    SetYear(value);
                                  }}
                            />

            <DropDownPicker
                    open={Sectionopen}
                    value={Sectionvalue}
                    items={Sectionitems}
                    setOpen={setSectionOpen}
                    setValue={setSectionValue}
                    setItems={setSectionItems}
                    placeholder="Section *"
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
                        console.log("value",value);
                      }}
                /> 
 
                <TextInput
                    style={{ width: "100%",
                        backgroundColor:"#FFFF",
                        height:56,justifyContent:"flex-start",
                        textAlignVertical:"auto" ,
                        marginTop:16,                        
                    }}
                    mode="outlined"
                    label="Admission Number *"
                    underlineColorAndroid="transparent"
                    outlineColor="#282A8B"
                    keyboardType="numeric"
                    placeholder="Admission Number *"
                    placeholderTextColor="#000000DE"
                    value={Admission}
                    onChangeText={(text) => {
                    setAdmissionNumber(text);
                    }}
                    theme={{ roundness: 4, }}
            />
               
                </View>
                <View
                    style={{
                        justifyContent:"center",
                        marginTop:20,
                        paddingLeft:20,
                        paddingRight:20,
                        marginBottom:20,
                    }}
                >
                <Button 
                        uppercase={false}
                        color="white"
                        onPress={()=>{
                            // props.navigation.navigate("Personal_Details",{
                            //     "UserId":userId,
                            // });
                            // alert("Pressd");
                            Upload_Class_Details();
                        }}
                        style={{
                            height:56,
                            width:"100%",
                            backgroundColor:"#282A8B",
                            alignSelf:"center",
                            justifyContent:"center",
                            marginTop:20,
                            display: visisble === false ? "none" : "flex"
                        }}>
                            Continue
                    </Button>
                </View>
        </ScrollView>
    )
}

export default Class_Details;