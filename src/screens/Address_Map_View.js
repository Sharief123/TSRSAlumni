import React, {useState, useEffect, useRef} from 'react';
import {Text, View, ImageBackground, StyleSheet,  Share,Alert} from 'react-native';
import MapView, { Callout, Marker, Polyline } from "react-native-maps";

import { TouchableRipple, Divider, IconButton, TouchableOpacity, Button, TextInput } from "react-native-paper";
import * as Location from "expo-location";  

import Modal from 'react-native-modal';
import axios from "axios";

const Address_MapView = (props) => {

  const [isModalVisible, setModalVisible] = useState(false);
  const [loader, setloader] = useState(false);

  const [locate, setLocation] = useState({});

  useEffect(() => {
    (async () => {
      getLocation();
      if(locate){
      setTimeout(() => {
        // Alert.alert('I am appearing...', 'After 5 seconds!');
        setloader(false);
      }, 1000);
    }
        //  getLocation();
        //  console.log("1");
    //  console.log("User::::>",login);

  })();
  }, []);

  function getLocation(){
    try {
      // setLoading(true);
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
         }   
        //  var a = s;

         if(address){
           for (let item of address) { 
            let Address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
            // SetAddress(address);
            console.log(Address);
            console.log(item.name);
            // SetName(item.name);
            // console.log(item.city);
            // SetCitys(item.city);
            // console.log(item.subregion);
            // SetDist(item.subregion);
            // console.log(item.postalCode);
            // SetPinCode(item.postalCode);
            // console.log(item.region);
            // SetState(item.region);
          }
         }        
        })();
        // setLoading(false);
    } catch(e) {
      console.log(e);
    }
  };

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

const mapRef = useRef(null);

const [region, setRegion] = useState({
latitude: 51.5079145,
longitude: -0.0899163,
latitudeDelta: 0.01,
longitudeDelta: 0.01,
});
  useEffect(() => {
    // setStoryid(props.data.StoryId);
    // deleteStory(user,storyId);
    });

//   console.log("Story Id::::::" + props.data.StoryId);
    
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const address = mapaddress;

  return (
    <View style={{flex: 1,marginLeft:0,marginTop:15}}>
        {/* {locate.latitude && locate.longitude != null ?
        <Text>
            {locate.latitude}{locate.longitude}
        </Text>    
        : null
    } */}
      <TouchableRipple
              onPress={toggleModal}
              style={{
              }}
          >
          <TextInput
                    style={{ width: "100%",
                        backgroundColor:"#FFFF",
                        height:56,justifyContent:"flex-start",
                        textAlignVertical:"auto" ,
                        borderColor:"#282A8B"
                    }}
                    mode="outlined"
                    outlineColor="#282A8B"
                    keyboardType="numbers-and-punctuation"
                    underlineColorAndroid="transparent"
                    placeholder="Address *"
                    label="Address *"
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
                 /> 
      </TouchableRipple>
      
      <Modal isVisible={isModalVisible}>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: 16.79869960,
            longitude: 79.9859659,
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
                    props.navigation.navigate(
                        "Personal_Details",
                        {
                            "map_address": mapaddress,
                            // "userId": user
                        }
                    );
                    toggleModal();
                }}
            >Ok</Button>
            </View>
      </View>
      </Modal>
    </View>
  );
}

export default Address_MapView;

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
      marginBottom:100,
      marginLeft:20,
      marginRight:20
    },
  });

