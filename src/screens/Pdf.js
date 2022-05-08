import axios from "axios";
import React,{useState,useEffect} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native'
import PDFReader from 'rn-pdf-reader-js'
import Env from "../auth/Env";

const PDF = props => {

 const image_Url = props.route.params.image_Url;
 console.log(image_Url);
 
return(
  <View style={styles.container}>
    <PDFReader style={styles.pdf}
      source={{
        uri:`${Env.BASE_URL}${image_Url}`,
        // uri:'http://dreamshopgo.in/Img/Magine/123.pdf'
      }}
    />
  </View>
)
} 
export default PDF;

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
});

