import React from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import PushNotification from 'react-native-push-notification';

export default class PushController extends React.Component {

  componentDidMount() {
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },

    })
  }

  render() {
    return null;
  }

}