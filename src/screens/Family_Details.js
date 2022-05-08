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
    IconButton
} from "react-native-paper";

import { LogBox } from 'react-native';
import axios from "axios";
import Env from "../auth/Env";

import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from "react-native-material-dropdown-v2";
import Toast from 'react-native-root-toast';


const Family_Details = (props) => {

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

    const userId = props.route.params.userId;
    // const userId = 1065;

    console.log("StatusId::::>","userID:::>",userId);
    const [loading, setLoading] = useState(false);

    const [MartialStatusopen, setMartialStatusOpen] = useState(false);
    const [MartialStatusvalue, setMartialStatusValue] = useState(null);
    const [MartialStatuslitems, setMartialStatusItems] = useState([
        {label: 'Single', value: 'Single'},
        {label: 'Married', value: 'Married'},
    ]);

    // console.log("Martial--Status::>",MartialStatusvalue);

    const [NOCopen, setNOCOpen] = useState(false);
    const [NOCvalue, setNOCValue] = useState([]);
    const [children, setNoOfChildren] = useState("");

    const [NOCitems, setNOCItems] = useState([
        {label: '0', value: '0'},
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'}
    ]);

    const [c1Name, SetC1Name] = useState("");
    const [C1Educationopen, setC1EducationOpen] = useState(false);
    const [C1Educationvalue, setC1EducationValue] = useState('');
    const [C1Educationitems, setC1EducationItems] = useState([
        {label: 'Primary', value: 'Primary'},
        {label: 'Secondary', value: 'Secondary'},
        {label: 'Intermediate', value: 'Intermediate'},
        {label: 'Graduation', value: 'Graduation'},
        {label: 'Post Graduation', value: 'Post Graduation'},
        {label: 'Employee', value: 'Employee'},
        {label: 'Self Employee', value: 'Self Employee'}
    ]);

    const [c2Name, setC2Name] = useState("");
    const [C2Educationopen, setC2EducationOpen] = useState(false);
    const [C2Educationvalue, setC2EducationValue] = useState('');
    const [C2Educationitems, setC2EducationItems] = useState([
        {label: 'Primary', value: 'Primary'},
        {label: 'Secondary', value: 'Secondary'},
        {label: 'Intermediate', value: 'Intermediate'},
        {label: 'Graduation', value: 'Graduation'},
        {label: 'Post Graduation', value: 'Post Graduation'},
        {label: 'Employee', value: 'Employee'}
    ]);

    const [c3Name, setC3Name] = useState("");
    const [C3Educationopen, setC3EducationOpen] = useState(false);
    const [C3Educationvalue, setC3EducationValue] = useState('');
    const [C3Educationitems, setC3EducationItems] = useState([
        {label: 'Primary', value: 'Primary'},
        {label: 'Secondary', value: 'Secondary'},
        {label: 'Intermediate', value: 'Intermediate'},
        {label: 'Graduation', value: 'Graduation'},
        {label: 'Post Graduation', value: 'Post Graduation'},
        {label: 'Employee', value: 'Employee'}
    ]);

    const [spouseName, setSpouseName] = useState("");

    useEffect(()=>{
        const back = BackHandler.addEventListener('hardwareBackPress', ()=>true)
        return () => back.remove()
    }, [])

    const [visisble, setVisible] = useState(true);

    const Upload_Personal_Details = async () => {

        if(MartialStatusvalue){
            // setLoading(true);
            if(MartialStatusvalue === "Married")
            {
                if(spouseName && children) {
                    const PersonalDetails = {
            
                        ApprovedStatus: null,
                        ApprovedStatusText: null,
                        FamilyDetails: {
                            Id: "",
                            UserId: userId,
                            MaritalStatus: MartialStatusvalue,
                            SpouseName: spouseName,
                            SpouseDOB: null,
                            SpouseOccupation: null,
                            NumberOfChildren: children,
                            CreatedBy: userId,
                            CreatedOn: null,
                            ModifiedBy: null,
                            ModifiedOn: null,
                            IsActive: true,
                            SpouseEducation: null
                          },
                          ChildDetails: [
                            {
                         Id: "",
                         UserId: children == (null || "") ?  null : userId,
                         Name: c1Name,
                         DateOfBirth: null,
                         Gender: null,
                         Education: C1Educationvalue,
                         CreatedBy: children == (null || "") ?  null : userId,
                         CreatedOn: null,
                         IsActive: true,
                         ModifiedBy: null,
                         ModifiedOn: null,
                         ChildOccupation: null
                       },
                         {
                         Id: "",
                         UserId: children == (null || "") ?  null : userId,
                         Name: c2Name,
                         DateOfBirth: null,
                         Gender: null,
                         Education: C2Educationvalue,
                         CreatedBy: children == (null || "") ?  null : userId,
                         CreatedOn: null,
                         IsActive: true,
                         ModifiedBy: null,
                         ModifiedOn: null,
                         ChildOccupation: null
                       },
                         {
                         Id: null,
                         UserId: children == (null || "") ?  null : userId,
                         Name: c3Name,
                         DateOfBirth: null,
                         Gender: null,
                         Education: C3Educationvalue,
                         CreatedBy: children == (null || "") ?  null : userId,
                         CreatedOn: null,
                         IsActive: true,
                         ModifiedBy: null,
                         ModifiedOn: null,
                         ChildOccupation: null
                       }
                      ],
                        RoleId: null,
                        StatusId: 3,
                        StatusText: null,
                        UserId: userId
                    }

                    console.log(PersonalDetails);
                    
                    var config = {
            method: "post",
            url: `${Env.BASE_URL}/api/user/profile`,
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(PersonalDetails),
            };
             
            const response =  await axios(config);

            // console.log("->",response);

            if(response.data.Message==="Record has been saved successfully"){
                setLoading(false);
                setVisible(true);

                props.navigation.navigate("Professional_Details",{
                                "userId":userId,
                            });
                // alert("Done Family Details");
            } else {
                setLoading(false);
                setVisible(true);

                alert(response.data.Message);
           }
                } else {
                    let toast = Toast.show('Please enter spouse name & No of childrens', {
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
            } else {

                const PersonalDetails = {
            
                    ApprovedStatus: null,
                    ApprovedStatusText: null,
                    FamilyDetails: {
                        Id: "",
                        UserId: userId,
                        MaritalStatus: MartialStatusvalue,
                        SpouseName: spouseName,
                        SpouseDOB: null,
                        SpouseOccupation: null,
                        NumberOfChildren: children,
                        CreatedBy: userId,
                        CreatedOn: null,
                        ModifiedBy: null,
                        ModifiedOn: null,
                        IsActive: true,
                        SpouseEducation: null
                      },
                      ChildDetails: [
                        {
                     Id: "",
                     UserId: children == (null || "") ?  null : userId,
                     Name: c1Name,
                     DateOfBirth: null,
                     Gender: null,
                     Education: C1Educationvalue,
                     CreatedBy: children == (null || "") ?  null : userId,
                     CreatedOn: null,
                     IsActive: true,
                     ModifiedBy: null,
                     ModifiedOn: null,
                     ChildOccupation: null
                   },
                     {
                     Id: "",
                     UserId: children == (null || "") ?  null : userId,
                     Name: c2Name,
                     DateOfBirth: null,
                     Gender: null,
                     Education: C2Educationvalue,
                     CreatedBy: children == (null || "") ?  null : userId,
                     CreatedOn: null,
                     IsActive: true,
                     ModifiedBy: null,
                     ModifiedOn: null,
                     ChildOccupation: null
                   },
                     {
                     Id: null,
                     UserId: children == (null || "") ?  null : userId,
                     Name: c3Name,
                     DateOfBirth: null,
                     Gender: null,
                     Education: C3Educationvalue,
                     CreatedBy: children == (null || "") ?  null : userId,
                     CreatedOn: null,
                     IsActive: true,
                     ModifiedBy: null,
                     ModifiedOn: null,
                     ChildOccupation: null
                   }
                  ],
                    RoleId: null,
                    StatusId: 3,
                    StatusText: null,
                    UserId: userId
                }

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
        
                    // console.log("->",response);
        
                    if(response.data.Message==="Record has been saved successfully"){
                        setLoading(false);
                        setVisible(true);
        
                        props.navigation.navigate("Professional_Details",{
                                        "userId":userId,
                                    });
                        // alert("Done Family Details");
                    } else {
                        setLoading(false);
                        setVisible(true);
        
                        alert(response.data.Message);
                   }

            }
            setVisible(false);


        setVisible(true);

       
        } else {
            setLoading(false);

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
                     Family Details
                </Text>

                <Dropdown
                                  placeholder="Marital Status *"
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
                                  data={MartialStatuslitems}
                                  onChangeText ={(value)=>{
                                    setMartialStatusValue(value);
                                    
                                  }}
                            />
                <Text
                    style={{
                        marginTop:15
                    }}
                >
                </Text>

            {MartialStatusvalue == "Married" ? 

                      <View>
                        <TextInput
                                style={{ width: "100%",
                                    backgroundColor:"#FFFF",
                                    height:"auto",justifyContent:"flex-start",
                                    textAlignVertical:"auto" ,
                                    marginTop:-16,                        
                                }}
                                mode="outlined"
                                underlineColorAndroid="transparent"
                                outlineColor="#282A8B"
                                label="Spouse Name"
                                multiline={true}
                                keyboardType="numbers-and-punctuation"
                                placeholder="Spouse Name"
                                placeholderTextColor="#000000DE"
                                value={spouseName}
                                onChangeText={(text) => {
                                setSpouseName(text);
                                }}
                                theme={{ roundness: 4, }}
                            />

                            {/* <DropDownPicker
                                open={NOCopen}
                                value={NOCvalue}
                                items={NOCitems}
                                setOpen={setNOCOpen}
                                setValue={setNOCValue}
                                setItems={setNOCItems}
                                placeholder="No. of Children "
                                style={{
                                    marginTop:16,
                                    borderWidth:1,
                                    borderRadius:4,
                                    borderColor:"#282A8B",
                                    height:56,
                                }}
                            /> */}

                            <Dropdown
                                  placeholder="No. of Children"
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
                                  data={NOCitems}
                                  onChangeText ={(value)=>{
                                    setNoOfChildren(value);
                                  }}
                            />

                            {children == "1" ? 

                            <View>
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
                                        label="Child one name"
                                        multiline={true}
                                        keyboardType="numbers-and-punctuation"
                                        placeholder="Child One Name"
                                        placeholderTextColor="#000000DE"
                                        value={c1Name}
                                        onChangeText={(text) => {
                                        SetC1Name(text);
                                        }}
                                        theme={{ roundness: 4, }}
                                     />

                                    {/* <DropDownPicker
                                        open={C1Educationopen}
                                        value={C1Educationvalue}
                                        items={C1Educationitems}
                                        setOpen={setC1EducationOpen}
                                        setValue={setC1EducationValue}
                                        setItems={setC1EducationItems}
                                        placeholder="Child 1 Education"
                                        style={{
                                            marginTop:16,
                                            borderWidth:1,
                                            borderRadius:4,
                                            borderColor:"#282A8B",
                                            height:56,
                                        }}
                                    />  */}
                                     <Dropdown
                                        placeholder="Child One Education"
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
                                        data={C1Educationitems}
                                        value={C1Educationvalue}
                                        onChangeText ={(value)=>{
                                            setC1EducationValue(value);
                                        }}
                                    />
                                 </View>
                                    : null}

                    
                            {children == "2" ? 

                            <View>
                                <TextInput
                                        style={{ width: "100%",
                                            backgroundColor:"#FFFF",
                                            height:56,justifyContent:"flex-start",
                                            textAlignVertical:"auto" ,
                                            marginTop:16,                        
                                        }}
                                        mode="outlined"
                                        underlineColorAndroid="transparent"
                                        outlineColor="#282A8B"
                                        keyboardType="numbers-and-punctuation"
                                        placeholder="Child One Name"
                                        label="Child One Name"
                                        placeholderTextColor="#000000DE"
                                        value={c1Name}
                                        onChangeText={(text) => {
                                        SetC1Name(text);
                                        }}
                                        theme={{ roundness: 4, }}
                                    />

                                    {/* <DropDownPicker
                                        open={C1Educationopen}
                                        value={C1Educationvalue}
                                        items={C1Educationitems}
                                        setOpen={setC1EducationOpen}
                                        setValue={setC1EducationValue}
                                        setItems={setC1EducationItems}
                                        placeholder="Child 1 Education"
                                        style={{
                                            marginTop:16,
                                            borderWidth:1,
                                            borderRadius:4,
                                            borderColor:"#282A8B",
                                            height:56,

                                        }}
                                    />  */}
                                     <Dropdown
                                            placeholder="Child One Education"
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
                                            data={C1Educationitems}
                                            value={C1Educationvalue}
                                            onChangeText ={(value)=>{
                                                setC1EducationValue(value);
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
                            label="Child Two Name"
                            multiline={true}
                            placeholder="Child Two Name"
                            placeholderTextColor="#000000DE"
                            value={c2Name}
                            onChangeText={(text) => {
                            setC2Name(text);
                            }}
                            theme={{ roundness: 4, }}
                    />
                    {/* <DropDownPicker
                        open={C2Educationopen}
                        value={C2Educationvalue}
                        items={C2Educationitems}
                        setOpen={setC2EducationOpen}
                        setValue={setC2EducationValue}
                        setItems={setC2EducationItems}
                        placeholder="Child 2 Education"
                        style={{
                            marginTop:16,
                            borderWidth:1,
                            borderRadius:4,
                            borderColor:"#282A8B",
                            height:56,
                        }}
                    /> */}
                     <Dropdown
                                  placeholder="Child Two Education"
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
                                  data={C2Educationitems}
                                  value={C2Educationvalue}
                                  onChangeText ={(value)=>{
                                    setC2EducationValue(value);
                                  }}
                            />
                        </View>
                           : null}

                        {children == "3" ? 

                        <View>
                            <TextInput
                                    style={{ width: "100%",
                                        backgroundColor:"#FFFF",
                                        height:56,justifyContent:"flex-start",
                                        textAlignVertical:"auto" ,
                                        marginTop:16,                        
                                    }}
                                    mode="outlined"
                                    underlineColorAndroid="transparent"
                                    outlineColor="#282A8B"
                                    keyboardType="numbers-and-punctuation"
                                    placeholder="Child One Name"
                                    label="Child One Name"
                                    placeholderTextColor="#000000DE"
                                    value={c1Name}
                                    onChangeText={(text) => {
                                    SetC1Name(text);
                                    }}
                                    theme={{ roundness: 4, }}
                                />

                                {/* <DropDownPicker
                                    open={C1Educationopen}
                                    value={C1Educationvalue}
                                    items={C1Educationitems}
                                    setOpen={setC1EducationOpen}
                                    setValue={setC1EducationValue}
                                    setItems={setC1EducationItems}
                                    placeholder="Child 1 Education"
                                    style={{
                                        marginTop:16,
                                        borderWidth:1,
                                        borderRadius:4,
                                        borderColor:"#282A8B",
                                        height:56,
                                    }}
                                />  */}
                                 <Dropdown
                                  placeholder="Child One Education"
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
                                  data={C1Educationitems}
                                  value={C1Educationvalue}
                                  onChangeText ={(value)=>{
                                    setC1EducationValue(value);
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
                            underlineColorAndroid="transparent"
                            outlineColor="#282A8B"
                            keyboardType="numbers-and-punctuation"
                            placeholder="Child Two Name"
                            label="Child Two Name"
                            placeholderTextColor="#000000DE"
                            value={c2Name}
                            
                            onChangeText={(text) => {
                            setC2Name(text);
                            }}
                            theme={{ roundness: 4, }}
                        />
                        {/* <DropDownPicker
                            open={C2Educationopen}
                            value={C2Educationvalue}
                            items={C2Educationitems}
                            setOpen={setC2EducationOpen}
                            setValue={setC2EducationValue}
                            setItems={setC2EducationItems}
                            placeholder="Child 2 Education"
                            style={{
                            marginTop:16,
                            borderWidth:1,
                            borderRadius:4,
                            borderColor:"#282A8B",
                            height:56,
                            }}
                            /> */}
                             <Dropdown
                                  placeholder="Child Two Education"
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
                                  data={C2Educationitems}
                                  value={C2Educationvalue}
                                  onChangeText ={(value)=>{
                                    setC2EducationValue(value);
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
                                    multiline={true}
                                    underlineColorAndroid="transparent"
                                    outlineColor="#282A8B"
                                    keyboardType="numbers-and-punctuation"
                                    placeholder="Child Three Name"
                                    placeholderTextColor="#000000DE"
                                    value={c3Name}
                                    label="Child Three Name"
                                    onChangeText={(text) => {
                                    setC3Name(text);
                                    }}
                                    theme={{ roundness: 4, }}
                            />

                            {/* <DropDownPicker
                                open={C3Educationopen}
                                value={C3Educationvalue}
                                items={C3Educationitems}
                                setOpen={setC3EducationOpen}
                                setValue={setC3EducationValue}
                                setItems={setC3EducationItems}
                                placeholder="Child 3 Education"
                                style={{
                                    marginTop:16,
                                    borderWidth:1,
                                    borderRadius:4,
                                    borderColor:"#282A8B",
                                    height:56,
                                }}
                            /> */}
                             <Dropdown
                                  placeholder="Child Three Education"
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
                                  data={C3Educationitems}
                                  onChangeText ={(value)=>{
                                    setC3EducationValue(value);
                                  }}
                            />
                        </View>
                        : null}

                      </View>
                    
                    :
                    null
            }
               
                </View>
                <View
                    style={{
                        justifyContent:"center",
                        margin:20,
                        paddingTop:40,
                        paddingBottom:20 
                    }}
                >
                <Button 
                        uppercase={false}
                        color="white"
                        onPress={()=>{
                            // props.navigation.navigate("Professional_Details",{
                            //     "UserId":userId,
                            // });
                            Upload_Personal_Details();
                        }}
                        style={{
                            height:56,
                            width:"100%",
                            backgroundColor:"#282A8B",
                            alignSelf:"center",
                            marginBottom:20,
                            justifyContent:"center",
                            display: visisble === false ? "none" : "flex"
                        }}>
                            Continue
                    </Button>
                </View>
                </View>
}
        </ScrollView>
    )
}

export default Family_Details;