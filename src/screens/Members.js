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

const Members = (props) => {

  const { user } = useAuth();

    // const [finanicalReports, setFinancialReports] = useState([]);
    const [loader, setloader] = useState(false);

    const [President, setPresient] = useState([]);
    const [infoMore, SetInfoMore] = useState(1);

    const [ECMembers, setEcMembers] = useState([]);
    const [ClassRepresentatives, setClassRepresentatives] = useState([]);

    useEffect(() => {
      (async () => {
      if(user){
        getEvents(); 
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

    const getEvents = async () => {
        try {
          setloader(true);

          var config = {
            method: "get",
            url: `${Env.BASE_URL}/api/master/members`,
          };

          console.log(config);
          const response = await axios(config);
    
          console.log(1);
          setPresient(response.data.Data.Presidents);
          setEcMembers(response.data.Data.ECMembers);
          setClassRepresentatives(response.data.Data.ClassRepresentatives);
          console.log("Message::::>",response.data.Data.Presidents);
          // console.log("Events",events);
          // console.log("Event Name::::>");
          console.log(2);
          setloader(false);
        } catch (error) {
          // console.log(error);
        }
      };


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
                        fontSize:18,
                        fontWeight:"bold",
                        marginTop:10
                    }}
                >
                     Presidents
                </Text>
                </View>
                {President.length == 0 ? 
                <Text style={{alignSelf:"center",marginTop:20}}>No Profile's</Text>
                :null}

                {President.map((fr,i)=>{
                  return(
                    <TouchableRipple
                            key={i}
                            onPress={() => {
                              props.navigation.navigate("full",{
                                "id":fr.Id,
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
                          {fr.Name}
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
                      
                      <TouchableRipple
                            >
                              <Image
                                style={{
                                  height:12,
                                  width:7.41
                                }}
                                resizeMode="contain"
                                source={require("../../assets/see_more.png")}
                              />
                    </TouchableRipple>
                      {/* {infoMore == 0 ? (
                        <View>
                          <View style={{ flexDirection: "row-reverse" }}>
                            {/* <TouchableRipple
                            onPress={() => {
                              props.navigation.navigate("pdf",{
                                "image_Url":fr.ImageURL,
                              })
                            }}> 
                            <Image
                                style={{
                                  height:16,
                                  width:16
                                }}
                                resizeMode="cover"
                                source={require("../../assets/down_arrow.png")}
                              />
                            {/* </TouchableRipple> 
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
                      )} */}
                      </View>
                      </TouchableRipple>
                      )
                    })}

<View
              style={{
                flexDirection:"row",
                justifyContent:"space-between"
              }}
          >
                <Text 
                    style={{
                        color:"#ED7225",
                        fontSize:18,
                        fontWeight:"bold",
                        marginTop:10
                    }}
                >
                     Ec Members
                </Text>
                </View>
                {ECMembers.length == 0 ? 
                <Text style={{alignSelf:"center",marginTop:20}}>No Profile's</Text>
                :null}

                {ECMembers.map((fr,i)=>{
                  return(
                    <TouchableRipple
                            key={i}
                            onPress={() => {
                              props.navigation.navigate("full",{
                                "id":fr.Id,
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
                          {fr.Name}
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
                      <TouchableRipple
                            >
                              <Image
                                style={{
                                  height:12,
                                  width:7.41
                                }}
                                resizeMode="contain"
                                source={require("../../assets/see_more.png")}
                              />
                    </TouchableRipple>
                      {/* {infoMore == 0 ? (
                        <View>
                          <View style={{ flexDirection: "row-reverse" }}>
                            {/* <TouchableRipple
                            onPress={() => {
                              props.navigation.navigate("pdf",{
                                "image_Url":fr.ImageURL,
                              })
                            }}> 
                            <Image
                                style={{
                                  height:16,
                                  width:16
                                }}
                                resizeMode="cover"
                                source={require("../../assets/down_arrow.png")}
                              />
                            {/* </TouchableRipple> 
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
                      )} */}
                      </View>
                      </TouchableRipple>
                      )
                    })}

<View
              style={{
                flexDirection:"row",
                justifyContent:"space-between"
              }}
          >
                <Text 
                    style={{
                        color:"#ED7225",
                        fontSize:18,
                        fontWeight:"bold",
                        marginTop:10
                    }}
                >
                     Class Representatives
                </Text>
                </View>
                {ClassRepresentatives.length == 0 ? 
                <Text style={{alignSelf:"center",marginTop:20}}>No Profile's</Text>
                :null}

                {ClassRepresentatives.map((fr,i)=>{
                  return(
                    <TouchableRipple
                            key={i}
                            onPress={() => {
                              props.navigation.navigate("full",{
                                "id":fr.Id,
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
                          {fr.Name}
                      </Text>
                      <Text 
                      style={{
                          fontSize:13,
                          fontWeight:"300",
                          color:"black",
                          opacity:0.5,
                          marginTop:2
                      }}>
                          {fr.BatchAndSection}
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

                      <TouchableRipple
                            >
                              <Image
                                style={{
                                  height:12,
                                  width:7.41
                                }}
                                resizeMode="contain"
                                source={require("../../assets/see_more.png")}
                              />
                    </TouchableRipple>
                      
                      {/* {infoMore == 0 ? (
                        <View>
                          <View style={{ flexDirection: "row-reverse" }}>
                            {/* <TouchableRipple
                            onPress={() => {
                              props.navigation.navigate("pdf",{
                                "image_Url":fr.ImageURL,
                              })
                            }}> 
                            <Image
                                style={{
                                  height:16,
                                  width:16
                                }}
                                resizeMode="cover"
                                source={require("../../assets/down_arrow.png")}
                              />
                            {/* </TouchableRipple> 
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
                      )} */}
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

export default Members;

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
    justifyContent:"flex-end",
    alignSelf:"flex-end",
    alignContent:"flex-end"
  },
});