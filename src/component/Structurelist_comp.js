import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class ListView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.classdata,
        }
    }

    render() {
        return (
            <View style={styles.containner}>
                <Text>{this.state.data.classname}</Text>
                <Text>{this.state.data.classStruct} / {this.state.data.classfull}</Text>
            </View>

        );
    }

}

const styles = StyleSheet.create({
    containner: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        backgroundColor: '#FFE4B5',
        height: 50,
    }
});