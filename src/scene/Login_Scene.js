import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Logincomponent from '../component/Logincomponent';

export default class Login_Scene extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={{backgroundColor:'#FFFFFF', flex: 1 }}>

        {/* Title area   */}
        <View style={styles.titleContainer}>
          <Text style={styles.tilteStyle}>Login</Text>
        </View>

        {/* Component area */}
        <View style={styles.loginCompStyle}>
          <Logincomponent />
        </View>


      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  tilteStyle: {
    fontSize: 50,
    fontWeight: 'bold',
    alignContent: 'center',
    fontFamily: 'Avenir Next'
  },

  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 100
  },

  loginCompStyle: {
    top: 150
  }

});