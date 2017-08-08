import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import App from './App'

export default class QinfoApp extends Component {
  render() {
    return (
      <App />
    );
  }
}


AppRegistry.registerComponent('QinfoApp', () => QinfoApp);
