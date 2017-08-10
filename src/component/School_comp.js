import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    Text,
    Keyboard,
    ScrollView
} from 'react-native';

import PercentageCircle from 'react-native-percentage-circle';

import { Card, ListItem, Button, ButtonGroup, Icon } from 'react-native-elements';


export default class School_comp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            

        }
    }
    render() {
        Keyboard.dismiss();
        return (

            <ScrollView>

                <View style={{ flexDirection: 'column', marginTop: 50 }}>


                    <Card
                        title="บันทึกแผนการสอน"
                        containerStyle={styles.Container}
                        titleStyle={{ justifyContent: 'center' }}
                    >

                        <View style={{ flexDirection: 'row' }}>

                            <View style={{ flexDirection: 'column', justifyContent: 'space-between', }}>
                                <View>
                                    <Text>จำนวนรายวิชา</Text>
                                    <Text style={{ padding: 10 }}>162</Text>
                                </View>
                                <View>
                                    <Text>จำนวนรายวิชาที่บันทึก</Text>
                                    <Text style={{ padding: 10 }}>81</Text>
                                </View>
                            </View>

                            <View style={styles.perContainer}>
                                <Text>คิดเป็นร้อยละ</Text>
                                <PercentageCircle radius={35} percent={50} color={"#3498db"} textStyle={{ fontSize: 24, color: 'red' }}></PercentageCircle>
                            </View>

                        </View>

                    </Card>

                    <Card
                        title="บันทึกการเข้าเรียน"
                        containerStyle={styles.Container}
                    >

                        <View style={{ flexDirection: 'row' }}>

                            <View style={{ flexDirection: 'column', justifyContent: 'space-between', }}>
                                <View>
                                    <Text>จำนวนรายวิชา</Text>
                                    <Text style={{ padding: 10 }}>162</Text>
                                </View>
                                <View>
                                    <Text>จำนวนรายวิชาที่บันทึก</Text>
                                    <Text style={{ padding: 10 }}>81</Text>
                                </View>
                            </View>

                            <View style={styles.perContainer}>
                                <Text>คิดเป็นร้อยละ</Text>
                                <PercentageCircle radius={35} percent={50} color={"#3498db"} textStyle={{ fontSize: 24, color: 'red' }}></PercentageCircle>
                            </View>

                        </View>

                    </Card>

                    <Card
                        title="บันทึกผลสอบกลางภาค"
                        containerStyle={styles.Container}
                    >

                        <View style={{ flexDirection: 'row' }}>

                            <View style={{ flexDirection: 'column', justifyContent: 'space-between', }}>
                                <View>
                                    <Text>จำนวนรายวิชา</Text>
                                    <Text style={{ padding: 10 }}>162</Text>
                                </View>
                                <View>
                                    <Text>จำนวนรายวิชาที่บันทึก</Text>
                                    <Text style={{ padding: 10 }}>81</Text>
                                </View>
                            </View>

                            <View style={styles.perContainer}>
                                <Text>คิดเป็นร้อยละ</Text>
                                <PercentageCircle radius={35} percent={50} color={"#3498db"} textStyle={{ fontSize: 24, color: 'red' }}></PercentageCircle>
                            </View>

                        </View>

                    </Card>

                    <Card
                        title="บันทึกผลสอบปลายภาค"
                        containerStyle={styles.Container}
                    >

                        <View style={{ flexDirection: 'row' }}>

                            <View style={{ flexDirection: 'column', justifyContent: 'space-between', }}>
                                <View>
                                    <Text>จำนวนรายวิชา</Text>
                                    <Text style={{ padding: 10 }}>162</Text>
                                </View>
                                <View>
                                    <Text>จำนวนรายวิชาที่บันทึก</Text>
                                    <Text style={{ padding: 10 }}>81</Text>
                                </View>
                            </View>

                            <View style={styles.perContainer}>
                                <Text>คิดเป็นร้อยละ</Text>
                                <PercentageCircle radius={35} percent={50} color={"#3498db"} textStyle={{ fontSize: 24, color: 'red' }}></PercentageCircle>
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
        width: 400,
        height: 180,
        padding: 10,
        flex: 1,
    },

    perContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 100,
        width: 100,
        left: 60,
        borderLeftWidth: 2,
        borderColor: '#F0F8FF'
    },


});