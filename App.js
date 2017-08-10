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
import StructChart_Scene from './src/scene/StructChart_Scene';
import Sidemenu_Scene from './src/scene/Sidemenu_Scene';
import School_Scene from './src/scene/School_Scene';

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
      second: 5,
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
        message: "การจัดทำแผนการสอน", // (required)
        date: new Date(Date.now() + (60 * 1000))// in 60 secs
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
          </Scene>

          <Scene key="main">
            <Scene key="StructChart_Scene"
              component={StructChart_Scene}
              title="Home"
              hideNavBar={true}
              initial={true}

            />

            <Scene key = "School_Scene"
            component = {School_Scene}
            hideNavBar={true}
            />
          {/*   <Scene key="Structdetail_Scene"
              component={Structdetail_Scene}
              renderBackButton={() => (null)}
              hideNavBar={true}
            />
            <Scene key="Attendetail_Scene"
              component={Attendetail_Scene}
              renderBackButton={() => (null)}
              hideNavBar={true}
            />
            <Scene key="Middetail_Scene"
              component={Middetail_Scene}
              renderBackButton={() => (null)}
              hideNavBar={true}
            />
            <Scene key="Finaldetail_Scene"
              component={Finaldetail_Scene}
              renderBackButton={() => (null)}
              hideNavBar={true}
            /> */}
          </Scene>
        </Scene>

      </Router >

    );
  }
}
