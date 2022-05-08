import React from "react";
import { View, Image, Dimensions, Animated, Linking, ImageBackground,Text } from "react-native";
import { TouchableRipple } from "react-native-paper";
import Env from "../auth/Env";

const { width } = Dimensions.get("window");


export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.loadInBrowser = this.loadInBrowser.bind(this);
  }
  scrollX = new Animated.Value(0);
  // this will be the scroll location of our ScrollView
  loadInBrowser = (url) => {
    Linking.openURL(url).catch(() => alert("Error opening link"));
  };
  render() {
    // position will be a value between 0 and photos.length - 1 assuming you don't scroll pass the ends of the ScrollView
    let position = Animated.divide(this.scrollX, width);

    return (
      <View
        style={{
            alignItems: "center",
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            marginTop:0,
        }}
      >
        <View
          // this will bound the size of the ScrollView to be a square because
          // by default, it will expand regardless if it has a flex value or not
        >
          <Animated.ScrollView
            horizontal={true}
            pagingEnabled={true} // animates ScrollView to nearest multiple of it's own width
            showsHorizontalScrollIndicator={false}
            // the onScroll prop will pass a nativeEvent object to a function
            onScroll={Animated.event(
              // Animated.event returns a function that takes an array where the first element...
              [
                {
                  nativeEvent: {
                    contentOffset: { x: this.scrollX },
                  },
                },
              ],
              { useNativeDriver: true } // ... is an object that maps any nativeEvent prop to a variable
            )} // in this case we are mapping the value of nativeEvent.contentOffset.x to this.scrollX
            scrollEventThrottle={16} // this will ensure that this ScrollView's onScroll prop is called no faster than 16ms between each function call
          >
            {this.props.photos
              ? this.props.photos.map((source, i) => {
                  // for every object in the photos array...
                  return (
                    // ... we will return a square Image with the corresponding object as the source
                //     <TouchableRipple
                //       key={i}
                //       onPress={() => {
                //         source.openUrl ? this.loadInBrowser(source.link) : null;
                //       }}
                //       style={{
                //         width:345,
                //         height:180,
                //         alignSelf:"center",
                //         marginLeft:0,
                //         marginRight:0,
                //         justifyContent:"center"
                //       }}
                //     >
                //     <ImageBackground
                //     style={{
                //         height:219
                //     }}
                //     source={{url:`${Env.BASE_URL}${source.ImagePath}`}}
                // >
                //       <Text>
                //         {source.DisplayText}
                //       </Text>
                //       </ImageBackground>
                     
                //     </TouchableRipple>
                <View
                key={i}
                    style={{
                      height:314,
                      padding:2,
                      width:345
                    }}
                >
                    <Image
                    style={{
                        height:219,
                    }}
                    resizeMode="cover"
                    // source={require("../../assets/friend_ship.png")}
                    source={{uri: Env.BASE_URL+source.ImagePath}}
                    />
                <View
                    style={{
                        marginTop:5
                    }}
                >
                    <Text
                        style={{
                            fontSize:14,
                            fontWeight:"bold",
                            fontStyle:"italic"
                        }}
                    >
                      “ {source.DisplayText} ”
                         {/* “Each friend represents a world in us, a world possibly not born until they arrive,
                         and it is only by this meeting that a new world is born.” */}
                         {"\n"}
                    </Text>
                    <Text
                        style={{
                            fontWeight:"bold",
                            
                            fontSize:14,
                            color:"#000000",
                            marginBottom:10
                        }}
                    >
                        – {source.Author}
                    </Text>
                </View>
                </View>
                  );
                })
              : null}
          </Animated.ScrollView>
        </View>
        <View
          style={{ flexDirection: "row" }} // this will layout our dots horizontally (row) instead of vertically (column)
        >
          {this.props.photos
            ? this.props.photos.map((_, i) => {
                // the _ just means we won't use that parameter
                let opacity = position.interpolate({
                  inputRange: [i - 1, i, i + 1], // each dot will need to have an opacity of 1 when position is equal to their index (i)
                  outputRange: [0.3, 1, 0.3], // when position is not i, the opacity of the dot will animate to 0.3
                  // inputRange: [i - 0.50000000001, i - 0.5, i, i + 0.5, i + 0.50000000001], // only when position is ever so slightly more than +/- 0.5 of a dot's index
                  // outputRange: [0.3, 1, 1, 1, 0.3], // is when the opacity changes from 1 to 0.3
                  extrapolate: "clamp", // this will prevent the opacity of the dots from going outside of the outputRange (i.e. opacity will not be less than 0.3)
                });
                return (
                  <Animated.View // we will animate the opacity of the dots so use Animated.View instead of View here
                    key={i} // we will use i for the key because no two (or more) elements in an array will have the same index
                    style={{
                      opacity,
                      height: 8,
                      width: 8,
                      backgroundColor: "rgb(34,34,34)",
                      // marginTop: -15,
                      // marginLeft:10,
                      borderRadius: 10,
                      margin: 8,
                    }}
                  />
                );
              })
            : null}
        </View>
      </View>
    );
  }
}
