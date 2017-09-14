import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList
} from 'react-native';

import RatioListview from './Ratiolist_comp';


const Window = Dimensions.get('window');

export default class Ratio_class extends Component {

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
                "classratio": doc[i].slice(3, 4),
                "classfull": doc[i].slice(4, 5)
            })
        }
        this.setState({ classData: classData })

    }

    render() {
        return (
            <View style={styles.containner}>
                <View style={styles.headerStyle}>
                    <View style={styles.boxStyle}>
                        <Text style={{ marginLeft: 40 }}>ระดับชั้น</Text>
                        <Text>รายงานความก้าวหน้า</Text>
                    </View>

                </View>

                <FlatList
                    data={this.state.classData}
                    keyExtractor={item => item.classname}
                    renderItem={({ item }) => <RatioListview classdata={item} />}
                    removeClippedSubviews={false}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    containner: {
        flex: 1,
        backgroundColor:'#FFEBCD',
        paddingBottom:10
    },

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
        marginLeft:25

    },

});