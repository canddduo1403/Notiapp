import React, { Component } from 'react';
import { View, 
    Text,
    StyleSheet 
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import MainfirstsceneComp from '../component/MainfirstsceneComp';

export default class Contentcene extends Component{
    
    render(){
        return(
            <View style ={styles.container}>
                <MainfirstsceneComp/>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#bdc3c7',
    },
});