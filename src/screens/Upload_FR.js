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
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from "expo-file-system";
import Toast from 'react-native-root-toast';


const FR = (props) => {

    const { user } = useAuth(); 

    useEffect(() => {

        var curYear = new Date().getFullYear();
      //   console.log("C Year:::>",curYear);
        var startYear=2021;
        let arrBatchYear=[];
        arrBatchYear.push("All");
        for(var i = curYear; i >= startYear ; i--) {
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
  
const [ Quarterly ] = useState([
    {label: `All`, value:`0`},
    {label: `Quarter 1`, value:`1`},
    {label: `Quarter 2`, value:`2`},
    {label: `Quarter 3`, value:`3`},
    {label: `Quarter 4`, value:`4`}
  ]);

  const [document, setDocument] = useState(null);
  const [withWhom, SetWithWhom] = useState("");

  const [loading, setIsLoading] = useState(false);
  const [reportName, SetReportName] = useState("");
  const [reportDescription, SetReportDescription] = useState("");
  const [qaurter, setqaurter] = useState("");

  const pickDocument = async () => {

    let result = await DocumentPicker.getDocumentAsync({});
    console.log(result);
    // console.log(result.mimeType);
    // var res = result.mimeType.split(".").pop();
    // console.log(res);
    // var fileName = "myDocument.pdf";
    var fileExtension = result.mimeType.split('/').pop();
    console.log(fileExtension);

    // console.log(filein)
    // if(result.mimeType){
    //   alert("P");
    // } else {
    //   alert("R");
    // }

    // let f = await FileSystem.uploadAsync(result.uri,{mimeType: result.mimeType.extension('pdf')});
    // console.log(f);
    if(fileExtension === 'pdf'){
    let fileBase64 = await FileSystem.readAsStringAsync(result.uri,{encoding: FileSystem.EncodingType.Base64});
    // let fileBase64 = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64'  });
    // // alert("Uploaded your CV Resume successfully.!");
    // console.log(fileBase64);
    // console.log("Result::>",fileBase64);
    // // const pdf = result.uri;
    // // const p = base64.encode(`${pdf}`);
    // // // const document_base64 = base64.encode(result);
    // // console.log(p);
    // // const b = base64.decode(`${p}`);
    // // console.log(b);
    setDocument(fileBase64);
    } else {
      // ToastAndroid.showWithGravityAndOffset(
      //   "Only PDF file is supported",
      //   ToastAndroid.LONG,
      //   ToastAndroid.CENTER,
      //   25,
      //   50
      // );
      let toast = Toast.show('Only PDF file is supported', {
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
                        marginTop:10
                    }}
                >
                     Upload Financial Report 
                </Text>

                  <View
                      style={{
                        flexDirection:"row",
                        borderColor:"#282A8B",
                        borderWidth:1,
                        borderRadius:6,
                        height:60,
                        justifyContent:"space-between",
                        marginTop:16
                      }}
                  >
                      <Dropdown
                                  placeholder="select year *"
                                  dropdownPosition={0}
                                  underlineColor="transparent"
                                  // pickerStyle={styles.gender}
                                  flexDirection="row"
                                  style={{
                                    backgroundColor: "transparent",
                                    height:56,
                                    width:250
                                  }}
                                  data={schoolyears}
                                  onChangeText ={(value)=>{
                                    SetWithWhom(value);
                                  }}
                            />
                            <Image
                              style={{
                                alignSelf:"center",
                                marginRight:5
                              }}
                               source={require("../../assets/arrow_down.png")}
                             />
                        </View>
                        <View
                      style={{
                        flexDirection:"row",
                        borderColor:"#282A8B",
                        borderWidth:1,
                        borderRadius:6,
                        height:60,
                        justifyContent:"space-between",
                        marginTop:16
                      }}
                  >
                      <Dropdown
                                  placeholder="select Quarter *"
                                  dropdownPosition={0}
                                  underlineColor="transparent"
                                  // pickerStyle={styles.gender}
                                  flexDirection="row"
                                  style={{
                                    backgroundColor: "transparent",
                                    height:56,
                                    width:250
                                  }}
                                  data={Quarterly}
                                  onChangeText ={(value)=>{
                                    // SetWithWhom(value);
                                    setqaurter(value);
                                  }}
                            />
                            <Image
                              style={{
                                alignSelf:"center",
                                marginRight:5
                              }}
                               source={require("../../assets/arrow_down.png")}
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
                          label=" Name *"
                          placeholder=" Name"
                          placeholderTextColor="#000000DE"
                          multiline={true}
                          numberOfLines={5}
                          value={reportName}
                          onChangeText={(text) => {
                            SetReportName(text);
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
                          label=" Description "
                          placeholder=" Description "
                          placeholderTextColor="#000000DE"
                          multiline={true}
                          numberOfLines={5}
                          value={reportDescription}
                          onChangeText={(text) => {
                            SetReportDescription(text);
                          }}
                          theme={{ roundness: 4,color:"green" }}
                      />
                      </View>
                        <Button
                            uppercase={false}
                            style={{
                                height:56,
                                marginTop:16,
                                borderWidth:1,
                                borderColor:"#282A8B",
                                borderStyle:"dashed",
                                justifyContent:"center"
                            }}
                            onPress={pickDocument}

                            // onPress={()=>{
                            //   props.navigation.navigate("pdf");
                            // }}
                        >
                            Upload Report
                        </Button>
                        <Text
                          style={{
                            alignSelf:"flex-end",
                            color:"red",
                            fontSize:12,
                            display:"none"
                          }}
                        >
                          * Only PDF is supported
                        </Text>
                        <TouchableRipple
                        style={{
                            height:56,
                            backgroundColor:"#282A8B",
                            justifyContent:"center",
                            marginTop:20,
                            width:"100%",
                            marginBottom:20
                        }}
                        onPress={()=>{
                        //   Insert_Report();
                        }}
                    >
                        <Text
                            style={{
                                alignSelf:"center",
                                color:"white",
                                fontSize:18
                            }}
                        >
                            Upload
                        </Text>

                    </TouchableRipple>
                </View>
        </ScrollView>
    );
                        }
export default FR;
