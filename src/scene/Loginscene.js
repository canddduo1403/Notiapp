import React, { Component } from 'react';
import { StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Logincomponent from '../component/Logincomponent';

export default class PageOne extends Component {
 render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
         {/*  <Image
            style = {styles.logo}
            source = {require('../../image/logo1.png')}
           /> */}
           <Text style={styles.title}>Login Test</Text>
        </View>
        <View style={styles.formContainer}>
          <Logincomponent />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  logoContainer:{
    alignItems:'center',
    flexGrow:1,
    justifyContent:'center'
  },
  logo:{
    width:100,
    height:100
  },
  title:{
    color:'#2c3e50',
    marginTop:10,
    width:160,
    textAlign:'center',
    opacity:0.9
  }
});