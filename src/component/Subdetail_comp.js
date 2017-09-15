import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    FlatList
} from 'react-native';

import { Header, Icon, List, ListItem } from 'react-native-elements';

import { Actions } from 'react-native-router-flux';

const Window = Dimensions.get('window');
export default class Subdetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schoolData: {},
            res: {}
        }
    }

    componentDidMount() {
        const schoolData = this.props.data;
        const res = {};

        var perStruct = Math.floor((schoolData.struct / schoolData.full) * 100);
        var perRatio = Math.floor((schoolData.ratio / schoolData.full) * 100);
        var perAttend = Math.floor((schoolData.attend / schoolData.full) * 100);
        var full = schoolData.full;

        res.full = schoolData.full
        res.perstruct = perStruct
        res.perRatio = perRatio
        res.perAttend = perAttend
        res.struct = schoolData.struct
        res.ratio = schoolData.ratio
        res.attend = schoolData.attend

        this.setState({ res: res })

    }


    render() {

        return (
            <View style={styles.bgStyle}>
                <Header
                    centerComponent={{ text: 'ติดตามการทำงาน', style: { fontSize: 20, color: '#fff' } }}
                    outerContainerStyles={{ backgroundColor: '#A0522D' }}
                    rightComponent={<TouchableOpacity
                        onPress={() => Actions.Schoolist_comp()}
                    ><Text style={{ fontSize: 18, color: '#fff' }}>Back</Text></TouchableOpacity>}
                >
                </Header>

                <View style={styles.headerStyle}>
                    <View style={styles.boxStyle}>
                        <Text style={styles.fonthHeadstyle}>รายการ</Text>
                        <Text style={styles.fonthHeadstyle}>จำนวนรายวิชา</Text>
                        <Text style={styles.fonthHeadstyle}>จำนวนที่บันทึก</Text>
                        <Text style={styles.fonthHeadstyle}>คิดเป็นร้อยละ</Text>
                    </View>
                </View>

                <ScrollView style={{ flexDirection: 'column' }}>
                    <View style={styles.listStyle}>
                        <View style={styles.boxList}>
                            <Text>แผนการสอน</Text>
                        </View>

                        <View style={styles.boxList}>
                            <Text>{this.state.res.full}</Text>
                        </View>

                        <View style={styles.boxList}>
                            <Text>{this.state.res.struct}</Text>
                        </View>

                        <View style={styles.boxList}>
                            <Text>{this.state.res.perstruct} %</Text>
                        </View>

                    </View>
                    <View style={styles.listStyle}>
                        <View style={styles.boxList}>
                            <Text>บันทึกเข้าเรียน</Text>
                        </View>
                        <View style={styles.boxList}>
                            <Text>{this.state.res.full}</Text>
                        </View>

                        <View style={styles.boxList}>
                            <Text>{this.state.res.attend}</Text>
                        </View>

                        <View style={styles.boxList}>
                            <Text>{this.state.res.perAttend} %</Text>
                        </View>

                    </View>
                    <View style={styles.listStyle}>
                        <View style={styles.boxList}>
                            <Text>ผลสอบกลางภาค</Text>
                        </View>
                        <View style={styles.boxList}>
                            <Text>{this.state.res.full}</Text>
                        </View>

                        <View style={styles.boxList}>
                            <Text>0</Text>
                        </View>

                        <View style={styles.boxList}>
                            <Text>0</Text>
                        </View>
                    </View>
                    <View style={styles.listStyle}>
                        <View style={styles.boxList}>
                            <Text>ผลสอบปลายภาค</Text>
                        </View>
                        <View style={styles.boxList}>
                            <Text>{this.state.res.full}</Text>
                        </View>

                        <View style={styles.boxList}>
                            <Text>0</Text>
                        </View>

                        <View style={styles.boxList}>
                            <Text>0</Text>
                        </View>

                    </View>
                </ScrollView>



            </View>
        );

    }
}

const styles = StyleSheet.create({
    bgStyle: {
        flex: 1,
        backgroundColor: '#FFEBCD'
    },

    headerStyle: {
        marginTop: 80,
        backgroundColor: '#F4A460',
        height: 100
    },

    boxStyle: {
        height: 100,
        width: Window / 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10

    },

    listStyle: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10,
        height: 60,
        backgroundColor: '#FFDEAD',
        marginTop: 20


    },

    fonthHeadstyle: {
        fontSize: 16,
        fontWeight: 'bold'
    },

    boxList: {
        width: 60,
        height: 100,
        alignItems: 'center',

    }
});