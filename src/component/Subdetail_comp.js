import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

export default class Subdetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schoolData:{},
        }
    }

    componentDidMount(){
        const schoolData = this.state.data;
        
    }

    render() {
       
        return (
            <View>
                <Text>Hi</Text>
            </View>
        );

    }
}