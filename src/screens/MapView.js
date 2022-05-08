import React, { useState, useEffect, useRef } from "react";
import {Text, View, ImageBackground, StyleSheet, TouchableOpacity ,Share,Button,Card} from 'react-native';
import MapView, { Callout, Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";  
import useAuth from "../auth/useAuth";
import Geocoder from "react-native-geocoding";


const MapViews = (props) => {

    const locate_latitude  = props.route.params.locate_latitude;
    const locate_longitude = props.route.params.locate_longitude;

    const [Lat, lat] = useState(0);
    const [Long, lon] = useState(0);

    const user = props.route.params.user;
    const [loader, setloader] = useState(false);

    // console.log(Lat,Long);

    const redirectTo = props.route.params.personal;

    // console.log("p-->",locate_latitude,locate_longitude);

    useEffect(() => {
        (async () => {

            if(props.route.params.user){
            //  getLocation();
            }
        //  console.log("User::::>",login);
      })();
      }, []);

    // function getLocation(){
    //     try {
    //         setloader(true);
    //         (async () => {
    //           let { status } = await Location.requestPermissionsAsync();
    //           if (status !== "granted") {
    //             alert("Permission to access location was denied");
    //           }
    //          var location = await Location.getCurrentPositionAsync({});

    //          let { coords } = await Location.getCurrentPositionAsync();

    //          const { latitude, longitude } = coords;

    //          var address = await Location.reverseGeocodeAsync({
    //           latitude,
    //           longitude
    //          });

    //          if(location){
    //             //  setLocation(location.coords); 
    //              console.log(location.coords);
    //             //  lat(location.coords.latitude);
    //             //  lon(location.coords.longitude);
    //          }   
    //          if(address){
    //            for (let item of address) { 
    //             let Address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
    //             console.log(Address);
    //             // SetAddress(address);
    //             // // console.log(Address.name);
    //             // // console.log(item.name);
    //             // SetName(item.name);
    //             // // console.log(item.city);
    //             // SetCity(item.city);
    //             // // console.log(item.subregion);
    //             // SetDist(item.subregion);
    //             // // console.log(item.postalCode);
    //             // SetPincode(item.postalCode);
    //             // // console.log(item.region);
    //             // SetState(item.region);
    //           }
    //          }        
    //         })();
    //         setloader(false);

    //     } catch(e) {
    //       console.log(e);
    //     }
    //   };

     
    //     debugger;

    //     (async () => {

    //     // let {status} = await Location.requestBackgroundPermissionsAsync();
    //     // if (status !== 'granted') {
    //     //     setErrorMsg('Access to Location denied');
    //     // }

    //     // const location = ;
    //     // setLocation(location)

    //     const place = await Location.reverseGeocodeAsync({
    //         latitude : latitude,
    //         longitude : longitude
    //     });

    //     let city;
    //     place.find( p => {
    //       city = p.city
    //     //   setCity(p.city)
    //     console.log("city-t--->",city)
    //     });

    //     const response = await TimeApi.get(`/${city}.json`);
    //     // setTime(response.data);

    //         var address = await Location.reverseGeocodeAsync({
    //             latitude,
    //             longitude
    //            });
    //            console.log("address---->",address);
    //     })
    // }
        
            //    if(address){
            //     for (let item of address) { 
            //      let Address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
            //      console.log("Address--->",Address);
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
            //    }
            //   }        

            const [mapaddress, map_address] = useState("");
            const [pincode, setPincode] = useState("");
            const [city, setCity] = useState("");

            function getAddressFromCoordinates( latitude, longitude ) {
            //   function getAddressFromCoordinates( latitude, longitude ) {
            //     Geocoder.init("AIzaSyA69Xk8mgf-LWWW4-KvT82tvz4rIsJbMfU");
        
            //     Geocoder.from(latitude,longitude)
            // .then(json => {
            //        if(json)
            //        {
            //          if(json.results[2])
            //          {

            //          }
            //          if(json.results[1])
            //          {

            //          }
            //        }
            //         var addressComponent = json.results[2].formatted_address;
            //         var pincode = json.results[1].address_components[7].long_name;
            //         var city = json.results[1].address_components[3].long_name;;
            //          console.log("Res--->",addressComponent);
            //          map_address(addressComponent);
            //          setPincode(pincode);
            //          setCity(city);
            //         // alert(addressComponent);
            // })
            // .catch(error => console.warn(error));

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
                                 
                                let address = resJson['results'][2]['formatted_address'].split(",");
                                let picode = address[address.length-2];
                                var numberPattern = /\d+/g;
                                if(picode)
                                 picode = picode.match(numberPattern)!=null?picode.match(numberPattern)[0]:null;
                                
                                console.log("Address-->",resJson['results'][2]['formatted_address'])

                                var city=address[address.length-3];
                                console.log("City--->",city);
                                   console.log("Updated pincode--->",picode);
                                //    alert(resJson.plus_code.compound_code);
                                  //  map_address(resJson.plus_code.compound_code + " " );
                                  map_address(resJson['results'][2]['formatted_address']);
                                   setPincode(picode);
                                   setCity(city);
                                    // resJson['results'][0]['address_components'][5]['long_name']);
                                  //  console.log("recre-->",resJson['results'][2]['formatted_address']);
                                  //  console.log("Pin code-->",resJson['results'][2]['formatted_address']);
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
         
    //     function getAddressFromCoordinates( latitude, longitude ) {
    //         console.log("1");
    //         console.log(latitude, longitude);
    //          return new Promise((resolve) => {
    //             //     console.log("2");
    //     const endPoint =
    //     `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyA69Xk8mgf-LWWW4-KvT82tvz4rIsJbMfU`
    //     //   'https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}'
    //     //   '&key=AIzaSyDt4yop2vXFsZB-0Lx1ZFKnitAEEmkxazc'
    //     //   const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=D2eeUkValxrkrvSouATfxsv11Kf5GIbXHRv1NJmcOfA&mode=retrieveAddresses&prox=${latitude},${longitude}`
    //       fetch(endPoint)
    //         .then(res => res.json())
    //         .then((resJson) => {}
    //     //         // console.log("3-->",resJson);
    //     //       // the response had a deeply nested structure :/
    //         //   if (resJson
    //         //     && resJson.Response
    //         //     && resJson.Response.View
    //         //     && resJson.Response.View[0]
    //         //     && resJson.Response.View[0].Result
    //         //     && resJson.Response.View[0].Result[0]) {
    //         //     resolve(resJson.Response.View[0].Result[0].Location.Address.Label)
    //         //     // console.log("welcome",resJson.Response.View[0].Result[0].Location.Address);
    //         //     console.log(resJson.Response.View[0].Result[0].Location.Address.City,
    //         //         resJson.Response.View[0].Result[0].Location.Address.County,
    //         //         resJson.Response.View[0].Result[0].Location.Address.State,
    //         //         resJson.Response.View[0].Result[0].Location.Address.Country,
    //         //         resJson.Response.View[0].Result[0].Location.Address.PostalCode
    //         //         )
    //         //         console.log("3");
    //         //     if(endPoint!=null){
    //         //         console.log(endPoint);
                
    //         //   }
    //           else {
    //             resolve()
    //           }
    //         })
    //         .catch((e) => {
    //           console.log('Error in getAddressFromCoordinates', e)
    //           resolve()
    //         })
    //     // })
    // }

    
    const mapRef = useRef(null);

    const [region, setRegion] = useState({
        latitude: 51.5079145,
        longitude: -0.0899163,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });

    const tokyoRegion = {
      latitude: 35.6762,
      longitude: 139.6503,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    const goToTokyo = () => {
      //complete this animation in 3 seconds
      mapRef.current.animateToRegion(tokyoRegion, 3 * 1000);
    };

    return (
        <View style={styles.container}>
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
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: locate_latitude,
            longitude: locate_longitude,
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
                        `${redirectTo}`,
                        {
                            "map_address": mapaddress,
                            "userId": user,
                            "pincode":pincode,
                            "city":city,
                        }
                    );
                }}
                style={{
                  width:"100%"
                }}
            >Ok</Button>
            </View>
      </View>
      }
      </View>
  );
};

export default MapViews;

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
      paddingLeft:10,
      paddingRight:10,
      paddingTop:10,
      height:100,
      marginBottom:100,
      marginLeft:20,
      marginRight:20,
    },
  });