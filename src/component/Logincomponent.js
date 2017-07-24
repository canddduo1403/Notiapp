import React, { Component } from 'react';
import { StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StatusBar,
  Alert } from 'react-native';

import { Actions } from 'react-native-router-flux';

import API from '../service/API';

export default class Logincomponent extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      user:'', pass: '',inputText:'',alert:'',
      stepLogin:false
    };
  }

  _onError(msg){
    Alert.alert('ผิดพลาด',JSON.stringify(msg),[{text:'ตกลง'}]);
  }

  _onLoginPress(){
    var text = this.state.inputText;
    var password = this.state.pass;
    if(!text) return;
    if(text.length===0)return;
    else{
    var credential = {user:text,pass:password};
    //console.log(user);
    console.log(credential);
    API.login(credential,(err,msg)=>{
        // console.log(err);
        if(err) return Alert.alert('ผิดพลาด','ไม่สามารถเชื่อมต่อเครือข่ายได้',[{text:'ตกลง'}]);
        if(this.props.onLoginDone) this.props.onLoginDone();
      });
    }
}
  render() {
    const isStepLogin = this.state.stepLogin;
  return (
       <View style={styles.container}>
        <StatusBar
          backgroundColor="steelblue"
          barStyle="light-content" />

           <TextInput
          placeholder="username"
          value={this.state.inputText}
          onChangeText={(inputText=>{this.setState({inputText})})}
          placeholderTextColor="rgba(52, 73, 94,0.7)"
          returnKeyType="next"
          autoCapitalize="none"
          autoCorrect = {false}
          style={styles.input}
        />
        <TextInput
          placeholder="password"
          placeholderTextColor="rgba(52, 73, 94,0.7)"
          returnKeyType="go"
          secureTextEntry
          value={this.state.pass}
          onChangeText={(text=>{this.setState({pass:text})})}
          style={styles.input}
          ref={(input)=>this.passwordInput=input}
        /> 
  

        <TouchableOpacity style={styles.buttonContainer} 
        onPress={this._onLoginPress.bind(this)}>
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
