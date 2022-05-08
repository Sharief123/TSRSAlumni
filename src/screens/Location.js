import MapView, { Marker, Callout } from 'react-native-maps';  
import * as Location from "expo-location";  
import React,{useState, useEffect, Component } from "react";
import {
    View,
    Text,
} from "react-native";

export default class Locations extends Component {

    
    constructor(props) {
    super(props);

    const [locate, setLocation] = useState({});
    const [Address, SetAddress] = useState([]);
    const [name, SetName] = useState("");
    const [City, SetCity] = useState("");
    const [dist, SetDist] = useState("");
    const [Pincode, SetPincode]= useState("");
    const [state, SetState] = useState("");

    useEffect(() => {
        (async () => {
         getLocation();
        //  console.log("User::::>",login);

      })();
      }, []);
  
    function getLocation(){
        try {
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
             if(address){
               for (let item of address) { 
                let Address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
                SetAddress(address);
                // console.log(Address.name);
                // console.log(item.name);
                SetName(item.name);
                // console.log(item.city);
                SetCity(item.city);
                // console.log(item.subregion);
                SetDist(item.subregion);
                // console.log(item.postalCode);
                SetPincode(item.postalCode);
                // console.log(item.region);
                SetState(item.region);
              }
             }        
            })();
        } catch(e) {
          console.log(e);
        }
      };

     this.state = {
      region: {
       latitude: locate.latitude,
       longitude: locate.longitude,
       latitudeDelta: 0.015,
       longitudeDelta: 0.0121,
      },
      markers: {
        coordinate: {
          latitude: 4,
          longitude: 4,
          },
        // key: id,
        // color: randomColor(),
      }
     };
    }
    onMapPress(e) {
        this.setState({
           markers: 
           {
              coordinate: e.nativeEvent.coordinate,
            //   key: id++,
            //   color: randomColor(),
           },
        });
  
     SaveAddress=()=>{
       console.log(JSON.stringify(this.state.markers[0].coordinate.latitude))
     }
    }
  
     render() {
         return (
  
         <MapView
            // provider={this.props.provider}
            // style={styles.map}
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
            initialRegion={this.state.region}
            onPress={e => this.onMapPress(e)}
           >
  
        <Marker
        //   key={this.state.markers.key}
          coordinate={this.state.markers.coordinate}
          pinColor={"red"}
        >
            <View>
            <Text> 
            {JSON.stringify(this.state.markers.coordinate)}</Text>
          </View>
        </Marker>
  
    </MapView>
  
  );
   }
     }