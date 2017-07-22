import React, { Component } from 'react';
import { StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StatusBar } from 'react-native';

import { Actions } from 'react-native-router-flux';

export default class Logincomponent extends Component {
  render() {
  return (
       <View style={styles.container}>
        <StatusBar
          backgroundColor="steelblue"
          barStyle="light-content" />

           <TextInput
          placeholder="username"
          placeholderTextColor="rgba(52, 73, 94,0.7)"
          returnKeyType="next"
          onSubmitEditing={()=>this.passwordInput.focus()}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect = {false}
          style={styles.input}
        />

        <TextInput
          placeholder="password"
          placeholderTextColor="rgba(52, 73, 94,0.7)"
          returnKeyType="go"
          secureTextEntry
          style={styles.input}
          ref={(input)=>this.passwordInput=input}
        /> 
  

        <TouchableOpacity style={styles.buttonContainer} onPress={Actions.Contentcene}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

      </View>
        );
    }
}

const styles = StyleSheet.create({
  container:{
    padding:20
  },
  input:{
    height:40,
    backgroundColor:'rgba(44, 62, 80,0.2)',
    marginBottom:10,
    color:'#FFF',
    paddingHorizontal:10
  },
  buttonContainer:{
    backgroundColor:'#bdc3c7',
    paddingVertical:15
  },
  buttonText:{
    textAlign:'center',
    color:'#2c3e50',
    fontWeight:'700'
  }

});
