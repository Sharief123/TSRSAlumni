import React, { Component, useState} from 'react';
import { AppRegistry, View, Text, Button, TextInput, StyleSheet} from 'react-native';

class DynamicTextInput extends Component {
  
    componentDidMount() {
      this.getDynamicInputs();
    }
  
    state = { userDetails: [], item_views: [] };
  
    updateState = (index, value) => {
        console.log(value);

      const userDetails = [...this.state.userDetails]; //make a copy of array
      userDetails[index] = value;
      this.setState({ userDetails: userDetails });
    //   console.log(userDetails);
    };
  
    // counter, setCounter] = useState(1);
    

    getDynamicInputs(key) {
      const inputData = [];
      const input = [];
      let count = key+1;
      for (let i = 0; i < count; i++) {
        inputData.push(
              <View key={i}><TextInput
                    // key={i}
                    style={{ borderBottomWidth: 1, borderColor: "#f0eff4", height: 40 }}
                    placeholder="Enter Name"
                    onChangeText={(val) => this.updateState(i.val)}
                    value={this.state.userDetails[i]} />
                <TextInput
                    // key={i}
                    style={{ borderBottomWidth: 1, borderColor: "#f0eff4", height: 40 }}
                    placeholder="Enter Name"
                    onChangeText={(val) => this.updateState(val)}
                    value={this.state.userDetails[i]} />
                </View>
        );
      }
      this.setState({ item_views: inputData });
    }
  
    render() {
    //   console.log(this.state.userDetails);
      return <View style={styles.app}>
          {this.state.item_views}
          <Button title='+' onPress={() => 
          {
            console.log(this.state.item_views.length);
            this.getDynamicInputs(this.state.item_views.length);

          }} />
          <Button onPress={()=>this.getDynamicInputs()} title='Hello'/>
          </View>;
    }
  }
  
  const styles = StyleSheet.create({
    app: {
      flex: 1,
      backgroundColor: "pink"
    }
  });
  
//   export default App;
// class DynamicTextInput extends Component {

//  textvalues = [];
  
//   constructor(props){
//     super(props);
//     this.state = {
//       textInput : []
//     }
//   }
  
//  handleChange = (evt,value) => {
//     console.log(value);
//     // const userDetails = [...this.state.userDetails]; //make a copy of array
//     const userDetails = [];
//      userDetails[evt] = value;
//      console.log(userDetails.evt);

//     // this.setState({ userDetails: userDetails });
//     // const value = evt.value;
//     // const name=evt.name;
//     //  console.log("Valuess---->",value,"Namee:::::>",name);
//   }

//   addTextInput = (key) => {
//     let textInput = this.state.textInput;
//     // console.log(key);
//     textInput.push(<TextInput key={key} name='txt+${key}' style={{borderColor:"black",borderWidth:1}} 
//     onChange={(value)=>{
//         this.handleChange(key,value);
//     }}
//     // onChangeText={(value)=>{
//     //     //this.textvalues.push(value);
//     //     this.textvalues.splice(key, 0, value); //colors =  ["red", "white", "blue"]
//     //     console.log("valueseseseses========>",[this.textvalues]);
//     // }
//     />);
//     this.setState({ textInput })
//   }
  
//   render(){
//     return(
//       <View>
//         <Button title='+' onPress={() => this.addTextInput(this.state.textInput.length)} />

//         {this.state.textInput.map((value, index) => {
//         //   console.log("Valuess====>",value);
//           return value
//         })}

//       </View>
//     )
//   }
// }

export default DynamicTextInput;