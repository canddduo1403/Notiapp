import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    Text,
    Keyboard,
    ScrollView,
    Dimensions,
    Platform
} from 'react-native';

import PercentageCircle from 'react-native-percentage-circle';

import { Card, ListItem, Button, ButtonGroup, Icon } from 'react-native-elements';

const Window = Dimensions.get('window')

export default class School_comp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doc: null,
            strucPer: 0,
            attendPer: 0,
            midPer: 0,
            midPer: 0,

            full: 0,
            struct: 0,
            attend: 0,
            mid: 0,
            final: 0
        }
    }

    componentDidMount() {
        const doc = this.props.sendDocData
        this._calPercentage(doc)
    }

    _calPercentage(doc) {
        var strucPer = 0;
        var attendPer = 0;
        var midPer = 0;
        var finnalPer = 0;

        var full = 0;
        var struct = 0;
        var attend = 0;
        var mid = 0;
        var final = 0;

        strucPer = Math.floor(((doc.subjectstructure / doc.full) * 100))
        attendPer = Math.floor(((doc.attend / doc.full) * 100))
        midPer = Math.floor(((doc.midterm / doc.full) * 100))
        finnalPer = Math.floor(((doc.final / doc.full) * 100))

        full = doc.full
        struct = doc.subjectstructure
        attend = doc.attend
        mid = doc.midterm
        final = doc.final

        this.setState({
            strucPer: strucPer, attendPer: attendPer,
            midPer: midPer, finnalPer: finnalPer, doc: doc,
            full: full, struct: struct, attend: attend, mid: mid, final: final
        })

    }


    render() {
        const strucPer = this.state.strucPer;
        const attendPer = this.state.attendPer;
        const midPer = this.state.midPer;
        const finnalPer = this.state.finnalPer;

        const full = this.state.full;
        const struct = this.state.struct;
        const attend = this.state.attend;
        const mid = this.state.mid;
        const final = this.state.final

        Keyboard.dismiss();
        return (

            <ScrollView>

                <View style={{ flexDirection: 'column', marginTop: 50, alignContent: 'center' }}>


                    <Card
                        title="แผนการสอน"
                        containerStyle={styles.Container}
                    >

                        <View style={{ flexDirection: 'row' }}>

                            <View style={{ flexDirection: 'column', justifyContent: 'space-between', }}>
                                <View>
                                    <Text style={styles.amountStyle}>จำนวนรายวิชาทั้งหมด</Text>
                                    <Text style={{ padding: 10 }}>{full}</Text>
                                </View>

                                <View>
                                    <Text style={styles.amountStyle}>รายวิชาที่บันทึก</Text>
                                    <Text style={styles.amountStyle}>แผนการสอน</Text>
                                    <Text style={{ padding: 10 }}>{struct}</Text>
                                </View>
                            </View>

                            <View style={styles.perContainer}>
                                <Text style={styles.amountStyle}>คิดเป็นร้อยละ</Text>
                                <PercentageCircle radius={35} percent={strucPer} color={"#3498db"} textStyle={{ fontSize: 18, color: 'red' }}></PercentageCircle>
                            </View>

                        </View>

                    </Card>

                    <Card
                        title="การเข้าเรียน"
                        containerStyle={styles.Container}
                    >

                        <View style={{ flexDirection: 'row' }}>

                            <View style={{ flexDirection: 'column', justifyContent: 'space-between', }}>
                                <View>
                                    <Text style={styles.amountStyle}>จำนวนรายวิชาทั้งหมด</Text>
                                    <Text style={{ padding: 10 }}>{full}</Text>
                                </View>
                                <View>
                                    <Text style={styles.amountStyle}>รายวิชาที่บันทึก</Text>
                                    <Text style={styles.amountStyle}>การเข้าเรียน</Text>
                                    <Text style={{ padding: 10 }}>{attend}</Text>
                                </View>
                            </View>

                            <View style={styles.perContainer}>
                                <Text style={styles.amountStyle}>คิดเป็นร้อยละ</Text>
                                <PercentageCircle radius={35} percent={attendPer} color={"#3498db"} textStyle={{ fontSize: 18, color: 'red' }}></PercentageCircle>
                            </View>

                        </View>

                    </Card>

                    <Card
                        title="ผลสอบกลางภาค"
                        containerStyle={styles.Container}
                    >

                        <View style={{ flexDirection: 'row' }}>

                            <View style={{ flexDirection: 'column', justifyContent: 'space-between', }}>
                                <View>
                                    <Text style={styles.amountStyle}>จำนวนรายวิชาทั้งหมด</Text>
                                    <Text style={{ padding: 10 }}>{full}</Text>
                                </View>
                                <View>
                                    <Text style={styles.amountStyle}>รายวิชาที่บันทึก</Text>
                                    <Text style={styles.amountStyle}>ผลสอบกลางภาค</Text>
                                    <Text style={{ padding: 10 }}>{mid}</Text>
                                </View>
                            </View>

                            <View style={styles.perContainer}>
                                <Text style={styles.amountStyle}>คิดเป็นร้อยละ</Text>
                                <PercentageCircle radius={35} percent={midPer} color={"#3498db"} textStyle={{ fontSize: 18, color: 'red' }}></PercentageCircle>
                            </View>

                        </View>

                    </Card>

                    <Card
                        title="ผลสอบปลายภาค"
                        containerStyle={styles.Container}
                    >

                        <View style={{ flexDirection: 'row' }}>

                            <View style={{ flexDirection: 'column', justifyContent: 'space-between', }}>
                                <View>
                                    <Text style={styles.amountStyle}>จำนวนรายวิชาทั้งหมด</Text>
                                    <Text style={{ padding: 10 }}>{full}</Text>
                                </View>
                                <View>
                                    <Text style={styles.amountStyle}>รายวิชาที่บันทึก</Text>
                                    <Text style={styles.amountStyle}>ผลสอบปลายภาค</Text>
                                    <Text style={{ padding: 10 }}>{final}</Text>
                                </View>
                            </View>

                            <View style={styles.perContainer}>
                                <Text style={styles.amountStyle}>คิดเป็นร้อยละ</Text>
                                <PercentageCircle radius={35} percent={finnalPer} color={"#3498db"} textStyle={{ fontSize: 18, color: 'red' }}></PercentageCircle>

                            </View>

                        </View>

                    </Card>



                </View>

            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({

    Container: {
        backgroundColor: '#DCDCDC',
        top: 20,
        width: Window.width - 5,
        height: 225,
    },

    perContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        ...Platform.select({

            ios: {
                height: 100,
                width: 100,
                left: 50,
            },

            android: {
                top: 0,
                height: 100,
                width: 100,
                left:20
            }
        }),
        borderLeftWidth: 2,
        borderColor: '#F0F8FF',
    },

    amountStyle: {
        fontWeight: 'bold'
    },

    percentStyle: {
        fontWeight: 'bold',
        fontSize: 30

    }


});