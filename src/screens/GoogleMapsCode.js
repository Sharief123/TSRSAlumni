// import React, {Component, component} from "react";
// import {
//     StyleSheet,
//     Text,View,TouchableOpacity
// } from "react-native";
// import Geocoder from "react-native-geocoding";

// const GoogleAddress = (props) => {

//     // getData() {
//     //     Geocoder.init("AIzaSyA69Xk8mgf-LWWW4-KvT82tvz4rIsJbMfU");

//     //     Geocoder.getFromLatLng(44.4647452,7.3553838).then(
//     //         json => {
//     //             var address = json.results[0].formatted_address;

//     //             alert(address);
//     //         },
//     //         error => {
//     //             alert(error);
//     //         }
//     //     );
//     // }
   
//         return (
//             <View>
//                 <TouchableOpacity
//                     // onPress={()=>this.getData()}
//                 >
//                     <Text>
//                         Get Address
//                     </Text>
//                 </TouchableOpacity>
//             </View>
//         )
// }

// export default GoogleAddress;
import React,{useEffect, useState} from "react";
import axios from "axios";

import {
    View,
    Image,
    Text,
    ImageBackground,
    ScrollView
} from "react-native";
import { 
    TextInput,
    Button,
    Card,
    TouchableRipple
 } from "react-native-paper";
 import Geocoder from "react-native-geocoding";

const GoogleAddress = (props) => {

     const getData = () => {
        Geocoder.init("AIzaSyA69Xk8mgf-LWWW4-KvT82tvz4rIsJbMfU");

        Geocoder.from(28.6139,77.2090)
		.then(json => {
            var addressComponent = json.results[2].formatted_address;
            // var pincode = json.results[0].address_components[6].long_name;
            var city = json.results[1].address_components[3].long_name;
             console.log("Res--->",addressComponent,city);
            //  map_address(addressComponent);
            //  setPincode(pincode);
            //  setCity(city);
            alert(addressComponent,city);
		})
		.catch(error => console.warn(error));

        // Geocoder.getFromLatLng(44.4647452,7.3553838).then(
        //     json => {
        //         var address = json.results[0].formatted_address;

        //         alert(address);
        //     },
        //     error => {
        //         alert(error);
        //     }
        
    }
    return (
            <View style={{
                paddingTop:20,
                backgroundColor:"#F9FBFF",
            }}>
                <View style={{
                    height:"70%",
                    margin:20
                }}>
                <TouchableRipple
                onPress={() => {
                    getData();
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
                <Text style={{
                    color:"#ED7225",
                    fontSize:24,
                    alignSelf:"flex-start",
                    textAlignVertical:"top",
                    marginTop:15
                }}>
                    About Us
                </Text>
                <Text
                    style={{
                        fontSize:14,
                        color:"#282A8B",
                        marginTop:10
                    }}
                >
                    Gurukula is an Indian tradition - where the teacher and the student 
                    stay and learn together, where the knowledge is free, where the
                    physique is strengthened, character is formed, the intellect is 
                    expanded making the student a perfect human being. To rebuild this
                    tradition in the modern India. Sri P.V Narasimha Rao, then
                    education minister of erstwhile Andhra Pradesh established AP
                    Residential Schools at Sarvali(1971), Tadikonda and Kodigenahali in 
                    1972 and APRJC in Nagarjuna Sagar at 1975. Fascinated by the
                    excellent performance of Gurukuls, DR N.T. Rama Rao, when he was 
                    the chief minister established 46 schools with 2 schools in each
                    district (one each for Boys & Girls) in 1983 and 3 B.C Vidyapeeth's in 
                    1987 at Srisallam, Simhachalam and Nagarjuna Sagar. Enkoor Gurukul
                    was established in 1983. Now the tree of Gurukul is a giant with many 
                    branches giving shade and fruits to the society. These Gurukuls where
                    established by Visionary leaders who saw education as a
                    transformational tool not just for the rural poor but also for the society
                    at large. Five decades later, their vision is a grand success with many
                    more schools  serving people from different backgrounds and many 
                    alumni as leaders and contributors to society.
                </Text>
            </View>
            </View>
    )
}

export default GoogleAddress;