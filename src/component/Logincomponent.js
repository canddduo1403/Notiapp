import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StatusBar,
  Alert,
  AsyncStorage,
  KeyboardAvoidingView,
  Dimensions
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import { Button, CheckBox } from 'react-native-elements';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { Sae } from 'react-native-textinput-effects';

import API from '../service/API';

import LocalStorage from '../service/LocalStorage'

const Window = Dimensions.get('window');

export default class Logincomponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
      text: '',
      checked: false,
      _isChecked: false
    };
  }

  _onError(msg) {
    Alert.alert('ผิดพลาด', JSON.stringify(msg), [{ text: 'ตกลง' }]);
  }

  _onLoginPress() {
    var user = this.state.user;
    var pass = this.state.pass;
    const text = { user, pass };

    if (!text) return;
    if (text.length === 0) return;
    else {
      const credential = { user: user, pass: pass };
      API.login(credential, (err, msg) => {
        if (err) return Alert.alert('ผิดพลาด', 'ไม่สามารถเชื่อมต่อเครือข่ายได้', [{ text: 'ตกลง' }]);
        else {
          Actions.StructChart_Scene();
        }
      });
    }
  }

  /* _toggle() {
    this.setState({ checked: !this.state.checked });
    let _isChecked = this.state.checked;
    if (_isChecked) {
      let user = this.state.user;
      let pass = this.state.pass;
      AsyncStorage.setItem('user', user)
      AsyncStorage.setItem('pass', pass)
      this.setState({ user: user, pass: pass, _isChecked: _isChecked })
    }
  }

  check() {
    AsyncStorage.getItem('user').then((user) => {
      this.setState({ user: user })
    })
    AsyncStorage.getAllKeys('pass').then((pass) => {
      this.setState({ pass: pass })
    })
  }

  componentWillDidMount() {
    this.check()
  }  */

  render() {
    return (
        <View style={styles.container}>

          <View style={{ padding: 16 }}>

            <Sae
              style={styles.inputContainer}
              label={'Username:'}
              iconClass={FontAwesomeIcon}
              iconName={'user-circle'}
              iconColor={'black'}
              onChangeText={(text) => this.setState({ user: text })}
              autoCapitalize='none'
              autoCorrect={false}
              inputStyle={{ color: '#5852AF' }}
            />
          </View>

          <View style={{ padding: 16, alignContent: 'center' }}>
            <Sae
              style={styles.inputContainer}
              label={'Password:'}
              iconClass={FontAwesomeIcon}
              iconName={'key'}
              iconColor={'black'}
              onChangeText={(text) => this.setState({ pass: text })}
              autoCapitalize='none'
              inputStyle={{ color: '#5852AF' }}
              secureTextEntry
              autoCorrect={false}

            />
          </View>

        {/*    <CheckBox
            title='จดจำ username และ password'
            checked={this.state.checked}
            onIconPress={this._toggle.bind(this)}
          /> 
 */}
          <Button
            title='Login'
            raised={true}
            icon={{ name: 'sign-in', type: 'font-awesome', color: "#5852AF" }}
            backgroundColor="#FFF8DC"
            onPress={this._onLoginPress.bind(this)}
            //onPress = {()=>Actions.StructChart_Scene()}
            style={styles.buttonContainer}
            color="#5852AF"
            textStyle={{ fontWeight: 'bold', fontSize: 20 }}
          />

        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  buttonContainer: {
    padding: 30,
    alignItems:'center'
  },

  inputContainer:{
    backgroundColor: '#FFF8DC',
    borderBottomWidth:3,
    borderRightWidth:3,
    borderColor:'#D2B48C' 
  }



});
