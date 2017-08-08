import React, { Component } from 'react';

import {
    Keyboard,
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView
} from 'react-native';

import ChartView from 'react-native-highcharts';

import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { Card, List, ListItem, Header } from 'react-native-elements';

import PercentageCircle from 'react-native-percentage-circle';

export default class Mockup_Chart extends Component {
    render() {
        Keyboard.dismiss();
        return (
            <ScrollView>

                <View style={{ flexDirection: 'row',marginTop:50 }}>


                    <Card
                        title="ทาเหนือวิทยา"
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

                <View style={{ flexDirection: 'row', marginTop: 50 }}>

                    <Card
                        title="บ้านวนาหลวง"
                        containerStyle={styles.Container}
                    >
                        <View style={{ flexDirection: 'row' }}>

                            <View style={{ flexDirection: 'column', justifyContent: 'space-between', }}>
                                <View>
                                    <Text>จำนวนรายวิชา</Text>
                                    <Text style={{ padding: 10 }}>132</Text>
                                </View>
                                <View>
                                    <Text>จำนวนรายวิชาที่บันทึก</Text>
                                    <Text style={{ padding: 10 }}>132</Text>
                                </View>
                            </View>

                            <View style={styles.perContainer}>
                                <Text>คิดเป็นร้อยละ</Text>
                                <PercentageCircle radius={35} percent={100} color={"#3498db"} textStyle={{ fontSize: 24, color: 'red' }}></PercentageCircle>
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
        top: 40,
        width: 400,
        height: 180,
        padding: 10,
        flex: 1
    },

    perContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 100,
        width: 100,
        alignItems: 'center',
        left: 40,
        borderLeftWidth: 2,
        borderColor: '#F0F8FF'
    },
});