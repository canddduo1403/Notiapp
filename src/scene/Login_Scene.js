import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Logincomponent from '../component/Logincomponent';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class Login_Scene extends Component {
  render() {
    return (
        <KeyboardAvoidingView behavior="padding"
          style={{
            backgroundColor: '#FFEBCD',
            flex: 1
          }}
        >
          <View>
            {/* Title area   */}
            <View style={styles.titleContainer}>
              <Text style={styles.tilteStyle}>Login</Text>
            </View>

            {/* Component area */}
            <View style={styles.loginCompStyle}>
              <Logincomponent />
            </View>
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
    top: 50
  },

  loginCompStyle: {
    top: 100
  }

});