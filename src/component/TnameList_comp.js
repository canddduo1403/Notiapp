import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

export default class Tname_List extends Component {

    constructor(props) {
        super(props);
        this._onPressHandler = this._onPressHandler.bind(this)
    }

    _onPressHandler() {
        Actions.Tdetail_Scene({ tname: this.props.data.tname, data: this.props.dataexcel });
    }

    render() {
        return (
            <View style={styles.containner}>
                <TouchableOpacity onPress={this._onPressHandler}>
                    <View style={styles.listStyle}>
                        <Text style={{ marginLeft: 20 }}>{this.props.data.tname}</Text>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    containner: {
        justifyContent: 'center',
        padding: 10
    },

    listStyle: {
        height: 50,
        backgroundColor: '#CD853F',
        justifyContent: 'center',
    }

});
