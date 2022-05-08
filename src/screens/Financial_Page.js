import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    ImageBackground,
    StyleSheet,
    Dimensions
} from "react-native";
import {
    TextInput,
    Button,
    TouchableRipple,
    IconButton,
    Card,
    Divider
} from "react-native-paper";
import axios from "axios";
import Env from "../auth/Env";
import { Dropdown } from "react-native-material-dropdown-v2";
import useAuth from "../auth/useAuth";
import PDFReader from 'rn-pdf-reader-js';

const Financial_Page = (props) => {

  const { user } = useAuth();

    const [finanicalReports, setFinancialReports] = useState([]);
    const [role, SetRole] = useState("");
    const [loader, setloader] = useState(false);
    const [infoMore, SetInfoMore] = useState(1);
    const [withWhom, SetWithWhom] = useState("All");
    const [withQ, SetWithQ] = useState("All");

    console.log("YYYYY-->",withWhom);

    const y = 0;
    const  q = 0;
    useEffect(() => {
      (async () => {
      if(user){
        getEvents(y,q); 
      }
    })
      }, []);   

      useEffect(() => {
        const unsubscribe = props.navigation.addListener("focus", () => {
            getEvents();
          console.log("agian");
        });
    
        return unsubscribe;
      }, [props]);

      useEffect(() => {
        var curYear = new Date().getFullYear();
      //   console.log("C Year:::>",curYear);
        var startYear=2021;
        let arrBatchYear=[];
        arrBatchYear.push("All");
        for(var i = curYear; i >= startYear ; i--) {
          setYears(arrBatchYear.push(i));
        // for(var i = startYear; i <= curYear ; i++) {
        //  setYears(arrBatchYear.push(i));
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



// const toggleFilters = (type, value) => {
//   if (type == "Years") {
//     SetWithWhom(value);
//   } else if (type == "Quarterly") {
//     SetWithQ(value);
//   }
//   getEvents();
// };

console.log("QQQQ--->",withQ);

    const getEvents = async (y,q) => {
        try {
          setloader(true);

          var config = {
            method: "get",
            url: `${Env.BASE_URL}/api/master/financial/reports?Year=${y}&Quarter=${q}`,
          };

          
          var config1 = {
            method: "get",
            url: `${Env.BASE_URL}/api/master/user/${user}/mysmalldetails`,
          };
    
          console.log(config);

          const details = await axios(config1);

          SetRole(details.data.Data.Role);

          const response = await axios(config);
    
          console.log(1);
          setFinancialReports(response.data.Data);
          // console.log("Message::::>",response.data.Message);
          // console.log("Events",events);
          // console.log("Event Name::::>");
          console.log(2);
          setloader(false);
        } catch (error) {
          // console.log(error);
        }
      };

      const [ Quarterly ] = useState([
        {label: `All`, value: `0`},
        {label: `Quarter 1`, value:`1`},
        {label: `Quarter 2`, value:`2`},
        {label: `Quarter 3`, value:`3`},
        {label: `Quarter 4`, value:`4`}
      ]);

    return (
        <ScrollView 
            style={{
                backgroundColor:"#F9FBFF",
                paddingTop:20,
            }}
        >
           {loader ? 
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
            <View style={{
                margin:20,
                backgroundColor:"#F9FBFF",  
                paddingBottom:20              
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
                justifyContent:"space-between"
              }}
          >
                <Text 
                    style={{
                        color:"#ED7225",
                        fontSize:24,
                        fontWeight:"bold",
                        marginTop:10
                    }}
                >
                     Financial Reports
                </Text>
                {role === "President" ? 
                <TouchableRipple
                  onPress={()=>{
                    props.navigation.navigate("Upload_Financial_Page");
                  }}
                >
                <Image
                  style={{
                    marginRight:5,
                    height:30,
                    width:30,
                    marginTop:10,
                  }}
                  source={require("../../assets/add_icon.png")}
                />
                </TouchableRipple>
                : null }
                </View>
                <View
                    style={{
                      flexDirection:"row",
                      marginTop:20,
                      justifyContent:"space-between"
                    }}
                >
                  <View
                      style={{
                        flexDirection:"row",
                        borderColor:"#282A8B",
                        borderWidth:1,
                        borderRadius:6,
                        height:35,
                      }}
                  >
                      <Dropdown
                                  placeholder="select year"
                                  dropdownPosition={0}
                                  underlineColor="transparent"
                                  // pickerStyle={styles.gender}
                                  flexDirection="row"
                                  style={{
                                    backgroundColor: "transparent",
                                    height:30,
                                  }}
                                  value={withWhom}
                                  // value={schoolyears.value}
                                  data={schoolyears}
                                  onChangeText ={(value,index)=>{
                                    SetWithWhom(schoolyears[index].value);
                                    // toggleFilters("Years", schoolyears[index].value);
                                    getEvents(schoolyears[index].value === "All" ? 0 : schoolyears[index].value,0);
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
                        height:35,
                      }}
                  >
                      <Dropdown
                                  placeholder="select Quarter"
                                  dropdownPosition={0}
                                  underlineColor="transparent"
                                  pickerStyle={styles.gender}
                                  flexDirection="row"
                                  style={{
                                    backgroundColor: "transparent",
                                    height:30,
                                  }}
                                  data={Quarterly}
                                  value={withQ}
                                  onChangeText ={(value,index)=>{
                                    // toggleFilters("Quarterly", Quarterly[index].value);
                                    SetWithQ(Quarterly[index].value);
                                    getEvents(withWhom,Quarterly[index].value);

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
                </View>
                {finanicalReports.length == 0 ? 
                <Text style={{alignSelf:"center",marginTop:20}}>No Reports</Text>
                :null}
                {finanicalReports.map((fr,i)=>{
                  return(
                    <TouchableRipple
                            key={i}
                            onPress={() => {
                              props.navigation.navigate("pdf",{
                                "image_Url":fr.ImageURL,
                              })
                            }}
                            style={{
                              marginTop:20,
                            }}
                            >
                  <View 
                    key={i}
                    style={{
                      flexDirection:"row",
                      justifyContent:"space-between",
                      backgroundColor:"#FFFFFF",
                      // height:63,
                      padding:10,
                      alignItems:"center",
                      // paddingLeft:20,
                      // paddingRight:20,
                      marginTop:0,
                      borderRadius:4
                    }}>
                      
                      <View>
                  <Text 
                      style={{
                          fontSize:16,
                          fontWeight:"700",
                          color:"#282A8B"
                      }}>
                          {fr.ReportName}
                      </Text>
                      <Text 
                      style={{
                          fontSize:13,
                          fontWeight:"300",
                          color:"black",
                          opacity:0.4,
                          marginTop:2
                      }}>
                          {fr.Description}
                      </Text>
                      {/* {infoMore === 1 ?
                      // <Text 
                      // style={{
                      //     fontSize:13,
                      //     fontWeight:"300",
                      //     color:"black",
                      //     opacity:0.4,
                      //     marginTop:2
                      // }}>
                      //     {fr.Description}
                      // </Text> 
                      <View style={styles.container}>
                            <PDFReader
                                                  source={{
                                                    uri: 'http://gahp.net/wp-content/uploads/2017/09/sample.pdf',
                                                  }}
                                                  style={styles.pdf}
                              />
                              {/* <Text>
                                noo
                              </Text> 
                          </View>
                      : null} */}
                      </View>
                      
                      {infoMore == 0 ? (
                        <View>
                          <View style={{ flexDirection: "row-reverse" }}>
                            {/* <TouchableRipple
                            onPress={() => {
                              props.navigation.navigate("pdf",{
                                "image_Url":fr.ImageURL,
                              })
                            }}> */}
                            <Image
                                style={{
                                  height:16,
                                  width:16
                                }}
                                resizeMode="cover"
                                source={require("../../assets/down_arrow.png")}
                              />
                            {/* </TouchableRipple> */}
                          </View>
                        </View>
                      ) : (
                        <View>
                          <View style={{ flexDirection: "row-reverse" }}>
                            <TouchableRipple onPress={(item) => SetInfoMore(0)}
                            >
                              <Image
                                style={{
                                  height:16,
                                  width:16
                                }}
                                resizeMode="cover"
                                source={require("../../assets/down_arrow.png")}
                              />
                            </TouchableRipple>
                          </View>
                        </View>
                      )}
                      </View>
                      </TouchableRipple>
                      )
                    })}

                {/* {finanicalReports.map((fr,i)=>{
                  return(
                    <View
                      key={i}
                    >
                    {infoMore == 0 ? (
                      <View style={{ flex: 1 }}>
                        <Text>
                          {fr.Description}
                        </Text>
                        </View>
                    ): null }
                    </View>
                  )
                })} */}
            </View>
}
        </ScrollView>
    )
}

export default Financial_Page;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
  },

  pdf: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "#000",
  },
  gender: {
    left: 150,
    right: 10,
    height:210,
    width:"50%",
    justifyContent:"flex-end",
    alignSelf:"flex-end",
    alignContent:"flex-end"
  },
});