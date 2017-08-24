import React from 'react';
import {
  Router,
  Scene,
  Modal,
  Schema,
  Actions,
  Reducer,
  ActionConst,
} from 'react-native-router-flux';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  AppState,
  Platform
} from 'react-native';

import PushNotification from 'react-native-push-notification';

import Login_Scene from './src/scene/Login_Scene';
import Director_Scene from './src/scene/Director_Scene'
import Structchart_comp from './src/component/Structchart_comp';
import Sidemenu_Scene from './src/scene/Sidemenu_Scene';

import PushController from './src/component/PushController';

const reducerCreate = params => {
  const defaultReducer = Reducer(params);
  return (state, action) => {
    return defaultReducer(state, action);
  }
};



export default class App extends React.Component {

  constructor(props) {
    super(props);
    this._handleStateChange = this._handleStateChange.bind(this);

    PushNotification.configure({
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      }
    });

    this.state = {
      date: null,
      setD: null
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleStateChange);
  }

  _handleStateChange(appState) {
    if (appState === 'background') {
      let date = new Date(Date.now());

      PushNotification.localNotification({
        title: "การจัดทำแผนการสอน", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
        bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      });


      PushNotification.localNotificationSchedule({
        number: 0,
        message: "มีการอัพเดต! การจัดทำแผนการสอน", // (required)
        date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

      });

    }
  }



  render() {
    return (
      <Router>

        <Scene>

          <Scene key="root">

            <Scene key="Login_Scene"
              component={Login_Scene}
              hideNavBar={true}
            />
            <Scene key="StructChart_Scene"
              component={Structchart_comp}
              title="Home"
              hideNavBar={true}
              type={ActionConst.REPLACE}
              initial={true}
            />

          </Scene>
        </Scene>

      </Router >

    );
  }
}
