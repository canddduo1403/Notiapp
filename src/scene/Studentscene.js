   import React,{Component} from 'react';
import {StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import {Icon} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import PushController from '../component/PushController'

export default class Studentscene extends Component{
    render(){
        return(
            <PushController/>
        );
    }
} 
  