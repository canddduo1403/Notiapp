import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList
} from 'react-native';

import AttendListview from './Attendlist_comp';

const Window = Dimensions.get('window');

export default class Attendant_Class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classData: [],
        }
    }

    componentDidMount() {
        const doc = this.props.data.doc.datasummary;
        var classData = [];
        var sclass = {}
        for (let i = 0; i < doc.length; i++) {
            classData.push(sclass = {
                "classname": doc[i].slice(0, 1),
                "classattend": doc[i].slice(2, 3),
                "classfull": doc[i].slice(4, 5)
            })
        }
        this.setState({ classData: classData })

    }

    render() {
        return (
            <View>
                <View style={styles.headerStyle}>
                    <View style={styles.boxStyle}>
                        <Text style={{ marginLeft: 40 }}>ระดับชั้น</Text>
                        <Text>รายงานความก้าวหน้า</Text>
                    </View>
                </View>

                <FlatList
                    data={this.state.classData}
                    keyExtractor={item => item.classname}
                    renderItem={({ item }) => <AttendListview classdata={item} />}
                    removeClippedSubviews={false}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({

    headerStyle: {
        backgroundColor: '#F4A460',
        height: 60
    },

    boxStyle: {
        height: 60,
        width: Window / 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginLeft: 25

    },

});